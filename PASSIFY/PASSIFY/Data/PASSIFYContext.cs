using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PASSIFY.Models;

namespace PASSIFY.Data
{
    public class PASSIFYContext : DbContext
    {
        public PASSIFYContext (DbContextOptions<PASSIFYContext> options)
            : base(options)
        {
        }

        public DbSet<PASSIFY.Models.Category> Category { get; set; } = default!;
    }
}
