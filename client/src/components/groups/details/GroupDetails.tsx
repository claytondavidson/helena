import React, { useContext, useEffect, Fragment } from "react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../../common/stores/rootStore";
import { Grid } from "semantic-ui-react";
import GroupDetailsHeader from "./GroupDetailsHeader";
import GroupDetailsSidebar from "./GroupDetailsSidebar";
import PostDashboard from "../../posts/dashboard/PostDashboard";

interface DetailParams {
  id: string;
}

const GroupDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { group, loadGroup } = rootStore.groupStore;

  useEffect(() => {
    loadGroup(match.params.id).catch(console.error);
  }, [loadGroup, match.params.id]);

  if (group == null) {
    return <Fragment/>
  }

  return (
    <Fragment>
      <GroupDetailsHeader group={group} />
      <Grid>
        <Grid.Column width={10}>
          <PostDashboard group_id={match.params.id} />
        </Grid.Column>
        <Grid.Column width={6}>
          <GroupDetailsSidebar group={group} />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(GroupDetails);
