import { paths } from '../config/paths';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import type { QueryClient } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, Suspense } from 'react';
import { Layout } from '@components/Layout';
import { NotFound } from '../routes/NotFound';

const createAppRouter = (queryClient: QueryClient) =>
	createBrowserRouter([
		{
			element: (
				<Layout>
					<Outlet />
				</Layout>
			),
			errorElement: <NotFound />,
			hydrateFallbackElement: <Suspense />,
			children: [
				{
					index: true,
					lazy: async () => {
						const { Index } = await import('../routes/Index');
						return { Component: Index };
					},
				},
				{
					path: paths.auth.signup.path,
					lazy: async () => {
						const { Signup } = await import('../routes/auth/Signup');
						return { Component: Signup };
					},
				},
				{
					path: paths.auth.login.path,
					lazy: async () => {
						const { Login } = await import('../routes/auth/Login');
						return { Component: Login };
					},
				},
			],
		},
	]);

export const AppRouter = () => {
	const queryClient = useQueryClient();
	const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
	return <RouterProvider router={router} />;
};
