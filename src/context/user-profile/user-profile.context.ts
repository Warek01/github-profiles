import React from 'react'

import UserContextProps from './user-profile.types'

const UserProfileContext = React.createContext<UserContextProps>({
  userProfile: undefined,
  setUserProfile: () => undefined,
})

export default UserProfileContext
