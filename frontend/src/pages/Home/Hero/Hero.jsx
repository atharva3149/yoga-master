import React from 'react'
import bgImg from '../../../assets/home/banner.webp'
const Hero = () => {
  return (
    <div className='min-h-screen bg-cover bg-black' style={{backgroundImage:`url($bgImg)`}}>
      <div></div>
    </div>
  )
}

export default Hero