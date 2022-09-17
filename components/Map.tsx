import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, Rating, useMediaQuery } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Image from 'next/image';

import Marker from './Marker';
import useStyles from '../styles/Map';
import mapStyles from '../utility/mapStyles';
import { BoundType, CoordinateType, LatLngType, PlaceType, WeatherType } from '../utility/types';

interface MapProps {
	coordinates: LatLngType;
	weatherData: WeatherType;
	places: PlaceType[];
	setCoordinates: React.Dispatch<React.SetStateAction<LatLngType>>;
	setBounds: React.Dispatch<React.SetStateAction<BoundType>>;
	setChildClicked: React.Dispatch<React.SetStateAction<string>>;
}

const Map = ({ coordinates, setCoordinates, setBounds, setChildClicked, places, weatherData }: MapProps) => {
	const matches = useMediaQuery('(min-width:600px)');
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
				options={{ disableDefaultUI: true, zoomControl: true, styles: mapStyles }}
				onChange={handleChange}
				onChildClick={(child: string) => setChildClicked(child)}
			>
				{places.length &&
					places.map((place, i) => (
						<Marker
							className={classes.markerContainer}
							lat={Number(place.latitude)}
							lng={Number(place.longitude)}
							key={i}
						>
							{!matches ? (
								<LocationOnOutlinedIcon color='primary' fontSize='large' />
							) : (
								<Paper elevation={3} className={classes.paper}>
									<Typography variant='subtitle2' gutterBottom>
										{' '}
										{place.name}
									</Typography>
									<Image
										className={classes.pointer}
										src={
											place.photo
												? place.photo.images.large.url
												: 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
										}
									/>
									<Rating name='read-only' size='small' value={Number(place.rating)} readOnly />
								</Paper>
							)}
						</Marker>
					))}
        {weatherData?.list?.length && weatherData.list.map((data, i) => (
          <Marker key={i} lat={data.coord.lat} lng={data.coord.lon}>
            <Image src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
          </Marker>
        ))}

			</GoogleMapReact>
		</div>
	);
};

export default Map;
