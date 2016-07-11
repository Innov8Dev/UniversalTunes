using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Innov8Lib
{
    public class Emails
    {
        public static bool SendMail(string mailTo, string mailSubject, string mailBody, string mailFrom, string mailCC, string mailBCC)
        {
            bool mailSend = true;
            string mailError = string.Empty;
            try
            {
                mailBody = mailBody.Replace("<%LiveSiteHeader%>", ConfigurationManager.AppSettings["LiveSiteHeader"].ToString());
                MailMessage mail = new MailMessage(mailFrom, mailTo, mailSubject, mailBody);

                mail.IsBodyHtml = true;
                if (!string.IsNullOrEmpty(mailCC))
                {
                    mail.CC.Add(mailCC);
                }
                if (!string.IsNullOrEmpty(mailBCC))
                {
                    mail.Bcc.Add(mailBCC);
                }
                SmtpClient smtp = new SmtpClient();
                smtp.Send(mail);
                return mailSend;
            }
            catch (Exception ex)
            {
                mailError = "Failed : " + mailTo + " -> " + ex.Message + "<br>";
                mailSend = false;
                string path = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["LogDirectory"]);
                Logger.Start(path, "<br/>" + mailError + "<br/>" + ex.InnerException + "<br/>" + ex.StackTrace + "<br/>" + "INITIAL ERROR MESSAGE" + mailBody);
                return mailSend;
            }
        }

        //Recieves the location of the file,name and dictionery so to make changes of what is in the template to match data passed.
        public static string TemplateHelper(string fileLocation, string fileName, Dictionary<string, string> placeholder)
        {
            try
            {
                string file = fileLocation + fileName;
                string body = File.ReadAllText(file);

                foreach (string key in placeholder.Keys)
                {
                    body = body.Replace(key, placeholder[key]);
                }
                return body;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
