import {
	Box,
	Typography,
	Button,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Chip,
	Rating
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Image from 'next/image';
import { RefObject } from 'react';

import useStyles from '../styles/PlaceDetails';
import { PlaceType } from '../utility/types';

export const PlaceDetails = ({
	place,
	selected,
	refProp
}: {
	place: PlaceType;
	selected: boolean;
	refProp: RefObject<HTMLDivElement>;
}) => {
	const { classes } = useStyles();
	if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

	return (
		<Card elevation={6}>
			<CardMedia
				style={{ height: 350 }}
				image={
					place.photo
						? place.photo.images?.large.url
						: 'https://www.foodserviceandhositality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
				}
				title={place.name}
			/>
			<CardContent>
				<Typography gutterBottom variant='h5'>
					{place.name}
				</Typography>
				<Box display='flex' justifyContent='space-between' my={2}>
					<Rating name='read-only' value={Number(place.rating)} readOnly />
					<Typography component='legend'>
						{place.num_reviews} review{place.num_reviews > 1 && 's'}
					</Typography>
				</Box>
				<Box display='flex' justifyContent='space-between'>
					<Typography component='legend'>Price</Typography>
					<Typography gutterBottom variant='subtitle1'>
						{place.price_level}
					</Typography>
				</Box>
				<Box display='flex' justifyContent='space-between'>
					<Typography component='legend'>Ranking</Typography>
					<Typography gutterBottom variant='subtitle1'>
						{place.ranking}
					</Typography>
				</Box>
				{place?.awards?.map((award, i) => (
					<Box
						key={`place-awards-${i}`}
						display='flex'
						justifyContent='space-between'
						my={1}
						alignItems='center'
					>
						<Image src={award.images.small} alt={award.display_name} />
						<Typography variant='subtitle2' color='textSecondary'>
							{award.display_name}
						</Typography>
					</Box>
				))}
				{place?.cuisine?.map(({ name }, i) => (
					<Chip key={`${name}-${i}`} size='small' label={name} className={classes.chip} />
				))}
				{place.address && (
					<Typography gutterBottom variant='body2' color='textSecondary' className={classes.subtitle}>
						<LocationOnIcon />
						{place.address}
					</Typography>
				)}
				{place.phone && (
					<Typography variant='body2' color='textSecondary' className={classes.spacing}>
						<PhoneIcon /> {place.phone}
					</Typography>
				)}
				<CardActions>
					<Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')}>
						Trip Advisor
					</Button>
					<Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>
						Website
					</Button>
				</CardActions>
			</CardContent>
		</Card>
	);
};
