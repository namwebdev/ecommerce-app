import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import AddressForm from '../components/Checkout/AddressForm'
import PaymentForm from '../components/Checkout/PaymentForm'
import { commerce } from '../lib/ecommerce'
const queryString = require('query-string')

const CheckoutPage = ({ cart, handleCheckout, error }) => {
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [step, setStep] = useState('')
  const [shippingData, setshippingData] = useState({})
  const { search } = useLocation()
  const history = useHistory()

  useEffect(() => {
    getTokenHandler()
  }, [])
  useEffect(() => {
    if (search) setStep(queryString.parse(search)?.q)
  }, [search])

  const getTokenHandler = async () => {
    if (cart) {
      const token = await commerce.checkout.generateToken(cart.id || '', {
        type: 'cart',
      })
      setCheckoutToken(token || {})
    }
  }
  const nextStep = (data) => {
    if (step === 'shipping-address') {
      setshippingData(data || {})
      history.push('/checkout?q=payment')
    }
  }

  return (
    <div className="shadow-md w-full px-6 py-4">
      <h1 className="text-3xl font-extrabold">Checkout</h1>
      {step && (
        <div>
          {step === 'shipping-address' && checkoutToken && (
            <AddressForm checkoutToken={checkoutToken} handleNext={nextStep} />
          )}
          {step === 'payment' && (
            <PaymentForm
              checkoutToken={checkoutToken}
              shippingData={shippingData}
              handleCheckout={handleCheckout}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default CheckoutPage
