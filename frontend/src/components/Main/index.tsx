type MainProps = {
  children: React.ReactNode;
};

export function Main({ children }: MainProps) {
  return <main className="flex flex-col items-center overflow-x-auto">{children}</main>;
}
