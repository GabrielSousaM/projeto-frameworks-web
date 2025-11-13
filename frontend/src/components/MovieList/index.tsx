import { useEffect, useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { ChangeMovieModal } from "../ChangeMovieModal";

type Actor = {
  id: number;
  name: string;
};

type Film = {
  id: number;
  title: string;
  age_rating: string;
  genre: string;
  atores: Actor[] | string[];
};

export function MovieList() {
  const [films, setFilms] = useState<Film[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<number | null>(null);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const response = await axios.get("http://localhost:3000/api/films");
        setFilms(response.data);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    }

    fetchFilms();
  }, []);

  async function handleDeleteFilm(id: number) {
    console.log("clicou para deletar id:", id);
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/films/${id}`
      );
      console.log("DELETE response:", response.status, response.data);
      setFilms((prev) => prev.filter((film) => film.id !== id));
    } catch (error) {
      console.error("Erro ao deletar filme:", error);
      alert("Erro ao deletar filme — veja o console/network para detalhes.");
    }
  }

  if (films.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600 text-lg">
          Nenhum filme foi adicionado ainda.
        </p>
      </div>
    );
  }

  return (
    <table className="w-[1000px] border border-gray-300 text-sm text-center table-fixed">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-300 px-3 py-2 w-20">Título</th>
          <th className="border border-gray-300 px-3 py-2 w-20">Atores</th>
          <th className="border border-gray-300 px-3 py-2 w-20">
            Faixa Etária
          </th>
          <th className="border border-gray-300 px-3 py-2 w-20">Categoria</th>
          <th className="border border-gray-300 px-3 py-2 w-20">Operações</th>
        </tr>
      </thead>
      <tbody>
        {films.map((film) => (
          <tr key={film.id}>
            <td className="border border-gray-300 px-3 py-2">{film.title}</td>
            <td className="border border-gray-300 px-3 py-2">
              {film.atores && film.atores.length > 0
                ? film.atores
                    .map((ator) =>
                      typeof ator === "string" ? ator : ator.name
                    )
                    .join(", ")
                : "—"}
            </td>
            <td className="border border-gray-300 px-3 py-2">
              {film.age_rating}
            </td>
            <td className="border border-gray-300 px-3 py-2">{film.genre}</td>
            <td className="border border-b-0 border-gray-300 px-3 py-2 text-center align-middle">
              <div className="flex justify-around items-center">
                <>
                  <button
                    onClick={() =>
                      setIsModalOpen(isModalOpen === film.id ? null : film.id)
                    }
                    className="bg-blue-300 hover:bg-blue-400 transition duration-200 w-8 h-8 rounded-[5px] cursor-pointer"
                  >
                    <FaPen className="m-auto" />
                  </button>

                  <ChangeMovieModal
                    isOpen={isModalOpen === film.id}
                    onClose={() => setIsModalOpen(null)}
                    film={film}
                    onUpdate={(updatedFilm) =>
                      setFilms((prev) =>
                        prev.map((f) =>
                          f.id === updatedFilm.id ? updatedFilm : f
                        )
                      )
                    }
                  />
                </>

                <button
                  onClick={() => handleDeleteFilm(film.id)}
                  className="bg-red-300 hover:bg-red-400 transition duration-200 w-8 h-8 rounded-[5px] cursor-pointer"
                >
                  <FaTrashAlt className="m-auto" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
