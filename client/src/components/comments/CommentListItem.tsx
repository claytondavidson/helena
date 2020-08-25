import React, { Fragment, useState } from "react";
import { observer } from "mobx-react-lite";
import { Comment, Icon } from "semantic-ui-react";
import { IComment } from "../../common/models/comment";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import ReplyToCommentBox from "./ReplyToCommentBox";

const CommentListItem: React.FC<{
  comment: IComment;
}> = ({ comment }) => {
  const [openReplyBox, setOpenReplyBox] = useState(false);

  const nestedComments = (comment.children || []).map((comment) => {
      return <CommentListItem key={comment.id} comment={comment}/>;
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
            <div>
              {formatDistance(new Date(comment.createdAt), new Date())} ago
            </div>
          </Comment.Metadata>
          <Comment.Text>{comment.body}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={() => setOpenReplyBox(!openReplyBox)}>
              Reply
            </Comment.Action>
            <Comment.Action>
              <Icon name={"ellipsis horizontal"} />
            </Comment.Action>
          </Comment.Actions>
          {openReplyBox ? <ReplyToCommentBox comm={comment} /> : <Fragment />}
        </Comment.Content>
        {nestedComments}
      </Comment>
    </Fragment>
  );
};

export default observer(CommentListItem);
