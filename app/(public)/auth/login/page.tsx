import { LoginForm } from "@/components/auth/login-form";
import { HeroSection } from "@/components/hero-section";
import Link from "next/link";

const LoginPage = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center w-full">
            <HeroSection heading="Admin Login" subtext="Not supposed to be here?">
                <Link href="/">Take me back!</Link>
            </HeroSection>
            <div className="w-full max-w-[400px]">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;