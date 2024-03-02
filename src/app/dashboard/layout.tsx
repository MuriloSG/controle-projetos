import { DashboardHeader } from "./components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardHeader/>
      {children}
    </>
  );
  
}
