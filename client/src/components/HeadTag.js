import React from 'react'
import FadeIn from './FadeIn'
import CountUp from 'react-countup';

const HeadTag = ({top, bottom, delay}) => {
  return (
    <FadeIn delay={delay} >
      <div className='flex'>
          <div className='flex flex-col'>
              <h2 className='text-white font-medium text-xl sm:text-3xl'>
                <CountUp end={Number(top)} start={0} duration={3} />
                <span className='text-[#FFA500] text-3xl'>+ </span>
              </h2>
              <p className="capitalize text-neutral-500 text-xs ">{bottom}</p>
          </div>
      </div>
    </FadeIn>
  )
}

export default HeadTag