#nullable enable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class List
    {
        public class CommentsEnvelope
        {
            public List<CommentDto> Comments { get; set; }
            public int CommentCount { get; set; }
        }

        public class Query : IRequest<CommentsEnvelope>
        {
            public Query(int? limit, int? offset, string? sort)
            {
                Limit = limit;
                Offset = offset;
                Sort = sort;
            }

            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public Guid Id { get; set; }
            public string? Sort { get; set; }
        }

        public class Handler : IRequestHandler<Query, CommentsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<CommentsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                IQueryable<Comment> comments = _context.Comments;
                comments = request.Sort switch
                {
                    "oldest" => comments.OrderBy(c => c.CreatedAt),
                    "newest" => comments.OrderByDescending(c => c.CreatedAt),
                    _ => comments
                };

                var commentsList = _mapper.Map<List<CommentDto>>(await comments
                    .Where(c => c.Post.Id == request.Id)
                    .Include(c => c.Author)
                    .ThenInclude(a => a.UserPhotos)
                    .Include(c => c.Children)
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 3)
                    .ToListAsync(cancellationToken)
                );

                return new CommentsEnvelope
                {
                    CommentCount = comments.Count(),
                    Comments = commentsList.Where(cl => cl.ParentId == Guid.Empty).ToList()
                };
            }
        }
    }
}