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
    [RoutePrefix("api/AspNetRoles")]
    public class AspNetRolesController : ApiController
    {
        private UniversalTunesEntities db = new UniversalTunesEntities();

        // GET: api/AspNetRoles
        [Route("roles")]
        [ResponseType(typeof(List<AspNetRole>))]
        public async Task<IHttpActionResult> GetAspNetRoles()
        {
            try
            {
                return Ok(await db.AspNetRoles.ToListAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: api/AspNetRoles/5
        [ResponseType(typeof(AspNetRole))]
        public async Task<IHttpActionResult> GetAspNetRole(string id)
        {
            try
            {
                AspNetRole aspNetRole = await db.AspNetRoles.FindAsync(id);
                if (aspNetRole == null)
                {
                    return NotFound();
                }

                return Ok(aspNetRole);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/AspNetRoles/5
        [ResponseType(typeof(AspNetRole))]
        public async Task<IHttpActionResult> PutAspNetRole(AspNetRole aspNetRole)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (!AspNetRoleExists(aspNetRole.Id))
                {
                    return BadRequest();
                }

                db.Entry(aspNetRole).State = EntityState.Modified;


                await db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/AspNetRoles
        [ResponseType(typeof(AspNetRole))]
        public async Task<IHttpActionResult> PostAspNetRole(AspNetRole aspNetRole)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                db.AspNetRoles.Add(aspNetRole);

                await db.SaveChangesAsync();
                return Ok(aspNetRole);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/AspNetRoles/5
        [ResponseType(typeof(AspNetRole))]
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteAspNetRole(string id)
        {
            try
            {
                AspNetRole aspNetRole = await db.AspNetRoles.FindAsync(id);
                if (aspNetRole == null)
                {
                    return NotFound();
                }

                await db.SaveChangesAsync();

                return Ok(aspNetRole);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/AspNetRoles/purge/5
        [Route("purge/{id}")]
        [HttpDelete]
        [ResponseType(typeof(AspNetRole))]
        public async Task<IHttpActionResult> PurgeAspNetRole(string id)
        {
            try
            {
                AspNetRole aspNetRole = await db.AspNetRoles.FindAsync(id);
                if (aspNetRole == null)
                {
                    return NotFound();
                }

                db.AspNetRoles.Remove(aspNetRole);
                await db.SaveChangesAsync();

                return Ok(aspNetRole);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
                throw;
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AspNetRoleExists(string id)
        {
            return db.AspNetRoles.Count(e => e.Id == id) > 0;
        }
    }
}