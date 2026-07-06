import { PawPrint, Cat, Dog, Fish, Bird, Bone, Heart } from "lucide-react";

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

/**
 * Stylized paw print icon used as a brand mark throughout the site.
 */
export function PawIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <ellipse cx="6" cy="9" rx="2" ry="2.6" />
      <ellipse cx="18" cy="9" rx="2" ry="2.6" />
      <ellipse cx="9.5" cy="5.2" rx="1.7" ry="2.2" />
      <ellipse cx="14.5" cy="5.2" rx="1.7" ry="2.2" />
      <path d="M12 11.5c-3 0-5.5 2.2-5.5 4.9 0 2 1.6 3.4 3.4 3.4.9 0 1.5-.3 2.1-.6.6-.3 1.2-.6 2.1-.6.9 0 1.5.3 2.1.6.6.3 1.2.6 2.1.6 1.8 0 3.4-1.4 3.4-3.4-.2-2.7-2.7-4.9-5.7-4.9Z" />
    </svg>
  );
}

/**
 * Cute cat face SVG illustration.
 */
export function CatIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="catBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4A261" />
          <stop offset="100%" stopColor="#E07856" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="115" rx="62" ry="55" fill="url(#catBody)" />
      <polygon points="55,75 45,40 80,65" fill="url(#catBody)" />
      <polygon points="145,75 155,40 120,65" fill="url(#catBody)" />
      <polygon points="55,75 50,52 72,68" fill="#FBF7F0" opacity="0.7" />
      <polygon points="145,75 150,52 128,68" fill="#FBF7F0" opacity="0.7" />
      <ellipse cx="82" cy="108" rx="6" ry="9" fill="#3D2817" />
      <ellipse cx="118" cy="108" rx="6" ry="9" fill="#3D2817" />
      <ellipse cx="84" cy="105" rx="2" ry="3" fill="#fff" />
      <ellipse cx="120" cy="105" rx="2" ry="3" fill="#fff" />
      <path d="M94 125 Q100 132 106 125" stroke="#3D2817" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M97 130 L100 134 L103 130" stroke="#3D2817" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M100 130 L100 134 M94 132 Q90 134 86 132 M106 132 Q110 134 114 132" stroke="#3D2817" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="68" cy="118" r="4" fill="#FFB4A2" opacity="0.6" />
      <circle cx="132" cy="118" r="4" fill="#FFB4A2" opacity="0.6" />
      <line x1="40" y1="115" x2="68" y2="113" stroke="#3D2817" strokeWidth="1" />
      <line x1="40" y1="125" x2="68" y2="120" stroke="#3D2817" strokeWidth="1" />
      <line x1="160" y1="115" x2="132" y2="113" stroke="#3D2817" strokeWidth="1" />
      <line x1="160" y1="125" x2="132" y2="120" stroke="#3D2817" strokeWidth="1" />
    </svg>
  );
}

/**
 * Cute dog face SVG illustration.
 */
export function DogIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dogBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C8966E" />
          <stop offset="100%" stopColor="#A67450" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="110" rx="60" ry="58" fill="url(#dogBody)" />
      <ellipse cx="100" cy="135" rx="42" ry="32" fill="#F5E6D3" />
      <ellipse cx="55" cy="80" rx="18" ry="28" fill="url(#dogBody)" transform="rotate(-20 55 80)" />
      <ellipse cx="145" cy="80" rx="18" ry="28" fill="url(#dogBody)" transform="rotate(20 145 80)" />
      <ellipse cx="55" cy="85" rx="10" ry="16" fill="#F5E6D3" transform="rotate(-20 55 85)" opacity="0.6" />
      <ellipse cx="145" cy="85" rx="10" ry="16" fill="#F5E6D3" transform="rotate(20 145 85)" opacity="0.6" />
      <ellipse cx="82" cy="100" rx="7" ry="10" fill="#3D2817" />
      <ellipse cx="118" cy="100" rx="7" ry="10" fill="#3D2817" />
      <circle cx="84" cy="97" r="2.5" fill="#fff" />
      <circle cx="120" cy="97" r="2.5" fill="#fff" />
      <ellipse cx="100" cy="128" rx="11" ry="8" fill="#3D2817" />
      <path d="M100 136 L100 144 Q100 148 95 148" stroke="#3D2817" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M85 148 Q92 154 100 152 Q108 154 115 148" stroke="#3D2817" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="68" cy="115" r="5" fill="#FFB4A2" opacity="0.5" />
      <circle cx="132" cy="115" r="5" fill="#FFB4A2" opacity="0.5" />
    </svg>
  );
}

