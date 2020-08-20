using System;
using System.Collections.Generic;

namespace Domain
{
    public class Group
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime DateCreated { get; set; }
        public Photo CoverPhoto { get; set; }
        public ICollection<GroupMember> GroupMembers { get; set; }
        public ICollection<Post> Posts { get; set; }
        public ICollection<Activity> Activities { get; set; }
    }
}