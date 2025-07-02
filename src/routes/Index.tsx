import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import DataTable from '@components/DataTable';
import Container from '@mui/material/Container';
import { getGrandExchangeData } from '../lib/grandexchange-data';

export const Index = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
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
