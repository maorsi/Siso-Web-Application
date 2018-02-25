using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SisoWebApplication.Entities
{
    public class GameScore
    {

        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public String UserName { get; set; }

        [Required]
        public long Score { get; set; }

    }
}
