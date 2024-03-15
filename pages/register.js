import SignUp from "@/components/signUp";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import('@/layout'))

const Register = () => {
  return (
    <LayoutComponent metaTitle="Sign Up to Catty" metaDescription="All contents belong to Catty">
      <SignUp />
    </LayoutComponent>
  );
}
export default Register;