using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Innov8Lib
{
    internal static class Logger
    {
        #region Enums
        public enum LogAction
        {
            Error, Info, Debug, Warning, Other
        };
        #endregion

        #region Static Member Variables
        private static bool running = false;
        private static bool stop = false;
        private static Thread th_main = null;
        private static StreamWriter log = null;
        private static DateTime created = DateTime.MinValue;
        private static string logDir = string.Empty;
        private static string errorMessage = string.Empty;
        #endregion

        #region Public Static Control Logic
        public static bool IsOpen
        {
            get { return Logger.log != null; }
        }
        public static void Start(string LogDirectory, string message)
        {
            Logger.errorMessage = message;
            Logger.logDir = LogDirectory;
            Logger.Open();
            if (Logger.log == null)
                throw new Exception("Log failed to initialize.");

            if (Logger.running)
                return;

            Logger.th_main = new Thread(new ThreadStart(Logger.run));
            Logger.th_main.Start();
        }
        public static void Stop()
        {
            Logger.stop = true;

            while (Logger.running)
            {
                Thread.Sleep(250);
            }

            Logger.stop = false;
            Logger.th_main = null;
        }
        #endregion

        #region Public Log Logic
        public static void Log(LogAction action, string message, Log l)
        {
            Logger.Log(action, message, l, DateTime.Now);
        }
        public static void Log(LogAction action, string message, Log l, DateTime datetime)
        {
#if DEBUG
            Console.Write(datetime.ToString("HH:mm:ss"));
            Console.Write("\t");
            Console.Write(action.ToString().ToUpper());
            Console.Write("\t");
            Console.Write(l.HostObjectName);
            Console.Write("\t");

            string[] lines = message.Split(new string[] { "\r\n", "\r", "\n" }, StringSplitOptions.RemoveEmptyEntries);
            for (int i = 0; i < lines.Length; i++)
            {
                Console.Write(lines[i]);
                if (i != lines.Length - 1)
                    Console.Write("\r\n");
            }

            Console.Write("\r\n");
#else
            if (Logger.IsOpen)
            {
                Logger.log.Write(datetime.ToString("dd-MM-yyyy_HH:mm:ss"));
                Logger.log.Write("\t\t");
                Logger.log.Write(action.ToString().ToUpper());
                Logger.log.Write("\t\t");
                Logger.log.Write(l.HostObjectName);
                /*Logger.log.Write( "[" );
                Logger.log.Write( l.Token.ToString() );
                Logger.log.Write( "]" );*/
                Logger.log.Write("\t\t");

                string[] lines = message.Split(new string[] { "\r\n", "\r", "\n" }, StringSplitOptions.RemoveEmptyEntries);
                for (int i = 0; i < lines.Length; i++)
                {
                    Logger.log.Write(lines[i]);
                    if (i != lines.Length - 1)
                        Logger.log.Write("\r\n\t\t\t\t\t\t");
                }

                Logger.log.Write("\r\n");
                Logger.log.Flush();
            }
#endif
        }
        #endregion

        #region Static Private Logic
        private static void Open()
        {
            if (!Directory.Exists(Logger.logDir))
                Directory.CreateDirectory(Logger.logDir);

            try
            {
                string logfile = (Logger.logDir.EndsWith("\\") ? Logger.logDir : Logger.logDir + "\\") + "event_log_" + DateTime.Now.ToString("dd_MM_yyyy") + ".log";

                if (File.Exists(logfile))
                {

                    FileInfo file = new FileInfo(logfile);
                    file.Rename(string.Format("event_log_{0}.log", DateTime.Now.ToString("yyyyMMddHHmmss")));

                }

                Logger.log = new StreamWriter(logfile, File.Exists(logfile));
                Logger.created = DateTime.Now;

                Logger.log.Write("\r\n\r\n*********************************************************************************************************************\r\n");
                Logger.log.Write("*****************************************INITIALIZE - " + DateTime.Now.ToString("HH:mm:ss") + "*******************************************************\r\n");
                Logger.log.Write("*********************************************************************************************************************\r\n\r\n");
                Logger.log.Write(errorMessage);
            }
            catch { }
        }
        private static void Close()
        {
            if (Logger.log != null)
            {
                Logger.log.Close();
                Logger.log.Dispose();
            }
        }
        private static void run()
        {
            Logger.running = true;

            try
            {
                while (!Logger.stop)
                {
                    try
                    {
                        if (DateTime.Now.Date != Logger.created.Date)
                        {
                            if (Logger.log != null)
                            {
                                Logger.Close();
                                Logger.Open();
                            }
                        }
                    }
                    catch { }

                    Thread.Sleep(1250);
                };
            }
            finally
            {
                Logger.running = false;
                Logger.Close();
            }
        }
        #endregion


    }
}
