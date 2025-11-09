import { Link } from "react-router";

export function Header() {
  return (
    <header className="flex items-start justify-center h-32">
      <nav className="bg-gray-500 border-2 border-t-0 border-gray-600 shadow flex w-60 h-10 justify-around rounded-b-2xl">
        <Link
          to={"/"}
          className="grow text-center hover:bg-gray-600 cursor-pointer p-1 rounded-bl-2xl text-[1.1rem] transition duration-200"
        >
          Inserir
        </Link>

        <Link
          to={"/list"}
          className="grow text-center hover:bg-gray-600 cursor-pointer p-1 rounded-br-2xl text-[1.1rem] transition duration-200"
        >
          Listar
        </Link>
      </nav>
    </header>
  );
}
