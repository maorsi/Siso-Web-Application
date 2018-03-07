using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SisoWebApplication.Entities;
using SisoWebApplication.Models;
using SisoWebApplication.Services;

namespace SisoWebApplication.Controllers
{
    
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private IUserServices userServices;
        private ILogger logger;


        /**
        * constructor get dependence and set taskServices
        */
        public UserController(IUserServices userServices, ILoggerFactory loggerFactory)
        {
            this.userServices = userServices;
            logger = loggerFactory.CreateLogger("User Controller Logger");
        }
        /**
        * GetAll  it Http Get and return   IActionResult of all the users
         */
        [HttpGet("[action]")]
        public IActionResult GetUsers()
        {
            try
            {
                logger.LogInformation("Get All Users "); 
                IEnumerable<User> users = userServices.GetUsers();
                return Ok(users);
            }
            catch (Exception e)
            {
                logger.LogError(e.Message);
                return StatusCode(500, "A problem happened with handling your request.");
                
            }

            
        }
        /**
         * LoginUser  it Http Post request and from the body of the request user information  and return   IActionResult of the user
        */
        [HttpPost("[action]")]
        public IActionResult LoginUser([FromBody] UserForCheckingInformationDto userForCheckingInformation)
        {
            try
            {
                logger.LogInformation("Login User " + userForCheckingInformation.ToString());
                if (!userServices.UserExists(userForCheckingInformation) || !ModelState.IsValid)
                {
                    return BadRequest("User Not Exsist");
                }
                return Ok(userServices.GetUser(userForCheckingInformation));
            }
            catch (Exception e)
            {
                logger.LogError(e.Message);
                return StatusCode(500, "A problem happened with handling your request.");
            }


        }


        /**
        * IActionResult  it Http Get request and get user id     and return   IActionResult of the task
        */
        [HttpGet("{id}", Name = "GetUser")]
        public IActionResult GetUsersById(Guid id)
        {
            try
            {
                logger.LogInformation("Get Users By Id " + id);
                User user = userServices.GetUserById(id);
                if (user == null)
                {
                  return BadRequest("User not found");
                }

               return Ok(user);
            }
            catch (Exception e)
            {
                logger.LogError(e.Message);
                return StatusCode(500, "A problem happened with handling your request.");
            }
        }


        /**
        * AddUser  it Http Post request and from the body of the request user information  and return   IActionResult of the user that created
        */
        [HttpPost("[action]")]
        public IActionResult AddUser(
            [FromBody] UserForCreationDto userForCreation)
        {
            try
            {
                logger.LogInformation("Add User " + userForCreation.ToString());
                if (userForCreation == null || !ModelState.IsValid )
               {
                    return BadRequest("User not valid");
                }

               if (userServices.UserExists(userForCreation.Email))
               {
                    return BadRequest("User already exists in the system");
               }

                var userEntity = Mapper.Map<User>(userForCreation);
                User user = userServices.AddUser(userEntity);
               if (!userServices.Save())
               {
                   return StatusCode(500, "A problem happened with handling your request.");
               }
                return Ok(user);
            }
            catch (Exception e)
            {
                logger.LogError(e.Message);
                return StatusCode(500, "A problem happened with handling your request.");
            }
            
        }


        /**
        * DeleteUser  it Http Delete get user id and return IActionResult 
        */
        [HttpDelete("{userId}")]
        public IActionResult DeleteUser(Guid userId)
        {
            try
            {
                logger.LogInformation("Delete User " + userId);
                User user = userServices.GetUserById(userId);
                if (user == null)
                {
                    return NotFound();
                }


                userServices.DeleteUser(user);

                if (!userServices.Save())
                {
                    return StatusCode(500, "A problem happened with handling your request.");
                }

                return NoContent();
            }
            catch (Exception e)
            {
                logger.LogError(e.Message);
                return StatusCode(500, "A problem happened with handling your request.");
            }
        }
        /**
        * UpdateUser  it Http Put request and get from the body of the request user information  and update the user  and return   IActionResult of the user
        */
        [HttpPut()]
        public IActionResult UpdateUser([FromBody] User user)
        {
            try
            {
                logger.LogInformation("Update User " + user.ToString());
                
                if (User == null || !ModelState.IsValid)
                {
                    return BadRequest();
                }
                userServices.UpdateUser(user);

                if (!userServices.Save())
                {
                    return StatusCode(500, "A problem happened with handling your request.");
                }

                return Ok(user);

            }
            catch (Exception e)
            {
                logger.LogError(e.Message);
                return StatusCode(500, "A problem happened with handling your request.");
            }

        }
    }
}