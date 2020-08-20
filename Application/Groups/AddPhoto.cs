using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Groups
{
    public class AddPhoto
    {
        public class Command : IRequest<Photo>
        {
            public Guid Id { get; set; }
            [MaxFileSize(2 * 1024 * 1024)]
            [AllowedExtensions(new[] {".jpg", ".png", ".jpeg"})]
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
            }

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var photoUploadResult = _photoAccessor.AddPhoto(request.File);

                var group = await _context.Groups.Where(x => x.Id == request.Id).FirstOrDefaultAsync(cancellationToken);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };
            
                group.CoverPhoto = photo;

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return photo;

                throw new Exception("Problem saving photo changes");
            }
        }   
    }
}