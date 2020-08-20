import React, { Fragment } from "react";
import { Segment, Header, Image } from "semantic-ui-react";
import { IGroup } from "../../../common/models/group";

const GroupDetailsHeader: React.FC<{ group: IGroup }> = ({ group }) => {
  return (
    <Fragment>
        <Image src={group.coverPhoto} rounded />
        <Segment basic style={{background: "#1A1A1B"}}>
            <Header
              content={group.title}
              as={"h1"}
              size={"huge"}
              style={{color: "hsl(204,7%,85%)"}}
            />
        </Segment>
    </Fragment>
  );
};

export default GroupDetailsHeader;
