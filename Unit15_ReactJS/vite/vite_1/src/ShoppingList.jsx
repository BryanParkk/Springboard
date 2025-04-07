import './ShoppingList.css'
import ShoppingListItem from "./ShoppingListItem";
const items = [
  {id: 1, item: "Milk", price: 3.99, qty: 1},
  {id: 2, item: "Eggs", price: 6.99, qty: 2},
  {id: 3, item: "Ramen", price: 10.39, qty: 5},
  {id: 4, item: "Bacon", price: 7.90, qty: 10}
]
function ShopppingList() {
  return (
    <div className="ShoppingList">
      <h2>Shopping List</h2>
      <ul>
        {items.map( (i) => { 
          return <ShoppingListItem key={i.id} item={i.item} price={i.price} qty={i.qty}> </ShoppingListItem>
        })}
      </ul>
    </div>
  );
}

export default ShopppingList;
