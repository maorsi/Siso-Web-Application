using SisoWebApplication.Entities;
using SisoWebApplication.Models;
using SisoWebApplication.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace SisoWebApplication.Services
{
    public class UserServices : IUserServices
    {

        private UserContext _context;

        public UserServices(UserContext context)
        {
            _context = context;
        }
        public User AddUser(User user)
        {
            user.Id = Guid.NewGuid();

            _context.User.Add(user);

            return user; 
        }
        public IEnumerable<User> GetUsers()
        {
            return _context.User.OrderBy(a => a.FirstName).ToList(); 
        }
        public User GetUserById(Guid userId)
        {
            return _context.User.FirstOrDefault(a => a.Id == userId);
        }
        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void DeleteUser(User user)
        {
            _context.User.Remove(user);
        }

        public bool UserExists(String email)
        {
            return _context.User.Any(a => a.Email.Equals(email));
        }
        public bool UserExistsById(Guid id)
        {
            return _context.User.Any(a => a.Id == id);
        }

        public bool UserExists(UserForCheckingInformationDto userForChecking)
        {
            return _context.User.Any(a => a.Email.Equals(userForChecking.Email) && a.Password.Equals(userForChecking.Password));
        }

        public User GetUser(UserForCheckingInformationDto userForChecking)
        {
            return _context.User.FirstOrDefault(a => a.Email.Equals(userForChecking.Email) && a.Password.Equals(userForChecking.Password));
        }

        public User UpdateUser(User user)
        {
            _context.User.Update(user);

            return user;
        }

    }
}
