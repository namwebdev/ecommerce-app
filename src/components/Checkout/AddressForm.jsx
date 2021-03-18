import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { commerce } from '../../lib/ecommerce'
import { Link } from 'react-router-dom'

const CheckoutAddressForm = ({ checkoutToken, handleNext }) => {
  const [shippingCountries, setshippingCountries] = useState({})
  const [seletedCountry, setSelectedCountry] = useState(null)
  const [shippingSubdivisions, setShippingSubdivisions] = useState({})
  const [selectedSubdivision, setSelectedSubdivision] = useState(null)
  const [shippingOptions, setShippingOptions] = useState([])
  const [selectedShippingOption, setselectedShippingOption] = useState(null)

  useEffect(() => {
    fetchShippingCountries()
  }, [])
  useEffect(() => {
    fetchSubdivisions()
  }, [seletedCountry])
  useEffect(() => {
    fetchShippingOptions()
  }, [selectedSubdivision])

  const fetchShippingCountries = async () => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutToken.id
    )
    if (countries) {
      setshippingCountries(countries)
      setSelectedCountry(Object.keys(countries)[0])
    }
  }
  const fetchSubdivisions = async () => {
    if (seletedCountry) {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        seletedCountry
      )
      if (subdivisions) {
        setShippingSubdivisions(subdivisions)
        setSelectedSubdivision(Object.keys(subdivisions)[0])
      }
    }
  }
  const fetchShippingOptions = async () => {
    if (seletedCountry && selectedSubdivision) {
      const options = await commerce.checkout.getShippingOptions(
        checkoutToken.id,
        { country: seletedCountry, region: selectedSubdivision }
      )

      if (options) {
        setShippingOptions(options)
        setselectedShippingOption(options[0]?.id || null)
      }
    }
  }

  const selectCountryHandler = (e) => {
    setSelectedCountry(e.target.value)
  }
  const selectSubdivisionHandler = (e) => {
    setSelectedSubdivision(e.target.value)
  }
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data) => {
    handleNext({
      ...data,
      seletedCountry,
      selectedSubdivision,
    })
  }

  return (
    <div className="mt-4">
      Shipping Address
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div className="grid grid-cols-2 grid-rows-3 gap-2">
          <div>
            <h2>First name</h2>
            <input
              ref={register({ required: true })}
              type="text"
              autoFocus
              name="firstName"
              className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
            />
            {errors.firstName && (
              <span className="text-red-400 text-xs italic">
                This field is required
              </span>
            )}
          </div>
          <div>
            <h2>Last name</h2>
            <input
              ref={register({ required: true })}
              type="text"
              name="lastName"
              className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
            />
            {errors.lastName && (
              <span className="text-red-400 text-xs italic">
                This field is required
              </span>
            )}
          </div>
          <div>
            <h2>Address</h2>
            <input
              ref={register({ required: true })}
              type="text"
              name="address"
              className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
            />
            {errors.address && (
              <span className="text-red-400 text-xs italic">
                This field is required
              </span>
            )}
          </div>
          <div>
            <h2>Email</h2>
            <input
              ref={register({ required: true })}
              type="text"
              name="email"
              className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
            />
            {errors.email && (
              <span className="text-red-400 text-xs italic">
                This field is required
              </span>
            )}
          </div>
          <div>
            <h2>City</h2>
            <input
              ref={register({ required: true })}
              type="text"
              name="city"
              className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
            />
            {errors.city && (
              <span className="text-red-400 text-xs italic">
                This field is required
              </span>
            )}
          </div>
          <div>
            <h2>ZIP / Postal code</h2>
            <input
              ref={register({ required: true })}
              type="text"
              name="code"
              className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
            />
            {errors.code && (
              <span className="text-red-400 text-xs italic">
                This field is required
              </span>
            )}
          </div>
          {Object.keys(shippingCountries).length > 0 && (
            <div>
              <h2>Country</h2>
              <select className="w-full mt-2" onChange={selectCountryHandler}>
                {Object.keys(shippingCountries).length > 0 &&
                  Object.keys(shippingCountries).map((countryCode, index) => (
                    <option key={index} value={countryCode}>
                      {shippingCountries[countryCode]}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {Object.keys(shippingSubdivisions).length > 0 && (
            <div>
              <h2>Subdivision</h2>
              <select className="w-full mt-2" onChange={selectSubdivisionHandler}>
                {Object.keys(shippingSubdivisions).map(
                  (subdivisionCode, index) => (
                    <option key={index} value={subdivisionCode}>
                      {shippingSubdivisions[subdivisionCode]}
                    </option>
                  )
                )}
              </select>
            </div>
          )}
        </div>
        <div className="text-right w-full mt-6">
          <Link to="/cart" className="btn btn-light">
            Back to Cart
          </Link>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

export default CheckoutAddressForm
