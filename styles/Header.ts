import { alpha } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export default makeStyles()((theme) => ({
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
		marginRight: theme.spacing(2),
		marginLeft: 0,
		display: 'flex',
		width: '100%',
		[theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' }
	},
	searchIcon: {
		padding: theme.spacing(0, 1),
		height: '100%',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: { width: '20ch' }
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between'
	}
}));
