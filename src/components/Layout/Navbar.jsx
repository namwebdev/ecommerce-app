import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Navbar = ({ cart }) => {
  const totalItem = cart.total_items || 0

  return (
    <nav className="fixed flex items-center w-full bg-white px-8 py-2 shadow-md">
      <div className="-mb-px flex justify-center">
        <Link
          className="no-underline text-teal-dark border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8"
          to="/"  
        >
          Home
        </Link>
        <a
          className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
          href="#"
        >
          Products
        </a>
      </div>
      <Link to="/cart" className="ml-auto relative">
        <FontAwesomeIcon
          icon={faShoppingCart}
          className="text-blue-500 cursor-pointer "
        />
        {totalItem > 0 && (
          <span className="absolute text-xs bg-red-500 text-white -top-1 rounded-full px-1">
            {totalItem}
          </span>
        )}
      </Link>
    </nav>
  )
}

export default Navbar
