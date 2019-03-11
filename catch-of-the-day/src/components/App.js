import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        storeId: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    const localStorageRef = localStorage.getItem(params.storeId);

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
  }

  componentDidUpdate() {
    const {
      match: { params }
    } = this.props;

    const { order } = this.state;

    localStorage.setItem(params.storeId, JSON.stringify(order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  saveFishToState = (key, fish) => {
    const { fishes } = this.state;
    fishes[key] = fish;
    this.setState({
      fishes
    });
  };

  addFish = fish => {
    const key = `fish${Date.now()}`;
    this.saveFishToState(key, { ...fish, key });
  };

  updateFish = fish => {
    this.saveFishToState(fish.key, fish);
  };

  deleteFish = key => {
    this.deleteFromOrder(key);
    this.saveFishToState(key, null);
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    const { order } = this.state;
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  deleteFromOrder = key => {
    const { order } = this.state;
    delete order[key];
    this.setState({ order });
  };

  render() {
    const { fishes, order } = this.state;

    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(fishes).map(key => (
              <Fish key={key} fish={fishes[key]} addToOrder={this.addToOrder} />
            ))}
          </ul>
        </div>
        <Order
          fishes={fishes}
          order={order}
          deleteFromOrder={this.deleteFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={fishes}
        />
      </div>
    );
  }
}

export default App;
