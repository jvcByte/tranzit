import React from "react";
import Signin from "@/components/forms/signup-form";
import { HeroHeader } from "@/components/layout/header";
import FooterSection from "@/components/layout/footer-section";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen gap-10">
                <header className="shrink-0">
                    <HeroHeader />
                </header>
                
                <main className="flex-1">
                    <Signin />
                </main>
                
                <footer className="shrink-0">
                    <FooterSection />
                </footer>
            </div>
  );
}
