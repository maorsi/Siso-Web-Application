using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SisoWebApplication.Entities;
using SisoWebApplication.Models;
using SisoWebApplication.Services;

namespace SisoWebApplication.Controllers
{
    [Produces("application/json")]
    [Route("api/SnakeGame")]
    public class SnakeGameController : Controller
    {
        private IScoreGameServices scoreGameServices;

        public SnakeGameController(IScoreGameServices scoreGameServices)
        {
            this.scoreGameServices = scoreGameServices;
        }

        // GET: api/SnakeGame
        [HttpGet]
        public IActionResult GetTop5()
        {
            try
            {
                IEnumerable<GameScore> topScore = scoreGameServices.GetTop5();

                var top5 =  Mapper.Map<IEnumerable<ScoreForCreationDTO>>(topScore);

                return Ok(top5);
            }
            catch(Exception exp) {

                return StatusCode(500, "A problem happened with handling your request.");
            }


           
        }

        // GET: api/SnakeGame/5
        [HttpGet("{id}", Name = "GetScoreForUser")]
        public IActionResult GetScoreForUser(Guid id)
        {
            try
            {
                if (!scoreGameServices.IfExists(id))
                    return BadRequest("Score Not Found");

                var scoreForUser = scoreGameServices.GetScoreForUser(id);
                return Ok(scoreForUser);
            }
            catch (Exception exp)
            {

                return StatusCode(500, "A problem happened with handling your request.");
            }
        }

        // POST: api/SnakeGame/id
        [HttpPost("{id}")]
        public IActionResult AddScore([FromBody]ScoreForCreationDTO  scoreForCreation ,Guid id)
        {

            try
            {
                var score = Mapper.Map<GameScore>(scoreForCreation);
                score = scoreGameServices.AddScore(score);
                if (!scoreGameServices.Save())
                {
                    return StatusCode(500, "A problem happened with handling your request.");
                }
                return Ok(score);
            }
            catch (Exception exp)
            {

                return StatusCode(500, "A problem happened with handling your request.");
            }

        }

        // PUT: api/SnakeGame/
        [HttpPut()]
        public IActionResult Put([FromBody]GameScore gameScore)
        {
            try
            {
                if (!scoreGameServices.IfExists(gameScore.UserId))
                {
                    var score = Mapper.Map<ScoreForCreationDTO>(gameScore);
                    return AddScore(score, gameScore.UserId);
                }
                gameScore= scoreGameServices.UpdateScore(gameScore);

                if (!scoreGameServices.Save())
                {
                    return StatusCode(500, "A problem happened with handling your request.");
                }

                return Ok(gameScore);
            }
            catch (Exception exp)
            {

                return StatusCode(500, "A problem happened with handling your request.");
            }
        }
        

    }
}
