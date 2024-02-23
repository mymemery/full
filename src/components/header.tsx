import MainMenu from "./main-menu";
import UserButton from "./user-button";

export default function Header() {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="mx-auto flex h-16 w-full max-w-3xl shrink-0 items-center justify-between px-4 sm:px-6">
        <MainMenu />
        <UserButton />
      </div>
    </header>
  );
}
