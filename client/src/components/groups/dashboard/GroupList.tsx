import React, { useContext, Fragment } from 'react'
import { RootStoreContext } from '../../../common/stores/rootStore'
import { Segment, Item } from 'semantic-ui-react'
import GroupListItem from './GroupListItem'
import { observer } from 'mobx-react-lite'

const GroupList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { groupsByDate } = rootStore.groupStore;
  return (
    <Fragment>
      {groupsByDate.map(([group, groups]) => (
        <Fragment key={group}>
          <Segment clearing>
            <Item>
              {groups.map((group) => (
                <GroupListItem key={group.id} group={group} />
              ))}
            </Item>
          </Segment>
        </Fragment>
      ))}
    </Fragment>
  )
}

export default observer(GroupList);