using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Innov8Lib
{
    public class Log
    {
        #region Member Variables
        private Guid token = Guid.NewGuid();
        private DateTime datecreated = DateTime.Now;
        private string hostobjectname = string.Empty;
        #endregion

        #region Public Accessors
        public Guid Token
        {
            get { return this.token; }
        }
        public DateTime DateCreated
        {
            get { return this.datecreated; }
        }
        public string HostObjectName
        {
            get { return this.hostobjectname; }
        }
        #endregion

        #region Constructors
        public Log(string pHostObjectName)
        {
            this.hostobjectname = pHostObjectName;
        }

        public Log()
        {
        }
        #endregion

        #region Public Log Logic
        public void Error(string message)
        {
            this.Error(message, DateTime.Now);
        }
        public void Info(string message)
        {
            this.Info(message, DateTime.Now);
        }
        public void Warning(string message)
        {
            this.Warning(message, DateTime.Now);
        }
        public void Debug(string message)
        {
            this.Debug(message, DateTime.Now);
        }
        public void Other(string message)
        {
            this.Other(message, DateTime.Now);
        }
        public void Error(string message, DateTime eventTime)
        {
            try
            {
                Logger.Log(Logger.LogAction.Error, message, this, eventTime);
            }
            catch { }
        }
        public void Info(string message, DateTime eventTime)
        {
            try
            {
                Logger.Log(Logger.LogAction.Info, message, this, eventTime);
            }
            catch { }
        }
        public void Warning(string message, DateTime eventTime)
        {
            try
            {
                Logger.Log(Logger.LogAction.Warning, message, this, eventTime);
            }
            catch { }
        }
        public void Debug(string message, DateTime eventTime)
        {
            try
            {
                Logger.Log(Logger.LogAction.Debug, message, this, eventTime);
            }
            catch { }
        }
        public void Other(string message, DateTime eventTime)
        {
            try
            {
                Logger.Log(Logger.LogAction.Other, message, this, eventTime);
            }
            catch { }
        }
        #endregion
    }
}
