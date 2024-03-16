import Posts from "@/components/posts";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import('@/layout'))

export default function Home() {
  return (
    <LayoutComponent metaTitle="Welcome to Catty" metaDescription="All contents belong to Catty">
      <Posts />
    </LayoutComponent>
  );
}
