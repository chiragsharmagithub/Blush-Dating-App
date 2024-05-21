using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    // We have inherited properties from the BaseApiController
    public class UsersController : BaseApiController
    {
        // Before Implementing REPOSITORY PATTERN (IUserRepository Class)
        // public readonly DataContext _context;
        // public UsersController(DataContext context)
        // {
        //     this._context = context;
        // }
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        // After Implementing REPOSITORY PATTERN (IUserRepository Class)
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            this._mapper = mapper;
            this._userRepository = userRepository;
        }



        // ActionResult
        // ActionResult is a return type of a controller method in MVC.

        // IEnumerable aka 'List'
        // IEnumerable is an interface in the System.Collections namespace that defines a method for obtaining an enumerator.

        // Enumerator
        // In C#, an enumerator is a value type that helps you iterate over a collection of items. An enumerator can also be called an enum constant.
        // Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

        // Async code
        // [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsersAsync() 
        {
            // var users = await this._userRepository.GetUsersAsync();
            // var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
            // return Ok(usersToReturn);

            var users = await this._userRepository.GetMembersAsync();
            return Ok(users);

        }

        // Sync code
        // [HttpGet]
        // public ActionResult<IEnumerable<AppUser>> GetUsers()
        // {
        //     var users = _context.Users.ToList();
        //     return users;
        // }

        // api/users/2
        // [Authorize]
        // [HttpGet("{id}")]
        // public async Task<ActionResult<AppUser>> GetUserAsync(int id) 
        // {
        //     return await this._userRepository.GetUserByIdAsync(id);
        // }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUserByUsername(string username)
        {
            // var user = await this._userRepository.GetUserByUsernameAsync(username);
            // return this._mapper.Map<MemberDto>(user);

            var user = await _userRepository.GetMemberAsync(username);
            return user;
            
        }

    }
}