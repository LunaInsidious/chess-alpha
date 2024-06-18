import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { SetupPresenter } from "@/components/features/setup/SetupPresenter";
import { appURL } from "@/config/url";
import { newUser, getNewUsers } from "@/domains/user/entity";
import type { User } from "@/domains/user/entity";
import { useAlert } from "@/hooks/alert";

export function SetupContainer() {
  const [searchParams] = useSearchParams();
  const color = searchParams.get("color");

  const MIN_USER = 3;
  const MAX_USER = 6;

  const [users, setUsers] = useState<User[]>(getNewUsers(MIN_USER));

  const navigate = useNavigate();
  const { showError } = useAlert();

  const handleBackHome = () => {
    navigate(appURL.home);
  };

  const hasDuplicates = (array: User[]) => {
    const userNameArray = array.map((user: User) => user.name);
    const uniqueElements = new Set(userNameArray);
    return uniqueElements.size !== userNameArray.length;
  };

  const usersQuery = (): string => {
    const encodedUsers = users.map((user) => encodeURIComponent(user.name));

    return encodedUsers.join(",");
  };

  const enableToStart = (): boolean =>
    users.length >= MIN_USER && users.length <= MAX_USER;

  const handleStart = () => {
    if (hasDuplicates(users)) {
      showError({
        message: "プレイヤー名が重複しています。",
      });
      return;
    }
    if (!enableToStart()) {
      showError({
        message: "プレイヤーの数を3人から6人にしてください。",
      });
      return;
    }
    navigate(`${appURL.playerRole}?color=${color}&players=${usersQuery()}`);
  };

  const handleAddUser = () => {
    if (users.length < MAX_USER) {
      setUsers([...users, newUser()]);
    }
  };

  const showingAddBtn: boolean = users.length < MAX_USER;

  const showingRemoveBtn: boolean = users.length > MIN_USER;

  const handleRemoveUser = (index: number) => {
    if (users.length > 1) {
      const newUsers = users.filter((_, i) => i !== index);
      setUsers(newUsers);
    }
  };

  const handleUserChange = (index: number, name: string) => {
    const newUsers = [...users];
    newUsers[index].name = name;
    setUsers(newUsers);
  };

  return (
    <SetupPresenter
      users={users}
      handleAddUser={handleAddUser}
      handleRemoveUser={handleRemoveUser}
      handleUserChange={handleUserChange}
      handleBackHome={handleBackHome}
      handleStart={handleStart}
      showingAddBtn={showingAddBtn}
      showingRemoveBtn={showingRemoveBtn}
      enableToStart={enableToStart}
    />
  );
}
