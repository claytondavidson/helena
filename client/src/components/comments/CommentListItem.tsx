import React, { Fragment, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Comment, Icon } from "semantic-ui-react";
import { IComment } from "../../common/models/comment";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../common/stores/rootStore";
import { formatDistance } from "date-fns";

const CommentListItem: React.FC<{
  comment: IComment;
}> = ({ comment }) => {
  const nestedComments = (comment.children || []).map((comment) => {
    return <CommentListItem key={comment.id} comment={comment} />;
  });

  return (
    <Fragment>
      <Comment style={{ marginLeft: "15px", marginTop: "10px" }}>
        <Comment.Avatar src={comment.image} />
        <Comment.Content>
          <Comment.Author as={Link} to={`/profile/${comment.username}`}>
            {comment.displayName}
          </Comment.Author>
          <Comment.Metadata>
            <div>{formatDistance(new Date(comment.createdAt), new Date())} ago</div>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
            <Comment.Action><Icon name={"ellipsis horizontal"}></Icon></Comment.Action>
          </Comment.Actions>
        </Comment.Content>
        {nestedComments}
      </Comment>
    </Fragment>
  );
};

export default observer(CommentListItem);
