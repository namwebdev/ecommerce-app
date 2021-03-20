import ProductCart from '../components/Cart/ProductCart'
import { Link } from 'react-router-dom'

const CartPage = ({
  cart,
  handleUpdateQuantity,
  handleRemoveProduct,
  handleEmptyCart,
  loading,
}) => {
  const products = cart.line_items || []
  const totalPrice = cart?.subtotal?.formatted_with_symbol || 0

  return (
    <div className="w-full">
      {loading && <div className="text-center">Please wait...</div>}
      {!loading && (
        <div>
          {!products.length && (
            <div className="text-center pt-8">
              <span className="text-xl">
                You don't have any product in cart
              </span>
              <div className="mt-5">
                <Link to="/" className="btn btn-primary">
                  Back to Home
                </Link>
              </div>
            </div>
          )}
          {products.length > 0 && (
            <div>
              {products.map((product, index) => (
                <ProductCart
                  key={index}
                  product={product}
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleRemoveProduct={handleRemoveProduct}
                />
              ))}

              <div className="flex items-center justify-between mt-10">
                <div>
                  Total:{' '}
                  <span className="text-xl font-black">{totalPrice}</span>
                </div>
                <div>
                  <button
                    onClick={handleEmptyCart}
                    className="btn btn-danger text-sm"
                  >
                    Empty Cart
                  </button>
                  <Link
                    to="/checkout?q=shipping-address"
                    className="btn btn-primary text-sm ml-1"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CartPage
