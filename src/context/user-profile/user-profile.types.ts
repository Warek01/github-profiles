import React from 'react'
import UserProfile from '../../types/User/UserProfile'

export default interface UserContextProps {
  userProfile: UserProfile | undefined
  setUserProfile: (value: UserProfile | ((val: UserProfile | undefined) => UserProfile | undefined) | undefined) => void
}
