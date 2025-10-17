import React, { useEffect, useState } from 'react'
import './LoadingScreen.css'

const LoadingScreen = ({ onLoadingComplete }) => {
  const [hasSplit, setHasSplit] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lineComplete, setLineComplete] = useState(false)

  useEffect(() => {
    // Stage 1: Line animation only (2 seconds)
    const lineTimer = setTimeout(() => {
      setLineComplete(true)
      
      // Stage 2: Split animation starts AFTER line is 100% complete
      const splitTimer = setTimeout(() => {
        setHasSplit(true)
        
        // Stage 3: Hide and complete after split animation finishes
        const completionTimer = setTimeout(() => {
          setIsVisible(false)
          onLoadingComplete?.()
        }, 1000) // Split animation duration
        
        return () => clearTimeout(completionTimer)
      }, 300) // Wait 300ms after line completes to start split
      
      return () => clearTimeout(splitTimer)
    }, 2000) // Line animation duration (2 seconds)
    
    return () => clearTimeout(lineTimer)
  }, [onLoadingComplete])

  if (!isVisible) {
    return null
  }

  return (
    <div className={`loading-container ${lineComplete ? 'line-complete' : ''} ${hasSplit ? 'splitting' : ''}`}>
      {/* Seamless background layer */}
      <div className="seamless-bg"></div>
      
      <div className="top-panel"></div>
      <div className="bottom-panel"></div>
      
      {/* Line animation */}
      <div className="line-container">
        <div className="line left-line"></div>
        <div className="line right-line"></div>
        <div className="line-center-dot"></div>
      </div>
    </div>
  )
}

export default LoadingScreen