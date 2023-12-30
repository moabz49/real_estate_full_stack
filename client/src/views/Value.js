import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import 'react-accessible-accordion/dist/fancy-example.css';
import {
  MdOutlineArrowDropDown,
} from "react-icons/md";
import data from "../utils/accordion.js";
import FadeIn from "../components/FadeIn.js";


const Value = () => {
  const [className, setClassName] = useState(null);

  return (
    <section id="value" className="flex w-full justify-center items-center bg-indigo-100">
      <div className="w-full max-w-[1340px] flex items-center justify-center px-[20px] py-[60px] border-t-[1px]">
      <div className="grid lg:grid-cols-2 gap-[40px]">
        {/* left side */}
          <div className='flex items-center justify-center '>
            <FadeIn delay={0.4}>
              <img src={'./house(5).jpeg'} alt="hero" className='border-8 border-neutral-300 rounded-t-full lg:h-[640px] h-[460px] sm:h-[500px]'/>    
            </FadeIn>
          </div>

        {/* right */}
        <div className="w-full flex flex-col lg:items-start items-center text-center lg:text-start space-y-2">
          <FadeIn direction="left">
            <h1 className="primaryText">Our Value</h1>
          </FadeIn>
          <FadeIn delay={0.4} direction="left">
            <h2 className="secondaryText">Value We Give to You</h2>
          </FadeIn>
          <FadeIn delay={0.6} direction="left">
            <p className="text-[#8C8B8B]">
              We always ready to help by providijng the best services for you.
              <br className="sm:block hidden"/>
              &nbsp;We beleive a good blace to live can make your life better
            </p>
          </FadeIn>

          <Accordion
            className="border-none outline-none space-y-6 pt-[32px] "
            allowMultipleExpanded={false}
            preExpanded={[0]}
            >
            {data.map((item, i) => {
              return (
                <FadeIn delay={i * 0.3} direction="left">

                <AccordionItem className={`accordionItem ${className} shadow-md border-[0.5px] border-gray-300 rounded-lg`} uuid={i} key={i}>
                  {/* face */}
                  <AccordionItemHeading>
                    <AccordionItemButton className="flex items-center w-full justify-between py-[20px] px-[8px]  ">
                        {/* just for getting state of item */}
                      <AccordionItemState>
                        {({ expanded }) =>
                          expanded
                          ? setClassName("expanded")
                          : setClassName("collapsed")
                        }
                      </AccordionItemState>
                      <div className="flex items-center text-[#4066FF] bg-indigo-100 p-3 rounded-md shadow-black shadow-2xl text-[14px] cursor-pointer hover-opacity-80 ">{item.icon}</div>
                      <span
                        className="text-[#1f3e72] font-extrabold xs:text-[1.3rem] text-[1.1rem]"
                        >
                        {item.heading}
                      </span>
                      <div className="flex items-center text-[#4066FF] bg-indigo-100 p-3 rounded-md shadow-black shadow-2xl text-[18px] cursor-pointer hover-opacity-80 hover:scale-[105%] group ease-out duration-300 transform transition-transform ">
                        <MdOutlineArrowDropDown className="hover:translate-y-1 transform transition-transform" />
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  {/* panel  */}
                  <AccordionItemPanel>
                    <p className="text-[#8C8B8B] font-light text-sm xs:text-base">{item.detail}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              </FadeIn>
              );
            })}
          </Accordion>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Value;