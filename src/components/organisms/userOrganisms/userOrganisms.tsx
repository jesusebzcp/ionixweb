import { FloatButton } from "@/components/atoms/button";
import { HeaderFilterTablet } from "@/components/atoms/headerFilterTablet";
import type { OrderType } from "@/components/atoms/headerFilterTablet/headerFilterTablet";
import { Pagination } from "@/components/atoms/pagination";
import { TableUser } from "@/components/molecules/tableUsers";
import { StoreContextUI } from "@/core/dto";
import { context } from "@/core/StoreContext";
import { getAllUsers } from "@/core/users/actions";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import { LoadingOrganisms } from "../loadingOrganisms";
import styles from "./styles.module.css";

const LIMIT = 10;

export const UserOrganisms = () => {
  const router = useRouter();
  const { state, usersDispatch }: StoreContextUI = useContext(context);
  const { usersState } = state;
  const { users, loading } = usersState;

  const [skip, setSkip] = useState(1);
  const [orderValue, setOrderValue] = useState<OrderType>("asc");

  const handleSearch = useCallback(
    (search: string | string[]) => {
      const pathname = router.pathname;
      router.push(`${pathname}/?q=${search}`);
      getAllUsers(
        { limit: LIMIT, skip, order: orderValue, search: search as string },
        usersDispatch
      );
    },
    [orderValue, router, skip, usersDispatch]
  );
  const handleAddUser = useCallback(() => {
    router.push("/add-user");
  }, [router]);

  const handleNext = () => {
    setSkip((prev) => prev + LIMIT);
  };
  const handleBack = () => {
    setSkip((prev) => prev - LIMIT);
  };

  useEffect(() => {
    getAllUsers({ limit: LIMIT, skip, order: orderValue }, usersDispatch);
  }, [orderValue, skip, usersDispatch]);

  if (loading) {
    return <LoadingOrganisms />;
  }

  return (
    <div className={styles.container}>
      <TableUser
        data={users}
        HeaderRender={() => (
          <HeaderFilterTablet
            updateOrder={setOrderValue}
            order={orderValue}
            handleSearch={handleSearch}
          />
        )}
        PaginationRender={() => (
          <Pagination next={handleNext} back={handleBack} />
        )}
      />
      <FloatButton onClick={handleAddUser} />
    </div>
  );
};
