import SignIn from "@/components/signIn";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import('@/layout'))

const Login = () => {
  return (
    <LayoutComponent metaTitle="Log in to Catty" metaDescription="All contents belong to Catty">
      <SignIn />
    </LayoutComponent>
  );
}
export default Login;

