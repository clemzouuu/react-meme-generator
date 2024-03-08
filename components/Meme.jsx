
import React, { useState, useEffect } from 'react' 
import DraggableDiv from "./DraggableDiv"  
import html2canvas from 'html2canvas';

let url

export default function Meme() {

  // By default, the top and bottom texts are empty and an image displayed on the screen
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'images/troll-face.png',
  })

  const [allMemes, setAllMeme] = useState([])

  const [topTextPosition, setTopTextPosition] = useState({ x: 0, y: 0 });
  const [bottomTextPosition, setBottomTextPosition] = useState({ x: 0, y: 0 });

  // At the loading of the page, a fetch is made only once to an API. 
  // The data that comes back is then used to display a new random image.
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => setAllMeme(data.data.memes))
    
  }, [])

  // When the button is clicked, a random image is displayed on the screen based on the data that cames back from the API which is stored on the allMemes State.
  // The url of the image is taken from a random number. This url replaces the url from the meme State
  function getMemeImage() {

    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url =
      allMemes[randomNumber].url 
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }))
  }

  // This function allows the top and bottom text from the meme State to be equal to what the user is typing.
  // The state's value is changing everytime the user types characters.
  function handleChange(event) {
    const { name, value } = event.target
    setMeme(prevValue => ({
      ...prevValue,
      [name] : [value]
    }))
  } 

  function updateTopTextPosition(newPosition) {
    setTopTextPosition(newPosition); 
  }
  
  function updateBottomTextPosition(newPosition) {
    setBottomTextPosition(newPosition);
  }

  function saveMeme() {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.crossOrigin = "anonymous";
    image.src = meme.randomImage;

    image.onload = () => {
      const topText = meme.topText[0].toUpperCase();
      const bottomText = meme.bottomText[0].toUpperCase();
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      ctx.fillStyle = textColor ? 'black' : 'white'; 
      ctx.font = `${increaseFontSizeState}em ${changeFontFamilyState[numberForLoopingInArray]}`;
      if(topText != "")
        ctx.fillText(topText, topTextPosition.x+350, topTextPosition.y+70);
      if(bottomText != "")
        ctx.fillText(bottomText, bottomTextPosition.x+200, bottomTextPosition.y+350);
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL();
      link.click();
  };
  }

  function handleImageUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.addEventListener("load", () => {
      // Mettre à jour l'état avec l'URL de l'image
      setMeme((prevMeme) => ({
        ...prevMeme,
        randomImage: reader.result
      }));
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  // Set two states that will allow us to increase or decrase the font size
  // Font size initialize at 1.2em
  // The state of decraseFontSizeState is inizialize with the current font size that is used
  const [increaseFontSizeState, setIncreaseFontSizeState] = useState(1.2)

  const [decreaseFontSizeState, setDecreaseFontSizeState] = useState(increaseFontSizeState)

  const [changeFontFamilyState, setChangeFontFamilyState] = useState(['sans-serif','Georgia', 'Gill Sans', 'cursive'])

  const [numberForLoopingInArray, setnumberForLoopingInArray] = useState(0)

  const [textColor, setTextColor] = useState(true)

  function changeFontSize() {
    if(numberForLoopingInArray >= 3) {
      setnumberForLoopingInArray(0)
    } else {
      setnumberForLoopingInArray(numberForLoopingInArray + 1)
    } 
  }

  function increaseFontSize() {
    setIncreaseFontSizeState(prevValue => prevValue + .1)
  }

  function decreaseFontSize() {
    setIncreaseFontSizeState(prevValue => prevValue - .1)
  }

  function changeTextColor(){
    setTextColor(prevValue => !prevValue)
  }

  let decreaseFontSizeStyle = {fontSize: `${increaseFontSizeState}em`, fontFamily:`${changeFontFamilyState[numberForLoopingInArray]}`}

  let increaseFontSizeStyle = {fontSize: `${increaseFontSizeState}em`, fontFamily:`${changeFontFamilyState[numberForLoopingInArray]}`}
 

 
  return (
    <main id="main">
    
      <div id="form">
        <div id="submit-text">
          <input
            type="text"
            id="inputLeft"
            placeholder="Top text"
            name="topText"
            onChange={handleChange}
            value={meme.topText} 
          />

          <input
            type="text"
            id="inputRight"
            placeholder="Bottom text"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
        </div>

        <br />
        <input
          onClick={getMemeImage}
          type="button"
          value="Get a new meme image 🖼"
          id="submit"
        />

        <br />
        <br />

        <div className="meme">
          <img
            src={meme.randomImage}
            alt="random meme"
            className="meme--image"
          />

        <canvas id="memeCanvas" style={{display: 'none'}}></canvas>

          <div className="initialPositionTop">
            <DraggableDiv 
              style={increaseFontSizeStyle}
              text={meme.topText}
              isItBlack={textColor}
              updatePosition={updateTopTextPosition}
            />
          </div>
           
          <div className="initialPositionBottom">
            <DraggableDiv 
              style={increaseFontSizeStyle}
              text={meme.bottomText}
              isItBlack={textColor}
              updatePosition={updateBottomTextPosition}
            />
          </div>
        </div>

        <br />

        <div className="fontSize">
          <p className='fontSizeBorder one' onClick={increaseFontSize}>Increase font size</p>
          <br />
          <p className='fontSizeBorder two' onClick={decreaseFontSize}>Decrease font size</p>
          <br />
          <button id="submit" className='three' onClick={changeFontSize}>Change font family</button>
          <br />
          <button id="submit" className='four' onClick={changeTextColor}>Change text color</button>
          <br /> 
          <label htmlFor="file-upload" className="fontSizeBorder five">
            Import image
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}  
          />
          <p className='fontSizeBorder six' onClick={saveMeme}>Save image</p>
        </div>
      </div>
    </main>
  )
}
