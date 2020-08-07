using System;
using System.Collections.Generic;

namespace Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public AppUser Author { get; set; }
        public Group Group { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}