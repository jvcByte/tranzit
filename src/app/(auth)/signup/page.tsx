import React from "react";
import Signin from "@/components/forms/signup-form";
import { HeroHeader } from "@/components/layout/header";
import FooterSection from "@/components/layout/footer-section";

export default function SignupPage() {
  return (
    <>
      <HeroHeader />
      <Signin />
      <FooterSection />
    </>
  );
}
