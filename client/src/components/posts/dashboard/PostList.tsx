import React, {useContext, Fragment} from "react";
import { RootStoreContext } from "../../../common/stores/rootStore";
import { Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import PostListItem from "./PostListItem";
import PostPlaceholder from "./PostPlaceholder";

const PostList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { posts, initialLoading } = rootStore.postStore;

  return (
    <Fragment>
      {initialLoading ? (
        <PostPlaceholder />
      ) : (
        <Fragment>
          {posts.map((post) => (
            <Fragment key={post.id}>
              <Item>
                <PostListItem key={post.id} post={post} />
              </Item>
            </Fragment>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default observer(PostList);
