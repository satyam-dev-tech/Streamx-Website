interface StreamXLogoProps {
  className?: string;
}

export function StreamXLogo({ className = '' }: StreamXLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          fill="#121218"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.25"
        />
        <path
          d="M9.5 9.5L15.4 16L9.5 22.5H13.1L17.4 17.6L21.7 22.5H25.2L19.3 16L25.2 9.5H21.7L17.4 14.4L13.1 9.5H9.5Z"
          fill="#E11D48"
        />
        <path
          d="M17.2 12.1L22.5 16L17.2 19.9V12.1Z"
          fill="#F4F4F5"
          fillOpacity="0.92"
        />
      </svg>
      <span className="font-display text-xl font-bold tracking-tight text-white">
        Stream<span className="text-rose-500">X</span>
      </span>
    </span>
  );
}
