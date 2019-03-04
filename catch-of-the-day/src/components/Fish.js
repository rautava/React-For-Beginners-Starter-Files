import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

const Fish = ({ fish }) => (
  <li className="menu-fish">
    <img src={fish.image} alt={fish.name} />
    <h3 className="fish-name">
      {fish.name}
      <span className="price">{formatPrice(fish.price)}</span>
    </h3>
    <p>{fish.desc}</p>
    <button type="button">Add To Cart</button>
  </li>
);

export default Fish;

Fish.propTypes = {
  fish: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['available', 'unavailable']).isRequired,
    desc: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};
