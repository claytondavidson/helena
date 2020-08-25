import React, { useContext } from "react";
import {
  Menu,
  Container,
  Dropdown,
  Image,
  Input,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../common/stores/rootStore";
import { NavLink, Link } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <Menu fixed={"top"} inverted>
      <Container fluid style={{padding: "0 2em 0 2em"}}>
        <Menu.Item header as={NavLink} exact to={"/"}>
          <img
            src={"/assets/logo.png"}
            alt={"logo"}
            style={{ marginRight: "10px" }}
          />
          Helena
        </Menu.Item>
        <Menu.Item name={"groups"} as={NavLink} to={"/groups"} />
        <Menu.Item name="events" as={NavLink} to={"/activities"} />
        <Menu.Item position="right">
          <Input
            action={{ type: "submit", content: "Go" }}
            placeholder="Navigate to..."
          />
        </Menu.Item>
        {user && (
          <Menu.Item position={"right"}>
            <Image avatar spaced={"right"} src={user.image || null} />
            <Dropdown pointing={"top left"} text={`${user.displayName}`}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.username}`}
                  text={"My profile"}
                  icon={"user"}
                />
                <Dropdown.Item
                  as={Link}
                  to={`profile/${user.username}/mail`}
                  text={"Messages"}
                  icon={"mail"}
                />
                <Dropdown.Item
                  onClick={logout}
                  text={"Logout"}
                  icon={"power"}
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavigationBar);
