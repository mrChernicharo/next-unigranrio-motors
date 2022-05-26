import { ErrorMessage, FieldArray, Form, Formik, FormikProps } from 'formik';
import { nanoid } from 'nanoid';
import { FiPlus, FiTrash } from 'react-icons/fi';
import Global from '../../../../hooks/Global';
import { toCurrency } from '../../../../utils/functions';
import {
	IPartialTransaction,
	IPartialTransactionMotorcycle,
	ITransaction,
} from '../../../../utils/interfaces';
import { transactionSchema } from '../../../../utils/schemas';
import DropdownField, { IDropdownOption } from '../../../shared/DropdownField';
import NumberField from '../../../shared/NumberField';
import './create-transaction-form.module.css';

interface IProps {
	transaction?: ITransaction;
	onSubmitted: (e: any) => void;
}

export default function TransactionForm({ transaction, onSubmitted }: IProps) {
	const { clients, motorcycles, createTransaction, updateTransaction } =
		Global;

	let transactionID = '';
	if (transaction) transactionID = transaction.id;

	const clientOpts: IDropdownOption[] = [
		{ id: '', name: '', value: '' },
		...clients.map(client => ({
			id: client.id,
			name: `${client.firstName} ${client.lastName}`,
			value: client.id,
		})),
	];

	const motorcycleOpts: IDropdownOption[] = [
		{ id: '', name: '', value: '' },
		...motorcycles.map(motorcycle => ({
			id: motorcycle.id,
			name: motorcycle.name,
			value: motorcycle.id,
		})),
	];

	const getMoto = (id: string) => motorcycles.find(moto => moto.id === id);

	const getTotal = (motos: IPartialTransactionMotorcycle[]) =>
		motos.reduce(
			(acc, moto) =>
				(acc += (getMoto(moto.id)?.price || 0) * moto.quantity),
			0
		);

	return (
		<Formik
			initialValues={
				{
					clientId: transaction?.client?.id || '',
					motorcycles: transaction?.motorcycles
						? transaction?.motorcycles.map(item => ({
								id: item.motorcycle.id,
								quantity: item.quantity,
						  }))
						: [{ id: '', quantity: 1 }],
					total: transaction?.total || 0,
				} as IPartialTransaction
			}
			validationSchema={transactionSchema}
			onSubmit={(values, actions) => {
				// console.log("createTransaction!", { values, actions });

				const { resetForm } = actions;

				transactionID
					? updateTransaction({
							id: transactionID,
							clientId: values.clientId,
							motorcycles: values.motorcycles,
							total: getTotal(values.motorcycles),
					  })
					: createTransaction({
							clientId: values.clientId,
							motorcycles: values.motorcycles,
							total: getTotal(values.motorcycles),
					  });

				resetForm();

				const event = new Event('submit', { bubbles: true });
				onSubmitted(event);
			}}
		>
			{({
				errors,
				values,
				handleBlur,
				handleChange,
			}: FormikProps<IPartialTransaction>) => {
				return (
					<Form>
						<h5>Cadastrar Venda</h5>

						<DropdownField
							id={nanoid()}
							name="clientId"
							label="Cliente"
							placeholder="Selecione o cliente"
							options={clientOpts}
							onChange={handleChange}
						/>
						<div className="error-message">{errors.clientId}</div>
						{values.clientId ? (
							<FieldArray name="motorcycles">
								{arrayHelpers => {
									return (
										<div className="motorcycles-list">
											{values?.motorcycles?.length > 0 ? (
												<>
													{values.motorcycles.map(
														(moto, i) => (
															<div
																key={nanoid()}
																className="transaction-item"
															>
																<div className="form-row">
																	{/* prettier-ignore */}
																	<DropdownField
																		id={nanoid()}
																		name={`motorcycles[${i}].id`}
																		placeholder="selecione motocicleta"
																		label={`Moto ${i < 9 ? '0' + (i+1) : i+1}`}
																		options={
																			motorcycleOpts
																		}
																		onChange={
																			handleChange
																		}
																	>
																		<ErrorMessage
																			name={`motorcycles[${i}].id`}
																			render={() => (
																				<div className="error-message">
																					selecione
																					uma
																					moto
																				</div>
																			)}
																		/>
																	</DropdownField>

																	<NumberField
																		id={nanoid()}
																		name={`motorcycles[${i}].quantity`}
																		label="Quantidade"
																		min={1}
																		handleBlur={
																			handleBlur
																		}
																		handleChange={
																			handleChange
																		}
																		value={
																			values
																				.motorcycles[
																				i
																			]
																				.quantity
																		}
																	/>

																	<div
																		style={{
																			paddingTop: `1rem`,
																		}}
																	>
																		<button
																			type="button"
																			title="deletar item"
																			onClick={() =>
																				arrayHelpers.remove(
																					i
																				)
																			}
																		>
																			<FiTrash />
																		</button>
																	</div>
																</div>
															</div>
														)
													)}
												</>
											) : null}
											<button
												style={{
													marginBlock: 10,
												}}
												type="button"
												id="add-moto-btn"
												onClick={() =>
													arrayHelpers.push({
														id: '',
														quantity: 1,
													})
												}
											>
												<FiPlus />
											</button>
											<label
												htmlFor="add-moto-btn"
												style={{
													paddingLeft: 5,
													fontSize: '11px',
													color: 'goldenrod',
												}}
											>
												adicionar moto
											</label>
										</div>
									);
								}}
							</FieldArray>
						) : null}
						<button type="submit">
							{transactionID ? 'Editar venda' : 'Registrar venda'}
						</button>

						<div>
							<p>
								Total:{' '}
								{toCurrency(getTotal(values.motorcycles))}
							</p>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
}
/**
 *
 */
