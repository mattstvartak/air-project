export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg-white">{children}</main>;
}
