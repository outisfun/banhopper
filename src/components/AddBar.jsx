import React, { Component } from 'react';
import { firestore } from '../firebase.js';
import StepZilla from "react-stepzilla";

import AddBarInfo from './forms/_AddBarInfo';
import AddBarImages from './forms/_AddBarImages';
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
  imageUrls: [],
  countPledges: 0
}

class AddBar extends Component {

  state = {
    id: null,
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

    if (this.state.currentStep === 0) {
      this.uploadToFB();
    }

    const { imageUrls } = this.sampleStore;

    if (this.state.currentStep === 1) {
      const bar = this.sampleStore;

      firestore.doc(`bars/${this.state.id}`).update(bar);
      this.sampleStore = defVals;
    }
  }

  uploadToFB() {
    firestore.collection('bars')
      .add({ })
      .then((docRef) => {
        this.setState({ id: docRef.id });
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
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
        name: "Add images",
        component:
          <AddBarImages
            id={this.state.id}
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
