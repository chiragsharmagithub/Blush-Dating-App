using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // We have inherited properties from the BaseApiController
    public class UsersController : BaseApiController
    {
        public readonly DataContext _context;
        public UsersController(DataContext context)
        {
            this._context = context;
        }

        // ActionResult
        // ActionResult is a return type of a controller method in MVC.

        // IEnumerable aka 'List'
        // IEnumerable is an interface in the System.Collections namespace that defines a method for obtaining an enumerator.

        // Enumerator
        // In C#, an enumerator is a value type that helps you iterate over a collection of items. An enumerator can also be called an enum constant.
        // Enumerators can be used to read the data in the collection, but they cannot be used to modify the underlying collection.

        // Async code
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsersAsync() 
        {
            var users = await _context.Users.ToListAsync(); 
            return users;
        }

        // Sync code
        // [HttpGet]
        // public ActionResult<IEnumerable<AppUser>> GetUsers()
        // {
        //     var users = _context.Users.ToList();
        //     return users;
        // }

        // api/users/2
        [Authorize]
        [HttpGet("{id}")]
        
        public async Task<ActionResult<AppUser>> GetUserAsync(int id) 
        {
            var user = await _context.Users.FindAsync(id);
            return user;
        }

    }
}