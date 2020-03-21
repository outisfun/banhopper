import React, { useState } from 'react';

let UserProfile = (() => {

  let displayName = '';
  let currentBar = null;

  let getName = () => {
    return displayName;    // Or pull this from cookie/localStorage
  };

  let setName = (name) => {
    displayName = name;
    // Also set this in cookie/localStorage
  };

  let enterBar = (id) => {
    currentBar = id;
    console.log('entered ', currentBar);
  }

  let leaveBar = () => {
    currentBar = null;
  }

  let getBar = () => {
    return currentBar;
  }

  return {
    getName: getName,
    setName: setName,
    getBar: getBar,
    enterBar: enterBar,
    leaveBar: leaveBar
  }

})();

export default UserProfile;
