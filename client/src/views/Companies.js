import React from 'react'
import companyOne from "../images/company(1).png"
import companyTwo from "../images/company(2).png"
import companyThree from "../images/company(3).png"
import companyFour from "../images/company(4).png"
import FadeIn from '../components/FadeIn'


const Companies = () => {

  return (
    <section id="companies" className='flex w-full items-center bg-neutral-200 justify-center'>
        <div className='flex max-w-[1340px] w-full items-center justify-center py-[60px] px-[20px] lg:px-[0] '>
          <FadeIn direction="no" delay={0.4}>
          <div className='grid xs:grid-cols-2 md:grid-cols-4 gap-x-28 md:gap-x-[18px] lg:gap-x-28 gap-y-[20px] md:gap-y-0'>
              <img src={companyTwo} className='h-[128px] w-[180px] ' alt="company"/>
              <img src={companyOne} className='h-[128px] w-[180px] ' alt="company"/>
              <img src={companyThree} className='h-[128px] w-[180px] ' alt="company"/>
              <img src={companyFour} className='h-[128px] w-[180px] ' alt="company"/>
          </div>
          </FadeIn>
        </div>
    </section>
  )
}

export default Companies