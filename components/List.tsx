import React, { useState, useEffect, createRef, RefObject, useRef } from 'react';
import {
	CircularProgress,
	Grid,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select
} from '@mui/material';
import { PlaceDetails } from './PlaceDetails';

import useStyles from '../styles/List';
import { LatLngType } from '../lib/api';

export type Photo = {
	images: {
		large: {
			url: string;
		};
	};
};

export type Award = {
	display_name: string;
	images: {
		small: string;
	};
};

export type Cuisine = {
	name: string;
};

export type PlaceType = {
	name: string;
	num_reviews: number;
	rating: number;
	ranking: number;
	price_level: number;
	phone: string;
	photo: Photo;
	address: string;
	web_url: string;
	website: string;
	awards: Award[];
	photos: object;
	cuisine: Cuisine[];
	location: LatLngType;
	latitude: number;
	longitude: number;
};

export const List = ({ places, childClicked }: { places: PlaceType[]; childClicked: string }) => {
	const { classes } = useStyles();
	const [type, setType] = useState('restaurants');
  const placeRef = useRef<HTMLDivElement>(null);

	return (
		<div className={classes.container}>
			<Typography variant='h4'>Restaurants & Diners around you</Typography>
			<FormControl className={classes.formControl}>
				<InputLabel id='type'>Type</InputLabel>
				<Select id='type' value={type} onChange={(e) => setType(e.target.value)}>
					<MenuItem value='restaurants'>Restaurants</MenuItem>
					<MenuItem value='hotels'>Hotels</MenuItem>
					<MenuItem value='attractions'>Attractions</MenuItem>
				</Select>
			</FormControl>
			<FormControl className={classes.formControl}>
				<InputLabel id='rating'>Rating</InputLabel>
				<Select
					id='rating'
					value={3}
					onChange={() => {
						console.log('hello');
					}}
				>
					<MenuItem value=''>All</MenuItem>
					<MenuItem value='3'>Above 3.0</MenuItem>
					<MenuItem value='4'>Above 4.0</MenuItem>
					<MenuItem value='4.5'>Above 4.5</MenuItem>
				</Select>
			</FormControl>
			<Grid container spacing={3} className={classes.list}>
				{places?.map((place, i) => (
					<Grid ref={placeRef} key={`place-item-${i}`} item xs={12}>
						<PlaceDetails selected={Number(childClicked) === i} refProp={placeRef} place={place} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};
