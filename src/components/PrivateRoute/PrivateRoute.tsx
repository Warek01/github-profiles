import * as React from 'react'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
	condition: boolean,
	navigateTo: string,
	children: JSX.Element
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ condition, children, navigateTo = '/' }) => {
	return condition ? children : <Navigate to={ navigateTo } />
}

export default PrivateRoute
