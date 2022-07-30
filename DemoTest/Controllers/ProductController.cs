using DemoTest.Data;
using DemoTest.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
        public ProductController(ProductDbContext _context)
        {          
            context = _context;
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
        public void Create(Product product)
        {
            //productDAO.Add(product);
            context.Add(product);
            context.SaveChanges();
        }

        // POST: ProductController/Edit/5
        [HttpPost]
        [Route("update/")]
        public void Edit(Product product)
        {
            //productDAO.Update(product);
            context.Attach(product);
            context.Entry(product).State = EntityState.Modified;
            context.SaveChanges();
        }

        // POST: ProductController/Delete/5
        [HttpPost]
        [Route("delete/{id}")]
        public void Delete(string id)
        {
            //productDAO.Delete(id);
            var product = context.products.Find(id);
            context.Remove(product);
            context.SaveChanges();
            //return Ok();
        }
    }
}
