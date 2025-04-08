function ShoppingListItem({item, price, qty}) {

    return (
    <li style={{color: price > 7 ? "red" : "green"}}>
        {item} - <b>${price}</b> - quantity : {qty}
    </li>
    )
}

export default ShoppingListItem