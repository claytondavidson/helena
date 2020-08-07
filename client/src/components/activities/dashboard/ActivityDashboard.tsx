import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityList from "./ActivityList";
import { RootStoreContext } from "../../../common/stores/rootStore";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivities, initialLoading } = rootStore.activityStore;

  useEffect(() => {
    loadActivities().catch(console.error);
  }, [loadActivities, rootStore]);

  return (
    <Grid>
      <Grid.Column width={10}>
        {initialLoading ? <ActivityListItemPlaceholder /> : <ActivityList />}
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
