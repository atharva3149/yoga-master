import React from 'react'
import bgImg from '../../../assets/home/banner.webp'
const Hero = () => {
  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage:`url($bgImg)`}}></div>
  )
}

export default Hero