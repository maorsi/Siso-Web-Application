﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class UserForCreationDto
    {

        public String FirstName { get; set; }

        public String LastName { get; set; }

        public String Email { get; set; }

        public String Password { get; set; }
    }
}
