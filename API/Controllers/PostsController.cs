using System;
using System.Threading.Tasks;
using Application.Posts;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PostsController : BaseController
    {
        [HttpGet("{id}/posts")]
        public async Task<ActionResult<List.PostsEnvelope>> List(int? limit, int? offset, Guid id)
        {
            return await Mediator.Send(new List.Query(limit, offset) {Id = id});
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query {Id = id});
        }

        [HttpPost("{id}/post")]
        public async Task<ActionResult<Unit>> Create(Create.Command command, Guid id)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}/post")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command {Id = id});
        }
    }
}