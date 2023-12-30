import FadeIn from './FadeIn'

const ContactCard = ({head, info1, info2, icon: Icon, delay}) => {
  return (
    <FadeIn delay={delay}>
        <div className="flex flex-col space-y-4 p-14 sm:p-12 lg:p-8 rounded-md border-[0.5px] bg-indigo-100 shadow-lg">
            <h2 className="capitalize font-bold text-2xl text-[#1f3e72] flex items-center ">{head}&nbsp;<Icon className="text-[#4066FF]"/>  </h2>
            <p className="font-light text-[#8C8B8B]">{info1} <br/>{info2}</p>
        </div>
    </FadeIn>
  )
}

export default ContactCard
