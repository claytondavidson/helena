using System;
using System.Collections.Generic;
using Application.Comments;

namespace Application.Posts
{
    public class PostDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
        public ICollection<CommentDto> Comments { get; set; }
    }
}