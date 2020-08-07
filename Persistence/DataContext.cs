using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<GroupMember> GroupMembers { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<ActivityComment> ActivityComments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserActivity>(x => x.HasKey(ua =>
                new {ua.AppUserId, ua.ActivityId}));

            builder.Entity<UserActivity>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.UserActivities)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserActivity>()
                .HasOne(a => a.Activity)
                .WithMany(u => u.UserActivities)
                .HasForeignKey(a => a.ActivityId);

            builder.Entity<GroupMember>(x => x.HasKey(gm =>
                new {gm.AppUserId, gm.GroupId}));

            builder.Entity<GroupMember>()
                .HasOne(u => u.AppUser)
                .WithMany(g => g.GroupMembers)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<GroupMember>()
                .HasOne(g => g.Group)
                .WithMany(u => u.GroupMembers)
                .HasForeignKey(g => g.GroupId);

            builder.Entity<Post>()
                .HasOne(g => g.Group)
                .WithMany(p => p.Posts)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Activity>()
                .HasOne(g => g.Group)
                .WithMany(a => a.Activities)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<AppUser>()
                .HasMany(p => p.Photos)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}