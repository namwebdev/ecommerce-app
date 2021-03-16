import { useState, useEffect } from 'react'
import CheckoutAddressForm from '../components/Checkout/AddressForm'
import { commerce } from '../lib/ecommerce'

const CheckoutPage = ({ cart, loading }) => {
  const [checkoutToken, setCheckoutToken] = useState(null)

  useEffect(() => {
    getTokenHandler()
  }, [])
  const getTokenHandler = async () => {
    if (cart) {
      const token = await commerce.checkout.generateToken(cart.id || '', {
        type: 'cart',
      })
      setCheckoutToken(token || {})
    }
  }
  return (
    <div className="shadow-md w-full px-6 py-4">
      <h1 className="text-3xl font-extrabold">Checkout</h1>
      {/* <div className="flex items-center justify-between">
        <div className="">
          <span>1</span>
          <span>Shipping address</span>
        </div>
        <div className="divide-y divide-light-blue-400 w-60 h-0.5 bg-gray-500"></div>
        <div>
          <span>2</span>
          <span>Payment details</span>
        </div>
      </div> */}
      {checkoutToken && <CheckoutAddressForm checkoutToken={checkoutToken} />}
    </div>
  )
}

export default CheckoutPage
