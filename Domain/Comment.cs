using System;
using System.Collections.Generic;

namespace Domain
{
    public class Comment
    {
        public Guid Id { get; set; }
        public Guid? ParentId { get; set; }
        public string Body { get; set; }
        public AppUser Author { get; set; }
        public Post Post { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<Comment> Children { get; set; }
    }
}