import React from 'react'
import CustomButton from "../components/CustomButton.js";
import { FaPhoneAlt } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
import FadeIn from "../components/FadeIn.js";
import ContactCard from "../components/ContactCard.js";

const Contact = () => {

  return (
    <section id="contact" className="flex w-full justify-center items-center">
      <div className="w-full max-w-[1340px] flex items-center justify-center px-[20px] py-[60px] border-t-[1px]">
        <div className="grid lg:grid-cols-2 gap-[40px] ">
          {/* right side */}

          <div className='flex items-center justify-center lg:order-2'>
            <FadeIn delay={0.4} direction="left">
              <img src={'./house(5).jpeg'} alt="hero" className='border-8 border-neutral-100 rounded-t-full lg:h-[720px] h-[460px] sm:h-[500px]'/>    
            </FadeIn>
          </div>

          {/* left */}
          <div className="w-full flex flex-col lg:items-start text-center lg:text-start items-center lg:order-1 space-y-2">
            <FadeIn>
              <h1 className="primaryText">Our Contact Us</h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <h2 className="secondaryText">Easy to contact us</h2>
            </FadeIn>
            <FadeIn delay={0.6}>
              <p className="text-[#8C8B8B]">
                We always ready to help by providijng the best services for you.
                <br className="sm:block hidden"/>
                &nbsp;We beleive a good blace to live can make your life better
              </p>
            </FadeIn>
            <div className="flex flex-col w-full ">
              <div className="flex  flex-col sm:flex-row w-full  items-center justify-between mt-[20px] space-y-2 sm:space-y-0">
                  <ContactCard head="address" info1="34, Victoria street" info2="Lancashire, Uk" icon={FaLocationDot} delay={0.2}/>  
                  <ContactCard head="Message" info1="+121 10101010092" info2="+121 10101010092" icon={RiMessage3Fill} delay={0.4}/>  
                  <ContactCard head="Phone" info1="+121 10101010092" info2="+121 10101010092" icon={FaPhoneAlt} delay={0.6}/>  
              </div>
                <div className="flex justify-center items-center text-center mt-[40px] border-[0.5px] rounded-lg shadow-lg p-8">
                  <FadeIn delay={0.6}>
                    <div className="flex flex-col space-y-4">
                      <h3 className="font-bold text-2xl text-[#1f3e72]">Contact sales</h3>
                      <p className="font-light text-[#8C8B8B] text-[16px] sm:text-base sm:mx-[80px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sunt dicta quod autem optio quo numquam ipsam, ratione magnam soluta!</p>
                      <div className="flex flex-col xs:mx-auto justify-center space-y-4">
                        <input placeholder="John Smith" className="rounded-lg py-2 pl-4 w-full text-sm outline-none border-[0.5px] border-[#4066FF]"/>
                        <input placeholder="johnSmith@example.co.uk" className="rounded-lg py-2 pl-4 w-full text-sm outline-none border-[0.5px] border-[#4066FF]"/>
                        <div className="flex space-x-[4px]">
                          <input type="checkbox" className="border-[0.5px] border-[#4066FF]"/> 
                          <p className="text-[#8C8B8B] text-sm">I accept the Terms and Conditions</p>
                        </div>
                        <CustomButton>Submit</CustomButton>
                      </div>
                    </div>
                  </FadeIn>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;