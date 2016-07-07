using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(UniversalTunesWeb.Startup))]
namespace UniversalTunesWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
