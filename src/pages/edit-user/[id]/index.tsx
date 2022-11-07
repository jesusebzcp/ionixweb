import { LayoutShared } from "@/components/Layout";
import { UserAddFormOrganisms } from "@/components/organisms/userAddFormOrganisms";
import { StoreContextUI } from "@/core/dto";
import { context } from "@/core/StoreContext";
import { useContext } from "react";

const EditUser = () => {
  const { state }: StoreContextUI = useContext(context);
  const { usersState } = state;
  const { selectUser } = usersState;

  return (
    <LayoutShared back>
      <UserAddFormOrganisms selectUser={selectUser} />
    </LayoutShared>
  );
};

export default EditUser;
