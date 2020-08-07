import React, { useContext, Fragment } from "react";
import { Container, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../common/stores/rootStore";
import LoginForm from "../authorization/LoginForm";

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  return (
    <Container style={{ marginTop: "7em" }}>
      {isLoggedIn && user ? (
        <Fragment>
          <Header as={"h2"} inverted content={"Helena"} />
          <Header as={"h3"} inverted content={"Escape reality"} />
          <Button as={Link} to={"/groups"} size={"huge"} inverted>
            Home
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <Header as={"h2"} inverted content={"Helena"} />
          <Header as={"h3"} inverted content={"Escape reality"} />
          <Button
            onClick={() => openModal(<LoginForm />, "mini")}
            size={"huge"}
            inverted
          >
            Login
          </Button>
          <Button as={Link} to={"/register"} size={"huge"} inverted>
            Register
          </Button>
        </Fragment>
      )}
    </Container>
  );
};

export default HomePage;
