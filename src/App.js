import React, { useEffect, useRef, useState } from 'react';
import './App.css';
function Word(props){
  const { text, active, correct} = props
  if(correct===true){
    return <span className="correct">{text} </span>
  }
  if(correct === false){
    return <span className="incorrect">{text} </span>
  }
  if(active){
    return <span className="active">{text} </span>
  }
  return <span>{text} </span>
}
Word=React.memo(Word)
function Timer(props){
  const {correctWords, startCounting} = props
  const [timeElapsed, setTimeElapsed]=useState(0)
  useEffect(()=>{
    let id
    if(startCounting){
      id = setInterval(()=>{
         setTimeElapsed(oldTime=>oldTime+1) 
      },1000)
    }
    return ()=>{
      clearInterval(id)
    }
  }, [props.startCounting])
  const minutes=timeElapsed/60
  return <div className="timespeed">
   
       <p className='timefont'>Time: {timeElapsed}</p> 
       <p></p>
  
    <p>Speed: {((correctWords/minutes)|| 0).toFixed(2)}WPM </p>
    </div>
}
function App() {
  const getCloud = () => `visual studio public modules typing outline timeline prettier explorer extensions windows master ignore sonicmaster experience display better typing student android webcam physical cancelling speech blanket`.split(' ').sort(()=>Math.random() > 0.5 ? 1 : -1)
  const [userInput, setUserInput]=useState('')
  const [activeWordIndex, setActiveWordIndex]=useState(0)
  const cloud = useRef(getCloud())
  const [startCounting, setstartCounting]=useState(false)
  const [correctWordArray, setCorrecttWordArray]=useState([])
  
  function processInput(value){
   
    if(activeWordIndex === cloud.current.length){
      return
    }
    if(!startCounting){
      setstartCounting(true)
     }
    if(value.endsWith(' ')){
      if(activeWordIndex === cloud.current.length - 1){
        setstartCounting(false)
        setUserInput('Completed')
      }else{
        setUserInput('')
      }
      setActiveWordIndex(index=>index + 1)
      
      
      setCorrecttWordArray(data=>{
          const word=value.trim()
          const newResult=[...data]
          newResult[activeWordIndex]=word===cloud.current[activeWordIndex] 
          return newResult
        })
      
    } else{
      setUserInput(value)
    }
  }
  return (
    <div className="App">
      <h1>Test Your Typing Skills</h1>
      <Timer 
      startCounting={startCounting}
      correctWords={correctWordArray.filter(Boolean).length}/>
      <p>{cloud.current.map((word, index) =>{
      return <Word  text={word}
        active={index === activeWordIndex}
        correct={correctWordArray[index]}/>
      })}</p>
      <input 
      type="text" 
      value={userInput} 
      onChange={(e)=>processInput(e.target.value)
      }/>
    </div>
  );
}

export default App;
