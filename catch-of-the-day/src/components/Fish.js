import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

const Fish = ({
  fish: { key, name, price, status, desc, image },
  addToOrder
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
        onClick={() => addToOrder(key)}
        disabled={!isAvailable}
      >
        {isAvailable ? 'Add To Cart!' : 'Sold Out!'}
      </button>
    </li>
  );
};

export default Fish;

const fishPropType = PropTypes.shape({
  key: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['available', 'unavailable']).isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
});

export { fishPropType };

Fish.propTypes = {
  addToOrder: PropTypes.func.isRequired,
  fish: fishPropType.isRequired
};
