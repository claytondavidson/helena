using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Comments
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Body { get; set; }
            public DateTime? Date { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var comment = await _context.Comments.FindAsync(request.Id);

                if (comment == null) throw new RestException(HttpStatusCode.NotFound, new {Comment = "Not found"});

                comment.Body = request.Body ?? comment.Body;

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving comment changes");
            }
        }
    }
}