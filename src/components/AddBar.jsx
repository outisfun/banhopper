import React, { Component } from 'react';
import { firestore } from '../firebase.js';
import StepZilla from "react-stepzilla";

import AddBarInfo from './forms/_AddBarInfo';
import AddBarThankYou from './forms/_AddBarThankYou';

const defVals = {
  name: '',
  description: '',
  address: {
    formattedAddress: '',
    position: {
      lat: 0,
      lng: 0
    }
  },
  countPledges: 0
}

class AddBar extends Component {

  state = {
    currentStep: 0,
    barId: null
  }

  sampleStore = defVals;

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    }

    console.log('update sample store at step ', this.state.currentStep, this.sampleStore, update);

    if (this.state.currentStep === 0) {
      this.uploadToFB();
    }
  }

  uploadToFB() {
    const bar = this.sampleStore;

    firestore.collection('bars')
      .add(bar)
      .then((docRef) => {
        console.log('did it');
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

    this.sampleStore = defVals;

  }

  render() {
    const steps = [
      {
        name: "Add name, description and location",
        component:
          <AddBarInfo
            getStore={() => (this.getStore())}
            updateStore={(u) => {this.updateStore(u)}} />
      },
      {
        name: "Благодарим!",
        component:
          <AddBarThankYou />
      }
    ]

    return (
      <div className="fb-add-bar">
        <h1>add bar</h1>
        <StepZilla
          steps={steps}
          preventEnterSubmission={true}
          nextTextOnFinalActionStep='final!'
          prevBtnOnLastStep={false}
          stepsNavigation={false}
          onStepChange={step => {
              this.setState({ currentStep: step });
              window.sessionStorage.setItem("step", step);
            }
          }
        />
      </div>
    );
  }
};

export default AddBar;
