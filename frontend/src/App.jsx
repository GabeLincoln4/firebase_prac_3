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

  const [progress, setProgress] = useState(0);
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

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target.files;
    uploadFiles(file);

    const newCard = {
      title: cards.title,
      image: cards.image,
      description: cards.description
    }
    
    axios.post("http://localhost:5000/createcard", newCard);
   
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    console.log(file);

    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      setProgress(prog);
      }, 
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then(url => setCards(url))
      }
    ); 
  };

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

  return (
    <div>
      <form onSubmit={formHandler}>
        <input onChange={handleChange} type="text" name="title" value={cards.title} />
        <input type="file" className="input" name="image" />
        <input onChange={handleChange} type="text" name="description" value={cards.description} />
        <button type="submit">Upload</button>
      </form>
      <hr />

      <h3>Upload {progress} %</h3>
      
    </div>
  );
}

export default App;
