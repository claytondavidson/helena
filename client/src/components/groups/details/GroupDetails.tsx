import React, { useContext, useEffect, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../../common/stores/rootStore";
import { Grid, Segment, Form, TextArea } from "semantic-ui-react";
import GroupDetailsHeader from "./GroupDetailsHeader";
import GroupDetailsSidebar from "./GroupDetailsSidebar";
import PostDashboard from "../../posts/dashboard/PostDashboard";
import GroupFiltering from "./GroupFiltering";
import { createMedia } from "@artsy/fresnel";

interface DetailParams {
  id: string;
}

const GroupDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { group, loadGroup, clearGroup } = rootStore.groupStore;

  const AppMedia = createMedia({
    breakpoints: {
      computer: 960,
    },
  });

  const mediaStyles = AppMedia.createMediaStyle();
  const { Media, MediaContextProvider } = AppMedia;

  useEffect(() => {
    loadGroup(match.params.id).catch(console.error);
    return () => {
      clearGroup();
    };
  }, [loadGroup, match.params.id, clearGroup]);

  if (group == null) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <style>{mediaStyles}</style>
      <MediaContextProvider>
        <GroupDetailsHeader group={group} />
        <Grid>
          <Grid.Column computer={13} mobile={16}>
            <Segment
                style={{
                  backgroundColor: "#1A1A1B",
                  border: "1px solid #383838",
                }}
            >
              <Form>
                <TextArea
                    rows={1}
                    placeholder="Create post"
                    style={{ backgroundColor: "#272729" }}
                />
              </Form>
            </Segment>
            <Segment
                clearing
                style={{
                  backgroundColor: "#1A1A1B",
                  border: "1px solid #383838",
                }}
            >
              <GroupFiltering />
            </Segment>
            <PostDashboard group_id={match.params.id} />
          </Grid.Column>
          <Grid.Column as={Media} width={3} greaterThanOrEqual="computer">
            <GroupDetailsSidebar group={group} />
          </Grid.Column>
        </Grid>
      </MediaContextProvider>
    </Fragment>
  );
};

export default observer(GroupDetails);
