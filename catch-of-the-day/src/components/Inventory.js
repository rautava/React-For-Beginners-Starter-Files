import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';

const Inventory = ({ addFish, loadSampleFishes }) => (
  <div className="Inventory">
    <h2>Inventory</h2>
    <AddFishForm addFish={addFish} />
    <button type="button" onClick={loadSampleFishes}>
      Load Sample Fishes
    </button>
  </div>
);

export default Inventory;

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired
};
