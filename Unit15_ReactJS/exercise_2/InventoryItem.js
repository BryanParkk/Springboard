function InventoryItem({ name, type, quantity = 0, price = 0 }) {
  const totalValue = quantity * price;
  return (
    <div className="item">
      <h2>
        {name} ({type})
      </h2>
      {/* stock alert*/}
      {quantity < 5 && (
        <message>
          <span>
            <p>⚠️ Low Stock! {quantity} remained.</p>
          </span>
        </message>
      )}
      {totalValue > 1000 && (
        <message>
          <span>
            <p>💵 High value - consider extra protection!</p>
          </span>
        </message>
      )}
    </div>
  );
}

export default InventoryItem;
