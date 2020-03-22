import React from 'react';
import Expandable from './_Expandable';

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

const BarEvents = () => {

  return (
    <div className="bh-events">
      <Expandable>
        <Expandable.Header>
          <h6 className="bh-title">Upcoming events ({events.length})</h6>
        </Expandable.Header>
        <Expandable.Content>
          <ul>
          { events && events.map((event, index) => {
            return (
              <li className="bh-event">
                <div className="bh-event__name">
                  <p className="bh-title--small">
                    {event.name}
                  </p>
                  <small>{event.date}, {event.time}</small>
                </div>
                {event.who && <div className="bh-event__details">
                  <div className="bh-detail">
                    <p className="bh-label">Hosted by</p>
                    <p>{event.who || '-'}</p>
                  </div>
                </div>}
                <button className="bh-event__rsvp">RSVP</button>
              </li>
            )
          })}
          </ul>
        </Expandable.Content>
      </Expandable>
    </div>
  )
}

export default BarEvents;
