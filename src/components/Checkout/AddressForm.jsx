import { useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { commerce } from '../../lib/ecommerce'

const CheckoutAddressForm = ({ checkoutToken }) => {
  const [shippingCountries, setshippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState([])

  useEffect(() => {
    fetchShippingCountries()
  }, [])
  const fetchShippingCountries = async () => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutToken.id
    )
    setshippingCountries(countries || [])
  }
  const methods = useForm()
  const submitForm = () => {}

  return (
    <div className="mt-4">
      Shipping Address
      <FormProvider {...methods}>
        <form
          onSubmit={submitForm}
          className="grid grid-cols-2 grid-rows-3 gap-2 mt-8"
        >
          <div>
            <h2>First name</h2>
            <input
              type="text"
              autofocus
              id="username"
              class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
            />
          </div>
          <div>
            Last name
            <input
              type="text"
              id="username"
              class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
            />
          </div>
          <div>
            Address
            <input
              type="text"
              id="username"
              class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
            />
          </div>
          <div>
            Email
            <input
              type="text"
              id="username"
              class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
            />
          </div>
          <div>
            City
            <input
              type="text"
              id="username"
              class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
            />
          </div>
          <div>
            ZIP / Postal code
            <input
              type="text"
              id="username"
              class="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
            />
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default CheckoutAddressForm
