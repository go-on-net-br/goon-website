"use client";

import Glider from "react-glider";
import "glider-js/glider.min.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useMobileCheck from "@/hooks/useMobileCheck";
import type { Home } from "@/types/home";
import arrow_left from "../../../public/arrow_left.svg";
import ApiImage from "../ApiImage";

export default function Carousel({ homeProps }: { homeProps: Home }) {
	const dotsEl = useRef<HTMLDivElement>(null);
	const leftArrowEl = useRef<HTMLButtonElement>(null);
	const rightArrowEl = useRef<HTMLButtonElement>(null);

	const { Carrossel: carousel, carrossel_mobile } = homeProps?.attributes ?? {};

	const [isReady, setIsReady] = useState(false);
	useEffect(() => {
		if (dotsEl?.current) {
			setIsReady(true);
		}
	}, []);

	const startAt = Math.round(Math.random() * carousel.length);
	const imgStyles =
		"h-[510px] w-full object-cover md:object-contain md:h-auto object-center m-auto";

	const isMobile = useMobileCheck();

	return (
		<div className="relative min-h-fit">
			<div className="w-full md:static md:w-auto">
				{isReady && (
					<Glider
						arrows={{
							prev: leftArrowEl.current,
							next: rightArrowEl.current,
						}}
						scrollToPage={startAt}
						hasArrows
						hasDots
						dots={dotsEl.current}
						rewind
						duration={0.3}
						slidesToShow={1}
						slidesToScroll={1}
						scrollLock
						draggable
						className="overflow-x-hidden"
					>
						{(isMobile ? carrossel_mobile : carousel)?.map((slide, i) => {
							return (
								<div
									key={slide?.Titulo}
									className="carousel-item relative h-fit w-full"
								>
									{slide?.URL ? (
										<a href={slide?.URL} className="h-fit">
											<ApiImage
												contentStyles={imgStyles}
												image={slide.Midia.data}
											/>
										</a>
									) : (
										<ApiImage
											contentStyles={imgStyles}
											image={slide.Midia.data}
										/>
									)}
								</div>
							);
						})}
					</Glider>
				)}
				<div className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-3">
					<button
						ref={leftArrowEl}
						aria-label="navegar para a esquerda"
						className=""
					>
						<Image
							className="z-10 h-6 w-6   rounded-none border-none bg-transparent object-contain p-0 shadow-lg"
							alt="flecha apontada para esquerda"
							src={arrow_left}
						/>
					</button>
					<div className="" ref={dotsEl} id="dots"></div>

					<button
						ref={rightArrowEl}
						aria-label="navegar para a direita"
						className=""
					>
						<Image
							className="h-6 w-6 scale-x-[-1]  rounded-none border-none bg-transparent object-contain p-0 shadow-lg"
							alt="flecha apontada para direita"
							src={arrow_left}
						/>
					</button>
				</div>
			</div>
		</div>
	);
}
