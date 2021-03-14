import ProductCart from '../components/Cart/ProductCart'

const CartPage = ({ cart }) => {
  const products = cart.line_items || []

  return (
    <div className="w-full">
      {products.length > 0 &&
        products.map((product, index) => (
          <ProductCart key={index} product={product} />
        ))}
    </div>
  )
}

export default CartPage
