import type { NextPage } from 'next';
import { Header } from '../components/Header';
import { List } from '../components/List';
import { Map } from '../components/Map';
import { Grid } from '@mui/material';

const Home: NextPage = () => {
	return (
		<>
			<Header />
			<Grid container spacing={3} style={{ width: '100%' }}>
				<Grid item xs={12} md={4}>
					<List />
				</Grid>
				<Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Map />
				</Grid>
			</Grid>
		</>
	);
};

export default Home;
