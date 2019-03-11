import React from 'react';
import PropTypes from 'prop-types';
import { fishPropType } from './Fish';

const EditFishForm = class extends React.Component {
  handleChange = event => {
    event.preventDefault();
    const { updateFish, fish } = this.props;
    const { name, value } = event.currentTarget;

    if (name === 'price') {
      fish[name] = parseFloat(value);
    } else {
      fish[name] = value;
    }

    updateFish(fish);
  };

  render() {
    const {
      deleteFish,
      fish: { key, name, status, price, desc, image }
    } = this.props;

    return (
      <div className="fish-edit" name={key}>
        <input
          type="text"
          onChange={this.handleChange}
          name="name"
          value={name}
        />
        <input
          type="number"
          onChange={this.handleChange}
          name="price"
          value={price}
        />
        <select onChange={this.handleChange} name="status" value={status}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea onChange={this.handleChange} name="desc" value={desc} />
        <input
          type="text"
          onChange={this.handleChange}
          name="image"
          value={image}
        />
        <button type="button" onClick={() => deleteFish(key)}>
          Remove Fish
        </button>
      </div>
    );
  }
};

export default EditFishForm;

EditFishForm.propTypes = {
  updateFish: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
  fish: fishPropType.isRequired
};
