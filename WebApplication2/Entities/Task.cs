﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace SisoWebApplication.Entities
{
    public class Task
    {

        [Key]
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public String Information { get; set; }


        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

    }
}
