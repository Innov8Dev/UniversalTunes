using Innov8Lib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using UniversalTunesDataModel;

namespace UniversalTunesWeb.Controllers
{
    [RoutePrefix("api/Enums")]
    public class EnumsController : ApiController
    {
        private UniversalTunesEntities db = new UniversalTunesEntities();

        [HttpGet]
        [Route("UserTypeEnum")]
        public List<UserType> UserTypeEnum()
        {
            try
            {
                return db.UserTypes.OrderBy(x=>x.Name).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("PriceType")]
        public List<PriceType> PriceType()
        {
            try
            {
                return db.PriceTypes.OrderBy(x => x.Price).ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}