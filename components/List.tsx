import { Dispatch, SetStateAction, useRef } from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import PlaceDetails from './PlaceDetails';
import useStyles from '../styles/List';
import { PlaceType } from '../utility/types';

interface ListProps {
	places: PlaceType[];
	childClicked: string;
	isLoading: boolean;
	type: string;
	setType: Dispatch<SetStateAction<string>>;
	rating: number;
	setRating: Dispatch<SetStateAction<number | undefined>>;
}

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }: ListProps) => {
	const { classes } = useStyles();
	const placeRef = useRef<HTMLDivElement>(null);

	return (
		<div className={classes.container}>
			<Typography variant='h4'>Restaurants & Diners around you</Typography>
			{isLoading ? (
				<div className={classes.loading}>
					<CircularProgress size='5rem' />
				</div>
			) : (
				<>
					<FormControl className={classes.formControl}>
						<InputLabel id='type'>Type</InputLabel>
						<Select id='type' label='type' value={type} onChange={(e) => setType(e.target.value)}>
							<MenuItem value='restaurants'>Restaurants</MenuItem>
							<MenuItem value='hotels'>Hotels</MenuItem>
							<MenuItem value='attractions'>Attractions</MenuItem>
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel id='rating'>Rating</InputLabel>
						<Select
							id='rating'
							label='Rating'
							value={rating}
							onChange={(e) => setRating(e.target.value as number)}
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
				</>
			)}
		</div>
	);
};

export default List;
