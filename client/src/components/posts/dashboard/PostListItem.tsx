import React, { Fragment } from "react";
import { Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IPost } from "../../../common/models/post";
import { observer } from "mobx-react-lite";

const PostListItem: React.FC<{ post: IPost }> = ({ post }) => {
  return (
    <Fragment>
      <Segment.Group>
        <Segment>
          <Item.Content style={{ color: "black" }}>
            Posted by{" "}
            <Link to={`/profile/${post.username}/`}>{post.displayName}</Link>
            <Item.Header to={`/groups/${post.id}`}>{post.title}</Item.Header>
            <Item.Description>{post.body}</Item.Description>
            <Item.Extra as={Link} to={`/posts/${post.id}`}>
              {post.comments.length} Comments
            </Item.Extra>
          </Item.Content>
        </Segment>
      </Segment.Group>
    </Fragment>
  );
};

export default observer(PostListItem);
