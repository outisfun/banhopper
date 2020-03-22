import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import User from './User';
import _ from 'lodash';

const storageUrl = 'https://zeroattentionspan.net/zas/avatars/';

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

const images = [
  'b1.jpg', 'b2.jpg', 'b3.jpg', 'b4.jpg', 'b5.jpg'
];

const messages = [
  'Да се лее!!!',
  'Не излизай!',
  'Спри, безумец! Нова шума ще расте богато. Аз ти давам честна дума, пак ще дойде лято.',
  'И това ще мине.',
  'На този етап вече не съм в Кичука, Кичука е в мен.',
  'Кичука ли се пише или Кючука?',
  'Наздраве!',
];

const BarFeedItem = ({ image, message, user }) => {
  return (
    <div className="bh-feed__item">
      <div className="bh-feed__user">
        <User displayName={user.name} imageUrl={storageUrl + user.avatar} />
        <small>today, 04:48</small>
      </div>
      { image &&
        <img src={image} alt='party' />
      }
      <p className="msg">{message}</p>

    </div>
  )
}

const BarFeed = () => {

  let height = 500;
  let itemsCount = 10;

  let items = [];

  for (var i=0; i<itemsCount; i+= 1) {
    const hasImage = (_.random(10) > 3);
    const image = storageUrl + images[_.random(images.length - 1)];
    const user = barhoppers[_.random(barhoppers.length-1)];
    const message = messages[_.random(messages.length-1)];

    let item = { user, message };
    if (hasImage) { item.image = image };
    items.push(item);
  }

  return (
    <div className="bh-public__feed bh-feed">
      <div className="bh-feed--inner">
        <Scrollbars style={{ height: (window.innerHeight) }}>
          <ul>
            { items.map((item, index) =>
              <BarFeedItem {...item} />
            )}
          </ul>
        </Scrollbars>
      </div>
    </div>
  )
}

export default BarFeed;
