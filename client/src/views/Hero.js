import React, {useRef} from 'react'
import CustomButton from '../components/CustomButton'
import HeadTag from '../components/HeadTag'
import heroImage from '../images/heroImage.png'
import {motion} from "framer-motion";
import FadeIn from '../components/FadeIn'
import SearchBar from '../components/SearchBar'

const Hero = () => {

  return (
    <section id="hero" className=' bg-gradient-to-r from-black from-4% via-10% via-stone-600 via to-50% to-black flex justify-center items-center w-full mx-auto'>
        <div className='w-full flex justify-center items-center max-w-[1340px] pb-[100px]'>
          <div className='grid lg:grid-cols-2 lg:space-x-[60px] lg:px-[40px] mt-[100px] lg:space-y-0 space-y-[80px] mx-[16px] transition-transform transform duration-300'>
            <div className='flex flex-col space-y-8 '>
                <div className='relative'>
                  <FadeIn direction="down">
                  <div className='absolute bg-gradient-to-tr from-orange-500 from-[44%] to-white rounded-full w-[40px] h-[40px]  sm:w-[60px] sm:h-[60px] top-0 left-24 sm:left-40 -z-10'/>
                  </FadeIn>
                  <FadeIn>
                    <h1
                      className="text-white text-4xl sm:text-6xl font-semibold capitalize leading-[120%]">
                      Discover<br/> most suitable <br/>property 
                    </h1>
                  </FadeIn>
                </div>
              <FadeIn delay={0.4}>
                <p
                className='text-neutral-400 text-xs sm:text-sm w-[80%]'>Find a variety of properties that suit your needs very easily. Remove all the frustration off finding a residence. Rest assured We're here to help.</p>
              </FadeIn>
              <FadeIn delay={0.6}>
                <SearchBar />
              </FadeIn>
              <div
                className='flex space-x-[28px] flex-wrap lg:w-[100%] xs:justify-between items-center sm:w-[80%] space-y-[6px]'>
                <HeadTag bottom="Premium Products" top={9000} delay={0.6}/>
                <HeadTag bottom="Happy Customers" top={2000} delay={0.8} />
                <HeadTag bottom="Awards Winning" top={28} delay={1}/>
              </div>
            </div>
              <div className='flex items-center justify-center '>
                <FadeIn delay={0.4} direction="left">
                  <img src={heroImage} alt="hero" className='border-8 border-neutral-800 rounded-t-full lg:h-[540px] h-[460px] sm:h-[500px]'/>    
                </FadeIn>
              </div>
          </div>
        </div>
    </section>
  )
}

export default Hero