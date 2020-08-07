import React, { useContext } from 'react'
import { RouteProps, RouteComponentProps, Redirect, Route } from 'react-router-dom';
import { RootStoreContext } from '../stores/rootStore'
import { observer } from 'mobx-react-lite'

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>
}

const PrivateRoute: React.FC<IProps> = ({component: Component, ...props}) => {
  const rootStore = useContext(RootStoreContext);
  const {isLoggedIn} = rootStore.userStore;
  return (
    <Route {...props} render={(props) => isLoggedIn ? <Component {...props} /> : <Redirect to={'/'} />} />
  )
}

export default observer(PrivateRoute);