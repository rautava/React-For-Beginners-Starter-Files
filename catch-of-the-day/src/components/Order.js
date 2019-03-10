import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

const Order = class extends React.Component {
  renderOrder = key => {
    const { fishes, order } = this.props;
    const fish = fishes[key];

    if (!fish) return null;

    const count = order[key];
    const isAvailable = fish.status === 'available';

    if (!isAvailable) {
      return <li key={key}>Sorry, {fish.name} is no longer available.</li>;
    }

    return (
      <li key={key}>
        {count} lbs {fish.name} {formatPrice(count * fish.price)}
      </li>
    );
  };

  render() {
    const { fishes, order } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = fishes[key];
      const count = order[key];
      const isAvailable = fish && fish.status === 'available';

      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
};

export default Order;

Order.propTypes = {
  fishes: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string
    })
  ).isRequired,
  order: PropTypes.objectOf(PropTypes.number).isRequired
};
