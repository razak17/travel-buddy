import type { NextPage } from 'next';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import Header from '../components/Header';
import List from '../components/List';
import Map from '../components/Map';
import { getPlacesData } from '../lib/api';
import { BoundType, LatLngType, PlaceType, QueryKeys } from '../utility/types';
import { useQuery } from 'react-query';

const Home: NextPage = () => {
	const [type, setType] = useState('restaurants');
	const [coordinates, setCoordinates] = useState<LatLngType | null>(null);
	const [bounds, setBounds] = useState<BoundType>({
		ne: { lat: 12.838442, lng: 109.149359 },
		sw: { lat: 11.847676, lng: 109.095887 }
	});
	const [childClicked, setChildClicked] = useState('');

	const { sw, ne } = bounds;

	const { data: places } = useQuery([QueryKeys.PLACES_DATA], () => getPlacesData(type, sw, ne), {
		initialData: []
	});

	console.log(places);

	// Get User Location
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
			setCoordinates({ lat: latitude, lng: longitude });
		});
	}, []);

	return (
		<>
			<Header />
			<Grid container spacing={3} style={{ width: '100%' }}>
				<Grid item xs={12} md={4}>
					<List places={places as PlaceType[]} childClicked={childClicked} />
				</Grid>
				<Grid
					item
					xs={12}
					md={8}
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				>
					{/* <Map */}
					{/* 	setChildClicked={setChildClicked} */}
					{/* 	places={places} */}
					{/* 	coordinates={coordinates} */}
					{/* 	setCoordinates={setCoordinates} */}
					{/* 	setBounds={setBounds} */}
					{/* /> */}
				</Grid>
			</Grid>
		</>
	);
};

export default Home;
