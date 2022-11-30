import React, { useEffect } from 'react'

export default function Timer(props) {
  const [minutes, setMinutes] = React.useState(0)
  const [seconds, setSeconds] = React.useState(0)
  const [finishTime, setFinishTime] = React.useState()

  React.useEffect(() => {
    if (props.resetTimer) {
      setMinutes(0)
      setSeconds(0)
    }
  }, [props.resetTimer])

  let interval
  React.useEffect(() => {
    if (props.startClock) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
        if (seconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1)
          setSeconds(0)
        }
      }, 1000)
    } else {
      clearInterval(interval)
      setFinishTime(
        `${minutes < 10 ? '0' + minutes : minutes}:${
          seconds < 10 ? '0' + seconds : seconds
        }`
      )
      props.storeTime(finishTime)
    }

    return () => {
      clearInterval(interval)
    }
  })

  return (
    <div className='timer'>
      <div className='container'>
        <h2>
          {minutes < 10 ? '0' + minutes : minutes}:
          {seconds < 10 ? '0' + seconds : seconds}
        </h2>
      </div>
    </div>
  )
}
