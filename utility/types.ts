export type LatLngType = {
	lat: number;
	lng: number;
};

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


export type WeatherData = {
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
