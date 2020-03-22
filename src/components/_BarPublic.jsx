import React from 'react';
import Expandable from './_Expandable';
import _ from 'lodash';

import User from './User';
import BarFeed from './_BarFeed';

const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/foobarhopper-app.appspot.com/o/';

const drinks = [
  'Wine', 'Beer', 'Cognac', 'Atlantic', 'Whiskey', 'Vodka', 'Aperol Spritz'
]

const avatarUrl = 'https://zeroattentionspan.net/zas/avatars/';

const barhoppers = [
  {
    name: 'Des Punkarova',
    avatar: 'desi.jpg'
  },
  {
    name: 'Dimitar Tanchev',
    avatar: 'typ.jpg'
  },
  {
    name: 'Plamena Avramova',
    avatar: 'plam.jpg'
  },
  {
    name: 'Psihopat',
    avatar: 'roman.jpg'
  },
  {
    name: 'Keri Cross',
    avatar: 'keri.jpg'
  },
  {
    name: 'Ksetka fon Teip',
    avatar: 'kse.jpg'
  },
  {
    name: 'Nashite',
    avatar: 'vasevi.jpg'
  },
  {
    name: 'Antonina Ilieva',
    avatar: 'anta.jpg'
  },
  {
    name: 'Dimityr Mehandzhiev',
    avatar: 'mitko.jpg'
  }
];

const avatars = [
];

let currentBarhoppers = [];
let friends = [];
let numberOfBarhoppers = _.random(barhoppers.length);
let numberOfFriends = _.random(5);

for (var i = 0; i < numberOfBarhoppers; i += 1) {
  let b = barhoppers[_.random(barhoppers.length - 1)];
  let name = b.name;
  let avatar = avatarUrl + b.avatar;
  let drink = drinks[_.random(drinks.length) - 1];

  let banhopper = { name, drink };
  currentBarhoppers.push(banhopper);
}
for (var i = 0; i < numberOfFriends; i += 1) {
  let b = barhoppers[_.random(barhoppers.length - 1)];
  let name = b.name;
  let avatar = avatarUrl + b.avatar;
  let drink = drinks[_.random(drinks.length) - 1];

  let friend = { name, avatar, drink };
  friends.push(friend);
}



const BarPublic = ({ id, backgroundImage }) => {
  const thumbStyle = { backgroundImage: 'url(' + storageUrl + 'bars%2F' + id + '%2F' + backgroundImage + '?alt=media)' };
  return (
    <div className="bh-public" style={thumbStyle}>
      <div className="bh-public--inner">

        <BarFeed />

        <div className="bh-public__barhoppers">
          <div className="bh-public__barhoppers__group friends">
            <div className="bh-public__barhoppers--inner">
              <h6>Your friends here: </h6>
              { friends && friends.map(barhopper =>
                <div className="friend">
                  <User displayName={barhopper.name} imageUrl={barhopper.avatar} />
                  <small>drinking {barhopper.drink}</small>
                </div>
              )}
            </div>
          </div>

          <div className="bh-public__barhoppers__group">
            <div className="bh-public__barhoppers--inner">
              <h6>All banhoppers: </h6>
              { currentBarhoppers && currentBarhoppers.map(barhopper =>
                <div className="stranger">
                  <User displayName={barhopper.name} imageUrl={barhopper.avatar} />
                </div>
              )}
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default BarPublic;
