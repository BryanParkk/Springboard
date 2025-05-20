import {useState} from "react";

import styles from "./SpacecraftBuilder.module.css";

import ItemForm from "./ItemForm.jsx";
import InventoryDisplay from "./InventoryDisplay.jsx";

function SpacecraftBuilder ()
{
	const [inventory, setInventory] = useState([]);

	function addItem (item)
	{
		setInventory((prevInventory) => [...prevInventory, item]);
	}

	function deleteItem (id)
	{
		setInventory((prevInventory) => prevInventory.filter((item) => item.id !== id));
	}

	return (
		<div>
			<h1>Spacecraft Builder</h1>

			<div className={styles.itemForm}>
				<ItemForm onItemSubmit={addItem} />
			</div>

			<div>
				<InventoryDisplay
					inventory={inventory}
					onDeleteItem={deleteItem}
				/>
			</div>
		</div>
	);
}

export default SpacecraftBuilder;
