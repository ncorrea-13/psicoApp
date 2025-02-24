"use client";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ParticleBackground from "./ParticlesBackground";
import ParticleBackground1 from "./ParticlesBackground1";

const sections = [
  {
    title: "Hola",
    text: "Encontra tu psicólogo perfecto y descubrí cómo el apoyo profesional puede transformar tu vida para mejor",
    background: "bg-[#35969F]",
    image: "/Group 11.svg" // Ruta de la imagen para esta sección
  },
  {
    title: "Conexión personalizada",
    text: "Te conectamos con el profesional ideal para que juntos mejoremos tú bienestar. ¡Estamos acá para ayudarte en cada paso!",
    background: "bg-[#35969F]",
    image: "/Group 10.svg" // Ruta de la imagen para esta sección
  },
  {
    title: "Privacidad cuidada",
    text: "Tu información personal está segura con nosotros. Al continuar, aceptás nuestra política de privacidad",
    background: "bg-[#35969F]",
    image: "/Group 9.svg" // Ruta de la imagen para esta sección
  },
  {
    title: "¡Empecemos juntos!",
    text: "Para ofrecerte la mejor recomendación, queremos conocerte un poco más.¡Arranquemos",
    background: "bg-[#35969F]",
    image: "/Group 8.svg" // Ruta de la imagen para esta sección
  },
];

export default function Intro({ onScrollEnd }: { onScrollEnd: () => void }) {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const currentSection = useRef(0); // Referencia para rastrear la sección actual
  const isScrolling = useRef(false); // Estado para evitar scrolls múltiples
  const [isExploding, setIsExploding] = useState(false);
  const router = useRouter();

  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionsRef.current[index] = el; // Asigna la referencia al índice correspondiente
  };

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sectionsRef.current.length) {
      currentSection.current = index;
      sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth" });
      isScrolling.current = true;
      setTimeout(() => {
        isScrolling.current = false; // Reactivar scroll después del movimiento
      }, 600); // Ajusta el tiempo según la velocidad del scroll
    }
  };

  const scrollToNextSection = () => {
    scrollToSection(currentSection.current + 1);
  };


  const handleScroll = (event: WheelEvent) => {
    event.preventDefault();
    if (isScrolling.current) return; // Bloquea eventos múltiples

    const threshold = 30; // Mínima sensibilidad para detectar scroll

    if (event.deltaY > threshold && currentSection.current < sections.length - 1) {
      scrollToSection(currentSection.current + 1);
    } else if (event.deltaY < -threshold && currentSection.current > 0) {
      scrollToSection(currentSection.current - 1);
    }
  };

  const handleBubbleClick = () => {
    setIsExploding(true);
    setTimeout(() => {
      router.push("/Chat");
      onScrollEnd();
    }, 500); // Duración coincidente con la animación
  };

  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    // Manejo del evento Wheel (mouse)
    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      if (isScrolling.current) return;

      const threshold = 30;
      if (event.deltaY > threshold && currentSection.current < sections.length - 1) {
        scrollToSection(currentSection.current + 1);
      } else if (event.deltaY < -threshold && currentSection.current > 0) {
        scrollToSection(currentSection.current - 1);
      }
    };

    // Manejo de eventos Touch
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

    // Agregar event listeners
    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Cleanup: remover event listeners al desmontar
    return () => {
      window.removeEventListener("wheel", handleScroll);
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
          className={`h-screen flex flex-col justify-center items-start text-white text-left px-6 ${section.background}`} // Cambia items-center a items-start
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          onClick={scrollToNextSection}
        >
          {/* Icono de la sección */}
          <motion.img
            src={section.image} // Usa la ruta de la imagen de la sección
            alt={`${section.title} icon`}
            className="w-24 h-24 mb-4" // Ajusta el tamaño de la imagen según sea necesario
            whileInView={{ scale: [0.8, 1], opacity: [0, 1] }}
            initial={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Título de la sección */}
          <motion.h1
            className="text-[24px] font-bold mt-10 text-left"
            initial={{ opacity: 0, x: -100, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {section.title}
          </motion.h1>

          {/* Texto centrado en el medio */}
          <motion.p
            className="text-[16px] font-light max-w-[600px] mb-20"
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
              className="top-20 left-[130px]  bg-white text-blue-500 px-6 py-2 rounded-full shadow-lg relative overflow-hidden transition-transform"
              onClick={handleBubbleClick}
              animate={isExploding ? { scale: [1, 1.2, 0], opacity: [1, 0.5, 0] } : {}}
              transition={{ duration: 0.5, ease: "easeInOut", times: [0, 0.5, 1] }}
            >
              <motion.span
                className="relative z-10 "
                animate={isExploding ? { scale: [1, 0.8] } : {}}
              >
                Empezar
              </motion.span>
            </motion.button>
          )}
        </motion.div>
      ))}
    </div>


  );
}
