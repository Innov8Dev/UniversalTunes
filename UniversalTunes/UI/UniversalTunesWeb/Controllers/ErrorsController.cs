using Innov8Lib;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using UniversalTunesDataModel;

namespace UniversalTunesWeb.Controllers
{
    [RoutePrefix("api/Errors")]
    public class ErrorsController : ApiController
    {
        private UniversalTunesEntities db = new UniversalTunesEntities();

        // GET: api/Errors
        public IQueryable<Error> GetErrors()
        {
            return db.Errors;
        }

        // GET: api/Errors/5
        [ResponseType(typeof(Error))]
        public IHttpActionResult GetError(int id)
        {
            Error error = db.Errors.Find(id);
            if (error == null)
            {
                return NotFound();
            }

            return Ok(error);
        }

        // PUT: api/Errors/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutError(int id, Error error)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != error.Id)
            {
                return BadRequest();
            }

            db.Entry(error).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ErrorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Errors
        [Route("error")]
        [HttpPost]
        [ResponseType(typeof(Error))]
        public async Task<IHttpActionResult> PostError(Error error)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                db.Errors.Add(error);
                ErrorLog.LogError(error);
                error.ErrorDate = DateTime.Now;

                await db.SaveChangesAsync();
                return Ok(error);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        // DELETE: api/Errors/5
        [ResponseType(typeof(Error))]
        public IHttpActionResult DeleteError(int id)
        {
            Error error = db.Errors.Find(id);
            if (error == null)
            {
                return NotFound();
            }

            db.Errors.Remove(error);
            db.SaveChanges();

            return Ok(error);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ErrorExists(int id)
        {
            return db.Errors.Count(e => e.Id == id) > 0;
        }
    }
}