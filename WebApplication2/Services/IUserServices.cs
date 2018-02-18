using System;
using System.Collections.Generic;
using WebApplication2.Entities;
using WebApplication2.Models;

namespace WebApplication2.Services
{
    public interface IUserServices
    {
        User AddUser(User user);
        IEnumerable<User> GetUsers();

        bool Save();

        User GetUserById(Guid userId);

        bool UserExists(String email);

        bool UserExistsById(Guid id);

        void DeleteUser(User user);

        bool UserExists(UserForCheckingInformationDto userForChecking);

        User GetUser(UserForCheckingInformationDto userForChecking);

        User UpdateUser(User user);

    }
}