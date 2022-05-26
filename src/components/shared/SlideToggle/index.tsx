import { Field } from 'formik';
import './index.css';

interface SlideToggleProps {
	id: string;
	name: string;
	checked: boolean;
}

const SlideToggle = ({ id, name, checked }: SlideToggleProps) => {
	return (
		<>
			<span>{name}</span>
			<label className="switch">
				<Field id={id} name={name} type="checkbox" checked={checked} />
				<span className="slider round"></span>
			</label>
		</>
	);
};

export default SlideToggle;
