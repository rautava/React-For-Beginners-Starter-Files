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

  addFish = fish => {
    const { fishes } = this.state;
    const key = `fish${Date.now()}`;
    fishes[key] = fish;
    this.setState({
      fishes
    });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    const { order } = this.state;
    order[key] = order[key] + 1 || 1;
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
              <Fish
                key={key}
                fish={fishes[key]}
                addToOrder={this.addToOrder}
                index={key}
              />
            ))}
          </ul>
        </div>
        <Order fishes={fishes} order={order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
