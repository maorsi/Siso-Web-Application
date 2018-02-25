using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using SisoWebApplication.Repository;
using SisoWebApplication.Services;

namespace SisoWebApplication
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<UserContext>(opt => opt.UseInMemoryDatabase("Siso"));
            services.AddMvc(options =>
            {
                options.OutputFormatters.Add(new XmlSerializerOutputFormatter());
            });
            services.AddScoped<IUserServices, UserServices>();
            services.AddScoped<ITaskServices, TaskServices>();
            services.AddScoped<IScoreGameServices, ScoreGameServices>();
          
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            loggerFactory.AddNLog();
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                //        routes.MapSpaFallbackRoute(
                //            name: "spa-fallback",
                //             defaults: new { controller = "Home", action = "Index" });
                routes.MapRoute(
                     name: "spa-fallback",
                     template: "{*url}",
                     defaults: new { controller = "Home", action = "Index" });
            });


            AutoMapper.Mapper.Initialize(cfg =>
            {
                

                cfg.CreateMap<Models.UserForCreationDto, Entities.User>();
                cfg.CreateMap<Models.TaskForCreationDto, Entities.Task>();
                cfg.CreateMap<Models.ScoreForCreationDTO, Entities.GameScore>();
                cfg.CreateMap<Entities.GameScore, Models.ScoreForCreationDTO>();
            });
        }
    }
}
