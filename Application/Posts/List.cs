using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class List
    {
        public class PostsEnvelope
        {
            public List<PostDto> Posts { get; set; }
            public int PostCount { get; set; }
        }

        public class Query : IRequest<PostsEnvelope>
        {
            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;
            }

            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, PostsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<PostsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var posts = _context.Posts;

                return new PostsEnvelope
                {
                    PostCount = posts.Count(),
                    Posts = _mapper.Map<List<PostDto>>(await posts
                        .Include(p => p.Author)
                        .Include(p => p.Comments)
                        .Where(p => p.Group.Id == request.Id)
                        .Skip(request.Offset ?? 0)
                        .Take(request.Limit ?? 3)
                        .ToListAsync(cancellationToken))
                };
            }
        }
    }
}