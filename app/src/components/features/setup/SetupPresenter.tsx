import { Button } from "@/components/ui/button/Button";
import type { User } from "@/domains/user/entity";

type Props = {
  users: User[];
  showingAddBtn: boolean;
  showingRemoveBtn: boolean;
  handleAddUser: () => void;
  handleRemoveUser: (index: number) => void;
  handleUserChange: (index: number, name: string) => void;
  handleBackHome: () => void;
  handleStart: () => void;
  enableToStart: () => boolean;
};

export function SetupPresenter({
  users,
  handleAddUser,
  handleRemoveUser,
  handleUserChange,
  handleBackHome,
  handleStart,
  showingAddBtn,
  showingRemoveBtn,
  enableToStart,
}: Props): JSX.Element {
  const pageButtons: {
    text: string;
    onClick: () => void | Promise<void>;
    variant: "primary" | "secondary" | "black";
    disabled?: boolean;
  }[] = [
    {
      text: "戻る",
      onClick: handleBackHome,
      variant: "secondary",
    },
    {
      text: "スタート",
      onClick: handleStart,
      variant: "primary",
      disabled: !enableToStart(),
    },
  ];

  return (
    <div className="flex relative justify-center px-4">
      <img
        className="absolute -z-10 h-screen aspect-auto"
        src="/home.png"
        alt="chess"
      />
      <div className="mt-10">
        <h1 className="font-serif text-center text-h3 md:text-h1">
          プレイヤー名を入力
        </h1>
        <div className="mt-12 gap-2 md:mt-24 lg:mt-12 md:gap-2 flex flex-col items-center">
          <div className="md:flex md:flex-col gap-4 lg:grid lg:grid-cols-2">
            {users.map((user, index) => (
              <div key={user.id} className="flex flex-col items-center gap-2">
                <div className="flex gap-2 flex-col">
                  <span className="md:text-l lg:text-xl">{`プレイヤー${index + 1}`}</span>
                  <div className="flex gap-2 items-center">
                    <input
                      className="border p-2 h-8 md:h-10"
                      placeholder="プレイヤー名を入力"
                      value={user.name}
                      onChange={(e) => handleUserChange(index, e.target.value)}
                    />
                    <Button
                      className="w-20 h-8 md:w-20 md:h-12 md:text-l lg:text-xl bg-red-500 text-white"
                      onClick={() => handleRemoveUser(index)}
                      disabled={!showingRemoveBtn}
                      variant="delete"
                    >
                      削除
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full">
            <Button
              className="w-48 h-10 md:w-48 md:h-12 text-l mt-4"
              onClick={handleAddUser}
              variant="primary"
              disabled={!showingAddBtn}
            >
              + 追加
            </Button>
          </div>
          <div className="mt-4 gap-2 flex items-center">
            {pageButtons.map((button) => (
              <Button
                className="w-24 h-10 md:h-12 text-l"
                key={button.text}
                onClick={button.onClick}
                variant={button.variant}
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
