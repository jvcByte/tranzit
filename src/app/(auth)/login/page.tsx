import React from "react";
import Login from "@/components/forms/login-form";
import { HeroHeader } from "@/components/layout/header";
import FooterSection from "@/components/layout/footer-section";

export default function LoginPage() {
    return (
        <>
            <HeroHeader />
            <Login />
            <FooterSection />
        </>
    );
}
