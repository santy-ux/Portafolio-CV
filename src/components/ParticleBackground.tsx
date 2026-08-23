import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  isAccent: boolean;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Posición continua del cursor con seguimiento suave
    const mouse = {
      x: -3000,
      y: -3000,
      targetX: -3000,
      targetY: -3000,
      isHovered: false,
    };

    let maxConnectionDistance = 160;
    let maxConnectionDistanceSq = 160 * 160;
    let interactionRadius = 320;
    let interactionRadiusSq = 320 * 320;

    const baseLineOpacity = 0.018; // Muy tenue en la oscuridad
    const peakLineOpacity = 0.68;  // Alto contraste bajo el efecto linterna

    const updateCanvasDimensions = () => {
      if (!canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Configuración adaptativa según el ancho de pantalla
      if (width < 640) {
        // Dispositivos móviles
        maxConnectionDistance = 100;
        interactionRadius = 0; // Desactivar efecto linterna pesado en móviles
      } else if (width < 1024) {
        // Tabletas
        maxConnectionDistance = 135;
        interactionRadius = 260;
      } else {
        // Escritorio (Red de alta densidad)
        maxConnectionDistance = 160;
        interactionRadius = 320;
      }

      maxConnectionDistanceSq = maxConnectionDistance * maxConnectionDistance;
      interactionRadiusSq = interactionRadius * interactionRadius;

      initParticles(width, height);
    };

    const initParticles = (width: number, height: number) => {
      // Densidad de partículas distribuida en toda la pantalla
      let count = 280;
      if (width < 640) {
        count = 75;
      } else if (width < 1024) {
        count = 160;
      } else if (width > 1600) {
        count = 340;
      }

      particles = [];

      for (let i = 0; i < count; i++) {
        const isAccent = Math.random() < 0.15; // ~15% partículas de acento rojo/coral
        const baseRadius = isAccent
          ? Math.random() * 1.1 + 0.9  // 0.9px - 2.0px
          : Math.random() * 1.0 + 0.7; // 0.7px - 1.7px

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          radius: baseRadius,
          baseRadius,
          isAccent,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -3000;
      mouse.targetY = -3000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.isHovered = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.isHovered = false;
      mouse.targetX = -3000;
      mouse.targetY = -3000;
    };

    window.addEventListener('resize', updateCanvasDimensions);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    updateCanvasDimensions();

    // Cálculo rápido de distancia al cuadrado de punto a segmento
    const distToSegmentSq = (
      px: number,
      py: number,
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const lenSq = dx * dx + dy * dy;

      if (lenSq === 0) {
        const dpx = px - x1;
        const dpy = py - y1;
        return dpx * dpx + dpy * dpy;
      }

      // Factor de proyección t en [0, 1]
      let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
      t = t < 0 ? 0 : t > 1 ? 1 : t;

      const projX = x1 + t * dx;
      const projY = y1 + t * dy;
      const diffX = px - projX;
      const diffY = py - projY;

      return diffX * diffX + diffY * diffY;
    };

    const render = () => {
      if (!ctx || !canvas) return;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Interpolación suave para movimiento fluido del efecto linterna
      if (mouse.isHovered && mouse.targetX > -1000) {
        if (mouse.x < -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.22;
          mouse.y += (mouse.targetY - mouse.y) * 0.22;
        }
      } else {
        mouse.x = -3000;
        mouse.y = -3000;
      }

      const count = particles.length;
      const isMouseActive = mouse.isHovered && interactionRadius > 0 && mouse.x > -1000;
      const mX = mouse.x;
      const mY = mouse.y;

      // 1. Actualizar coordenadas de las partículas
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Reubicar al cruzar los bordes para una dispersión natural continua
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;

        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;
      }

      // 2. Dibujar conexiones (Red amplia: casi invisible por defecto, revelada bajo el cursor)
      for (let i = 0; i < count; i++) {
        const p1 = particles[i];
        const p1x = p1.x;
        const p1y = p1.y;

        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dx = p1x - p2.x;
          const dy = p1y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectionDistanceSq) {
            const dist = Math.sqrt(distSq);
            const connectionProximity = 1 - dist / maxConnectionDistance; // 0 a 1

            let finalOpacity = baseLineOpacity * connectionProximity;
            let lineWidth = 0.45;

            // Cálculo de iluminación tipo linterna (distancia punto a segmento)
            if (isMouseActive) {
              const segDistSq = distToSegmentSq(mX, mY, p1x, p1y, p2.x, p2.y);

              if (segDistSq < interactionRadiusSq) {
                const segDist = Math.sqrt(segDistSq);
                const normDist = segDist / interactionRadius; // 0 (centro) a 1 (borde exterior)

                // Atenuación cúbica suave: 3*(1-u)^2 - 2*(1-u)^3
                const u = 1 - normDist;
                const flashlightInfluence = u * u * (3 - 2 * u);

                // Revelar grupo de conexiones alrededor del cursor
                const extraOpacity = (peakLineOpacity - baseLineOpacity) * flashlightInfluence * connectionProximity;
                finalOpacity += extraOpacity;
                lineWidth = 0.45 + 0.5 * flashlightInfluence;
              }
            }

            if (finalOpacity > 0.008) {
              ctx.beginPath();
              ctx.moveTo(p1x, p1y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(81, 162, 233, ${finalOpacity.toFixed(3)})`;
              ctx.lineWidth = lineWidth;
              ctx.stroke();
            }
          }
        }
      }

      // 3. Dibujar nodos de partículas (Puntos discretos en la oscuridad, iluminados bajo el cursor)
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        let currentRadius = p.baseRadius;
        let nodeAlpha = p.isAccent ? 0.55 : 0.42;

        if (isMouseActive) {
          const dx = mX - p.x;
          const dy = mY - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < interactionRadiusSq) {
            const dist = Math.sqrt(distSq);
            const u = 1 - dist / interactionRadius;
            const influence = u * u * (3 - 2 * u);

            currentRadius = p.baseRadius * (1 + 0.25 * influence);
            nodeAlpha = Math.min(0.95, nodeAlpha + 0.48 * influence);
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        if (p.isAccent) {
          ctx.fillStyle = `rgba(255, 77, 90, ${nodeAlpha.toFixed(2)})`;
        } else {
          ctx.fillStyle = `rgba(81, 162, 233, ${nodeAlpha.toFixed(2)})`;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateCanvasDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="particle-network-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 1 }}
    />
  );
};
