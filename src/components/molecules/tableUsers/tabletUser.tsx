import { Button } from "@/components/atoms/button";
import { UserAuth } from "@/core/auth/dto";
import { StoreContextUI } from "@/core/dto";
import { context } from "@/core/StoreContext";
import { deleteUser, selectUser } from "@/core/users/actions";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { ModalConfirmation } from "../modalConfirmation";
import styles from "./styles.module.css";

const headers = ["ID", "Nombre", "Apellido", "Email", "Username", "Opciones"];

interface TableUserProps {
  data: UserAuth[];
  PaginationRender?: any;
  HeaderRender?: any;
}
export const TableUser = ({
  data,
  PaginationRender,
  HeaderRender,
}: TableUserProps) => {
  const { usersDispatch }: StoreContextUI = useContext(context);
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [idUser, setIdUser] = useState<null | number>(null);

  const handleSelectUser = (user: UserAuth) => {
    selectUser(user, usersDispatch);
    router.push(`/edit-user/${user.id}`);
  };

  const onDelete = (id: number) => {
    setIdUser(id);
    setOpenModal(true);
  };

  const handleDeleteUser = async () => {
    if (idUser) {
      await deleteUser(idUser, usersDispatch);
    }
    setIdUser(null);
    setOpenModal(false);
  };

  return (
    <table className={styles.container}>
      {HeaderRender ? (
        <div className={styles.containerPagination}>
          <HeaderRender />
        </div>
      ) : null}
      <thead className={styles.header}>
        {headers.map((header, index) => (
          <th scope="col" key={`${header}-${index}`}>
            {header}
          </th>
        ))}
      </thead>

      <tbody>
        {data &&
          data.length > 0 &&
          data.map((user) => {
            return (
              <tr key={user.id} className={styles.containerTablet}>
                <td>{user.id}</td>
                <td>
                  <div className={styles.avatar}>
                    <Image
                      width={50}
                      height={50}
                      src={
                        !!user.imageUrl.trim()
                          ? user.imageUrl
                          : "/images/avatar.png"
                      }
                      alt={user.email}
                    />
                    {user.firstname}
                  </div>
                </td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td className={styles.buttons}>
                  <Button
                    onClick={() => handleSelectUser(user)}
                    color="secondary"
                    text="Editar"
                  />
                  <Button
                    onClick={() => onDelete(user.id)}
                    color="delete"
                    text="Eliminar"
                  />
                </td>
              </tr>
            );
          })}
      </tbody>
      {PaginationRender ? (
        <div className={styles.containerPagination}>
          <PaginationRender />
        </div>
      ) : null}

      <ModalConfirmation
        open={openModal}
        close={() => setOpenModal((prev) => !prev)}
        cancelAction={() => setOpenModal((prev) => !prev)}
        title={"Confirmación"}
        description={"Realmente deseas eliminar este usuario?"}
        textOk={"Eliminar"}
        textCancel={"Cancelar"}
        okAction={handleDeleteUser}
      />
    </table>
  );
};
