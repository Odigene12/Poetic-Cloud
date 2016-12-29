using PoeticCloud.DAL;
using PoeticCloud.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PoeticCloud.Controllers
{
    public class UserController : ApiController
    {
        PoemRepository repo = new PoemRepository();
       
        // GET api/<controller>
        public IEnumerable<Poem> Get()
        {
            return repo.GetPoems();
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]Poem poetry)
        {
            repo.AddPoem(poetry);
            
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
            repo.RemovePoem(id);
        }
    }
}