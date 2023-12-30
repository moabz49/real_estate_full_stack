import Hero from "../views/Hero"
import Companies from "../views/Companies"
import Residencies from "../views/Residencies"
import Value from "../views/Value";
import Contact from "../views/Contact";
import GetStarted from "../views/GetStarted";


const Website = () => {
  return (
    <div>
      <Hero />
      <Companies />
      <Residencies />
      <Value />
      <Contact />
      <GetStarted />
    </div>
  )
}

export default Website;