/**
 * Cute fish SVG illustration.
 */
export function FishIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="fishBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5BA4D6" />
          <stop offset="100%" stopColor="#3A7BB5" />
        </linearGradient>
      </defs>
      <ellipse cx="90" cy="100" rx="58" ry="38" fill="url(#fishBody)" />
      <polygon points="150,100 185,70 185,130" fill="url(#fishBody)" />
      <path d="M90 62 Q100 50 110 65" stroke="#2D5A3D" strokeWidth="2" fill="none" />
      <path d="M75 60 Q85 48 95 62" stroke="#2D5A3D" strokeWidth="2" fill="none" />
      <ellipse cx="58" cy="92" rx="8" ry="8" fill="#fff" />
      <circle cx="56" cy="92" r="4" fill="#3D2817" />
      <circle cx="55" cy="91" r="1.5" fill="#fff" />
      <path d="M80 80 Q95 78 110 85" stroke="#fff" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M75 110 Q90 113 105 110" stroke="#fff" strokeWidth="2" fill="none" opacity="0.6" />
      <circle cx="105" cy="115" r="2" fill="#2D5A3D" opacity="0.4" />
      <circle cx="120" cy="105" r="2" fill="#2D5A3D" opacity="0.4" />
      <circle cx="115" cy="90" r="1.5" fill="#2D5A3D" opacity="0.4" />
    </svg>
  );
}

/**
 * Cute bird SVG illustration.
 */
export function BirdIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="birdBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4B942" />
          <stop offset="100%" stopColor="#E08A1E" />
        </linearGradient>
      </defs>
      <ellipse cx="105" cy="115" rx="48" ry="55" fill="url(#birdBody)" />
      <circle cx="105" cy="70" r="30" fill="url(#birdBody)" />
      <polygon points="135,68 158,72 135,80" fill="#E07856" />
      <circle cx="115" cy="65" r="5" fill="#fff" />
      <circle cx="116" cy="65" r="2.5" fill="#3D2817" />
      <path d="M85 100 Q70 115 75 145 Q85 130 100 130 Z" fill="#D67A1E" />
      <path d="M120 110 Q145 115 155 145 Q140 130 125 135 Z" fill="#D67A1E" />
      <ellipse cx="95" cy="170" rx="6" ry="3" fill="#E07856" />
      <ellipse cx="115" cy="170" rx="6" ry="3" fill="#E07856" />
      <path d="M65 95 Q60 105 70 110" stroke="#3D2817" strokeWidth="2" fill="none" />
    </svg>
  );
}

/**
 * Decorative paw background pattern.
 */
export function PawPattern({ className }: { className?: string }) {
  const paws = Array.from({ length: 12 }, (_, i) => ({
    x: (i * 37) % 100,
    y: (i * 53) % 100,
    r: (i * 23) % 30,
    s: 0.5 + ((i * 7) % 6) / 10,
  }));

  return (
    <svg className={className} viewBox="0 0 400 400" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {paws.map((p, i) => (
        <g key={i} transform={`translate(${p.x * 4} ${p.y * 4}) scale(${p.s}) rotate(${p.r})`} opacity="0.15">
          <ellipse cx="0" cy="0" rx="4" ry="5" fill="currentColor" />
          <ellipse cx="-7" cy="-6" rx="2" ry="2.5" fill="currentColor" />
          <ellipse cx="7" cy="-6" rx="2" ry="2.5" fill="currentColor" />
          <ellipse cx="-10" cy="2" rx="1.8" ry="2.3" fill="currentColor" />
          <ellipse cx="10" cy="2" rx="1.8" ry="2.3" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

/**
 * Map lucide pet icons to a reusable PetIcon component.
 */
export function PetIcon({
  type,
  className,
}: {
  type: "cat" | "dog" | "fish" | "bird" | "paw" | "bone" | "heart";
  className?: string;
}) {
  switch (type) {
    case "cat":
      return <Cat className={className} />;
    case "dog":
      return <Dog className={className} />;
    case "fish":
      return <Fish className={className} />;
    case "bird":
      return <Bird className={className} />;
    case "paw":
      return <PawPrint className={className} />;
    case "bone":
      return <Bone className={className} />;
    case "heart":
      return <Heart className={className} />;
    default:
      return <PawPrint className={className} />;
  }
}
