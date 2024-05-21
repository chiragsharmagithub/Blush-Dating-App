using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            this._context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret() 
        {
            return "Secret text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var notFoundVar = _context.Users.Find(-1);

            // Creates an NotFoundResult that produces a StatusCodes.Status404NotFound response.
            if(notFoundVar == null) return NotFound();

            return Ok(notFoundVar);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var errVar = _context.Users.Find(-1);

            // We are converting a null object to string, this will generate NullExceptionError
            var errVarToReturn = errVar.ToString(); 

            return errVarToReturn;
            
            // try 
            // {
            // var errVar = _context.Users.Find(-1);

            // // We are converting a null object to string, this will generate NullExceptionError
            // var errVarToReturn = errVar.ToString(); 

            // return errVarToReturn;
            // }
            // catch (Exception ex) 
            // {
            //     return StatusCode(500, "Computer says no!");
            // }
        } 

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            // Creates an BadRequestResult that produces a StatusCodes.Status400BadRequest response.
            return BadRequest("This was not a good request");
        }


    }
}