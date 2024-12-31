import { useState } from 'react'
import { clsx } from "clsx";
import './App.css'
import { languages } from './Languages'
import { getFarewellText } from './utils';

function App() {  
const [currentWord, setCurrentWord] = useState("react");
const listOfLetters = Array.from(currentWord);

const [userGuess, setUserGuess] = useState([]);


const wrongGuessCount = userGuess
                        .filter(guess => 
                          !listOfLetters.includes(guess)).length
const removedLetter = userGuess[userGuess.length-1];
const wasCorrectLetter = removedLetter && listOfLetters.includes(removedLetter)
const removedLanguage = !wasCorrectLetter ? languages[wrongGuessCount - 1]?.name : undefined

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
    won:isGameWon,
    lost:isGameLost,
  })

  function renderGameStatus(){
    if (!isGameOver){
      return removedLanguage !== undefined ? 
      (
      <p className='farewell-message'>
                  {  getFarewellText(removedLanguage) }
      </p>)
            :null
    }

    if (isGameLost){
      return(
        <>
             <h2>Game Over!</h2>
          <p>You lose!Better start learning Assembly😭</p>
            </>
      )
    }else if (isGameWon){
      return(
        <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
            </>
      )
    }
  }
  return (
    <main>
        <header className="title">
          <h1>Assembly: End Game</h1>
          <p>Guess the word in 8 attempts to save the <code><strong>Programming</strong></code> world safe from Assembly!</p>
        </header>
        <section className={gameStatusClass}>
          {renderGameStatus()}
         
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
