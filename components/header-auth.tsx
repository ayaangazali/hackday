import Link from "next/link";
import { Button } from "./ui/button";

// Server-friendly placeholder for header auth controls.
// Detailed auth interactions are handled in client components.
export default function AuthButton() {
  return (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
