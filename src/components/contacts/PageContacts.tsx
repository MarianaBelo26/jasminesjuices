import { FiInstagram } from "react-icons/fi"
import { FiGithub } from "react-icons/fi"
import { FiSend } from "react-icons/fi"
import { FiLinkedin } from "react-icons/fi"
import { FiFolder } from "react-icons/fi"


export default function PageContacts() {
  return (
    <>
     <main className="bg-background-homepage h-[100%] w-full flex flex-col gap-[90px] ">
      <h2 className="font-[julius_Sans_One] text-[25px] md:text-[35px] lg:text-[50px] text-default-text pt-[30px] ml-[30px]">Contacts</h2>
      <div className="flex flex-row w-[50%] justify-between relative left-1/2 -translate-x-1/2">
      <a href="https://marianabelo.netlify.app/" target="_blank" rel="noopener noreferrer" className=" text-default-text border p-2 rounded-full hover:text-highlighted-text"><FiFolder size={25} title="Portfolio" /></a>
      <a href="https://www.linkedin.com/in/marianabelo26" target="_blank" rel="noopener noreferrer" className="text-default-text border p-2 rounded-full  hover:text-highlighted-text"><FiLinkedin size={25} title="Linkedin" /></a>
      <a href="https://github.com/marianabelo26" target="_blank" rel="noopener noreferrer" className="text-default-text border p-2 rounded-full hover:text-highlighted-text"><FiGithub size={25} title="GitHub" /></a>
      <a href="mailto:mariana.belo26@hotmail.com" target="_blank" rel="noopener noreferrer" className="text-default-text border p-2 rounded-full hover:text-highlighted-text"><FiSend size={25} title="E-mail" /></a>
      <a href="https://www.instagram.com/marianabelo.__" target="_blank" rel="noopener noreferrer" className="text-default-text border p-2 rounded-full hover:text-highlighted-text"><FiInstagram size={25} title="Instagram" /></a>
      </div>
      <p className="text-center font-['josefin_Sans'] text-[16px] md:text-[20px] lg:text-[25px] text-highlighted-text ">This site was created for educational purposes only</p>
     </main>
    </>
  );
}
