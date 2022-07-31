import * as React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Grid, Box, Button } from '@mui/material'
import { red } from '@mui/material/colors'

const NotFound: React.FC = () => {
	const location = useLocation()
	
	return (
		<Grid
			container
			display='flex'
			flexDirection='column'
			alignItems='center'
			sx={ { height: '92vh', textAlign: 'center' } }
		>
			<Grid item sx={ { color: 'primary.main', fontSize: '10rem', cursor: 'default', marginTop: '5%' } }>
				404
			</Grid>
			<Grid>
				Location
				<Box component='span' sx={ { color: red[500], margin: '0 1ch' } }>{ location.pathname.slice(1) }</Box>
				not found.
			</Grid>
			<Grid item sx={ { marginTop: '20px' } }>
				<Link to='/'>
					<Button variant='contained' size='small'>
						main page
					</Button>
				</Link>
			</Grid>
		</Grid>
	)
}

export default NotFound
