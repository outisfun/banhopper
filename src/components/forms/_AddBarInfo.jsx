
import React, { Component } from 'react';
import LocationPicker from 'react-location-picker';
import NodeGeocoder from 'node-geocoder';

const defaultPosition = {
  lat: 52.52,
  lng: 13.40
};

var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyDymEQyulbBI8LiqGfJ9YKzLUo4jNIjcW0', // for Mapquest, OpenCage, Google Premier
  language: 'en',
  formatter: null
};

const geocoder = NodeGeocoder(options);


class AddBarInfo extends Component {

  state = {
    name: '',
    description: '',
    address: {}
  }

  _validateOnDemand = true;

  _validationCheck() {
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const _state = {
      name: userInput.name,
      description: userInput.description
    };

    this.setState(_state);


  }
  validationCheck = this._validationCheck.bind(this);

  isValidated() {
    console.log('is validated');
    const _state = this.state;

    this.props.updateStore({
      ..._state
    });

    return true;
  }

  _grabUserInput() {
    return {
      name: this.refs.name.value,
      description: this.refs.description.value
    };
  }

  _handleLocationChange ({ position, address, places }) {

    geocoder.reverse({lat: position.lat, lon: position.lng})
      .then((res) => {
        let { address } = this.state;

        console.log(res);

        address.formattedAddress = res[0].formattedAddress;
        address.position = position;

        this.setState({ address });

        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleLocationChange = this._handleLocationChange.bind(this);

  render() {
    return (
      <div className="fb-add-bar--info">
        <form className="fb-form">

          <div className="fb-form__group">
            <label className="fb-form__label">
              Name
            </label>
            <div className="fb-form__field">
              <input
                ref="name"
                autoComplete="off"
                type="text"
                placeholder='Name'
                required
                defaultValue={this.state.name}
                onBlur={this.validationCheck} />
            </div>
          </div>

          <div className="fb-form__group">
            <label className="fb-form__label">
              Description
            </label>
            <div className="fb-form__field">
              <textarea
                ref="description"
                autoComplete="off"
                placeholder='Description'
                required
                defaultValue={this.state.description}
                onBlur={this.validationCheck} />
            </div>
          </div>

          <div className="fb-form__group">
            <label className="fb-form__label">
              Location
            </label>
            <div className="fb-form__field">
              <LocationPicker
                containerElement={ <div className = "fb-add-bar__map--container" /> }
                mapElement={ <div className = "fb-add-bar__map" /> }
                defaultPosition={defaultPosition}
                onChange={this.handleLocationChange} />
            </div>
          </div>

        </form>
      </div>

    )
  }
}

export default AddBarInfo;
