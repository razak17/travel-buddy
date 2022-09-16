import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, Rating, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import useStyles from '../styles/Map';
import { Place } from './List';

type WeatherData = {
	temperature: number;
	description: string;
	icon: string;
	wind: number;
	humidity: number;
};

interface MapProps {
	coordinates: number[];
	weatherData: WeatherData;
	places: Place[];
	setCoordinates: React.Dispatch<React.SetStateAction<number[]>>;
	setBounds: React.Dispatch<React.SetStateAction<number[][]>>;
	setChildClicked: React.Dispatch<React.SetStateAction<Place | null>>;
}

export const Map = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.mapContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
				defaultZoom={14}
				margin={[50, 50, 50, 50]}
				options={''}
				onChange={''}
				onChildClick={''}
			></GoogleMapReact>
		</div>
	);
};
