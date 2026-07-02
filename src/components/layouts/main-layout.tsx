import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";

type Props = {
  children: React.ReactNode;
};

export function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 w-full bg-white shadow">
        <div className="flex h-16 items-center gap-4 px-4">
          <Button asChild variant="ghost">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/posts">Posts</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/albums">Albums</Link>
          </Button>
        </div>
      </header>
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
