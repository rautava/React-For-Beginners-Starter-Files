import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import Fish from './Fish';

const Order = class extends React.Component {
  renderOrder = key => {
    const { fishes, order, deleteFromOrder } = this.props;
    const fish = fishes[key];

    if (!fish) {
      return null;
    }

    const count = order[key];
    const isAvailable = fish.status === 'available';

    const text = isAvailable
      ? `${count} lbs ${fish.name} ${formatPrice(count * fish.price)}`
      : `Sorry, ${fish.name} is no longer available.`;

    return (
      <li key={key}>
        {text}
        <button type="button" onClick={() => deleteFromOrder(key)}>
          &times;
        </button>
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
        <ul className="order">{orderIds.map(key => this.renderOrder(key))}</ul>
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
  fishes: PropTypes.objectOf(Fish.propTypes.fish).isRequired,
  order: PropTypes.objectOf(PropTypes.number).isRequired,
  deleteFromOrder: PropTypes.func.isRequired
};
