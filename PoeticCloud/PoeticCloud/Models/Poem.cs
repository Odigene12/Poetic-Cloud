using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PoeticCloud.Models
{
    public class Poem
    {
        [Key]
        public int Id { get; set; } 

        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public string Words { get; set; }
    }
}