import { AppBar, Toolbar, Box, Typography, InputBase } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';

import useStyles from '../styles/Header';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Header = ({ onLoad, onPlaceChanged }: { onLoad: any; onPlaceChanged: any }) => {
	const { classes } = useStyles();

	return (
		<AppBar position='static'>
			<Toolbar className={classes.toolbar}>
				<Typography variant='h5' className={classes.title}>
					Travel Buddy
				</Typography>
				<Box display='flex'>
					<Typography variant='h6' className={classes.title}>
						Explore new places
					</Typography>
					<Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search…'
								classes={{ root: classes.inputRoot, input: classes.inputInput }}
							/>
						</div>
					</Autocomplete>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
