using System.Web;
using System.Web.Optimization;

namespace PoeticCloud
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                  "~/Scripts/angular.min.js",
                  "~/Scripts/angular-route.min.js",
                  "~/Scripts/app.js",
                  "~/Scripts/PoetryFactory.js",
                  "~/Scripts/UserCtrl.js",
                  "~/Scripts/SearchCtrl.js",
                  "~/Scripts/CreateCtrl.js"));

            bundles.Add(new ScriptBundle("~/bundles/semantic").Include(
                  "~/Scripts/semantic.js"));

            bundles.Add(new ScriptBundle("~/bundles/wordcloud").Include(
                  "~/wwwroot/lib/d3/d3.min.js",
                  "~/wwwroot/lib/d3-cloud/build/d3.layout.cloud.js",
                  "~/wwwroot/lib/angular-d3-word-cloud/dist/angular-word-cloud.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/main.css"));
        }
    }
}
