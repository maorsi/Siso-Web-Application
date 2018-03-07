

using SisoWebApplication.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using SisoWebApplication.Controllers;
using Microsoft.Extensions.Logging;
using SisoWebApplication.Entities;
using SisoWebApplication.Models;

namespace SisoWebAppTestUnit
{
    public class UserUnitTest
    {
      


        [Fact]
        public void UserExistTest()
        {

            // Arrange
            var mockRepo = new Mock<IUserServices>();

            User user = new User();
            user.Id = Guid.NewGuid();
            mockRepo.Setup(iUser=> iUser.GetUserById(It.IsAny<Guid>())).Returns(user);
            var controller = new UserController(mockRepo.Object,new LoggerFactory());


            // Act

            var result = controller.GetUsersById(user.Id);



            // Assert
            var viewResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<User>(
                viewResult.Value);
            Assert.Equal(user, model);
        }



        [Fact]
        public void UserNotExistTest()
        {

            // Arrange
            var mockRepo = new Mock<IUserServices>();

            User user = new User();
            user.Id = Guid.NewGuid();
            mockRepo.Setup(iUser => iUser.GetUserById(It.IsAny<Guid>()));
            var controller = new UserController(mockRepo.Object, new LoggerFactory());


            // Act

            var result = controller.GetUsersById(Guid.NewGuid());


            // Assert
            var viewResult = Assert.IsType<BadRequestObjectResult>(result);
            var model = Assert.IsAssignableFrom<string>(
                viewResult.Value);
            Assert.NotEqual(user.ToString(), model);
        }



        [Fact]
        public void GetUsersTest()
        {

            // Arrange
            var mockRepo = new Mock<IUserServices>();

            User user = new User();
            user.Id = Guid.NewGuid();
            LinkedList<User> users = new LinkedList<User>();
            users.AddFirst(user);
            users.AddFirst(new User());
            mockRepo.Setup(iUser => iUser.GetUsers()).Returns(users);
            var controller = new UserController(mockRepo.Object, new LoggerFactory());


            // Act

            var result = controller.GetUsers();


            // Assert
            var viewResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<User>>(
                viewResult.Value);
            Assert.Equal(users, model);
        }

        [Fact]
        public void GetUsersTestNotEqual()
        {

            // Arrange
            var mockRepo = new Mock<IUserServices>();

            User user = new User();
            user.Id = Guid.NewGuid();
            LinkedList<User> users = new LinkedList<User>();
            users.AddFirst(user);
            users.AddFirst(new User());
            mockRepo.Setup(iUser => iUser.GetUsers()).Returns(users);
            var controller = new UserController(mockRepo.Object, new LoggerFactory());

            users.AddFirst(new User());
            // Act

            var result = controller.GetUsers();


            // Assert
            var viewResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<IEnumerable<User>>(
                viewResult.Value);
            Assert.Equal(users, model);
        }



        [Fact]
        public void LoginUserTestNotEqual()
        {

            // Arrange
            var mockRepo = new Mock<IUserServices>();

            User user = new User();
            user.Id = Guid.NewGuid();
            UserForCheckingInformationDto userForChecking = new UserForCheckingInformationDto();

            mockRepo.Setup(iUser => iUser.UserExists(userForChecking)).Returns(false);
            mockRepo.Setup(iUser => iUser.GetUser(userForChecking)).Returns(user);
            var controller = new UserController(mockRepo.Object, new LoggerFactory());

            
            // Act

            var result = controller.LoginUser(userForChecking);


            // Assert
            var viewResult = Assert.IsType<BadRequestObjectResult>(result);
            var model = Assert.IsAssignableFrom<string>(
                viewResult.Value);
            Assert.NotEqual(user.ToString(), model);
        }

        [Fact]
        public void LoginUserTest()
        {

            // Arrange
            var mockRepo = new Mock<IUserServices>();

            User user = new User();
            user.Id = Guid.NewGuid();
            user.Email = "email";
            user.Password = "password";
            UserForCheckingInformationDto userForChecking = new UserForCheckingInformationDto();
            userForChecking.Email = "email";
            userForChecking.Password = "password";
            mockRepo.Setup(iUser => iUser.UserExists(userForChecking)).Returns(true);
            mockRepo.Setup(iUser => iUser.GetUser(userForChecking)).Returns(user);
            var controller = new UserController(mockRepo.Object, new LoggerFactory());


            // Act

            var result = controller.LoginUser(userForChecking);


            // Assert
            var viewResult = Assert.IsType<OkObjectResult>(result);
            var model = Assert.IsAssignableFrom<User>(
                viewResult.Value);
            Assert.Equal(user, model);
        }





    }
}
