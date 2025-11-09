import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ChangeMovieModal } from "../ChangeMovieModal";

export function MovieList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <tr>
          <td className="border border-gray-300 px-3 py-2 wrap-break-word">
            Linha 1 - C1
          </td>
          <td className="border border-gray-300 px-3 py-2 wrap-break-word">
            Linha 1 - C2
          </td>
          <td className="border border-gray-300 px-3 py-2 wrap-break-word">
            Linha 1 - C3
          </td>
          <td className="border border-gray-300 px-3 py-2 wrap-break-word">
            Linha 1 - C4
          </td>
          <td className="flex justify-around border border-gray-300 px-3 py-2 wrap-break-word">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-300 hover:bg-blue-400 transition duration-200 w-8 h-8 rounded-[5px] cursor-pointer"
            >
              <ChangeMovieModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />{" "}
            </button>
            <button className="bg-red-300 hover:bg-red-400 transition duration-200 w-8 h-8 rounded-[5px] cursor-pointer">
              <FaTrashAlt className="m-auto" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
