import { SignupForm } from '@components/forms/SignupForm';
import { SubmitHandler } from 'react-hook-form';
type Inputs = {
	example: string;
	exampleRequired: string;
};

export const Signup = () => {
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<>
			<SignupForm onSubmit={onSubmit} />
		</>
	);
};
