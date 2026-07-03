import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";

type Props = {
  children: React.ReactNode;
};

const links = [
  { href: "/", title: "Home" },
  { href: "/posts", title: "Posts" },
  { href: "/posts-2", title: "Posts-2" },
  { href: "/albums", title: "Albums" },
];

export function MainLayout({ children }: Props) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 w-full bg-white shadow">
        <div className="flex h-16 items-center gap-4 px-4">
          {links.map((link) => (
            <Button key={link.href} asChild variant="ghost">
              <Link href={link.href}>{link.title}</Link>
            </Button>
          ))}
        </div>
      </header>
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </div>
  );
}
