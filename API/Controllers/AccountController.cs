using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService) {
            this._context = context;
            this._tokenService = tokenService;
        }

        [HttpGet("test")]
        public ActionResult<string> Test() 
        {
            return "Test 123";
        }

        // The 'using' keyword is used to ensure that the object is properly disposed off when it's no longer needed.
        // 'HMACSHA512' is a class in the 'System.Security.Cryptography' namespace that implements a keyed-hashing algorithm based on SHA-512.
        // It is used to generate a message authentication code (MAC) for a givem message and a secret key.
        // The MAC can be used to verify the authenticity and integrity of the message.

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) 
        {
            if(await UserExists(registerDto.Username)) 
            {
                return  BadRequest("Username is taken");
            }

            // Computes a Hash-based Message Authentication Code (HMAC) using the System.Security.Cryptography.SHA512 hash function.
            using var hmac = new HMACSHA512();
            var user = new AppUser 
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user); // tracking changes
            await _context.SaveChangesAsync(); // Will call Database & save our 'user' to 'Users' table.

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) 
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.Username);

            if(user == null) {
                return Unauthorized("Invalid username");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            // compare hmac, computedHas, if they are equal, Yes the user's credentials are accurate.
            // Else, Unauthorized entry

            var computeHashSize = computeHash.Length;
            for(int i=0; i<computeHashSize; i++) {
                if(computeHash[i] != user.PasswordHash[i]) {
                    return Unauthorized("Invalid password");
                }
            }
            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        public async Task<bool> UserExists(string username) 
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
        
    }
}