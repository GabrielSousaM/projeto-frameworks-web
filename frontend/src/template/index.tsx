import { Header } from "../components/Header";
import { Main } from "../components/Main";

type PageTemplateProps = {
  children: React.ReactNode;
};

export function PageTemplate({ children }: PageTemplateProps) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
}
