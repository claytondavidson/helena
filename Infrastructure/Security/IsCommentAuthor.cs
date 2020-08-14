using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsCommentAuthor : IAuthorizationRequirement
    {
    }

    public class IsCommentAuthorHandler : AuthorizationHandler<IsCommentAuthor>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsCommentAuthorHandler(IHttpContextAccessor httpContextAccessor, DataContext dataContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = dataContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsCommentAuthor requirement)
        {
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims
                .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var commentId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value.ToString()!);

            var comment = _context.Comments.Include(c => c.Author)
                .FirstOrDefaultAsync(g => g.Id == commentId)
                .Result;

            if (comment?.Author.DisplayName.ToLower() == currentUserName) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}