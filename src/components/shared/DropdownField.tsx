import { Field } from 'formik';
import { ReactNode } from 'react';

export interface IDropdownOption {
	id: string;
	name: string;
	value: string | number;
}

interface ISelectProps {
	id: string;
	name: string;
	label?: string;
	placeholder?: string;
	options: IDropdownOption[];
	onChange: (e: any) => void;
	children?: ReactNode;
}

export default function DropdownField({
	id,
	name,
	placeholder,
	label,
	options,
	children,
}: ISelectProps) {
	return (
		<div className="select-container">
			<label htmlFor="name">{label || name}</label>

			<Field id={id} as="select" name={name} className="dropdown-select">
				{options.map(option => (
					<option
						className="dropdown-option"
						key={option.id}
						value={option.value}
					>
						{option.name || placeholder}
					</option>
				))}
			</Field>

			{!!children && children}
		</div>
	);
}
