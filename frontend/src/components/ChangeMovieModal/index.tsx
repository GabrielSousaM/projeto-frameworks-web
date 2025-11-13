import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

type ChangeMovieModalProps = {
  isOpen: boolean;
  onClose: () => void;
  film: Film;
  onUpdate: (updatedFilm: Film) => void;
};

type Actor = {
  id: number;
  name: string;
};

export type Film = {
  id: number;
  title: string;
  age_rating: string;
  genre: string;
  atores: Actor[] | string[];
};

type FilmFormData = {
  title: string;
  age_rating: string;
  genre: string;
  atores: string;
};

export type FilmData = {
  id?: number;
  title: string;
  age_rating: string;
  genre: string;
  atores: string[];
};

export function ChangeMovieModal({
  isOpen,
  onClose,
  film,
  onUpdate,
}: ChangeMovieModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilmFormData>({
    defaultValues: {
      title: film.title,
      age_rating: film.age_rating,
      genre: film.genre,
      atores: film.atores
        .map((a) => (typeof a === "string" ? a : a.name))
        .join(", "),
    },
  });

  const [atores, setAtores] = useState<string[]>([]);
  const [novoAtor, setNovoAtor] = useState("");

  useEffect(() => {
    if (film) {
      reset({
        title: film.title,
        age_rating: film.age_rating,
        genre: film.genre,
        atores: film.atores
          .map((a) => (typeof a === "string" ? a : a.name))
          .join(", "),
      });
      setAtores(film.atores.map((a) => (typeof a === "string" ? a : a.name)));
    }
  }, [film, reset]);

  const adicionarAtor = () => {
    const nomeNormalizado = novoAtor.trim();
    if (!nomeNormalizado) return;
    const existe = atores.some(
      (ator) => ator.toLowerCase() === nomeNormalizado.toLowerCase()
    );

    if (existe) {
      alert("Este ator já foi adicionado.");
      return;
    }

    setAtores((prev) => [...prev, nomeNormalizado]);
    setNovoAtor("");
  };

  const removerAtor = (index: number) => {
    setAtores((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FilmFormData) => {
    const updatedFilm = { ...film, ...data, atores };

    await axios.put(`http://localhost:3000/api/films/${film.id}`, updatedFilm);
    onUpdate(updatedFilm);
    onClose();
    reset();
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 flex items-center justify-center bg-black/65 z-50 cursor-default"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative flex flex-col items-center gap-4">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-red-500 transition"
              aria-label="Fechar modal"
            >
              <IoMdClose size={25} />
            </button>

            <h1 className="text-[2rem] mb-5 font-bold">Editar Filme</h1>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col min-h-80 max-h-full my-5 gap-5 w-80 items-center"
            >
              <input
                {...register("title", { required: "Título é obrigatório" })}
                className="pl-2 border-2 text-[1.1rem] rounded-[5px] w-64 h-10"
                placeholder="Título"
                type="text"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}

              <select
                {...register("age_rating", {
                  required: "Faixa etária é obrigatória",
                })}
                className="pl-2 border-2 text-[1.1rem] rounded-[5px] w-64 h-10"
                defaultValue={film.age_rating || ""}
              >
                <option value="" disabled>
                  Selecione a faixa etária
                </option>
                <option value="Livre">Livre</option>
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
              </select>
              {errors.age_rating && (
                <p className="text-red-500 text-sm">
                  {errors.age_rating.message}
                </p>
              )}

              <input
                {...register("genre", { required: "Gênero é obrigatório" })}
                className="pl-2 border-2 text-[1.1rem] rounded-[5px] w-64 h-10"
                placeholder="Gênero"
                type="text"
              />
              {errors.genre && (
                <p className="text-red-500 text-sm">{errors.genre.message}</p>
              )}

              <div className="flex items-center justify-between w-64">
                <input
                  value={novoAtor}
                  onChange={(e) => setNovoAtor(e.target.value)}
                  className="pl-2 border-2 text-[1.1rem] rounded-[5px] w-52 h-10"
                  placeholder="Digite um ator"
                  type="text"
                />
                <button
                  type="button"
                  onClick={adicionarAtor}
                  className="bg-green-400 hover:bg-green-500 transition duration-200 w-8 h-8 rounded-[5px] text-white text-lg"
                >
                  <FaPlus className="m-auto" />
                </button>
              </div>

              {atores.length > 0 && (
                <ul className="w-64 border rounded-md p-2 text-sm text-left">
                  {atores.map((ator, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b last:border-0 py-1"
                    >
                      <span>{ator}</span>
                      <button
                        type="button"
                        onClick={() => removerAtor(index)}
                        className="text-red-500 hover:text-red-700 text-xs font-bold cursor-pointer"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <input
                className="border-2 w-40 h-8 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition duration-200 cursor-pointer mt-2"
                type="submit"
                value="Salvar"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
