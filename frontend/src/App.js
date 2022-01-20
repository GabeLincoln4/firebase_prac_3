function App() {

  function formHandler(e){
    e.preventDefault();
    const file = e.target[0].files[0];
    console.log(file);
  };

  return (
    <div>
      <form onSubmit={formHandler}>
        <input type="file" className="input" />
        <button type="submit">Upload</button>
      </form>
      <hr />
    </div>
  );
}

export default App;
