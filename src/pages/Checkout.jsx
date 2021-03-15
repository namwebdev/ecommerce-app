const CheckoutPage = () => {
  return (
    <div className="shadow-md w-full px-6 py-4">
      Checkout
      <div className="flex items-center justify-between">
        <div className="">
          <span>1</span>
          <span>Shipping address</span>
        </div>
        <div className="divide-y divide-light-blue-400 w-60 h-0.5 bg-gray-500"></div>
        <div>
          <span>2</span>
          <span>Payment details</span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
