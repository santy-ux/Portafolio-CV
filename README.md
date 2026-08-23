# Portfolio - Santiago Orozco

Este es mi portafolio personal, hecho para mostrar los proyectos en los que he ido aprendiendo a programar y algo de mí como desarrollador en formación.

Quería algo con un tema oscuro, minimalista, y le metí un fondo de partículas interactivo en Canvas que reacciona al mouse (fue de lo que más me costó ajustar, sobre todo el rendimiento en pantallas más chicas).

## Qué tiene

- Fondo de partículas animado con Canvas HTML5
- Sección de proyectos con capturas reales y links a repo/demo en vivo
- Grid de skills con los íconos de cada tecnología
- Formulario de contacto funcional (con validación en tiempo real y protección anti-spam básica)
- Diseño responsive, pensado primero para mobile

## Con qué lo hice

- React 19 + TypeScript
- Tailwind CSS 4
- Vite
- Motion (para las animaciones)
- Lucide React y Devicon para los íconos
- El formulario de contacto corre por una función serverless en Vercel que reenvía los mensajes con FormSubmit

## Cómo correrlo local

```bash
git clone https://github.com/santy-ux/portfolio.git
cd portfolio
npm install
npm run dev
```

Se abre en `http://localhost:5173` (o el puerto que te muestre la terminal).

Si quieres probar también el formulario de contacto en local, necesitas correrlo con `vercel dev` en vez de `npm run dev`, porque ese endpoint vive como función serverless de Vercel.

## Deploy

Está pensado para desplegarse directo en Vercel conectando el repo. Solo hay que configurar la variable de entorno `CONTACT_EMAIL` en el dashboard del proyecto (Settings → Environment Variables).

## Proyectos que puedes ver ahí

- **Deportes Montessori** — un proyecto que hice para gestionar información deportiva de un colegio (posiciones, resultados, etc.)
- **Honda CBR1000RR Animation** — un proyecto hobby para practicar animaciones 3D con GSAP, inspirado en las páginas de presentación de productos de motos

---

Si encuentras algo raro o tienes feedback, puedes escribirme desde el formulario de contacto del portafolio o por GitHub.
