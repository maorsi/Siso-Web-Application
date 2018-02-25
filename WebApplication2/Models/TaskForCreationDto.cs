using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SisoWebApplication.Models
{
    public class TaskForCreationDto
    {


       
        public String Information { get; set; }


        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
