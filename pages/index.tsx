import type { NextPage } from 'next';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import Header from '../components/Header';
import List from '../components/List';
import Map from '../components/Map';
import { getPlacesData } from '../lib/api';
import { BoundType, LatLngType, PlaceType, QueryKeys } from '../utility/types';

const Home: NextPage = () => {
	const [type, setType] = useState('restaurants');
	const [rating, setRating] = useState<number>();
	const [childClicked, setChildClicked] = useState('');
	const [coordinates, setCoordinates] = useState<LatLngType>();
	const [bounds, setBounds] = useState<BoundType>({
		ne: { lat: 12.838442, lng: 109.149359 },
		sw: { lat: 11.847676, lng: 109.095887 }
	});
	const [filteredPlaces, setFilteredPlaces] = useState<PlaceType[]>([]);

	const { sw, ne } = bounds;

	const { data: places, isLoading } = useQuery(
		[QueryKeys.PLACES_DATA],
		() => getPlacesData(type, sw, ne),
		{
			initialData: []
		}
	);

	useEffect(() => {
		if (rating) {
			const filtered = places?.filter((place) => Number(place.rating > rating));
			setFilteredPlaces(filtered as PlaceType[]);
		}
	}, [rating, places]);

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
					<List
						isLoading={isLoading}
            places={filteredPlaces.length ? filteredPlaces : places as PlaceType[]}
						childClicked={childClicked}
						type={type}
						setType={setType}
						rating={rating as number}
						setRating={setRating}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={8}
					style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
				>
					<Map
						setChildClicked={setChildClicked}
            places={filteredPlaces.length ? filteredPlaces : places as PlaceType[]}
						coordinates={coordinates as LatLngType}
						setCoordinates={setCoordinates}
						setBounds={setBounds}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default Home;
