using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using Application.Activities;
using Application.Posts;

namespace Application.Groups
{
    public class GroupDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime DateCreated { get; set; }
        public string CoverPhoto { get; set; }

        [JsonPropertyName("members")] public ICollection<MemberDto> GroupMembers { get; set; }

        public ICollection<PostDto> Posts { get; set; }

        [JsonPropertyName("events")] public ICollection<ActivityDto> Activities { get; set; }
    }
}