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
    public class IsGroupOwner : IAuthorizationRequirement
    {
    }

    public class IsGroupOwnerHandler : AuthorizationHandler<IsGroupOwner>
    {
        private readonly DataContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsGroupOwnerHandler(IHttpContextAccessor httpContextAccessor, DataContext dataContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _context = dataContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsGroupOwner requirement)
        {
            var currentUserName = _httpContextAccessor.HttpContext.User?.Claims
                .SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            var groupId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value.ToString()!);

            var group = _context.Groups.Include(g => g.GroupMembers)
                .ThenInclude(gm => gm.AppUser)
                .FirstOrDefaultAsync(g => g.Id == groupId)
                .Result;

            var owner = group?.GroupMembers?.FirstOrDefault(x => x.IsOwner);

            if (owner?.AppUser?.UserName == currentUserName) context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}