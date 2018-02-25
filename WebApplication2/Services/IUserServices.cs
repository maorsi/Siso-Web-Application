using SisoWebApplication.Entities;
using SisoWebApplication.Models;
using System;
using System.Collections.Generic;


namespace SisoWebApplication.Services
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