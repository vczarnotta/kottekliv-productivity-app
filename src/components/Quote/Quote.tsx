import { useEffect, useState } from "react"
import "./Quote.css"

function Quote() {
  const [ quote, setQuote ] = useState<string>("")
  
  useEffect(() => {
    const fetchQuote = async () => {
      const url = "https://api.adviceslip.com/advice"
  
      try {
        const res = await fetch(url)
        const data = await res.json()
        const adviceQuote = data.slip


        setQuote(adviceQuote.advice)

      } catch (error) {
        console.error(`Error getting quote: ${error}`)
      }
    }

    fetchQuote()
  }, [])

  return(
    <div className="quote-container">
      {quote ? (
        <p className="quote">{quote}</p>
      ) : (
        <p className="quote loading-text">
          Loading quote
          <span className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
      )}
    </div>
  )
}

export default Quote