import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export const Navbar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='fixed'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>

					<Typography variant='h6' component='div' sx={{ flexGrow: 1, color: '#ffffff' }}>
						{' '}
						<Link to='/'>OSRS Flipping Tool</Link>
					</Typography>

					<Link to='/auth/login'>
						<Button color='inherit'>Login</Button>
					</Link>
					<Link to='/auth/signup'>
						<Button color='inherit'>Signup</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
