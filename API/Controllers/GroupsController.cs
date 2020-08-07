using System;
using System.Threading.Tasks;
using Application.Groups;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class GroupsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List.GroupsEnvelope>> List(int? limit, int? offset)
        {
            return await Mediator.Send(new List.Query(limit, offset));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GroupDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query {Id = id});
        }

        [HttpPost("{id}/join")]
        public async Task<ActionResult<Unit>> Attend(Guid id)
        {
            return await Mediator.Send(new Join.Command {Id = id});
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsGroupOwner")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsGroupOwner")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command {Id = id});
        }
    }
}