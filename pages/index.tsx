import type { NextPage } from 'next';
import { Header } from './components/Header';
import { List } from './components/List';
import { Map } from './components/Map';
import { PlaceDetails } from './components/PlaceDetails';

const Home: NextPage = () => {
	return (
		<div>
			<Header />
			<List />
			<Map />
			<PlaceDetails />
		</div>
	);
};

export default Home;
