import { AppBar, Toolbar, Box, Typography, InputBase } from '@mui/material';
// import { Autocomplete } from '@react-google-maps/api';
import SearchIcon from '@mui/icons-material/Search';

import useStyles from '../styles/Header';

export const Header = () => {
	const { classes } = useStyles();

	return (
		<AppBar position='static'>
			<Toolbar className={classes.toolbar}>
				<Typography variant='h5' className={classes.title}>
					Travel Advisor
				</Typography>
				<Box display='flex'>
					<Typography variant='h6' className={classes.title}>
						Explore new places
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase placeholder='Search…' classes={{ root: classes.inputRoot, input: classes.inputInput }} />
					</div>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
