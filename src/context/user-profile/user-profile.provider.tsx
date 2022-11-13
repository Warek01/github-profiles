import React from 'react'

import UserProfileContext from './user-profile.context'
import UserContextProps from './user-profile.types'
import { UserProfile } from '../../types'
import { useLocalStorage } from '../../hooks'

const UserProfileProvider: React.FC<any> = ({ children }) => {
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile | undefined>('user-profile', undefined)

  const value: UserContextProps = {
    userProfile,
    setUserProfile,
  }

  return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>
}

export default React.memo(UserProfileProvider)
