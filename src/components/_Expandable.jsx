import React, { Component } from 'react';
import MdArrowDropdown from 'react-ionicons/lib/MdArrowDropdown';

class Expandable extends Component {

  static Header = ({ children, onClick }) =>
    (<button className="bh-expandable__header" onClick={onClick}>
      {children}
      <MdArrowDropdown className="bh-icon bh-icon--xs" />
    </button>);

  static Content = ({ children }) =>
    (<div className="bh-expandable__content">
      <div className="bh-expandable__content--inner">
        {children}
      </div>
    </div>);

  state = {
    isExpanded: false
  }

  _toggle() {
    console.log('toggle', this);
    if (this) {
      this.setState({
        isExpanded: !this.state.isExpanded
      });
    }
  }
  toggle = this._toggle.bind(this);

  render() {

    const { children } = this.props;
    const { isExpanded } = this.state;
    const cls = isExpanded ? 'is--expanded' : '';

    return (
      <div className={`bh-expandable ${cls}`}>
        {
          React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {onClick: this.toggle});
          })
        }
      </div>
    );
  }
}

export default Expandable;
