import * as React from 'react';
import { Grid, CircularProgress } from '@mui/material';

const Blank: React.FC = () => {
	return <Grid sx={ { height: '92vh' } } display={ 'flex' } alignItems={ 'center' } justifyContent={ 'center' }>
		<CircularProgress size={ 100 }/>
	</Grid>;
};

export default Blank;
