import React, { Component, useContext } from 'react';
import GoogleMapReact from 'google-map-react';
import MdPin from 'react-ionicons/lib/MdPin';
import MdClose from 'react-ionicons/lib/MdClose';
import { BarsContext } from '../providers/BarsProvider';
import { UserContext } from '../providers/UserProvider';

//
import BarMarker from './_BarMarker';
import BarListItem from './_BarListItem';
import LayoutSide from './LayoutSide';

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

    //enterBar(id);
    this.setState({
      activeMarker: Number(index),
      center: {
        lat: lat,
        lng: lng
      }
    })
  }

  _onEnterClick = (id) => {
    const { enterBar } = this.props;
    enterBar(id);
  }
  onEnterClick = this._onEnterClick.bind(this);

  _onListClick = (index, props) => {
    this._onMarkerClick(index, props);
  }
  onListClick = this._onListClick.bind(this);

  render() {
    const { bars } = this.props;

    console.log('bar map component rerenders', bars);

    return (
      <div className="bh-bars">
        <LayoutSide>
          <div className="bh-bars__list">
            <div className="bh-bars__list--inner">
              { bars.map((bar, index) => {
                console.log(bar.friends);
                let onClick = () => {
                  let props = {
                    lat: bar.address.position.lat,
                    lng: bar.address.position.lng,
                    id: bar.id
                  };

                  this.onListClick(index, props);
                }
                let onEnter = () => {
                  this.onEnterClick(bar.id);
                }
                let isActive = (this.state.activeMarker === index);
                return(
                  <BarListItem isActive={isActive} onClick={onClick} onEnter={onEnter} {...bar} />
                )
              }) }
            </div>
          </div>
        </LayoutSide>

        <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
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
              let onEnter = () => {
                this.onEnterClick(bar.id);
              }
              return(
                <BarMarker
                  name={bar.name}
                  id={bar.id}
                  key={index}
                  lat={address.position.lat}
                  lng={address.position.lng}
                  itemIndex = {index}
                  onEnter={onEnter}
                  isActive={(this.activeMarker === Number(index)) ? true : false}
                />
              )
            }) }
          </GoogleMapReact>
        </div>
      </div>
    )
  }
};

const BarMap = () => {
  const bars = useContext(BarsContext);
  const { user, enterBar } = useContext(UserContext);

  return (
    <div>
      <BarMapComponent bars={bars} user={user} enterBar={enterBar} />
    </div>
  )
}

export default BarMap;
