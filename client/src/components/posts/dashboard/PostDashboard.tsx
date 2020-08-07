import React, { useContext, useEffect, useState, Fragment } from "react";
import { RootStoreContext } from "../../../common/stores/rootStore";
import { observer } from "mobx-react-lite";
import PostList from "./PostList";
import InfiniteScroll from "react-infinite-scroller";

interface IProps {
  group_id: string;
}

const PostDashboard: React.FC<IProps> = ({ group_id }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadPosts,
    setPage,
    page,
    totalPages,
    clearPosts,
  } = rootStore.postStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadPosts(group_id).then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadPosts(group_id).catch(console.error);
    return () => {
      clearPosts().catch(console.error);
    };
  }, [loadPosts, group_id, clearPosts]);

  return (
    <Fragment>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleGetNext}
        hasMore={!loadingNext && page + 1 < totalPages}
        initialLoad={false}
      >
        <PostList />
      </InfiniteScroll>
    </Fragment>
  );
};

export default observer(PostDashboard);
