import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Blank, Login, NotFound } from '../../pages'
import { PrivateRoute } from '../index'
import { UserProfileContext } from 'context/user-profile'

interface AppRoutesProps {
  loginErrMessage: string
  handleOnLogin: (userName: string, token: string) => void
  removeRegisteredUser: (name: string) => void
  registeredUsers: string[]
}

const Profile = React.lazy(() => import('../../pages/Profile'))

const AppRoutes: React.FC<AppRoutesProps> = ({
  removeRegisteredUser,
  registeredUsers,
  handleOnLogin,
  loginErrMessage,
}) => {
  const { userProfile } = React.useContext(UserProfileContext)

  return (
    <Routes>
      <Route path="/" element={<Blank />} />
      <Route
        path="login"
        element={
          <PrivateRoute condition={!userProfile} redirect="/profile">
            <Login
              errorMessage={loginErrMessage}
              onLogin={handleOnLogin}
              removeRegisteredUser={removeRegisteredUser}
              registeredUsers={registeredUsers}
            />
          </PrivateRoute>
        }
      />
      <Route
        path="profile"
        element={
          <PrivateRoute condition={!!userProfile} redirect="/login">
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
