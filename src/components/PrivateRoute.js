import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useAuth0 } from 'components/auth/react-auth0-wrapper'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0()

  useEffect(() => {
    if (loading || isAuthenticated) {
      return
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path },
      })
    }
    fn()
  }, [loading, isAuthenticated, loginWithRedirect, path])

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null

  return <Route exact path={path} render={render} {...rest} />
}

export default PrivateRoute
