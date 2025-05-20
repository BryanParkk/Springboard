import styles from "./ItemCard.module.css";

function ItemCard ({name, quantity, purpose})
{
	return (
		<>
			<h2 className={styles.title}>{name}</h2>

			<p className={styles.detail}>Quantity: {quantity}</p>
			<p className={styles.detail}>Purpose: {purpose}</p>
		</>
	);
}

export default ItemCard;
