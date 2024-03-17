import Profiles from "@/components/profiles";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import('@/layout'))

const ProfileDetail = () => {
  return (
    <LayoutComponent metaTitle="Your Catty Profile" metaDescription="All contents belong to Catty">
      <Profiles isDetail />
    </LayoutComponent>
  );
}
export default ProfileDetail;