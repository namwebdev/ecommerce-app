import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, handleAddToCart }) => {
  const image = product.media.source || ''
  const name = product.name || ''
  const price = product.price.formatted_with_symbol || 0
  return (
    <div className="cursor-pointer rounded-md text-black text-2xl font-extrabold hover:shadow-xl transition">
      <Link to="/">
        <div className="h-3/6">
          <img src={image} alt="image" />
        </div>

        <div className="p-2 h-2/6">
          <div className="w-full">{name}</div>
          <div className="flex item-center h-1/5">
            <div className="text-sm align-middle">{price}</div>
            <div className="ml-auto">
              <FontAwesomeIcon
                onClick={() => handleAddToCart(product.id, 1)}
                icon={faShoppingCart}
                size="xs"
                className="text-blue-400 hover:text-gray-600"
              />
              {/* <Spinner /> */}
            </div>
          </div>
        </div>
        <div className="w-full">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buy now
          </button>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
