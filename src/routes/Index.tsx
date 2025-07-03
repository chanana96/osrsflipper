import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import DataTable from '@components/DataTable';
import Container from '@mui/material/Container';
import { getGrandExchangeData } from '../lib/grandexchange-data';

export const Index = () => {
	const [data, setData] = useState([]);
	const sampleData = [
		{
			id: 1,
			high: 89049999,
			highTime: 'July 3rd 2025, 6:45:26 am',
			icon: '3rd age amulet.png',
			limit: 8,
			low: 83211000,
			lowTime: 'July 2nd 2025, 9:53:48 pm',
			margin: 4057999,
			name: '3rd age amulet',
			potentialProfit: 32463992,
			tax: 1781000,
		},
		{
			id: 2,
			high: 89049999,
			highTime: 'July 3rd 2025, 6:45:26 am',
			icon: '3rd age amulet.png',
			limit: 8,
			low: 83211000,
			lowTime: 'July 2nd 2025, 9:53:48 pm',
			margin: 4057999,
			name: '3rd age safdasdfasfsd',
			potentialProfit: 32463992,
			tax: 1781000,
		},
	];
	useEffect(() => {
		const fetchData = async () => {
			try {
				//setData(sampleData);
				const data = await getGrandExchangeData();

				if (data) {
					setData(data);
				}
			} catch (e) {
				console.error(e);
			}
		};
		fetchData();
		return () => {};
	}, []);

	const { handleSubmit, control, reset } = useForm<any>({});

	const onSubmit: SubmitHandler<any> = (data) => console.log(data);
	return (
		<Container
			sx={{
				mx: 'auto',
				boxShadow: 3,
				padding: 2,
				display: 'inline-flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<DataTable rows={data}></DataTable>
		</Container>
	);
};
