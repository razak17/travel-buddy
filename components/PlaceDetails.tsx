import { Place } from './List';

export const PlaceDetails = ({ place }: { place: Place }) => {
	return <div>{place.name}</div>;
};
