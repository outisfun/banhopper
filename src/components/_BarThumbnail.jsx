import React from 'react';
import Expandable from './_Expandable';
import MdArrowBack from 'react-ionicons/lib/MdArrowBack';

const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/foobarhopper-app.appspot.com/o/';

const events = [
  {
    name: 'WebCam Karaoke',
    date: '21 April 2020',
    time: '21: 00'
  },
  {
    name: 'WebCam Standup Comedy',
    date: '21 April 2020',
    time: '21: 00',
    who: 'Angel Yanakiev'
  }
]


const BarThumbnail = ({ id, name, description, photoUrl, onLeaveClick }) => {

  const thumbStyle = { backgroundImage: 'url(' + storageUrl + 'bars%2F' + id + '%2F' + photoUrl + '?alt=media)' };

  return (
    <div className="bh-thumbnail">
      <button className="bh-btn bh-btn--leave" onClick={onLeaveClick}>
        <MdArrowBack className="bh-icon bh-icon--sm" />
        Exit
      </button>
      <Expandable>
        <Expandable.Header>
          <div className="bh-thumbnail__image" style={thumbStyle}>
            <h4 className="bh-thumbnail__name">{ name }</h4>
          </div>
        </Expandable.Header>
        <Expandable.Content>
          <div>
            <p className="bh-thumbnail__description">{ description }</p>
          </div>
        </Expandable.Content>
      </Expandable>
    </div>
  )
}

export default BarThumbnail;
