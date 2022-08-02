import React from 'react'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
	condition: boolean
	children: JSX.Element
	redirect?: string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ condition, children, redirect = '/' }) => {
	return (
		condition
			? children
			: <Navigate to={ redirect } />
	)
}

export default PrivateRoute
