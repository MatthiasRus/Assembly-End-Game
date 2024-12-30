import { useState } from 'react'
import { clsx } from "clsx";
import './App.css'
import { languages } from './Languages'
function App() {  
const [currentWord, setCurrentWord] = useState("react");
const listOfLetters = Array.from(currentWord);

const [userGuess, setUserGuess] = useState([]);


const wrongGuessCount = userGuess
                        .filter(guess => 
                          !listOfLetters.includes(guess)).length

const isGameWon = (wrongGuessCount < languages.length) && listOfLetters.every(letter => userGuess.includes(letter))
const isGameLost = wrongGuessCount >= languages.length
const isGameOver = isGameWon || isGameLost ;

function handleUserGuess(letter){
  !isGameOver ? setUserGuess(userGuess => 
    userGuess.includes(letter)? userGuess : [...userGuess,letter])
    : setUserGuess([])
  }

const languageElements = languages.map((language, index) => {
  const styles = {
    backgroundColor:`${language.backgroundColor}`,
              color:`${language.color}`
  }
 
  const isLost = index < wrongGuessCount ;


  
  const className = clsx("chip", isLost && "lost")
  return (
     <span 
        className={className}
        style={styles}
        key={language.name}
     >
        {language.name}
    </span>
  )
}
)

const wordElement = listOfLetters.map((letter, index) =>{
  const isCorrect = userGuess.includes(letter);

 return <span 
      className="letter"
      key={index}
  >
        {isCorrect && letter.toUpperCase()}
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
  const gameStatusClass = clsx({
    gameStatus : true,
    correct:isGameWon,
    wrong:isGameLost,
  })
  return (
    <main>
        <header className="title">
          <h1>Assembly: End Game</h1>
          <p>Guess the word in 8 attempts to save the <code><strong>Programming</strong></code> world safe from Assembly!</p>
        </header>
        <section className={gameStatusClass}>
          {
            isGameOver && (isGameLost ? <>
             <h2>Game Over!</h2>
          <p>You lose!Better start learning Assembly😭</p>
            </> : <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
            </>)
          }
         
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
        {isGameOver && <button className="new-game">
          New Game
        </button>}
    </main>
  )
}

export default App
