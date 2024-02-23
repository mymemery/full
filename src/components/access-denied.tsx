import { SignIn } from "./auth-components";

export default function AccessDenied() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-4 text-lg">You need to be signed in to do that!</h1>
      <SignIn />
    </div>
  );
}
