using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DemoTest.Models
{
    public class Product
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public int Price { get; set; }

        public string Description { get; set; }

        public string Link { get; set; }

        [NotMapped]
        public IFormFile File { get; set; }

    }
}
