import { FormInput } from "@/components/form/form-input";
import { HeroSection } from "@/components/hero-section";

const PublicLoginPage = () => {
    return (
        <div>
            <HeroSection subText="Logga in" />
            <FormInput 
                id="password"
                placeholder="******"
                label="Lösenord"
            />
        </div>
    );
}

export default PublicLoginPage;