import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, Rating, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import useStyles from '../styles/Map';
import { PlaceType } from './List';
import { LatLngType } from '../lib/api';

type WeatherData = {
	temperature: number;
	description: string;
	icon: string;
	wind: number;
	humidity: number;
};

export type BoundType = {
	ne: LatLngType;
	nw: LatLngType;
	se: LatLngType;
	sw: LatLngType;
};

export type CoordinateType = {
	center: {
		lat: number;
		lng: number;
	};
	zoom: number;
	bounds: BoundType;
	size: {
		width: number;
		height: number;
	};
};

interface MapProps {
	coordinates: LatLngType | null;
	weatherData?: WeatherData;
	places?: PlaceType[];
	setCoordinates: React.Dispatch<React.SetStateAction<LatLngType | null>>;
	setBounds: React.Dispatch<React.SetStateAction<BoundType | null>>;
	setChildClicked?: React.Dispatch<React.SetStateAction<PlaceType | null>>;
}

export const Map = ({ coordinates, setCoordinates, setBounds }: MapProps) => {
	const { classes } = useStyles();

	const handleChange = (e: CoordinateType) => {
		setCoordinates({ lat: e.center.lat, lng: e.center.lng });
		// setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
	};

	return (
		<div className={classes.mapContainer}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.NEXT_APP_GOOGLE_MAP_API_KEY }}
				defaultCenter={coordinates}
				defaultZoom={14}
				margin={[50, 50, 50, 50]}
				options={''}
				onChange={handleChange}
				onChildClick={''}
			></GoogleMapReact>
		</div>
	);
};
