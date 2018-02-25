using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SisoWebApplication.Models
{
    public class ScoreForCreationDTO
    {


        [Required]
        public Guid UserId { get; set; }

        [Required]
        public String UserName { get; set; }

        [Required]
        public long Score { get; set; }
    }
}
