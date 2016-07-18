using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UniversalTunesDataModel;

namespace Innov8Lib
{
    public class ErrorLog
    {
        public ErrorLog()
        {
            LogError();
        }

        public void LogError()
        {
            Emails.SendMail(ConfigurationManager.AppSettings["DevEmail"], "Site Error", BuildErrorMessage(), "info@primatoys.co.za", "", "");
        }

        public static void LogError(Error error)
        {
            StringBuilder body = new StringBuilder();
            body.Append(BuildErrorMessage());
            body.Append("<p> Message : " + error.Message + "</p>");
            body.Append("<p> ExceptionMessage : " + error.ExceptionMessage + "</p>");
            body.Append("<p> StackTrace : " + error.StackTrace + "</p>");
            body.Append("<p> ExceptionType : " + error.ExceptionType + "</p>");

            //Todo: mail from to be accessed from the config file.
            Emails.SendMail(ConfigurationManager.AppSettings["DevEmail"], "Site Error", body.ToString(), "info@primatoys.co.za", "", "");
        }

        public static string BuildErrorMessage()
        {
            try
            {
                string strMessage = string.Empty;
                strMessage = "PAGE ERROR<br>IP Address: " + System.Web.HttpContext.Current.Request["REMOTE_ADDR"] + /*"<br>Page: " + HttpContext.Current.Request.Url.AbsoluteUri +*/ "<br>Time: " + DateTime.Now;
                //strMessage += HttpContext.Current.Server.GetLastError().InnerException == null ? HttpContext.Current.Server.GetLastError().ToString() : HttpContext.Current.Server.GetLastError().InnerException.ToString();
                //strMessage += HttpContext.Current.Server.GetLastError().StackTrace;
                //strMessage += message;

                return strMessage.ToString();
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
