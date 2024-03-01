import {ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) { 
  return (
    <div className="w-full max-w-7xl ms-auto bg-red-500">
      {children}
    </div>
  );
}

