import React, { useContext, Fragment } from "react";
import { RootStoreContext } from "../../../common/stores/rootStore";
import { Segment, Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PostListItem from "./PostListItem";

const PostList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { posts } = rootStore.postStore;
  return (
    <Fragment>
      {posts.map((post) => (
        <Fragment key={post.id}>
          <Segment clearing>
            <Item>
              <PostListItem key={post.id} post={post} />
            </Item>
          </Segment>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(PostList);
