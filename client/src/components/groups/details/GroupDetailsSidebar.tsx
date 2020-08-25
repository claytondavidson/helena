import React, { Fragment } from "react";
import {
  Header,
  Segment,
  Item,
  Button,
  Divider,
  Icon,
} from "semantic-ui-react";
import { IGroup } from "../../../common/models/group";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

const GroupDetailsSidebar: React.FC<{ group: IGroup }> = ({ group }) => {
  return (
    <Fragment>
      <Fragment>
        <Segment
          clearing
          style={{
            backgroundColor: "#1A1A1B",
            color: "hsl(204,7%,85%)",
            border: "1px solid #383838",
          }}
        >
          <Header
            content={"About"}
            size={"small"}
            style={{ color: "#818384" }}
          />
          <Item.Group>
            <Item style={{ fontSize: "1.05em" }} content={group.description} />
            <Item>
              {group.members.length === 1
                ? `${group.members.length} member`
                : `${group.members.length} members`}
            </Item>
            <Divider />
            <Item>
              <Icon name="birthday cake" />
              {`Created ${format(group.dateCreated, "MMM dd, yyyy")}`}
            </Item>
          </Item.Group>
          <Button fluid style={{ color: "#1A1A1B" }} content="CREATE POST" />
        </Segment>
        <Segment
          clearing
          style={{ backgroundColor: "#1A1A1B", border: "1px solid #383838" }}
        >
          <Header
            content={"Upcoming Events"}
            size={"small"}
            style={{ color: "#818384" }}
          />
          <Button
            fluid
            style={{ color: "#1A1A1B" }}
            content="CREATE AN EVENT"
          />
        </Segment>
      </Fragment>
      )
    </Fragment>
  );
};

export default observer(GroupDetailsSidebar);
