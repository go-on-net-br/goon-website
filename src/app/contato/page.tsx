import Image from "next/image";
import mailIcon from "../../../public/mail.svg";
import phoneIcon from "../../../public/phone.svg";
import SocialNetworks from "@/components/socialNetworks";
import ContactForm from "@/components/contact/contactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
};

function TalkToUsForm() {
  return (
    <div className="w-full rounded-md bg-white p-8 shadow-2xl xl:absolute xl:-top-[175px] xl:right-0 xl:w-[712px] xl:rounded-none">
      <h1 className=" mb-6 hidden text-3xl font-bold uppercase text-primary xl:block xl:text-5xl">
        Fale conosco
      </h1>
      <div className="text-lg">
        <ContactForm />
      </div>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="flex flex-col items-center gap-8 py-10 xl:w-2/5 xl:items-start xl:py-0">
      <p className="text-3xl font-bold uppercase text-white xl:hidden">
        Fale conosco
      </p>
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
  );
}

export default function Contato() {
  return (
    <div className="flex min-h-screen xl:h-[850px] xl:items-center xl:justify-center">
      <div className="hidden w-screen bg-primary xl:block xl:h-[500px] xl:py-20">
        <section className="container relative mx-auto flex h-full max-w-screen-xl flex-row items-center text-3xl">
          <ContactInfo />
          <TalkToUsForm />
        </section>
      </div>
      <div className="mx-8 flex w-full flex-col items-center xl:hidden">
        <section className="mx-4 h-[950px] w-full max-w-[570px] bg-primary">
          <ContactInfo />
          <div className="absolute left-0 w-screen px-4">
            <TalkToUsForm />
          </div>
        </section>
      </div>
    </div>
  );
}
