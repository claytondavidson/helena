import React, { useContext, Fragment } from "react";
import { Segment, Item, Header, Comment, Container, Divider, Dropdown } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../common/stores/rootStore";
import "../../common/layouts/style.css";
import CommentListItem from "./CommentListItem";

const CommentList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { comments } = rootStore.commentStore;

  return (
    <Fragment>
      <Segment clearing>
          <Header as="h3" content={"Comments"} style={{display: "inline"}}/>
          <Dropdown text={"SORT BY"} style={{display: "inline", float: "right", marginTop: 3, fontSize: 12}}>
            <Dropdown.Menu>
                <Dropdown.Item text={"Newest"} />
                <Dropdown.Item text={"Oldest"} />
            </Dropdown.Menu>
          </Dropdown>
        <Divider />
        <Item>
          <Comment.Group>
            {comments.map((comment) => {
              return <CommentListItem key={comment.id} comment={comment} />;
            })}
          </Comment.Group>
        </Item>
      </Segment>
    </Fragment>
  );
};

export default observer(CommentList);
