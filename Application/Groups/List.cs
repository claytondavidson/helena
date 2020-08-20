using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Groups
{
    public class List
    {
        public class GroupsEnvelope
        {
            public List<GroupDto> Groups { get; set; }
            public int GroupCount { get; set; }
        }

        public class Query : IRequest<GroupsEnvelope>
        {
            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;
            }

            public int? Limit { get; set; }
            public int? Offset { get; set; }
        }

        public class Handler : IRequestHandler<Query, GroupsEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<GroupsEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var groups = _context.Groups;

                return new GroupsEnvelope
                {
                    GroupCount = groups.Count(),
                    Groups = _mapper.Map<List<GroupDto>>(await groups
                        .Include(g => g.CoverPhoto)
                        .Include(g => g.GroupMembers)
                        .ThenInclude(g => g.AppUser)
                        .Skip(request.Offset ?? 0)
                        .Take(request.Limit ?? 3).ToListAsync(cancellationToken))
                };
            }
        }
    }
}