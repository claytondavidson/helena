import React, { useContext, Fragment } from "react";
import {
  Segment,
  Item,
  Header,
  Comment,
  Divider,
  Dropdown,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../common/stores/rootStore";
import "../../common/layouts/style.css";
import CommentListItem from "./CommentListItem";

const CommentList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { comments, setSortType } = rootStore.commentStore;

  return (
    <Fragment>
      <Segment clearing>
        <Header as="h3" content={"Comments"} style={{ display: "inline" }} />
        <Dropdown
          text={"SORT BY"}
          style={{
            display: "inline",
            float: "right",
            marginTop: 3,
            fontSize: 12,
          }}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              text={"Newest"}
              onClick={() => setSortType("newest")}
            />
            <Dropdown.Item
              text={"Oldest"}
              onClick={() => setSortType("oldest")}
            />
          </Dropdown.Menu>
        </Dropdown>
        <Divider />
        <Item>
          <Comment.Group>
            {/* eslint-disable-next-line array-callback-return */}
            {comments.map((comment) => {
              if (comment.parentId === "00000000-0000-0000-0000-000000000000")
                return <CommentListItem key={comment.id} comment={comment}/>;
            })}
          </Comment.Group>
        </Item>
      </Segment>
    </Fragment>
  );
};

export default observer(CommentList);
