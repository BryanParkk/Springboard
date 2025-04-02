function App ()
{
	const inventoryItems = [
		{name: "Oxygen Tank", type: "Equipment", quantity: 3, price: 150.00},
		{name: "Freeze-Dried Ice Cream", type: "Food", quantity: 20, price: 5.99},
		{name: "Space Suit", type: "Equipment", quantity: 2, price: 2500.00},
		{name: "Water Filter", type: "Tool", quantity: 5, price: 75.50},
		{name: "Solar Panel", type: "Equipment", quantity: 10, price: 300.00},
		{name: "Navigation Module", type: "Technology", price: 1200.00},
		{name: "First Aid Kit", type: "Medical", quantity: 4, price: 22.35},
		{name: "Hydroponic Seeds", type: "Food", quantity: 30, price: 10.00},
		{name: "Communication Radio", type: "Technology", quantity: 3, price: 199.99},
		{name: "Thruster Fuel", type: "Fuel", quantity: 50, price: 45.00}
	];

	return (
		<div>
			<h1>Inventory</h1>
			<ol>
				<!-- TODO: Render each inventory item as a list item. -->
			</ol>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));
