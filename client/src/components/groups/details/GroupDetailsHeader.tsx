import React, { Fragment, useContext } from "react";
import { Segment, Header, Image, Button } from "semantic-ui-react";
import { IGroup } from "../../../common/models/group";
import { RootStoreContext } from "../../../common/stores/rootStore";

const GroupDetailsHeader: React.FC<{ group: IGroup }> = ({ group }) => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const filtered = () =>
    group.members.filter((m) => m.username === user!.username).length > 0;

  return (
    <Fragment>
      <Image src={group.coverPhoto} rounded />
      <Segment
        basic
        style={{backgroundColor: "#1A1A1B", border: "1px solid #383838"}}
      >
        <Header
          content={group.title}
          as={"h1"}
          size={"huge"}
          style={{
            color: "hsl(204,7%,85%)",
            marginRight: 20,
            marginTop: 10,
            display: "inline-block",
          }}
        />
        {filtered() ? (
          <Button style={{ position: "absolute", bottom: 25 }}>JOINED</Button>
        ) : (
          <Button style={{ position: "absolute", bottom: 25 }}>JOIN</Button>
        )}
      </Segment>
    </Fragment>
  );
};

export default GroupDetailsHeader;
