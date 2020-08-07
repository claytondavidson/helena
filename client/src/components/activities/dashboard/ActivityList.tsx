import React, { Fragment, useContext } from "react";
import { Item, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import {RootStoreContext} from "../../../common/stores/rootStore";

const ActivityList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { activitiesByDate } = rootStore.activityStore;
  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Segment clearing>
            <Item.Group divided>
              {activities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityList);
