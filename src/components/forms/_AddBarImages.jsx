
import React, { Component } from 'react';
import FileUploader from './_FileUploader';

class AddBarImages extends Component {

  state = {
    imageUrls: []
  };

  isValidated() {
    let isDataValid = false;

    if (this.state.imageUrls.length > 0) {
      this.props.updateStore({
        ...this.state,
        savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
      });
      isDataValid = true;
    } else {
      this.setState({ canSubmit: false });
      isDataValid = false;
    }

    console.log('runing is validated on images ');

    return true;
  }

  _onUpload(filenames) {
    this.setState({
      imageUrls: filenames
    });
  }
  onUpload = this._onUpload.bind(this);

  render() {

    const { id } = this.props;
    const { imageUrls, isUploading } = this.state;

    return (
      <div className="urb-add__form__step step--0">
        <form>
          { id &&
            <FileUploader
              id={id}
              onUpload={this.onUpload}
          /> }
        </form>
      </div>
    )
  }
}

export default AddBarImages;
