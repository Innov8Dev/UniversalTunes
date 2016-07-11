using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using UniversalTunesDataModel;
using System.Data.Entity;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using UniversalTunesWeb.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace APIs.Controllers
{
    [RoutePrefix("api/AspNetUsers")]
    public class AspNetUsersController : ApiController
    {
        private UniversalTunesEntities db = new UniversalTunesEntities();

        [ResponseType(typeof(AspNetUser))]
        public async Task<IHttpActionResult> GetAspNetUsers()
        {
            try
            {
                return Ok(await db.AspNetUsers.ToListAsync());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [ResponseType(typeof(AspNetUser))]
        public async Task<IHttpActionResult> GetAspNetUserById(string id)
        {
            try
            {
                var aspnetuser = await db.AspNetUsers.FindAsync(id);

                if (aspnetuser == null)
                {
                    return NotFound();
                }

                return Ok(aspnetuser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [ResponseType(typeof(AspNetUser))]
        public async Task<IHttpActionResult>PutAspNetUser(AspNetUser aspnetuser)
        {
            try
            {
                var manager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));
                if (!ModelState.IsValid)
                {
                    return Conflict();
                }

                if (!UserNameExists(aspnetuser.UserName))
                {
                    var sysuser = new ApplicationUser()
                    {
                        Id = Guid.NewGuid().ToString(),
                        UserName = aspnetuser.UserName,
                        Email = aspnetuser.Email,
                        EmailConfirmed = true,
                        Name = aspnetuser.Name,
                        LastName = aspnetuser.LastName,
                        DateCreated = aspnetuser.DateCreated,
                        PhoneNumber = aspnetuser.PhoneNumber,
                        Active = true,
                        PasswordHash = aspnetuser.PasswordHash
                    };

                    IdentityResult result = manager.Create(sysuser, aspnetuser.PasswordHash);

                    if (result.Succeeded)
                    {
                        //AspNetRolesController rolesController = new AspNetRolesController();
                        //AspNetRoles role = db.AspNetRoles.FirstorDefault(x=>x.Name == "User");
                        //await rolescontroller.AddUserToRole(aspnetuser.UserName,role);
                    }
                    await db.SaveChangesAsync();
                }
                else
                {
                    db.Entry(aspnetuser).State = EntityState.Modified;
                }
                await db.SaveChangesAsync();
                return Ok(aspnetuser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public async Task<IHttpActionResult>DeleteAspNetUser(string id)
        {
            try
            {
                AspNetUser aspnetuser = await db.AspNetUsers.Where(x => x.Id == id).SingleOrDefaultAsync();

                if (aspnetuser == null)
                {
                    return NotFound();
                }
                //delete or make inactive
                await db.SaveChangesAsync();

                return Ok(aspnetuser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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

        private bool UserNameExists(string userName)
        {
            try
            {
                return db.AspNetUsers.Count(x => x.UserName == userName) > 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
