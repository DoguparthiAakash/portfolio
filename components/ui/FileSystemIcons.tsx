export function FolderSvgIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      <path d="M10 20C10 14.4772 14.4772 10 20 10H38.1716C40.8239 10 43.3676 11.0536 45.2426 12.9289L51.8284 19.5147C52.766 20.4523 54.0374 20.9786 55.3634 20.9786H80C85.5228 20.9786 90 25.4558 90 30.9786V80C90 85.5228 85.5228 90 80 90H20C14.4772 90 10 85.5228 10 80V20Z" fill="url(#folderGradient)"/>
      <path d="M10 32C10 26.4772 14.4772 22 20 22H80C85.5228 22 90 26.4772 90 32V80C90 85.5228 85.5228 90 80 90H20C14.4772 90 10 85.5228 10 80V32Z" fill="url(#folderGradientFront)" opacity="0.9"/>
      <defs>
        <linearGradient id="folderGradient" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="folderGradientFront" x1="10" y1="22" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#93C5FD" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FileSvgIcon({ className = "", color = "#10B981" }: { className?: string, color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      <path d="M25 10C19.4772 10 15 14.4772 15 20V80C15 85.5228 19.4772 90 25 90H75C80.5228 90 85 85.5228 85 80V38.2843C85 35.6321 83.9464 33.0884 82.0711 31.2132L63.7868 12.9289C61.9115 11.0536 59.3679 10 56.7157 10H25Z" fill="white" />
      <path d="M85 38H65C59.4772 38 55 33.5228 55 28V10L85 38Z" fill="#E5E7EB" />
      <rect x="30" y="45" width="40" height="4" rx="2" fill={color} opacity="0.4" />
      <rect x="30" y="55" width="30" height="4" rx="2" fill={color} opacity="0.4" />
      <rect x="30" y="65" width="20" height="4" rx="2" fill={color} opacity="0.4" />
    </svg>
  );
}
