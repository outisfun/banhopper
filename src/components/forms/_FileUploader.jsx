
import React, { Component }  from 'react';
import FileUploader from "react-firebase-file-uploader";
import { storage, storageUrl } from '../../firebase.js';
import MdAdd from 'react-ionicons/lib/MdAdd';

const LoadingThumb = ({ index }) => {
  return (
    <div key={`loading-thumb--${index}`} className="lds-ring"><div></div><div></div><div></div><div></div></div>
  )
}

const FileUploaderOverlayThumb = ({ url }) => {

  if (!url) {
    console.error('no url passed to overlay thumb');
    return;
  }

  const thumbStyle = (url.includes(".pdf")) ? { backgroundColor: 'green' } : { backgroundImage: 'url(' + url + ')' };
  return <div className='urb-file-uploader__overlay__thumb' style={thumbStyle}></div>

}

class BHFileUploader extends Component {

  state = {
    urls: [],
    filenames: [],
    isUploading: false
  }

  uploadsInProgress = 0;

  get storageRef() {
    const { id } = this.props;
    return storage.ref().child(`bars/${id}`);
  }

  createLoaders = () => {
    let loaders = [];
    for (let i = 1; i <= this.uploadsInProgress; i+=1 ) {
      loaders.push(<LoadingThumb index={i} />);
    }
    return loaders;
  }

  handleUploadError = error => {
    this.setState({ isUploading: false });
  };

  handleUploadStart = () => {
    this.uploadsInProgress += 1;
    this.setState({ isUploading: true });
  }

  handleUploadSuccess = async filename => {
    const { id, onUpload } = this.props;
    const url = await this.storageRef
                            .child(filename)
                            .getDownloadURL();

    this.uploadsInProgress -= 1;
    this.setState(oldState => ({
      filenames: [...oldState.filenames, filename],
      urls: [...oldState.urls, url],
      isUploading: (this.uploadsInProgress === 0)
    }), () => {onUpload(this.state.filenames)} );
  };

  render() {
    const { id } = this.props;
    const { filenames, urls } = this.state;


    return (
      <div className="urb-file-uploader">

        <div className = "urb-file-uploader__overlay">
          <div className = "urb-file-uploader__overlay__prompt">
            <MdAdd className = "urb-icon urb-icon--md" />
            <span>add</span>
          </div>
          <div className = "urb-file-uploader__overlay__thumbs">
            { urls && urls.map((url, index) => <FileUploaderOverlayThumb key={`uploader-thumb--${index}`} url={url} />) }
            { (this.uploadsInProgress > 0) && this.createLoaders() }
          </div>
        </div>

        <FileUploader
          accept="application/pdf, image/*"
          name="image-uploader"
          randomizeFilename
          storageRef={this.storageRef}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          multiple
        />
      </div>
    );
  }
}

export default BHFileUploader;
