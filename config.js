// Initialize Firebase
var firebaseConfig = {
  apiKey: 'AIzaSyDUB0P0Td-EmzLAL33Q0VooUi0iCSODELo',
  authDomain: 'localhost',
  projectId: 'mydocs-cfae3',
};
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
var db = firebase.firestore();