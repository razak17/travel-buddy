import axios from 'axios';

export type LatLngType = {
	lat: number;
	lng: number;
};

const baseUrl = 'https://travel-advisor.p.rapidapi.com';

export const getPlacesData = async (type: string, sw: LatLngType, ne: LatLngType) => {
	try {
		const {
			data: { data }
		} = await axios.get(`${baseUrl}/${type}/list-in-boundary`, {
			params: {
				bl_latitude: sw.lat,
				bl_longitude: sw.lng,
				tr_longitude: ne.lng,
				tr_latitude: ne.lat
			},
			headers: {
				'x-rapidapi-key': process.env.NEXT_APP_RAPID_API_TRAVEL_API_KEY as string,
				'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
			}
		});

		return data;
	} catch (error) {
		console.log(error);
	}
};
