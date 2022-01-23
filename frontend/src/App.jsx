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
    description: ''
  });

  // useEffect(function(){
  //   fetch("/cards").then((res) => {
  //     if(res.ok){
  //       return res.json();
  //     }
  //   }).then(jsonRes => setCards(jsonRes))
  // });

  function handleChange(e){
    const {name, value} = e.target;

    setCards(prevCards => {
      return {
        ...prevCards,
        [name]: value
      }
    })
   
    
  };

  const handleImageChange = (e) => {
    
    if (e.target.files[0]){
      setPhoto(e.target.files[0])
    }

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
      }
    )

    

  };

  
  function handleUpload(){
    const newCard = {
      title: cards.title,
      image: urlHook,
      description: cards.description
    }
    
    axios.post("http://localhost:5000/createcard", newCard);
  }
  

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input onChange={handleChange} type="text" name="title" value={cards.title} />
        <input onChange={handleImageChange} type="file" className="input" name="image" />
        <input onChange={handleChange} type="text" name="description" value={cards.description} />
        <button type="submit">Upload</button>
      </form>
      <hr />

      <h3>Upload {progress} %</h3>
      
    </div>
  );
}

export default App;
