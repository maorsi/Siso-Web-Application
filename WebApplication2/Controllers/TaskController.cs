using System;
using System.Collections.Generic;
using System.Linq;

using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SisoWebApplication.Entities;
using SisoWebApplication.Models;
using SisoWebApplication.Services;

namespace SisoWebApplication.Controllers
{

    [Route("api/user/{userId}/task")]
    public class TaskController : Controller
    {

        private ITaskServices taskServices;

        /**
         * constructor get dependence and set taskServices
         */
        public TaskController(ITaskServices taskServices)
        {
            this.taskServices = taskServices;
        }


        /**
          * GetAll  it Http get request and get user id and return   IActionResult of all tasks
         */
        [HttpGet]
        public IActionResult GetAll(Guid userId)
        {
            try
            {
                return Ok(taskServices.GetAllTaskById(userId));
            }
            catch (Exception exp)
            {
                return StatusCode(500, "A problem happened with handling your request.");
            }
           
        }


        /**
         * GetAll  it Http Post request and get user id and from the body of the request task  and create new task  and return   IActionResult of the task
        */
        [HttpPost]
        public IActionResult AddTask([FromBody] TaskForCreationDto taskForCreation, Guid userId)
        {
            try
            {
                if (taskForCreation == null)
                {
                    return BadRequest();
                }
                Task taskEntity = Mapper.Map<Task>(taskForCreation);
                Task task =  taskServices.AddTask(taskEntity, userId);
                if (!taskServices.Save())
                {
                    return StatusCode(500, "A problem happened with handling your request.");
                }
                return Ok(task);
            }
            catch (Exception exp)
            {
                return StatusCode(500, "A problem happened with handling your request.");
            }

        }

        /**
         * GetTaskById  it Http Get request and get user id     and return   IActionResult of the task
        */
        [HttpGet("{id}")]
        public IActionResult GetTaskById(Guid userId,Guid id)
        {
            try
            {
               
                return Ok(taskServices.GetTask(id,userId));
            }
            catch (Exception exp)
            {
                return StatusCode(500, "A problem happened with handling your request.");
            }
        }


        /**
         * UpdateTask  it Http Put request and get user id and from the body of the request task  and update the task  and return   IActionResult of the task
        */
        [HttpPut()]
        public IActionResult UpdateTask([FromBody] Task task, Guid userId)
        {

            try
            {
                if (task == null || task.UserId != userId)
                {
                    return BadRequest();
                }
                taskServices.UpdateTask(task);
                if (! taskServices.Save())
                {
                    return StatusCode(500, "A problem happened with handling your request.");
                }
                return Ok(task);

            }
            catch (Exception exp)
            {
                return StatusCode(500, "A problem happened with handling your request.");
            }

        }
    }
}
