using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Photos.Users;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos.Users
{
    public class Add
    {
        public class Command : IRequest<UserPhoto>
        {
            [MaxFileSize(2 * 1024 * 1024)]
            [AllowedExtensions(new[] {".jpg", ".png", ".jpeg"})]
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, UserPhoto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
            }

            public async Task<UserPhoto> Handle(Command request, CancellationToken cancellationToken)
            {
                var photoUploadResult = _photoAccessor.AddPhoto(request.File);

                var user = await _context.Users
                    .Include(u => u.UserPhotos)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername(), cancellationToken);

                var photo = new UserPhoto
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (!user.UserPhotos.Any(x => x.IsMain)) photo.IsMain = true;

                user.UserPhotos.Add(photo);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (success) return photo;

                throw new Exception("Problem saving photo changes");
            }
        }
    }
}