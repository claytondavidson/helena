import React, { Fragment } from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";

const options = [
  { menuItem: "About", render: () => <Tab.Pane>About content</Tab.Pane> },
  {
    menuItem: "Photos",
    render: () => (
      <Tab.Pane>
        <ProfilePhotos />
      </Tab.Pane>
    ),
  },
  { menuItem: "Events", render: () => <Tab.Pane>Events content</Tab.Pane> },
  {
    menuItem: "Followers",
    render: () => <Tab.Pane>Followers content</Tab.Pane>,
  },
  {
    menuItem: "Following",
    render: () => <Tab.Pane>Following content</Tab.Pane>,
  },
  { menuItem: "Posts", render: () => <Tab.Pane>Posts content</Tab.Pane> },
];

const ProfileContent = () => {
  return (
    <Fragment>
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition={"right"}
        panes={options}
      />
    </Fragment>
  );
};

export default ProfileContent;
