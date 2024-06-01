import universalSlugify from "@/helpers/universalSlugify";
import { Contato } from "@/types/components";

export default function AboutContact({
  contact,
}: {
  readonly contact: Contato[];
}) {
  return (
    <section className="container mx-auto mb-8 flex max-w-screen-xl justify-center">
      <div className="container mb-12 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 border-y border-primary px-2 py-6 md:gap-8 md:px-16 md:py-12">
          <h3 className="text-xl text-primary md:text-3xl">
            Precisa de{" "}
            <span className="font-bold underline">Mais Informações</span>
          </h3>
          <div className="flex flex-col items-start">
            {contact?.map((contact, i) => (
              <p
                className="text-primary"
                key={universalSlugify(contact.Destinatario)}
              >
                {contact.Destinatario} -{" "}
                <a
                  className="text-base italic underline"
                  href={"mailto:" + contact.email}
                >
                  {contact.email}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
