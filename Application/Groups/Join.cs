using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Groups
{
    public class Join
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var group = await _context.Groups.FindAsync(request.Id);

                if (group == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {Group = "Could not find group"});

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);

                var membership =
                    await _context.GroupMembers.SingleOrDefaultAsync(x =>
                        x.GroupId == group.Id && x.AppUserId == user.Id, cancellationToken);

                if (membership != null)
                    throw new RestException(HttpStatusCode.BadRequest,
                        new {Membership = "Already a member of this group"});

                membership = new GroupMember
                {
                    Group = group,
                    AppUser = user,
                    IsOwner = false,
                    DateJoined = DateTime.Now
                };

                await _context.GroupMembers.AddAsync(membership, cancellationToken);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}