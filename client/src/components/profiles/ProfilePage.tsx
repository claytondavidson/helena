import React, { Fragment, useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { RootStoreContext } from "../../common/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import Loading from "../../common/layouts/Loading";
import { observer } from "mobx-react-lite";

interface RouteParams {
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadingProfile, profile, loadProfile } = rootStore.profileStore;

  useEffect(() => {
    loadProfile(match.params.username);
  }, [loadProfile, match]);

  if (loadingProfile) return <Loading />;

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={16}>
          <ProfileHeader profile={profile!} />
          <ProfileContent />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(ProfilePage);
