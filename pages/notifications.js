import Notifications from "@/components/notifications";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import('@/layout'))

const Notification = () => {
  return (
    <LayoutComponent metaTitle="Notifications for your Catty" metaDescription="All contents belong to Catty">
      <Notifications />
    </LayoutComponent>
  );
}
export default Notification;