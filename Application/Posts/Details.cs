using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Posts
{
    public class Details
    {
        public class Query : IRequest<PostDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, PostDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<PostDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var post = await _context.Posts.Where(x => x.Id == request.Id).FirstOrDefaultAsync(cancellationToken);

                if (post == null) throw new RestException(HttpStatusCode.NotFound, new {post = "Not found"});

                return _mapper.Map<PostDto>(post);
            }
        }
    }
}