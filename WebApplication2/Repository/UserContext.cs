using Microsoft.EntityFrameworkCore;
using SisoWebApplication.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace SisoWebApplication.Repository
{
    public class UserContext : DbContext
    {

        public UserContext(DbContextOptions<UserContext> options)
          : base(options)
        {
           
        }

        public DbSet<User> User { get; set; }

        public DbSet<Entities.Task> Task { get; set; }

        public DbSet<Entities.GameScore> GameScore { get; set; }
    }
}
