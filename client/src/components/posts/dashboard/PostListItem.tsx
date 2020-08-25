import React, { Fragment } from "react";
import { Grid, Icon, Item, Segment } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { IPost } from "../../../common/models/post";
import { observer } from "mobx-react-lite";
import { formatDistance } from "date-fns";
import "./hoverstyles.css";

const PostListItem: React.FC<{ post: IPost }> = ({ post }) => {
  const history = useHistory();

  const pushToComments = () => {
    history.push(`/posts/${post.id}`);
  };

  post.votes = Math.ceil(Math.random() * 100);

  return (
    <Fragment>
      <Segment
        onClick={pushToComments}
        style={{
          backgroundColor: "#1A1A1B",
          color: "#C5C8CA",
          border: "1px solid black",
          display: "block",
          cursor: "pointer",
        }}
        className="post_item"
      >
        <Grid divided>
          <Grid.Row columns={3}>
            <Grid.Column width={1} style={{ position: "relative" }}>
              <Grid>
                <Grid.Column>
                  <Icon
                    link
                    name={"arrow up"}
                    style={{ position: "relative" }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Item.Content
                    content={post.votes}
                    style={{ position: "relative" }}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Icon
                    link
                    name={"arrow down"}
                    style={{ position: "relative" }}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
            <Grid.Column width={14}>
              <Item.Content>
                <Item.Header
                  to={`/groups/${post.id}`}
                  style={{ fontWeight: "bold" }}
                  content={post.title}
                />
                <div style={{ color: "#727475", fontSize: ".85em" }}>
                  Posted by{" "}
                  <Link to={`/profile/${post.username}/`}>
                    {post.displayName}
                  </Link>{" "}
                  {formatDistance(new Date(post.createdAt), new Date())} ago
                </div>
              </Item.Content>
            </Grid.Column>
            <Grid.Column width={1}>
              <Grid>
                <Grid.Column>
                  <Icon float="right" name="comments" />
                </Grid.Column>
                <Grid.Column>
                  <div>{post.comments.length}</div>
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
  );
};

export default observer(PostListItem);
