using DemoTest.Data;
using DemoTest.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DemoTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        //ProductDAO productDAO;
        ProductDbContext context;
        IWebHostEnvironment webHostEnvironment;
        public ProductController(ProductDbContext _context, IWebHostEnvironment _webHostEnvironment)
        {          
            context = _context;
            webHostEnvironment = _webHostEnvironment;
        }
        // GET: ProductController
        public List<Product> Index()
        {
            return context.products.ToList();
        }


        // GET: ProductController/Details/5
        [HttpGet("{id}")]
        [Route("detail/{id}")]
        public Product Details(string id)
        {
            var product = context.products
                    .Single(product => product.Id == id);
            return product;
        }

        // POST: ProductController/Create
        [HttpPost]
        [Route("add/")]
        public void Create([FromForm] Product product)
        {
            SaveFile(product);
            context.Add(product);
            context.SaveChanges();
        }

        // POST: ProductController/Edit/5
        [HttpPost]
        [Route("update/")]
        public void Edit([FromForm] Product product)
        {           
            
            SaveFile(product);                        
            context.Attach(product);
            context.Entry(product).State = EntityState.Modified;
            context.SaveChanges();
        }

        // POST: ProductController/Delete/5
        [HttpPost]
        [Route("delete/{id}")]
        public void Delete(string id)
        {
            var product = context.products.Find(id);
            context.Remove(product);
            context.SaveChanges();
            //return Ok();
        }

        private void SaveFile(Product product)
        {
            var path = "pic/";
            if (product.File != null)
            {
                string fileEx = "jpg";
                if (product.File.ContentType == "image/png") { fileEx = "png"; }
                else if (product.File.ContentType == "image/gif") { fileEx = "gif"; }
                else if (product.File.ContentType == "image/jpeg") { fileEx = "jpeg"; }

                path += String.Format("{0}.{1}", Guid.NewGuid().ToString(), fileEx);
                product.Link = path;
                string serverFolder = Path.Combine(webHostEnvironment.WebRootPath, path);
                using (Stream fileStream = new FileStream(serverFolder, FileMode.Create))
                {
                    product.File.CopyTo(fileStream);
                }
            }
        }
    }
}
