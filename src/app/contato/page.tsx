import Image from "next/image";
import mailIcon from "../../../public/mail.svg";
import phoneIcon from "../../../public/phone.svg";
import SocialNetworks from "@/components/socialNetworks";
import ContactForm from "@/components/contact/contactForm";
import { Metadata } from "next";


export const metadata: Metadata = {
  title:'Contato',
};

export default function Contato() {
  return (
    <div className="flex min-h-screen xl:h-[850px] xl:items-center xl:justify-center">
      <div className="w-screen bg-primary xl:h-[500px] xl:py-20">
        <section className="container relative flex h-full max-w-screen-xl flex-col items-center text-3xl xl:mx-auto xl:flex-row">
          <div className="flex flex-col gap-8 py-10 xl:w-2/5 xl:py-0">
            <div className="flex items-center gap-4 tracking-wider text-white">
              <Image
                src={phoneIcon}
                alt="ícone de um telefone"
                className="h-6 object-contain"
              />
              <p>(11) 3567-7777</p>
            </div>
            <div className="flex items-center gap-4 tracking-wider text-white">
              <Image
                src={mailIcon}
                alt="ícone de um telefone"
                className="h-6 object-contain"
              />
              <p>contato@goon.net.br</p>
            </div>
            <div className="flex gap-5 pl-2 pt-4">
              <SocialNetworks iconStyle="h-9 w-9" />
            </div>
          </div>
          <div className="w-full rounded-md bg-white p-8 shadow-2xl xl:absolute xl:-top-[175px] xl:right-0 xl:w-[712px] xl:rounded-none">
            <h1 className=" mb-6 text-3xl font-bold uppercase text-primary xl:text-5xl">
              Fale conosco
            </h1>
            <div className="text-lg">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
