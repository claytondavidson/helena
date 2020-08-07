import React, { Fragment, useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../../common/stores/rootStore";
import PostDetailsHeader from "./PostDetailsHeader";
import CommentDashboard from "../../comments/CommentDashboard";
import { observer } from "mobx-react-lite";
import CommentReplyBox from "../../comments/CommentReplyBox";

interface DetailParams {
  id: string;
}

const PostDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { post, loadPost } = rootStore.postStore;

  useEffect(() => {
    loadPost(match.params.id).catch(console.error);
  }, [loadPost, match.params.id]);

  if (post == null) {
    return <Fragment></Fragment>;
  }

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={11}>
          <PostDetailsHeader post={post} />
          <CommentReplyBox post={post} />
          <CommentDashboard post_id={match.params.id} />
        </Grid.Column>
        <Grid.Column width={6}></Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(PostDetails);
