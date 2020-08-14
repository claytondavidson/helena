using System;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CommentsController : BaseController
    {
        [HttpGet("{id}/comments")]
        public async Task<ActionResult<List.CommentsEnvelope>> List(int? limit, int? offset, string sort, Guid id)
        {
            return await Mediator.Send(new List.Query(limit, offset, sort) {Id = id});
        }

        [HttpPost("{id}/comment")]
        public async Task<ActionResult<CommentDto>> Create(Create.Command command, Guid id)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpPost("{id}/reply")]
        public async Task<ActionResult<CommentDto>> Reply(Reply.Command command, Guid id)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
        
        [HttpPut("{id}")]
        [Authorize(Policy = "IsCommentAuthor")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }
    }
}