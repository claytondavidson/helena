import React, { Fragment } from "react";
import { Header, Segment, Item, Button } from "semantic-ui-react";
import { IGroup } from "../../../common/models/group";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

const GroupDetailsSidebar: React.FC<{ group: IGroup }> = ({ group }) => {
  return (
    <Fragment>
      <Segment clearing>
        <Header content={"About Group"} size={"small"} />
        <Item.Group>
          <Item>{group.description}</Item>
          <Item>
            {group.members.length === 1
              ? `${group.members.length} member`
              : `${group.members.length} members`}
          </Item>
          <Item>{`Created ${format(group.dateCreated, "MMM dd, yyyy")}`}</Item>
        </Item.Group>
        <Button fluid positive>
          Create Post
        </Button>
      </Segment>
      <Segment clearing>
        <Header content={"Upcoming Events"} size={"small"} />
        <Button fluid positive>
          Create an Event
        </Button>
      </Segment>
    </Fragment>
  );
};

export default observer(GroupDetailsSidebar);
