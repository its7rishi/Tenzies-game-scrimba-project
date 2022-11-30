import './App.css'
import React, { useEffect } from 'react'
import Die from './components/Die'
import Timer from './components/Timer'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

// let initialTimeList = JSON.parse(localStorage.getItem('timeList'))

export default function App() {
  const [numbers, setNumbers] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)
  const [startClock, setStartClock] = React.useState(true)
  const [resetTimer, setResetTimer] = React.useState(false)
  const [timings, setTimings] = React.useState(
    JSON.parse(localStorage.getItem('timeList')) || []
  )

  React.useEffect(() => {
    let initialTimeList = JSON.parse(localStorage.getItem('timeList'))
    setTimings(initialTimeList)
  }, [tenzies])

  function storeTime(time) {
    if (time) {
      if (timings) {
        let newList = [...timings, time]
        localStorage.setItem('timeList', JSON.stringify(newList))
        newList = []
      } else {
        localStorage.setItem('timeList', JSON.stringify([time]))
      }
    }
  }

  React.useEffect(() => {
    const isHoldCheck = numbers.every((number) => number.isHold)
    const matchValue = numbers[0].value
    const equalityChk = numbers.every((number) => number.value === matchValue)
    setStartClock(true)

    if (isHoldCheck && equalityChk) {
      setTenzies(true)
      setStartClock(false)
    }
  }, [numbers])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHold: false,
      id: nanoid(),
    }
  }

  function allNewDice() {
    let numArray = []
    for (let i = 0; i < 10; i++) {
      numArray.push(generateNewDie())
    }
    return numArray
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false)
      setNumbers(allNewDice)
      setRolls(1)
      setResetTimer(true)
    } else {
      setRolls((prevRolls) => prevRolls + 1)
      setNumbers((prevNumbers) =>
        prevNumbers.map((number) => {
          return number.isHold ? number : generateNewDie()
        })
      )
    }
  }

  function holdDice(id) {
    setNumbers((prevNumbers) =>
      prevNumbers.map((number) => {
        return number.id === id ? { ...number, isHold: !number.isHold } : number
      })
    )
  }

  const diceElements = numbers.map((number) => (
    <Die
      key={number.id}
      value={number.value}
      isHold={number.isHold}
      holdDice={holdDice}
      id={number.id}
    />
  ))

  let bestTime = timings ? timings.sort()[0] : null

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>
        Roll untill all dice are the same. Click each die to freeze it at it's
        current value between rolls.
      </p>
      <div className='stats'>
        <h2 className='rolls'>Rolls: {rolls}</h2>
        <h2 className='best'>Best: {bestTime ? bestTime : '00:00'}</h2>
        <Timer
          startClock={startClock}
          tenzies={tenzies}
          storeTime={storeTime}
          resetTimer={resetTimer}
        />
      </div>
      <div className='dice-container'>{diceElements}</div>
      <button className='roll-dice' onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  )
}
