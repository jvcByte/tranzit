import React from "react";
import SignUp from "@/components/forms/signup-form";
import { HeroHeader } from "@/components/common/header";
import FooterSection from "@/components/common/footer-section";

export default function SignupPage() {
    return (
        <div className="flex flex-col min-h-screen gap-10">
            <header className="shrink-0">
                <HeroHeader />
            </header>

            <main className="flex-1">
                <SignUp />
            </main>

            <footer className="shrink-0">
                <FooterSection />
            </footer>
        </div>
    );
}
