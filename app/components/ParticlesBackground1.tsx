"use client";
import { useEffect, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";

export default function ParticleBackground({ sectionIndex }: { sectionIndex: number }) {
    const particlesRef = useRef<Container | null>(null);
    const [engine, setEngine] = useState<Engine | null>(null);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadAll(engine);
            setEngine(engine);
        });
    }, []);

    useEffect(() => {
        if (!particlesRef.current) return;

        const particles = particlesRef.current;

        // Ajustar el tamaño de las partículas según la sección actual
        const newSize = 1 + sectionIndex * 2; // Incrementa progresivamente el tamaño
        particles.options.particles.size.value = { min: newSize, max: newSize + 2 };

        particles.refresh(); // Método oficial para actualizar
    }, [sectionIndex]);

    const options: ISourceOptions = {
        particles: {
            number: { 
                value: 100,
                density: {
                    enable: true,
                }
            },
            color: {
                value: ["#B3FBEC", "#38f8ff", "#FFFFFF"] // Array para múltiples colores
            },
            shape: {
                type: "circle", 
                options: {
                    polygon: {
                        sides: 5 
                    },
                    image: {
                        src: "https://particles.js.org/images/amongus_blue.png",
                        width: 100,
                        height: 100
                    }
                }
            },
            move: { 
                enable: true, 
                speed: 3,
                direction: "none",
                random: false,
                straight: false,
            },
            size: {
                value: { min: 1, max: 5 },
            },
            opacity: {
                value: { min: 0.3, max: 1 },
            },
            links: {
                enable: true,
                opacity: 0.5, 
                color: "#FFFFFF", 
                distance: 150
            },
            wobble: {
                enable: true,
                distance: 10,
                speed: 10
            },
            rotate: {
                value: { min: 0, max: 360 },
                animation: {
                    enable: true,
                    speed: 15
                }
            }
        }
    };

    if (!engine) return null;

    return (
        <Particles
            id="tsparticles"
            options={options}
            particlesLoaded={async (container?: Container) => {
                if (container) {
                    particlesRef.current = container;
                }
            }}
        />
    );
} 
