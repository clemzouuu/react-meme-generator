import React, { useState, useEffect } from 'react'

let url

export default function Meme() {

  // By default, the top and bottom texts are empty and an image displayed on the screen
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'images/troll-face.png',
  })

  const [allMemes, setAllMeme] = useState([])

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
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </main>
  )
}
