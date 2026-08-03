import type { SVGProps } from 'react';

export function FridgeFeastLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 14.5A13.56 13.56 0 0 1 12 22a13.56 13.56 0 0 1-8-7.5c0-4.05 3.58-8.55 8-8.55s8 4.5 8 8.55Z" />
      <path d="M12 2v5" />
      <path d="m10.5 7 1.5-2.5 1.5 2.5" />
      <path d="M6.83 8.5A13.56 13.56 0 0 0 4 14.5" />
      <path d="M17.17 8.5A13.56 13.56 0 0 1 20 14.5" />
    </svg>
  );
}
