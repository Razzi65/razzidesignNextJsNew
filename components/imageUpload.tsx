

// import React, { useState } from 'react';
// import {  ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { storage } from '@/config/firebase';

// const ImageUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadTask, setUploadTask] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const [uploadError, setUploadError] = useState(null);


//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       return; // Handle the case where no file is selected
//     }

//     const fileRef = ref(storage, selectedFile.name);
//     setUploadTask(uploadBytesResumable(fileRef, selectedFile));

//     const unsubscribe = uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         // Update progress bar or UI here
//       },
//       (error) => {
//         setUploadError(error);
//         // Handle errors here
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref)
//           .then((downloadURL) => {
//             setImageUrl(downloadURL);
//           })
//           .catch((error) => {
//             setUploadError(error);
//           });
//       }
//     );

//     // Unsubscribe from listeners when the component unmounts
//     return () => unsubscribe();
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       {selectedFile && <p>Selected file: {selectedFile.name}</p>}
//       {uploadTask && (
//         <p>Upload progress: {uploadTask.snapshot.bytesTransferred}/{uploadTask.snapshot.totalBytes}</p>
//       )}
//       {uploadError && <p>Error: {uploadError.message}</p>}
//       {imageUrl && <img src={imageUrl} alt="Uploaded image" />}
//       <button onClick={handleUpload} disabled={uploadTask}>
//         {uploadTask ? 'Uploading...' : 'Upload'}
//       </button>
//     </div>
//   );
// };

// export default ImageUpload;
