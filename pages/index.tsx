import type { NextPage } from 'next';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import Header from '../components/Header';
import List from '../components/List';
import Map from '../components/Map';
import { getCity, getPlacesData, getWeatherData } from '../lib/api';
import { BoundType, LatLngType, PlaceType, QueryKeys, WeatherType } from '../utility/types';

const Home: NextPage = () => {
	const [type, setType] = useState('restaurants');
	const [rating, setRating] = useState<number>(4);
	const [childClicked, setChildClicked] = useState('');
	const [city, setCity] = useState('');
	const [coordinates, setCoordinates] = useState<LatLngType>({
		lat: 40.714224,
		lng: -73.961452
	});
	const [bounds, setBounds] = useState<BoundType>({
		ne: { lat: 12.838442, lng: 109.149359 },
		sw: { lat: 11.847676, lng: 109.095887 }
	});
	const [filteredPlaces, setFilteredPlaces] = useState<PlaceType[]>([]);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [autocomplete, setAutocomplete] = useState<any>(null);

	const { data: places, isLoading } = useQuery(
		[QueryKeys.PLACES_DATA, bounds, type],
		() => getPlacesData(type, bounds.sw as LatLngType, bounds.ne as LatLngType),
		{
			initialData: [],
			onSuccess: (data) => {
				data?.filter((place) => place.name && place.num_reviews > 0);
			}
		}
	);

	const { data: cityData } = useQuery(
		[QueryKeys.CITY_DATA, city],
		() => getCity({ lat: coordinates?.lat as number, lng: coordinates?.lng as number }),
		{
			onSuccess: (data) => {
				setCity(data);
			}
		}
	);

	const { data: weatherData } = useQuery(
		[QueryKeys.WEATHER_DATA, city],
		() => getWeatherData(coordinates.lat as number, coordinates.lng as number),
	);

	console.log({ cityData });
	console.log({ weatherData });

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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onLoad = (autoC: any) => setAutocomplete(autoC);

	const onPlaceChanged = () => {
		const lat = autocomplete?.getPlace().geometry.location.lat();
		const lng = autocomplete?.getPlace().geometry.location.lng();

		setCoordinates({ lat, lng });
	};

	return (
		<>
			{/* <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} /> */}

			<Grid container spacing={3} style={{ width: '100%' }}>
				<Grid item xs={12} md={4}>
					<List
						isLoading={isLoading}
						places={filteredPlaces.length ? filteredPlaces : (places as PlaceType[])}
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
					{/* <Map */}
					{/* 	setChildClicked={setChildClicked} */}
					{/* 	places={filteredPlaces.length ? filteredPlaces : (places as PlaceType[])} */}
					{/* 	coordinates={coordinates as LatLngType} */}
					{/* 	setCoordinates={setCoordinates} */}
					{/* 	setBounds={setBounds} */}
					{/* 	weatherData={weatherData as WeatherType} */}
					{/* /> */}
				</Grid>
			</Grid>
		</>
	);
};

export default Home;
