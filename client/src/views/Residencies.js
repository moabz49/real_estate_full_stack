import React, { useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import SwiperCore, { Autoplay,Pagination,Navigation } from 'swiper/core';
// Import Swiper styles
import "swiper/css";
import FadeIn from "../components/FadeIn";
import PropertyCard from "../components/PropertyCard";
import useProperties from "../hooks/useProperties";
import { PuffLoader } from "react-spinners";

const Residencies = () => {
  const {data, isError, isLoading} = useProperties();
  
  SwiperCore.use([Autoplay,Pagination,Navigation]);
  const swiperRef = useRef();
 
  if (isLoading) {
    return (
      <div  className='flex w-full justify-center items-center'>
        <div className="flex justify-center w-full items-center">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
        <div className="flex justify-center items-center w-full">
          <p className='font-medium text-red-500 '>Error while fetching the property details</p>
        </div>
    );
  }

  return (
    <div id="residencies" className="flex w-full justify-center items-center">
      <div className="flex w-full max-w-[1340px] items-center justify-center px-[20px] py-[60px]">
        <div className="flex flex-col mx-auto w-full">
          <div className="sm:flex items-center sm:justify-between">
            <div className="flex flex-col sm:items-start items-center text-center sm:text-start">
                <FadeIn>
                  <h1 className="primaryText">Best Choices</h1>
                </FadeIn>
                <FadeIn delay={0.4}>
                  <h2 className="secondaryText">Popular Residencies</h2>
                </FadeIn>
            </div>
            <SlideNextButton swiperRef={swiperRef}/>
          </div>
          <div className="flex w-full items-center justify-center">
            {/*sliders per breakpint and space Between each slide  */}
            <Swiper
               onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              autoplay={{
                delay: 2500,
                pauseOnMouseEnter: true,
                disableOnInteraction: false
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              speed={800}
              loop={true}
              spaceBetween={50}
              slidesPerView={1}
              breakpoints={{
                480: {
                  slidesPerView: 1,
                },
                600: {
                  slidesPerView: 2
                },
                750: {
                  slidesPerView: 3
                },
                1100: {
                  slidesPerView: 4,
                },
              }}
              >
              {/* slider */}
              {data?.slice(5,12).map((card, i) => (
                <SwiperSlide key={i}>
                  <FadeIn direction="down" delay={i * 0.2}>
                    <PropertyCard card={card}/>  
                  </FadeIn>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Residencies;

const SlideNextButton = ({swiperRef}) => {
  const swiperButton = useSwiper();
  console.log(swiperButton)

  return (
    <FadeIn delay={0.4} direction="left">
      <div className="flex gap-x-[2rem] justify-center items-center py-[6px]">
        <button 
          onClick={() => swiperRef.current.slidePrev()}
          className=" text-[#4066FF] px-4 py-1 rounded-md shadow-black shadow-2xl text-[24px] cursor-pointer hover-opacity-80 bg-indigo-200 group hover:scale-[105%] duration-300 ease-out transition-transform transform">
          <p className="group-hover:-translate-x-1">&lt;</p>
        </button>
        <button 
          onClick={() => swiperRef.current.slideNext()} 
          className="text-[#4066FF] px-4 py-1 rounded-md shadow-black shadow-2xl text-[24px] cursor-pointer hover-opacity-80 group hover:scale-[105%] duration-300 ease-out transition-transform transform">
          <p className="group-hover:translate-x-1">&gt;</p>
        </button>
      </div>
    </FadeIn>
  );
};