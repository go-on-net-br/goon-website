import headsetIcon from "../../public/headset.svg";
import controllerIcon from "../../public/controller.svg";
import lockIcon from "../../public/lock.svg";
import smartHomeIcon from "../../public/smartHome.svg";
import soundIcon from "../../public/sound.svg";
import winnerBadgeIcon from "../../public/winnerBadge.svg";
import Image from "next/image";

export default function Badge() {
  const badges = [
    { src: winnerBadgeIcon, text: "Distribuição\nExclusiva" },
    { src: smartHomeIcon, text: "Automação\nResidencial" },
    { src: soundIcon, text: "Sistema\nde Som" },
    { src: lockIcon, text: "Segurança\npara os projetos" },
    { src: controllerIcon, text: "Controle\nTotal" },
    { src: headsetIcon, text: "Suporte\nEspecializado" },
  ];

  return (
    <div className="flex justify-evenly items-center mt-16 flex-wrap gap-10">
      {badges?.map((badge, i) => (
        <div className="flex flex-col gap-3" key={badge?.text.slice(0, 5) + i}>
          <Image
            src={badge?.src}
            alt={badge?.text}
            className="w-12 h-w-12 object-contain"
          />
          <p className="text-primary font-medium text-lg whitespace-pre">
            {badge?.text}
          </p>
        </div>
      ))}
    </div>
  );
}
