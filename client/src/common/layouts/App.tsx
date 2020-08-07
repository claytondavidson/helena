import React, { Fragment, useContext, useEffect } from "react";
import NavigationBar from "../../components/navigation/NavigationBar";
import ActivityDashboard from "../../components/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../components/activities/form/ActivityForm";
import ActivityDetails from "../../components/activities/details/ActivityDetails";
import HomePage from "../../components/home/HomePage";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import NotFound from "../layouts/NotFound";
import { ToastContainer } from "react-toastify";
import { Route, Switch, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import LoginForm from "../../components/authorization/LoginForm";
import { RootStoreContext } from "../stores/rootStore";
import Loading from "../../common/layouts/Loading";
import ModalContainer from "../modals/ModalContainer";
import PrivateRoute from "./PrivateRoute";
import GroupDashboard from "../../components/groups/dashboard/GroupDashboard";
import GroupDetails from "../../components/groups/details/GroupDetails";
import ProfilePage from "../../components/profiles/ProfilePage";
import PostDetails from "../../components/posts/details/PostDetails";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [token, getUser, setAppLoaded]);

  if (!appLoaded) return <Loading />;

  return (
    <Fragment>
      <ModalContainer />
      <Route exact path={"/"} component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <ToastContainer position={"bottom-right"} />
            <NavigationBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path={"/groups"}
                  component={GroupDashboard}
                />
                <PrivateRoute path={"/groups/:id"} component={GroupDetails} />
                <PrivateRoute path={"/posts/:id"} component={PostDetails} />
                <PrivateRoute
                  exact
                  path={"/activities"}
                  component={ActivityDashboard}
                />
                <PrivateRoute
                  path={"/activities/:id"}
                  component={ActivityDetails}
                />
                <PrivateRoute
                  key={location.key}
                  path={["/create", "/manage/:id"]}
                  component={ActivityForm}
                />
                <PrivateRoute
                  path={"/profile/:username"}
                  component={ProfilePage}
                />
                <PrivateRoute path={"/login"} component={LoginForm} />
                <PrivateRoute component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
