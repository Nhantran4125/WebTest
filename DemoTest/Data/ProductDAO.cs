using DemoTest.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DemoTest.Data
{
    public class ProductDAO
    {
        ProductDbContext context;
        public ProductDAO(ProductDbContext _context) { context = _context; }

        public List<Product> GetAll()
        {           
             return context.products.ToList();  
        }

        public Product GetById(string Id)
        {
            
             var product = context.products
                    .Single(product => product.Id == Id);
                return product;
            
        }

        public void Add(Product product)
        {
            
                context.Add(product);
                context.SaveChanges();
            
        }

        public void Update(Product product)
        {           
                context.Attach(product);
                context.Entry(product).State = EntityState.Modified;
                context.SaveChanges();           
        }

        public void Delete(string id)
        {           
                var product = context.products.Find(id);
                context.Remove(product);
                context.SaveChanges();           
        }
    }
}
