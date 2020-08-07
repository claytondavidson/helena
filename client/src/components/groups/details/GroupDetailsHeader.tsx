import React, { Fragment } from "react";
import { Segment, Header, Item } from "semantic-ui-react";
import { IGroup } from "../../../common/models/group";

const GroupDetailsHeader: React.FC<{ group: IGroup }> = ({ group }) => {
  return (
    <Fragment>
      <Segment.Group>
        <Segment basic inverted>
          <Item.Group>
            <Header
              content={group.title}
              as={"h1"}
              size={"huge"}
              inverted
            ></Header>
          </Item.Group>
        </Segment>
      </Segment.Group>
    </Fragment>
  );
};

export default GroupDetailsHeader;
