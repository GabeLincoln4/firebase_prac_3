import { initializeApp } from "firebase/app";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDkwny7p7xJUDPTxg80yde3OU1xXCkS0hY",
    authDomain: "frb-prac-3.firebaseapp.com",
    projectId: "frb-prac-3",
    storageBucket: "frb-prac-3.appspot.com",
    messagingSenderId: "898851074739",
    appId: "1:898851074739:web:a20a4fdb2ea3b93aa9b6c6"
  };

  const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage(firebaseApp);

  export {firebaseApp, storage};

 