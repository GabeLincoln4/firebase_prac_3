import React, {useState, useEffect} from 'react';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "@firebase/storage";
import {storage} from "./firebase.js";
import axios from 'axios';
import Card from "./components/Card.jsx";


// function createCard(card){
//   <Card 
//     key={card.title} 
//     title={card.title}
//     image={card.image}
//     description={card.description}
//   />
  
// }

function App() {

  const [photo, setPhoto] = useState("");
  const [urlHook, setUrlHook] = useState("");
  const [progress, setProgress] = useState(null);
  const [cards, setCards] = useState({
    title: '',
    image: '',
    description: ''
  });

  // useEffect(function(){
  //   fetch("/cards").then((res) => {
  //     if(res.ok){
  //       return res.json();
  //     }
  //   }).then(jsonRes => setCards(jsonRes))
  // });

  

  // const uploadFiles = (file) => {
  //   //
  //   if (!file) return;
  //   const storageRef = ref(storage, `/files/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

    

  //   uploadTask.on("state_changed", (snapshot) => {
  //     const prog = Math.round(
  //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     );

  //     setProgress(prog);
  //     }, 
  //     (err) => console.log(err),
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref)
  //       .then(url => console.log(url))
  //     }
  //   ); 
  // };

  function handleChange(e){
    const {name, value} = e.target;

    setCards(prevCards => {
      return {
        ...prevCards,
        [name]: value
      }
    })

    console.log(value);
  };

  // const formHandler = (e) => {
    
  //   const file = e.target[0].files;
  //   uploadFiles(file);

    // const newCard = {
    //   title: cards.title,
    //   image: cards.image,
    //   description: cards.description
    // }
    
    // axios.post("http://localhost:5000/createcard", newCard);
    
  // };

  const handleImageChange = e => {
    if (e.target.files[0]){
      setPhoto(e.target.files[0])
    }
  };

  const handleUpload = () => {
    
    const storageRef = ref(storage, `/images/${photo.name}`);
    const uploadTask = uploadBytesResumable(storageRef, photo);
    uploadTask.on(
      "state_changed",
      snapshot =>{},
      error => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            console.log(url);
            setUrlHook(url);
          });
        // storage
        //   .ref("images")
        //   .child(photo.name)
        //   .getDownloadURL()
        //   .then(url => {
        //     console.log(url)
        //   });
      }
    )
  };

  

  console.log("image: ", photo);

  return (
    <div>
      
        {/* <input onChange={handleChange} type="text" name="title" value={cards.title} /> */}
        <input onChange={handleImageChange} type="file" className="input" name="image" />
        {/* <input onChange={handleChange} type="text" name="description" value={cards.description} /> */}
        <button onClick={handleUpload} type="submit">Upload</button>
      
      <hr />

      <h3>Upload {progress} %</h3>
      
    </div>
  );
}

export default App;
