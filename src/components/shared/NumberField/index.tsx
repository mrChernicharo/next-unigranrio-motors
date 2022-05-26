import { capitalize } from '../../../lib/helpers';
import './number-field.module.css';

interface Props {
	id: string;
	name: string;
	min: number;
	defaultValue?: any;
	value?: any;
	label?: string;
	error?: boolean;
	errorMessage?: string;
	handleBlur: any;
	handleChange: any;
}

const NumberField = ({
	label,
	name,
	id,
	error,
	min,
	errorMessage,
	defaultValue,
	handleBlur,
	handleChange,
	value,
}: Props) => {
	return (
		<div className="number-field-container">
			<label htmlFor={name}>{capitalize(label || name)}</label>
			<input
				id={id}
				type="number"
				name={name}
				min={min}
				// defaultValue={defaultValue}
				onChange={handleChange}
				onBlur={handleBlur}
				value={Number(value)}
			/>
			{error && <span className="error-message">{errorMessage}</span>}
		</div>
	);
};

export default NumberField;
