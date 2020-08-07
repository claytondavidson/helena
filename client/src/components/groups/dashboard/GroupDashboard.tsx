import React, { useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../../common/stores/rootStore";
import { observer } from "mobx-react-lite";
import { Grid, Loader } from "semantic-ui-react";
import GroupList from "./GroupList";
import InfiniteScroll from "react-infinite-scroller";

const GroupDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadGroups, setPage, page, totalPages } = rootStore.groupStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadGroups().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadGroups().catch(console.error);
  }, [loadGroups, rootStore]);

  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <GroupList />
          </InfiniteScroll>
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loadingNext} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default observer(GroupDashboard);
