using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PoeticCloud.Models;

namespace PoeticCloud.DAL
{
    public class PoemRepository
    {
        public PoemContext Context { get; set; }
        public PoemRepository(PoemContext _context)
        {
            Context = _context;
        }

        public PoemRepository()
        {
            Context = new PoemContext();
        }

        public List<Poem> GetPoems()
        {
            return Context.Poetry.ToList();
        }

        public void AddPoem(Poem newPoem)
        {
            Context.Poetry.Add(newPoem);
        }

        public Poem RemovePoem(Poem newPoem)
        {
            return Context.Poetry.Remove(newPoem);
        }

        public Poem FindPoemByTitle(string title)
        {
            return Context.Poetry.FirstOrDefault(p => p.Title.ToLower() == title.ToLower());
        }

        public List<Poem> FindPoemByAuthor(string author)
        {
            return Context.Poetry.Where(p => p.Author.ToLower() == author.ToLower()).ToList();
        }
    }
}