import React from 'react'
import { truncate } from 'lodash';
import { useNavigate } from 'react-router-dom';
import Heart from './Heart';

const PropertyCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div
      // you have a link with the href ../properties/2, clicking on that link would take you to http://localhost:3000/properties/2.
      onClick={() => navigate(`../properties/${card.id}`)} 
      id={card.id} className="relative flex flex-col justify-center items-center text-center sm:justify-normal sm:items-start sm:text-start gap-[0.6rem] p-[1rem] rounded-[10px] m-auto transition-all duration-300 ease-in hover:scale-[104%] cursor-pointer smSwipe:hover:bg-gradient-to-t from-indigo-200 to-50% to-white hover:shadow-b-2xl pt-[10px] pb-[20px] my-[10px]">
        <Heart id={card.id} />
        <img src={card.image} alt="home" className="h-[180px] w-full rounded-lg"  />
        <p className="text-[0.9rem] space-x-[2px]">
        <span className="text-[#FFA500]">$</span>
        <span className="text-[#8C8B8B]">{card.price}<span className='text-[0.7rem]'>&nbsp;p/n</span></span>
        </p>
        <span className="text-[#1f3e72] font-bold text-[1.6rem]">{truncate(card.title, {length: 15})}</span>
        <span className="text-[#8C8B8B] text-xs">{truncate(card.description, {length: 80})}</span>
     </div>
  )
}

export default PropertyCard