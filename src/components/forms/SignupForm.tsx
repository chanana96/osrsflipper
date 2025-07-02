import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
	example: string;
	exampleRequired: string;
};

export const SignupForm = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Inputs>();

	return (
		<>
			<Container maxWidth='sm'>
				<form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '5vh' }}>
					<Box
						sx={{
							boxShadow: 3,
							padding: 2,
							bgcolor: '#656565',
							color: 'text.primary',
						}}>
						<div style={{ flex: '6' }}>
							<Typography component='h1' variant='h5' sx={{ mb: '20' }}>
								SIGN UP
							</Typography>

							<Grid
								container
								spacing={2}
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}>
								<Grid size={{ md: 12, xs: 8 }}>
									<TextField
										label='Username'
										variant='outlined'
										fullWidth
										required
										autoFocus
										autoComplete='username'
										type='text'
									/>
								</Grid>

								<Grid size={{ md: 12, xs: 8 }}>
									<TextField
										label='Email'
										variant='outlined'
										fullWidth
										required
										autoComplete='email'
										type='email'
									/>
								</Grid>

								<Grid size={{ md: 12, xs: 8 }}>
									<TextField
										label='Password'
										variant='outlined'
										fullWidth
										required
										autoComplete='new-password'
										type='password'
									/>
								</Grid>
								<Grid size={{ md: 12, xs: 8 }}>
									<TextField
										label='Confirm Password'
										variant='outlined'
										fullWidth
										required
										autoComplete='new-password'
										type='password'
									/>
								</Grid>
								<Grid size={{ md: 12, xs: 8 }}>
									<FormControlLabel
										control={
											<Checkbox value='allowExtraEmails' color='primary' />
										}
										label='I want to receive inspiration, marketing promotions and updates via email.'
									/>
								</Grid>

								<Grid size={{ md: 12, xs: 8 }}>
									<Button
										type='submit'
										fullWidth
										variant='contained'
										sx={{ mt: 3, mb: 2 }}>
										Sign Up
									</Button>
								</Grid>
							</Grid>
							<Grid container justifyContent='center'>
								<Grid>
									<Link to='/auth/login'>Already have an account? Sign in</Link>
								</Grid>
							</Grid>
						</div>
					</Box>
				</form>
			</Container>
		</>
	);
};
