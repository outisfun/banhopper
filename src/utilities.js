import { firestore } from './firebase.js';

export const collectIdsAndDocs = doc => {
  let _u = doc ? (doc.data() ? doc.data() : {}) : {};
  _u.id = doc ? doc.id : '';
	return { ..._u };
}

export const getDocRef = (collectionId, docId) => {
  return firestore.doc(`${collectionId}/${docId}`);
}

export const getImageSize = () => {
  let size = 'sm';
  if (window.innerWidth > 1600) {
    size = 'xl';
  } else if (window.innerWidth > 1200) {
    size = 'lg';
  } else if (window.innerWidth > 768) {
    size = 'md';
  }

  return size;
}

// export const getFeaturedImageUrl = (imageName, postType, postId, size) => {

//   //const storageUrl = 'https://firebasestorage.googleapis.com/v0/b/urbid-app.appspot.com/o/';
//   if (!imageName) {
//     console.error('no imageUrls passed to utilities');
//     return;
//   }
//   const imageUrl = storageUrl + postType + '%2F' + postId + '%2Fresized%2F' + getResizedImageName(imageName, size) + '?alt=media';
//   return imageUrl;
// }

export const getResizedImageName = ( imageName, size ) => {

  let extension = '';

  switch (size) {
    case 'sm':
      extension = '400x400';
      break;
    case 'md':
      extension = '600x600';
      break;
    case 'lg':
      extension = '1200x1200';
      break;
    case 'xl':
      extension = '1600x1600';
      break;
    default:
      extension = '400x400';
      break;
  }

  const resizedImageName = imageName.replace('.jpg', '_' + extension + '.jpg').replace('.png', '_' + extension + '.png');
  return resizedImageName;
}



