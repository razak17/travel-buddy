import axios from 'axios';
import { LatLngType, PlaceType, WeatherType } from '../utility/types';

const advisorUrl = 'https://travel-advisor.p.rapidapi.com';
const weatherUrl = 'https://open-weather13.p.rapidapi.com';
const locationIqUrl = 'https://us1.locationiq.com/v1/reverse.php';
const locationIqKey = process.env.NEXT_PUBLIC_LOCATION_IQ_API_KEY as string;

export const getPlacesData = async (
	type: string,
	sw: LatLngType | undefined,
	ne: LatLngType | undefined
): Promise<PlaceType[]> => {
	if (!type || !sw || !ne) throw new Error('Some params are not defined.');
	const res = await axios.get(`${advisorUrl}/${type}/list-in-boundary`, {
		params: {
			bl_latitude: sw.lat,
			bl_longitude: sw.lng,
			tr_longitude: ne.lng,
			tr_latitude: ne.lat
		},
		headers: {
			'x-rapidapi-key': process.env.NEXT_PUBLIC_APP_RAPID_API_TRAVEL_API_KEY as string,
			'x-rapidapi-host': advisorUrl.split('//')[1]
		}
	});
	return res.data.data;
};

export const getWeatherData = async (lat: number, lng: number): Promise<WeatherType> => {
	if (!lat || !lng) throw new Error('coordinates is not defined.');
	const city = await getCity({ lat, lng });
	const res = await axios.get(`${weatherUrl}/city/${city}`, {
		headers: {
			'X-RapidAPI-Key': process.env.NEXT_PUBLIC_APP_RAPID_API_TRAVEL_API_KEY as string,
			'X-RapidAPI-Host': weatherUrl.split('//')[1]
		}
	});
	return res.data;
};

export const getCity = async (coordinates: LatLngType): Promise<string> => {
	if (!coordinates) throw new Error('coordinates is not defined.');
	const { lat, lng } = coordinates;
	const res = await axios.get(
		`${locationIqUrl}?key=${locationIqKey}&lat="/${lat}&lon=${lng}&format=json`
	);
	return res.data.address.city;
};
