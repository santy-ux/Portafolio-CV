# Portafolio - Santiago Orozco

Este es mi portafolio personal. Lo hice para mostrar los proyectos con los que he ido aprendiendo a programar y contar un poco quién soy como desarrollador en formación.

Sitio en vivo: https://portafolio-sa-nty.vercel.app

![Captura del portafolio](./docs/preview.png)

Quería algo oscuro y minimalista, y le metí un fondo de partículas en Canvas que reacciona al mouse. Fue lo que más me costó ajustar, sobre todo el rendimiento en pantallas pequeñas: al principio se trababa en el celular y tuve que bajar la cantidad de partículas y las conexiones entre ellas.

## Qué tiene

- Fondo de partículas animado con Canvas HTML5
- Sección de proyectos con capturas reales y enlaces al repositorio y a la demo
- Cuadrícula de skills con el ícono de cada tecnología
- Formulario de contacto con validación en tiempo real y protección anti-spam básica
- Botón para descargar mi CV
- Diseño responsive, pensado primero para móvil

## Con qué lo hice

- React 19 y TypeScript
- Tailwind CSS 4
- Vite
- Motion para las animaciones
- Lucide React y Devicon para los íconos
- Una función serverless en Vercel que recibe el formulario y reenvía los mensajes con FormSubmit

## Cómo correrlo en local

```bash
git clone https://github.com/santy-ux/Portafolio-CV.git
cd Portafolio-CV
bun install
bun run dev
```

Si prefieres npm, funciona igual con `npm install` y `npm run dev`. Se abre en `http://localhost:5173` (o el puerto que te muestre la terminal).

Para probar también el formulario de contacto necesitas correrlo con `vercel dev` en vez de `dev`, porque ese endpoint vive como función serverless de Vercel. Copia `.env.example` a `.env` y pon tu correo en `CONTACT_EMAIL`.

## Despliegue

Lo tengo desplegado en Vercel conectando el repositorio. Lo único que hay que configurar es la variable de entorno `CONTACT_EMAIL` en el dashboard del proyecto (Settings, Environment Variables), que es el correo al que llegan los mensajes del formulario.

## Estructura

```
api/              función serverless del formulario
public/           favicon, íconos y CV
src/components/   secciones y componentes del sitio
src/data/         content.json con textos, skills y proyectos
```

Los textos, las skills y los proyectos están en `src/data/content.json`, así que puedo actualizar el contenido sin tocar los componentes.

## Proyectos que se ven en el portafolio

**Deportes Montessori.** Un proyecto para gestionar información deportiva de un colegio: posiciones, resultados y cosas así.

**Honda CBR1000RR Animation.** Un proyecto personal para practicar animaciones 3D con GSAP, inspirado en las páginas de presentación de productos de motos.

## Contacto

Si encuentras algo raro o tienes feedback, escríbeme desde el formulario del portafolio o por GitHub: https://github.com/santy-ux