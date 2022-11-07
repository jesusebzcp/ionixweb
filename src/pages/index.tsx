import { LayoutShared } from "@/components/Layout";
import { UserOrganisms } from "@/components/organisms/userOrganisms";

export default function Home() {
  return (
    <LayoutShared>
      <UserOrganisms />
    </LayoutShared>
  );
}
