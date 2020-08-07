using System;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CommentsController : BaseController
    {
        [HttpGet("{id}/comments")]
        public async Task<ActionResult<List.CommentsEnvelope>> List(int? limit, int? offset, Guid id)
        {
            return await Mediator.Send(new List.Query(limit, offset) {Id = id});
        }

        [HttpPost("{id}/comment")]
        public async Task<ActionResult<Unit>> Create(Create.Command command, Guid id)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpPost("{id}/reply")]
        public async Task<ActionResult<Unit>> Reply(Reply.Command command, Guid id)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
    }
}