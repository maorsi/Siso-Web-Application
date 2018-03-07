using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SisoWebApplication.Models
{
    public class UserForCreationDto
    {
        [Required]
        [MaxLength(50)]

        public String FirstName { get; set; }
        [Required]
        [MaxLength(50)]

        public String LastName { get; set; }

        [Required]
        [EmailAddress]
        public String Email { get; set; }

        [Required]
        [MaxLength(50)]
        public String Password { get; set; }
    }
}
