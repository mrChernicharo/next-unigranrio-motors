import { Field } from 'formik';
import { capitalize } from '../../../lib/helpers';
import './text-field.module.css';

interface Props {
	id: string;
	name: string;
	placeholder?: string;
	label?: string;
	error?: boolean;
	errorMessage?: string;
}

const TextField = ({
	label,
	name,
	id,
	placeholder,
	error,
	errorMessage,
}: Props) => {
	return (
		<div className="text-field-container">
			<label htmlFor={name}>{capitalize(label || name)}</label>
			<Field id={id} type="text" name={name} placeholder={placeholder} />
			{error && <span className="error-message">{errorMessage}</span>}
		</div>
	);
};

export default TextField;
