import React from 'react';
import Expandable from './_Expandable';
import MdPlay from 'react-ionicons/lib/MdPlay';

const BarPlaylist = () => {

  return (
    <div className="bh-playlist">
      <Expandable>
        <Expandable.Header>
          <div className="bh-title">
            <MdPlay className="bh-icon bh-icon--sm" />
            <div>
              <p className="bh-label">Currently playing: </p>
              <p><span>The Same Mistakes</span> by <span>The Echo Friendly</span></p>
            </div>
          </div>
        </Expandable.Header>
        <Expandable.Content>
          <iframe src="https://open.spotify.com/embed/playlist/46h9bcOU61iMWZHDjfqdy9" width="600" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </Expandable.Content>
      </Expandable>
    </div>
  )
}

export default BarPlaylist;
