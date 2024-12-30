import { useState } from 'react'
import './App.css'
import { languages } from './Languages'
function App() {
  const [userGuess, setUserGuess] = useState([]);
function handleUserGuess(e){
  setUserGuess((prev) => [...prev,e.target.innerText])
}

const languageElements = languages.map(language => {
  const styles = {
    backgroundColor:`${language.backgroundColor}`,
              color:`${language.color}`
  }
  return (
     <span 
        className='chip'
        style={styles}
        key={language.name}
     >
        {language.name}
    </span>
  )
}
)

const [currentWord, setCurrentWord] = useState("React");
const listOLetters = Array.from(currentWord);
const wordElement = listOLetters.map((letter, index) =>{
 return <span 
      className="letter"
      key={index}
  >
        {letter.toUpperCase()}
  </span>
})


const alphabet = "abcdefghijklmnopqrstuvwxyz"
const keyBoardElement = alphabet.split("").map((letter, index) =>{
  return (
          <button 
              className="keyLetter"
              key={index}
              value={letter}
              onClick={handleUserGuess}
          >
              {letter.toUpperCase()}
          </button>
          )
})
console.log(userGuess)

  return (
    <main>
        <header className="title">
          <h1>Assembly: End Game</h1>
          <p>Guess the word in 8 attempts to save the <code><strong>Programming</strong></code> world safe from Assembly!</p>
        </header>
        <section className="gameStatus">
          <h2>Game Over!</h2>
          <p>You lose!Better start learning Assembly😭</p>
        </section>
        <section className="languages">
            {languageElements}
        </section>
        <section className="words">
              {wordElement}
        </section>

        <section className="keyboard">
              {keyBoardElement}
        </section>
        <button className="new-game">
          New Game
        </button>
    </main>
  )
}

export default App
