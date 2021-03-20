import {
  Elements,
  CardElement,
  ElementConsumer,
  ElementsConsumer,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Link } from 'react-router-dom'

const stripePromise = loadStripe(
  'pk_test_51IWgWUCI6aFlx9tBQPnNAVGx1DDSAq5baZV2w0O3TcM6w1rfqNiR60wx0FR9eEclnVDRBGsxpJm6fnjvt4pyaOcA00l4FnzOge'
)

const PaymentForm = ({ checkoutToken, shippingData, handleCheckout }) => {
  const products = checkoutToken?.live?.line_items || []
  const totalPrice = checkoutToken?.live?.total?.formatted_with_symbol || 0

  const handleSubmit = async (e, elements, stripe) => {
    console.log(stripe, elements);
    e.preventDefault()
    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })
    if (error) console.log(error)
    else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'International',
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.selectedSubdivision,
          postal_zip_code: shippingData.code,
          country: shippingData.seletedCountry,
        },
        fulfillment: {
          shipping_method: shippingData.selectedShippingOption || null,
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      }

      handleCheckout(checkoutToken.id, orderData)
    }
  }
  return (
    <div className="mt-4">
      {products.length > 0 && (
        <div>
          <span className="font-bold text-lg">Order sumary</span>
          {products.map((product, index) => (
            <div key={index} className="flex items-center justify-between mt-1">
              <div className="flex items-center mb-4">
                <img
                  src={product.media.source}
                  alt="Product"
                  className="w-20"
                />
                <div className="ml-2">
                  <span className="font-bold">{product.name}</span>
                  <br />
                  <span className="text-xs text-gray-500">Quantity:</span>
                  <span> {product.quantity}</span>
                </div>
              </div>
              <div className="font-bold text-lg">
                {product.price.formatted_with_symbol}
              </div>
            </div>
          ))}
          <div>
            Total: <div className="font-bold text-2xl">{totalPrice}</div>
          </div>
          <hr className="my-5" />

          <div>
            <span className="font-bold text-lg">Payment method</span>
            <Elements stripe={stripePromise}>
              <ElementsConsumer>
                {({ elements, stripe }) => (
                  <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                    <CardElement className="my-6" />
                    <div className="flex justify-end">
                      <Link
                        to="/checkout?q=shipping-address"
                        className="btn btn-light"
                      >
                        Back
                      </Link>
                      <button type="submit" className="btn btn-primary">
                        Pay {totalPrice}
                      </button>
                    </div>
                  </form>
                )}
              </ElementsConsumer>
            </Elements>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentForm
