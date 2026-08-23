import React, { useState } from 'react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

interface TechMetadata {
  iconUrl: string;
  deviconClass?: string;
  invertOnDark?: boolean;
}

const TECH_DATA: Record<string, TechMetadata> = {
  html5: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    deviconClass: 'devicon-html5-plain colored',
  },
  html: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    deviconClass: 'devicon-html5-plain colored',
  },
  css3: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    deviconClass: 'devicon-css3-plain colored',
  },
  css: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    deviconClass: 'devicon-css3-plain colored',
  },
  javascript: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    deviconClass: 'devicon-javascript-plain colored',
  },
  js: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    deviconClass: 'devicon-javascript-plain colored',
  },
  sass: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
    deviconClass: 'devicon-sass-original colored',
  },
  scss: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
    deviconClass: 'devicon-sass-original colored',
  },
  'sass / scss': {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
    deviconClass: 'devicon-sass-original colored',
  },
  python: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    deviconClass: 'devicon-python-plain colored',
  },
  java: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    deviconClass: 'devicon-java-plain colored',
  },
  sql: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg',
    deviconClass: 'devicon-azuresqldatabase-plain colored',
  },
  'node.js': {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    deviconClass: 'devicon-nodejs-plain colored',
  },
  nodejs: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    deviconClass: 'devicon-nodejs-plain colored',
  },
  node: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
    deviconClass: 'devicon-nodejs-plain colored',
  },
  figma: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    deviconClass: 'devicon-figma-plain colored',
  },
  angular: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg',
    deviconClass: 'devicon-angular-plain colored',
  },
  react: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    deviconClass: 'devicon-react-original colored',
  },
  git: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    deviconClass: 'devicon-git-plain colored',
  },
  mongodb: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',
    deviconClass: 'devicon-mongodb-plain colored',
  },
  'express.js': {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    deviconClass: 'devicon-express-original',
    invertOnDark: true,
  },
  express: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
    deviconClass: 'devicon-express-original',
    invertOnDark: true,
  },
  'next.js': {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    deviconClass: 'devicon-nextjs-plain',
    invertOnDark: true,
  },
  nextjs: {
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
    deviconClass: 'devicon-nextjs-plain',
    invertOnDark: true,
  },
};

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'w-14 h-14' }) => {
  const normName = name.trim().toLowerCase();
  const meta = TECH_DATA[normName];
  const [imgError, setImgError] = useState(false);

  if (!meta) {
    return (
      <div className={`flex items-center justify-center font-bold text-xs bg-[#252525] text-[#ff4d5a] rounded ${className}`}>
        {name.slice(0, 3).toUpperCase()}
      </div>
    );
  }

  if (imgError && meta.deviconClass) {
    return (
      <i
        className={`${meta.deviconClass} text-5xl`}
        aria-label={name}
      />
    );
  }

  return (
    <img
      src={meta.iconUrl}
      alt={`${name} official logo`}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className={`${className} object-contain transition-all duration-300 ${
        meta.invertOnDark ? 'brightness-0 invert' : ''
      }`}
    />
  );
};

export interface TechTheme {
  border: string;
  glow: string;
}

export const getTechTheme = (name: string): TechTheme => {
  const normName = name.trim().toLowerCase();
  switch (normName) {
    case 'html5':
    case 'html':
      return {
        border: 'border-[#E34F26]/40 hover:border-[#E34F26]',
        glow: 'hover:shadow-[#E34F26]/20',
      };
    case 'css3':
    case 'css':
      return {
        border: 'border-[#1572B6]/40 hover:border-[#1572B6]',
        glow: 'hover:shadow-[#1572B6]/20',
      };
    case 'javascript':
    case 'js':
      return {
        border: 'border-[#F7DF1E]/40 hover:border-[#F7DF1E]',
        glow: 'hover:shadow-[#F7DF1E]/20',
      };
    case 'sass':
    case 'scss':
    case 'sass / scss':
      return {
        border: 'border-[#CF649A]/40 hover:border-[#CF649A]',
        glow: 'hover:shadow-[#CF649A]/20',
      };
    case 'python':
      return {
        border: 'border-[#3776AB]/40 hover:border-[#FFD43B]',
        glow: 'hover:shadow-[#3776AB]/20',
      };
    case 'java':
      return {
        border: 'border-[#EA2D2E]/40 hover:border-[#EA2D2E]',
        glow: 'hover:shadow-[#EA2D2E]/20',
      };
    case 'sql':
      return {
        border: 'border-[#00758F]/40 hover:border-[#00758F]',
        glow: 'hover:shadow-[#00758F]/20',
      };
    case 'node.js':
    case 'nodejs':
    case 'node':
      return {
        border: 'border-[#5FA04E]/40 hover:border-[#5FA04E]',
        glow: 'hover:shadow-[#5FA04E]/20',
      };
    case 'figma':
      return {
        border: 'border-[#A259FF]/40 hover:border-[#F24E1E]',
        glow: 'hover:shadow-[#A259FF]/20',
      };
    case 'angular':
      return {
        border: 'border-[#DD0031]/40 hover:border-[#DD0031]',
        glow: 'hover:shadow-[#DD0031]/20',
      };
    case 'react':
      return {
        border: 'border-[#61DAFB]/40 hover:border-[#61DAFB]',
        glow: 'hover:shadow-[#61DAFB]/20',
      };
    case 'git':
      return {
        border: 'border-[#F05032]/40 hover:border-[#F05032]',
        glow: 'hover:shadow-[#F05032]/20',
      };
    case 'mongodb':
      return {
        border: 'border-[#47A248]/40 hover:border-[#47A248]',
        glow: 'hover:shadow-[#47A248]/20',
      };
    case 'express.js':
    case 'express':
      return {
        border: 'border-[#FFFFFF]/30 hover:border-[#FFFFFF]',
        glow: 'hover:shadow-white/20',
      };
    case 'next.js':
    case 'nextjs':
      return {
        border: 'border-[#FFFFFF]/30 hover:border-[#FFFFFF]',
        glow: 'hover:shadow-white/20',
      };
    default:
      return {
        border: 'border-[#333333] hover:border-[#ff4d5a]',
        glow: 'hover:shadow-[#ff4d5a]/20',
      };
  }
};
