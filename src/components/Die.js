import React from 'react'

export default function Die(props) {
  return (
    <div
      className='die-face'
      style={{ backgroundColor: `${props.isHold ? '#59E391' : 'white'}` }}
      onClick={() => props.holdDice(props.id)}>
      {props.value === 1 && (
        <div className='first-face'>
          <span className='dot'></span>
        </div>
      )}
      {props.value === 2 && (
        <div className='second-face'>
          <span className='dot'></span>
          <span className='dot'></span>
        </div>
      )}
      {props.value === 3 && (
        <div className='third-face'>
          <span className='dot'></span>
          <span className='dot'></span>
          <span className='dot'></span>
        </div>
      )}
      {props.value === 4 && (
        <div className='fourth-face'>
          <div className='column'>
            <span className='dot'></span>
            <span className='dot'></span>
          </div>
          <div className='column'>
            <span className='dot'></span>
            <span className='dot'></span>
          </div>
        </div>
      )}
      {props.value === 5 && (
        <div className='fifth-face'>
          <div className='column'>
            <span className='dot'></span>
            <span className='dot'></span>
          </div>
          <div className='column'>
            <span className='dot'></span>
          </div>
          <div className='column'>
            <span className='dot'></span>
            <span className='dot'></span>
          </div>
        </div>
      )}
      {props.value === 6 && (
        <div className='sixth-face'>
          <div className='column'>
            <span className='dot'></span>
            <span className='dot'></span>
            <span className='dot'></span>
          </div>
          <div className='column'>
            <span className='dot'></span>
            <span className='dot'></span>
            <span className='dot'></span>
          </div>
        </div>
      )}
    </div>
  )
}
