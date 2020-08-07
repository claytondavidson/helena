using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Clayton",
                        UserName = "clayton",
                        Email = "clayton.davidson847@topper.wku.edu"
                    },
                    new AppUser
                    {
                        DisplayName = "Glaivan",
                        UserName = "glaivan",
                        Email = "glaivan@helena.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Ragefire",
                        UserName = "ragefire",
                        Email = "ragefire@helena.com"
                    }
                };
                foreach (var user in users) await userManager.CreateAsync(user, "Pa$$w0rd");
            }

            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Event 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Event 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Venue = "Pub"
                    },
                    new Activity
                    {
                        Title = "Past Event 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Event 1 month ago",
                        Category = "culture",
                        City = "Paris",
                        Venue = "Louvre"
                    },
                    new Activity
                    {
                        Title = "Future Event 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Event 1 month in future",
                        Category = "culture",
                        City = "London",
                        Venue = "Natural History Museum"
                    },
                    new Activity
                    {
                        Title = "Future Event 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Event 2 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "O2 Arena"
                    },
                    new Activity
                    {
                        Title = "Future Event 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Event 3 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Another pub"
                    },
                    new Activity
                    {
                        Title = "Future Event 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Event 4 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Yet another pub"
                    },
                    new Activity
                    {
                        Title = "Future Event 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Event 5 months in future",
                        Category = "drinks",
                        City = "London",
                        Venue = "Just another pub"
                    },
                    new Activity
                    {
                        Title = "Future Event 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Event 6 months in future",
                        Category = "music",
                        City = "London",
                        Venue = "Roundhouse Camden"
                    },
                    new Activity
                    {
                        Title = "Future Event 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Event 2 months ago",
                        Category = "travel",
                        City = "London",
                        Venue = "Somewhere on the Thames"
                    },
                    new Activity
                    {
                        Title = "Future Event 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Event 8 months in future",
                        Category = "film",
                        City = "London",
                        Venue = "Cinema"
                    }
                };

                context.Activities.AddRange(activities);
                context.SaveChanges();
            }

            if (!context.Groups.Any())
            {
                var groups = new List<Group>
                {
                    new Group
                    {
                        Title = "World News",
                        DateCreated = DateTime.Now,
                        Description = "A group dedicated to world news",
                        Category = "news",
                        CoverPhoto = null
                    },
                    new Group
                    {
                        Title = "Politics",
                        DateCreated = DateTime.Now,
                        Description = "A group dedicated to politics",
                        Category = "politics",
                        CoverPhoto = null
                    }
                };

                context.Groups.AddRange(groups);
                context.SaveChanges();
            }
        }
    }
}