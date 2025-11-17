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

        public DbSet<PASSIFY.Models.Activity> Activity { get; set; } = default!;
        public DbSet<PASSIFY.Models.Category> Category { get; set; } = default!;
        public DbSet<PASSIFY.Models.Organizer> Organizer { get; set; } = default!;
        public DbSet<PASSIFY.Models.Purchase> Purchase { get; set; } = default!;
    }
}
