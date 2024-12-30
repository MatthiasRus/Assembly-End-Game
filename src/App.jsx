import { useState } from 'react'
import { clsx } from "clsx";
import './App.css'
import { languages } from './Languages'
function App() {  
const [currentWord, setCurrentWord] = useState("react");
const listOfLetters = Array.from(currentWord);

const [userGuess, setUserGuess] = useState([]);

function handleUserGuess(letter){
  setUserGuess(userGuess => 
    userGuess.includes(letter)? userGuess : [...userGuess,letter]);
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

const wordElement = listOfLetters.map((letter, index) =>{
 return <span 
      className="letter"
      key={index}
  >
        {letter.toUpperCase()}
  </span>
})


const alphabet = "abcdefghijklmnopqrstuvwxyz"
const keyBoardElement = alphabet.split("").map(letter =>{
  const isGuessed = userGuess.includes(letter);
  const isCorrect = isGuessed && listOfLetters.includes(letter);
  const isWrong = isGuessed && !listOfLetters.includes(letter);
  const className = clsx(
    {
      correct:isCorrect,
      wrong : isWrong,
      keyLetter: true,
    }
  )
  return (
          <button 
              className={className}
              key={letter}
              value={letter}
              onClick={() => handleUserGuess(letter)}
          >
              {letter.toUpperCase()}
          </button>
          )
})

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
