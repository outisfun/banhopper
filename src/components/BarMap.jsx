import React, { Component, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import MdPin from 'react-ionicons/lib/MdPin';
import MdClose from 'react-ionicons/lib/MdClose';
import { BarsContext } from '../providers/BarsProvider';
import { UserContext } from '../providers/UserProvider';

const defVals = {
  name: '',
  description: '',
  address: {
    formattedAddress: '',
    position: {
      lat: 0,
      lng: 0
    }
  }
}

const BarMarker = ({ isActive, itemIndex, name }) => {
  const cls = isActive ? 'is--active' : '';

  return (
    <div className = {`fb-marker ${cls}`}>
      <MdPin
        color ={isActive ? 'red' : 'blue'}
        fontSize = {isActive ? '42px' : '30px'}
      />
      <div className="fb-marker__window">
        <div className="fb-marker__window__header">
          <h5>{name}</h5>
          <button className="bh-btn bh-btn--icon"><MdClose /></button>
        </div>
        <div className="fb-marker__window__content">
          <span className="fb-label">Your friends here: </span>
        </div>
        <div className="fb-marker__window__footer">
          <button className="bh-btn bh-btn--full bh-btn--enter">enter</button>
        </div>
      </div>
    </div>
  )
}

class BarMapComponent extends Component {

  static defaultProps = {
    zoom: 14,
    center: {
      lat: 52.52,
      lng: 13.40
    }
  };

  state = {
    activeMarker: null,
    center: {
      lat: 52.52,
      lng: 13.40
    }
  }

  createMapOptions = (maps) => {
    return {
      panControl: false,
      mapTypeControl: false,
      scrollwheel: false,
      clickableIcons: false,
      styles: [{ stylers: [{ 'saturation': -100 }, { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
    }
  }

  updateActiveMarker = (index) => {
    this.activeMarker = index;
  }

  _onMarkerClick = (index, props) => {
    // this.isMarkerChanged = true;
    this.updateActiveMarker(Number(index));
    const { lat, lng, id } = props;
    const { user, enterBar } = this.props;
    console.log('on marker', this.props);
    enterBar(id);

    this.setState({
      activeMarker: Number(index),
      center: {
        lat: lat,
        lng: lng
      }
    })
  }

  render() {
    const { bars } = this.props;

    console.log('bar map component rerenders');

    return (
      <div style={{ height: 'calc(90vh - 90px)', width: '100%', position: 'relative' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDLJR14hApMiSCahjE4iiDZkhrHbLZGhm4' }}
          defaultCenter={this.props.center}
          center={this.state.center}
          defaultZoom={this.props.zoom}
          options = {this.createMapOptions}
          onChildClick = {this._onMarkerClick}
        >
          { bars.map((bar, index) => {
            const { address } = bar;
            return(
              <BarMarker
                name={bar.name}
                id={bar.id}
                key={index}
                lat={address.position.lat}
                lng={address.position.lng}
                itemIndex = {index}
                isActive={(this.activeMarker === Number(index)) ? true : false}
              />
            )
          }) }
        </GoogleMapReact>
      </div>
    )
  }
};

const BarMap = () => {
  const bars = useContext(BarsContext);
  const { user, enterBar } = useContext(UserContext);
  const bar = user ? user.currentBar : 'my bar';
  console.log('bar map rerenders');

  return (
    <div>
      <h1>this is { bar }</h1>
      <BarMapComponent bars={bars} user={user} enterBar={enterBar} />
    </div>
  )
}

export default BarMap;
