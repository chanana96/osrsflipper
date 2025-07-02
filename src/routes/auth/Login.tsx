import { LoginForm } from '@components/forms/LoginForm';
import { SubmitHandler } from 'react-hook-form';

type Inputs = {
	example: string;
	exampleRequired: string;
};

export const Login = () => {
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<>
			<LoginForm onSubmit={onSubmit} />
		</>
	);
};
