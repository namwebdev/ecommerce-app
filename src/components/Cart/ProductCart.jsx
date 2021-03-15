import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductCart = ({
  product,
  handleUpdateQuantity,
  handleRemoveProduct,
}) => {
  const id = product.id || ''
  const image = product.media.source || ''
  const name = product.name || ''
  const totalPrice = product.line_total.formatted_with_symbol || 0
  const quantity = product.quantity || 0

  return (
    <div className="flex rounded-sm w-full hover:shadow-md py-2 px-6 mb-1">
      <div className="w-20">
        <img src={image} alt="Preview" />
      </div>
      <div className="w-30 pl-3">
        <div className="text-md font-bold">{name}</div>
        <div className="text-sm">{totalPrice}</div>
      </div>
      <div className="ml-auto w-20">
        <div className="flex items-center justify-around">
          <span
            className="cursor-pointer"
            onClick={() => handleUpdateQuantity(id, quantity - 1)}
          >
            <FontAwesomeIcon icon={faMinus} />
          </span>
          <span className="font-bold">{quantity}</span>
          <span
            className="cursor-pointer"
            onClick={() => handleUpdateQuantity(id, quantity + 1)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>
        <div className="text-center mt-2">
          <button
            className="bg-red-500 text-white text-xs p-1 rounded-md"
            onClick={() => handleRemoveProduct(id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCart
