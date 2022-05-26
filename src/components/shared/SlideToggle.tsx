import { Field } from 'formik';

interface SlideToggleProps {
	id: string;
	name: string;
	checked: boolean;
}

const SlideToggle = ({ id, name, checked }: SlideToggleProps) => {
	return (
		<div className="slide-toggle-container">
			<span>{name}</span>
			<label className="switch">
				<Field id={id} name={name} type="checkbox" checked={checked} />
				<span className="slider round"></span>
			</label>
		</div>
	);
};

export default SlideToggle;
