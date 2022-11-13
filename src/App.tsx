import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Snackbar } from '@mui/material'

import { Header, LoadingScreen, FallbackOnError, AppRoutes } from './components'
import { UserProfile } from './types'
import { useLocalStorage } from './hooks'
import { fetchUserProfile } from './utils'
import { UserProfileContext } from './context/user-profile'
import { SnackbarContext } from './context/snackbar'

const App: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { userProfile, setUserProfile } = React.useContext(UserProfileContext)
  const { showSnackbarThenHide, hideSnackbar, snackbarMessage } = React.useContext(SnackbarContext)

  const path = location.pathname

  const [loginUserName, setLoginUserName] = React.useState<string>('')
  const [oauthToken, setOauthToken] = React.useState<string>('')
  const [loginErrMessage, setLoginErrMessage] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [registeredUsers, setRegisteredUsers] = useLocalStorage<string[]>('registered-users', [])

  const saveRegisteredUsers = React.useCallback((logins: string[]) => setRegisteredUsers(logins), [])

  const addRegisteredUser = React.useCallback((login: string): void => {
    if (!login) return
    const users = registeredUsers
    if (users.find(user => user === login)) return
    saveRegisteredUsers([...users, login])
  }, [])

  const removeRegisteredUser = React.useCallback(
    (login: string) => saveRegisteredUsers(registeredUsers.filter(user => user !== login)),
    []
  )

  const handleOnLogin = React.useCallback((userName: string, token: string = ''): void => {
    setOauthToken(token)
    setLoginUserName(userName)
  }, [])

  const logOut = React.useCallback((): void => {
    setUserProfile(undefined)
    setLoginUserName('')
    setOauthToken('')
    hideSnackbar()
    navigate('/login')
  }, [])

  const updateUserProfile = React.useCallback((): void => {
    if (!userProfile) return

    setIsLoading(true)
    ;(async () => {
      const userData = (await fetchUserProfile(userProfile.login, userProfile.authToken)) as UserProfile

      setIsLoading(false)
      setUserProfile(userData)

      console.log('Profile updated,', userData.login)
    })()
  }, [userProfile])

  React.useEffect(() => {
    if (!loginUserName && path === '/') navigate('/login')
  }, [location])

  React.useEffect(() => {
    if (userProfile || !loginUserName) return
    ;(async () => {
      console.log(`Fetching ${loginUserName}`)
      setIsLoading(true)
      const userData = await fetchUserProfile(loginUserName, oauthToken)
      hideSnackbar()

      if (typeof userData === 'object') {
        setUserProfile(userData)
        setLoginErrMessage('')
      } else
        switch (userData) {
          case 401:
            setLoginErrMessage('Wrong OAuth token.')
            break
          case 403:
            setLoginErrMessage('Forbidden: Too many requests')
            break
          case 404:
            setLoginErrMessage(`User ${loginUserName} not found.`)
            break
          default:
            console.warn('Unknown error:', userData)

            setLoginUserName('')
            setOauthToken('')
        }

      setIsLoading(false)
    })()
  }, [loginUserName])

  React.useEffect(() => {
    if (userProfile && (path === '/' || path === '/login')) {
      addRegisteredUser(userProfile.login)
      navigate('/profile')
      showSnackbarThenHide(`Profile fetched in ${userProfile.elapsedMs} ms`)
    }
  }, [userProfile])

  return (
    <FallbackOnError fallbackComponent={<h1>Critical error happened</h1>}>
      <div id="app" className="w-screen h-screen">
        <Header logOut={logOut} loggedIn={!!userProfile} updateUserProfile={updateUserProfile} />
        <React.Suspense fallback={<LoadingScreen open={true} />}>
          <AppRoutes
            handleOnLogin={handleOnLogin}
            loginErrMessage={loginErrMessage}
            registeredUsers={registeredUsers}
            removeRegisteredUser={removeRegisteredUser}
          />
        </React.Suspense>
        <LoadingScreen open={isLoading} />
        <Snackbar message={snackbarMessage} open={!!snackbarMessage} />
      </div>
    </FallbackOnError>
  )
}

export default App
