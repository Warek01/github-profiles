import UserProfile from '../User/UserProfile'

export default interface UserContextProps {
	/** Inside private routes profile is NOT null */
	profile?: UserProfile
	setProfile: (value: (((val: (UserProfile | undefined)) =>
			(UserProfile | undefined))
		| UserProfile
		| undefined)) => void
}
