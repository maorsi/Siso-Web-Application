using System;
using System.Collections.Generic;
using SisoWebApplication.Entities;
using SisoWebApplication.Models;

namespace SisoWebApplication.Services
{
    public interface IScoreGameServices
    {
        GameScore AddScore(GameScore scoreForCreation);
        IEnumerable<GameScore> GetAll();
        GameScore GetScoreForUser(Guid id);
        IEnumerable<GameScore> GetTop5();
        bool IfExists(Guid id);
        GameScore UpdateScore(GameScore score);

        bool Save();
    }
}