import {useState} from "react";

import styles from "./ItemForm.module.css";

function ItemForm ({onItemSubmit})
{
	const INITIAL_DATA = {
		name: "",
		quantity: "",
		purpose: "",
		agreeToTerms: false
	};

	const [data, setData] = useState(INITIAL_DATA);
	const [errors, setErrors] = useState({});

	function handleInputChange (event)
	{
		const {name, value, type, checked} = event.target;

		setData((prevFormData) => ({
			...prevFormData,
			[name]: type === "checkbox" ? checked : value
		}));
	}

	function validateForm ()
	{
		let newFormErrors = {};

		if (!data.name)
		{
			newFormErrors.name = true;
		}
		if (!data.quantity)
		{
			newFormErrors.quantity = true;
		}
		if (!data.purpose)
		{
			newFormErrors.purpose = true;
		}
		if (!data.agreeToTerms)
		{
			newFormErrors.agreeToTerms = true;
		}

		setErrors(newFormErrors);

		return Object.keys(newFormErrors).length === 0;
	}

	function handleSubmit (event)
	{
		event.preventDefault();

		const isFormValid = validateForm();

		if (isFormValid)
		{
			const newItem = {
				...data,
				id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`
			};

			onItemSubmit(newItem);
			setData(INITIAL_DATA);
			setErrors({});
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={styles.form}
		>
			<h2>Add an Item to the Inventory</h2>

			<div className={`${styles.element} ${errors["name"] ? styles.error : ""}`}>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={data.name}
					onChange={handleInputChange}
				/>
			</div>

			<div className={`${styles.element} ${errors["quantity"] ? styles.error : ""}`}>
				<input
					type="number"
					name="quantity"
					placeholder="Quantity"
					value={data.quantity}
					onChange={handleInputChange}
				/>
			</div>

			<div className={`${styles.element} ${errors["purpose"] ? styles.error : ""}`}>
				<textarea
					name="purpose"
					placeholder="Purpose"
					value={data.purpose}
					onChange={handleInputChange}
				/>
			</div>

			<div className={`${styles.agreeToTerms} ${errors["agreeToTerms"] ? styles.error : ""}`}>
				<input
					type="checkbox"
					name="agreeToTerms"
					id="agreeToTerms"
					checked={data.agreeToTerms}
					onChange={handleInputChange}
				/>
				<label htmlFor="agreeToTerms">Agree to Terms</label>
			</div>

			<button
				type="submit"
				className={styles.button}
			>
				Add
			</button>
		</form>
	);
}

export default ItemForm;
