import React, { Fragment } from "react";
import { Segment, Item } from "semantic-ui-react";
import { IPost } from "../../../common/models/post";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const PostDetailsHeader: React.FC<{ post: IPost }> = ({ post }) => {
  return (
    <Fragment>
      <Segment.Group>
        <Segment basic inverted>
          <Item.Group>
            <Link to={`/profile/${post.username}/`}>{post.displayName}</Link>
            <Item.Header to={`/groups/${post.id}`}>{post.title}</Item.Header>
            <Item.Description>{post.body}</Item.Description>
          </Item.Group>
        </Segment>
      </Segment.Group>
    </Fragment>
  );
};

export default observer(PostDetailsHeader);
