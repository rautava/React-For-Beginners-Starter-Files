import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Fish from './Fish';

const Inventory = ({
  addFish,
  updateFish,
  deleteFish,
  loadSampleFishes,
  fishes
}) => (
  <div className="Inventory">
    <h2>Inventory</h2>
    {Object.keys(fishes).map(key => (
      <EditFishForm
        key={key}
        updateFish={updateFish}
        deleteFish={deleteFish}
        fish={fishes[key]}
      />
    ))}
    <AddFishForm addFish={addFish} />
    <button type="button" onClick={loadSampleFishes}>
      Load Sample Fishes
    </button>
  </div>
);

export default Inventory;

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
  loadSampleFishes: PropTypes.func.isRequired,
  fishes: PropTypes.objectOf(Fish.propTypes.fish).isRequired
};
