import { Contato } from "@/types/components";

export default function AboutContact({
  contact,
}: {
  readonly contact: Contato[];
}) {
  return (
    <section className="mb-8 flex justify-center">
      <div className="container mb-12 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-8 border-y border-primary px-16 py-12">
          <h3 className="text-3xl text-primary">
            Precisa de{" "}
            <span className="font-bold underline">Mais Informações</span>
          </h3>
          <div className="flex flex-col items-start">
            {contact?.map((contact, i) => (
              <p className="text-primary">
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
