"use client";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ParticleBackground from "./ParticlesBackground";

const sections = [
  {
    title: "Hola",
    text: "Encontra tu psicólogo perfecto y descubrí cómo el apoyo profesional puede transformar tu vida para mejor",
    background: "bg-[#35969F]",
    image: "/Group 11.svg"
  },
  {
    title: "Conexión personalizada",
    text: "Te conectamos con el profesional ideal para que juntos mejoremos tú bienestar. ¡Estamos acá para ayudarte en cada paso!",
    background: "bg-[#35969F]",
    image: "/Group 10.svg"
  },
  {
    title: "Privacidad cuidada",
    text: "Tu información personal está segura con nosotros. Al continuar, aceptás nuestra política de privacidad",
    background: "bg-[#35969F]",
    image: "/Group 9.svg"
  },
  {
    title: "¡Empecemos juntos!",
    text: "Para ofrecerte la mejor recomendación, queremos conocerte un poco más. ¡Arranquemos!",
    background: "bg-[#35969F]",
    image: "/Group 8.svg"
  },
];

export default function Intro({ onScrollEnd }: { onScrollEnd: () => void }) {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentSection = useRef(0);
  const isScrolling = useRef(false);
  const [isExploding, setIsExploding] = useState(false);
  const router = useRouter();

  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionsRef.current[index] = el;
  };

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sectionsRef.current.length) {
      currentSection.current = index;
      sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth" });
      isScrolling.current = true;
      setTimeout(() => {
        isScrolling.current = false;
      }, 600);
    }
  };

  const scrollToNextSection = () => {
    scrollToSection(currentSection.current + 1);
  };

  const handleBubbleClick = () => {
    setIsExploding(true);
    setTimeout(() => {
      router.push("/Chat");
      onScrollEnd();
    }, 650);
  };

  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (isScrolling.current) return;

      const threshold = 30;
      if (event.deltaY > threshold && currentSection.current < sections.length - 1) {
        scrollToSection(currentSection.current + 1);
      } else if (event.deltaY < -threshold && currentSection.current > 0) {
        scrollToSection(currentSection.current - 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      const threshold = 50;

      if (isScrolling.current) return;
      if (diff > threshold && currentSection.current < sections.length - 1) {
        scrollToSection(currentSection.current + 1);
      } else if (diff < -threshold && currentSection.current > 0) {
        scrollToSection(currentSection.current - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden force-light">
      <ParticleBackground />

      {sections.map((section, index) => (
        <motion.div
          key={index}
          ref={setSectionRef(index)}
          className={`h-screen flex flex-col justify-center items-center text-white text-center px-4 md:px-6 ${section.background}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          onClick={scrollToNextSection}
        >
          {/* Imagen representativa */}
          <motion.img
            src={section.image}
            alt={`${section.title} icon`}
            className="w-20 h-20 md:w-24 md:h-24 mb-4"
            whileInView={{ scale: [0, 1], opacity: [0, 1] }}
            initial={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Título con animación similar al párrafo */}
          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl font-bold mt-10"
            whileInView={{ opacity: 1, x: 0, scale: [0.95, 1], filter: "blur(0px)" }}
            initial={{ opacity: 0, x: 100, scale: 0.9, filter: "blur(5px)" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2, bounce: 0.4 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            {section.title}
          </motion.h1>

          {/* Texto descriptivo */}
          <motion.p
            className="text-sm md:text-base font-light max-w-[600px] mb-20"
            whileInView={{ opacity: 1, x: 0, scale: [0.95, 1], filter: "blur(0px)" }}
            initial={{ opacity: 0, x: 100, scale: 0.9, filter: "blur(5px)" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2, bounce: 0.4 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            {section.text}
          </motion.p>

          {/* Botón "Empezar" en la última sección */}
          {index === sections.length - 1 && (
            <motion.button
              type="button"
              className="relative mt-8 mx-auto bg-white text-[#35969F] px-6 py-2 rounded-full shadow-lg overflow-hidden transition-transform"
              onClick={handleBubbleClick}
              animate={isExploding ? { scale: [1, 1.2, 0], opacity: [1, 0.5, 0] } : {}}
              transition={{ duration: 0.5, ease: "easeInOut", times: [0, 0.5, 1] }}
            >
              {/* Contenedor que ocupa todo el botón */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <motion.span
                  animate={isExploding ? { scale: [1, 0.8] } : {}}
                >
                  Empezar
                </motion.span>
              </div>
            </motion.button>

          )}
        </motion.div>
      ))}
    </div>
  );
}
