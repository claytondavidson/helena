import React from 'react';
import { Button, Header, Item, Segment } from 'semantic-ui-react'

const ActivityDetailsHeader = () => {
  return <div>
    <Segment.Group>
      <Segment basic attached={'top'} style={{padding: '0'}}>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header size={'huge'} content={'Title'} style={{color: 'white'}} />
                <p>Date</p>
                <p>
                  Hosted by <strong>Clayton</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached={'bottom'}>
        <Button color={'teal'}>Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button color={'orange'} floated={'right'}>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  </div>
}

export default ActivityDetailsHeader;