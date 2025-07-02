import { Navbar } from '@components/Navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
};
