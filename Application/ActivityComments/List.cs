using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ActivityComments
{
    public class List
    {
        public class Query : IRequest<List<ActivityCommentDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<ActivityCommentDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<ActivityCommentDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activityComments = await _context.ActivityComments
                    .Where(x => x.Id == request.Id)
                    .ToListAsync(cancellationToken);

                if (activityComments == null)
                    throw new RestException(HttpStatusCode.NotFound, new {ActivityComments = "Not Found"});

                return _mapper.Map<List<ActivityCommentDto>>(activityComments);
            }
        }
    }
}