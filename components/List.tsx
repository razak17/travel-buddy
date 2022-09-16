import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { PlaceDetails } from './PlaceDetails';

import useStyles from '../styles/List';

export type PlaceType = {
	name: string;
	numReviews: number;
	rating: number;
	priceLevel: number;
	phone: string;
	address: string;
	webUrl: string;
	website: string;
	awards: object;
	cuisine: object;
	photos: object;
	location: {
		lat: number;
		lng: number;
	};
};

export const List = ({ places }: { places: PlaceType[] }) => {
	const [elRefs, setElRefs] = useState([]);
	const { classes } = useStyles();
	const [type, setType] = useState('restaurants');

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
					<Grid key={`place-item-${i}`} item xs={12}>
						<PlaceDetails place={place} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};
