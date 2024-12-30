import './App.css'
import { languages } from './Languages'
function App() {
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
    </main>
  )
}

export default App
