import React from "react";
import logo2 from '../images/logo2.png'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex w-full justify-center items-center px-[20px] mt-[20px]">
      <div className="flex flex-col space-y-[40px] xs:space-y-0 xs:flex-row xs:items-center w-full max-w-[1340px] py-[40px] justify-between border-t-[0.5px] border-gray-300">
          {/* left */}
        <div className="flex flex-col items-start ">
          <img src={logo2} alt="" width={120} />
          <span className="text-sm nax-w-[300px] text-start text-[#8C8B8B]">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>
        {/* right */}
        <div className="flex flex-col items-end">
          <div className="flex flex-col mb-[32px]">
            <span className="secondaryText tracking-wider">Information</span>
            <span className="text-[#8C8B8B] text-sm">145 New York, FL 5467, USA</span>
          </div>
          <ul className="flex space-x-[12px] font-poppins text-sm font-medium">
            <li className="hover:opacity-70 cursor-pointer">
            <Link to="/properties">Properties </Link> 
            </li>
            <li className="hover:opacity-70 cursor-pointer">
              <a href="mailto:moraabz49@yahoo.com?subject=Email%20Subject&body=Email%20Body">Contact </a>
            </li>
            <li className="hover:opacity-70 cursor-pointer">Services</li>
            <li className="hover:opacity-70 cursor-pointer">About Us</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;