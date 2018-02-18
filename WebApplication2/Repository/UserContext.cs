using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.Entities;

namespace WebApplication2.Repository
{
    public class UserContext : DbContext
    {

        public UserContext(DbContextOptions<UserContext> options)
          : base(options)
        {
           
        }

        public DbSet<User> User { get; set; }

        public DbSet<Entities.Task> Task { get; set; }
    }
}
