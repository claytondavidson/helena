using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ActivityComments
{
    public class Create
    {
        public class Command : IRequest<ActivityCommentDto>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, ActivityCommentDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ActivityCommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.Include(a => a.ActivityComments)
                    .FirstOrDefaultAsync(a => a.Id == request.ActivityId, cancellationToken);

                if (activity == null) throw new RestException(HttpStatusCode.NotFound, new {Activity = "Not found"});

                var user = await _context.Users.Include(u => u.UserPhotos).FirstOrDefaultAsync(
                    x => x.UserName == request.Username,
                    cancellationToken);

                var activityComment = new ActivityComment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                activity.ActivityComments.Add(activityComment);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return _mapper.Map<ActivityCommentDto>(activityComment);

                throw new Exception("Problem saving activity changes");
            }
        }
    }
}