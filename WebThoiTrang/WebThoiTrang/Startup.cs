using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebThoiTrang.Startup))]
namespace WebThoiTrang
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
