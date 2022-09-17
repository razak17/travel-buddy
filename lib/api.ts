import axios from 'axios';
import { LatLngType, PlaceType } from '../utility/types';

const baseUrl = 'https://travel-advisor.p.rapidapi.com';

export const getPlacesData = async (
	type: string,
	sw: LatLngType | undefined,
	ne: LatLngType | undefined
): Promise<PlaceType[]> => {
	if (!type || !sw || !ne) throw new Error('Some params are not defined.');
	const res = await axios.get(`${baseUrl}/${type}/list-in-boundary`, {
		params: {
			bl_latitude: sw.lat,
			bl_longitude: sw.lng,
			tr_longitude: ne.lng,
			tr_latitude: ne.lat
		},
		headers: {
			'x-rapidapi-key': process.env.NEXT_PUBLIC_APP_RAPID_API_TRAVEL_API_KEY as string,
			'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
		}
	});

	return res.data.data;
};
