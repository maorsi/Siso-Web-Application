using SisoWebApplication.Entities;
using SisoWebApplication.Models;
using SisoWebApplication.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SisoWebApplication.Services
{
    public class ScoreGameServices : IScoreGameServices
    {
        private UserContext _context;
        public ScoreGameServices(UserContext context)
        {
            this._context = context;
        }


        public IEnumerable<GameScore> GetAll()
        {
            IEnumerable<GameScore> listScore =  _context.GameScore.ToList();
            return listScore; 
        }

        public GameScore AddScore(GameScore scoreForCreation)
        {
            scoreForCreation.Id = Guid.NewGuid();
            _context.GameScore.Add(scoreForCreation);

            return scoreForCreation;

        }
        public bool IfExists(Guid id)
        {
            bool gameScoreExists = false;
            gameScoreExists = _context.GameScore.Any(score => score.UserId == id);
            return gameScoreExists;
        }
        public GameScore GetScoreForUser(Guid id)
        {
            return _context.GameScore.FirstOrDefault(gameScore => id == gameScore.UserId);
        }

        public GameScore UpdateScore(GameScore score)
        {
            _context.GameScore.Update(score);

            return score;
        }


        public IEnumerable<GameScore> GetTop5()
        {
            return _context.GameScore.ToList().OrderBy( score => score.Score  ).Take(5);
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
