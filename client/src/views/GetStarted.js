import FadeIn from '../components/FadeIn'
import React from 'react'

const GetStarted = () => {

  return (
    <section id="started" className='flex w-full justify-center item-center mb-[40px] '>
      <div className='flex w-full max-w-[1340px] bg-[#3333cc] border-8 border-indigo-500 py-[40px] m-[40px] rounded-lg shadow-lg'>
        <div className='flex flex-col justify-center w-full items-center text-center space-y-8 rounded-lg'>
          <FadeIn direction="up" >
            <h1 className='text-4xl font-bold text-white tracking-tight'>Get started with Homyz</h1>
          </FadeIn>
          <FadeIn direction='up' delay={0.3}>
            <p className='text-[#c2c2f0] max-w-[400px] leading-[118%] text-center text-sm xs:text-base font-poppins'>Subscribe and find super attractive price quotes from us. Find your residence soon. </p>
          </FadeIn>
          <FadeIn delay={0.4} direction='up'>
            <button className=' rounded-md shadow-lg border-white border-2 text-white bg-indigo-500 py-2 px-4 hover:scale-[105%] ease-out duration-300 transform transition-transform opacity-80'>Get Started</button>
          </FadeIn>
          
        </div>
      </div>
    </section>
  )
}

export default GetStarted