import React, { Fragment } from "react";
import { Button, Icon } from "semantic-ui-react";

const GroupFiltering = () => {
  return (
    <Fragment>
      <Button secondary style={{color: "hsl(204,7%,85%)"}}>
        <Icon name="rocket" />
        Best
      </Button>
        <Button secondary style={{color: "hsl(204,7%,85%)"}}>
        <Icon name="fire" />
        Hot
      </Button>
      <Button secondary style={{color: "hsl(204,7%,85%)"}}>
        <Icon name="certificate" />
        New
      </Button>
      <Button secondary style={{color: "hsl(204,7%,85%)"}}>
        <Icon name="chart bar" />
        Top
      </Button>
      <Button secondary style={{color: "hsl(204,7%,85%)"}}>
        <Icon name="chart line" />
        Rising
      </Button>
    </Fragment>
  );
};

export default GroupFiltering;
