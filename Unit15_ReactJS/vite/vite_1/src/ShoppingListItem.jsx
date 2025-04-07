function ShoppingListItem({item, price, qty}) {
    return (
    <li>
        {item} - <b>${price}</b> - quantity : {qty}
    </li>
    )
}

export default ShoppingListItem