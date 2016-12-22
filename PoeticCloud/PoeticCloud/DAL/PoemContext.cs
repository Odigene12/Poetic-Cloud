using PoeticCloud.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PoeticCloud.DAL
{
    public class PoemContext : ApplicationDbContext
    {
        public virtual DbSet<Poem> Poetry { get; set; }
    }
}