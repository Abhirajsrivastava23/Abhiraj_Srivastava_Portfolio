import React from "react";

interface XIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const XIcon = ({ size = 24, ...props }: XIconProps) => (
  <svg 
    viewBox="-3 -3 30 30" 
    fill="currentColor" 
    width={size} 
    height={size} 
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
