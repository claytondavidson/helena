using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Reply
    {
        public class Command : IRequest<CommentDto>
        {
            public Guid Id { get; set; }
            public string Body { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var comment = await _context.Comments
                    .Include(c => c.Post)
                    .Include(c => c.Children)
                    .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

                var user = await _context.Users
                    .Include(u => u.UserPhotos)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);

                var post = comment.Post;

                var newComment = new Comment
                {
                    Body = request.Body,
                    Author = user,
                    CreatedAt = DateTime.Now,
                    ParentId = comment.Id,
                    Post = post
                };

                comment.Children.Add(newComment);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return _mapper.Map<CommentDto>(newComment);

                throw new Exception("Problem saving reply changes");
            }
        }
    }
}