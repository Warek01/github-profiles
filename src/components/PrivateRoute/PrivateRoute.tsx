import * as React from 'react'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
	condition: boolean,
	redirect: string,
	children: JSX.Element
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ condition, children, redirect = '/' }) => {
	return condition ? children : <Navigate to={ redirect } />
}

export default PrivateRoute
