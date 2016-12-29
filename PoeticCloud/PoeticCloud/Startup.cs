using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PoeticCloud.Startup))]
namespace PoeticCloud
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
