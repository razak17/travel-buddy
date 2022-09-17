import type { NextPage } from 'next';
import { Header } from '../components/Header';
import { List } from '../components/List';
import { Map } from '../components/Map';
import { Grid } from '@mui/material';

import { useEffect, useState } from 'react';
import { getPlacesData } from '../lib/api';
import { BoundType, LatLngType, PlaceType } from '../utility/types';

const Home: NextPage = () => {
	const [type, setType] = useState('restaurants');
	const [places, setPlaces] = useState<PlaceType[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [coordinates, setCoordinates] = useState<LatLngType | null>(null);
	const [bounds, setBounds] = useState<BoundType | null>(null);
	const [childClicked, setChildClicked] = useState('');

	// Get User Location
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
			setCoordinates({ lat: latitude, lng: longitude });
		});
	}, []);

	useEffect(() => {
		if (bounds) {
			setIsLoading(true);

			getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
				setPlaces(data);
				setIsLoading(false);
			});
		}
	}, [bounds, coordinates, type]);

	return (
		<>
			<Header />
			<Grid container spacing={3} style={{ width: '100%' }}>
				<Grid item xs={12} md={4}>
					<List places={places} childClicked={childClicked} />
				</Grid>
				<Grid
					item
					xs={12}
					md={8}
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				>
					<Map
						setChildClicked={setChildClicked}
						places={places}
						coordinates={coordinates}
						setCoordinates={setCoordinates}
						setBounds={setBounds}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default Home;
