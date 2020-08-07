import React, { Fragment } from "react";
import { IGroup } from "../../../common/models/group";
import { Segment, Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const GroupListItem: React.FC<{ group: IGroup }> = ({ group }) => {
  return (
    <Fragment>
      <Segment.Group>
        <Segment>
          <Item.Content>
            <Item.Header as={Link} to={`/groups/${group.id}`}>
              {group.title}
            </Item.Header>
            <Item.Extra>
              {group.members.length === 1
                ? `${group.members.length} member`
                : `${group.members.length} members`}
            </Item.Extra>
            <Item.Description>{group.description}</Item.Description>
          </Item.Content>
        </Segment>
      </Segment.Group>
    </Fragment>
  );
};

export default observer(GroupListItem);
