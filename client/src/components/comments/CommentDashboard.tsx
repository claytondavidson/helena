import React, { Fragment, useContext, useEffect, useState } from "react";
import { RootStoreContext } from "../../common/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import { observer } from "mobx-react-lite";
import CommentList from "./CommentList";

interface IProps {
  post_id: string;
}

const CommentDashboard: React.FC<IProps> = ({ post_id }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadComments,
    setPage,
    page,
    totalPages,
    clearComments,
  } = rootStore.commentStore;
  const { clearPosts } = rootStore.postStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadComments(post_id).then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadComments(post_id).catch(console.error);
    return () => {
      clearComments().catch(console.error);
      clearPosts().catch(console.error);
    };
  }, [loadComments, post_id, clearComments, clearPosts]);

  return (
    <Fragment>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleGetNext}
        hasMore={!loadingNext && page + 1 < totalPages}
        initialLoad={false}
      >
        <CommentList />
      </InfiniteScroll>
    </Fragment>
  );
};

export default observer(CommentDashboard);
