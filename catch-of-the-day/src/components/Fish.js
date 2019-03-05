import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

const Fish = ({
  fish: { name, price, status, desc, image },
  addToOrder,
  index
}) => {
  const isAvailable = status === 'available';

  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button
        type="button"
        onClick={() => addToOrder(index)}
        disabled={!isAvailable}
      >
        {isAvailable ? 'Add To Cart!' : 'Sold Out!'}
      </button>
    </li>
  );
};

export default Fish;

Fish.propTypes = {
  addToOrder: PropTypes.func.isRequired,
  fish: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['available', 'unavailable']).isRequired,
    desc: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.string.isRequired
};
