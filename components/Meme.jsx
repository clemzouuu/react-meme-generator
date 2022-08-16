import React, { useState, useEffect } from 'react'

let url

export default function Meme() {

  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'images/troll-face.png',
  })

  const [allMemes, setAllMeme] = useState([])

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => setAllMeme(data.data.memes))
  }, [])

  const [currentImage, setNewImage] = useState('images/troll-face.png')

  function getMemeImage() {

    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url =
      allMemes[randomNumber].url 
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }))
  }

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
