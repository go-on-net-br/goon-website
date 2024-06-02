import Image from "next/image";
import mailIcon from "../../../public/mail.svg";
import phoneIcon from "../../../public/phone.svg";
import SocialNetworks from "@/components/socialNetworks";
import ContactForm from "@/components/contact/contactForm";

export default function Contato() {
  return (
    <div className="flex h-[850px] min-h-screen items-center justify-center">
      <div className="h-[500px] w-screen bg-primary py-20">
        <section className="container relative mx-auto max-w-screen-xl text-3xl flex items-center h-full">
          <div className="flex w-2/5 flex-col gap-8">
            <div className="flex gap-4 items-center tracking-wider text-white">
              <Image
                src={phoneIcon}
                alt="ícone de um telefone"
                className="h-6 object-contain"
              />
              <p>(11) 5555-5555</p>
            </div>
            <div className="flex gap-4 items-center tracking-wider text-white">
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
          <div className="absolute -top-[175px] right-0  w-[712px] bg-white p-8 shadow-2xl">
            <h1 className=" text-5xl font-bold uppercase text-primary mb-6">
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
