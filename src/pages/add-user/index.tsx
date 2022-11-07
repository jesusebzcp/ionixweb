import { LayoutShared } from "@/components/Layout";
import { UserAddFormOrganisms } from "@/components/organisms/userAddFormOrganisms";

const addUser = () => {
  return (
    <LayoutShared back>
      <UserAddFormOrganisms />
    </LayoutShared>
  );
};

export default addUser;
