using System;

namespace Domain
{
    public class ActivityComment
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public AppUser Author { get; set; }
        public Activity Activity { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}