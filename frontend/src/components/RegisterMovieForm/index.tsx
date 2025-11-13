import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

type FilmData = {
  title: string;
  age_rating: string;
  genre: string;
  atores: string[];
};

export function RegisterMovieForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilmData>();
  const [atores, setAtores] = useState<string[]>([]);
  const [novoAtor, setNovoAtor] = useState("");

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

  const onSubmit = async (data: FilmData) => {
    try {
      const atorIds = atores.map((_, i) => i + 1);

      const payload = {
        title: data.title,
        age_rating: data.age_rating,
        genre: data.genre,
        atorIds,
        atores,
      };


      await axios.post("http://localhost:3000/api/films", payload);

      reset();
      setAtores([]);
    } catch (error) {
      console.error("Erro ao cadastrar o filme:", error);
    }
  };

  return (
    <>
      <h1 className="text-[2.3rem] mb-5 font-semibold">Cadastrar Filme</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col min-h-80 w-80 gap-5 items-center"
      >
        <input
          {...register("title", { required: "Título é obrigatório" })}
          placeholder="Título"
          className="pl-1 border-2 text-[1.2rem] rounded-[5px] w-64 h-10"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <select
          {...register("age_rating", {
            required: "Faixa etária é obrigatória",
          })}
          className="pl-1 border-2 text-[1.2rem] rounded-[5px] w-64 h-10"
          defaultValue=""
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
          <p className="text-red-500 text-sm">{errors.age_rating.message}</p>
        )}

        <input
          {...register("genre", { required: "Gênero é obrigatório" })}
          placeholder="Gênero"
          className="pl-1 border-2 text-[1.2rem] rounded-[5px] w-64 h-10"
        />
        {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}

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
          type="submit"
          value="Cadastrar"
          className="border-2 w-40 h-8 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition duration-200 cursor-pointer"
        />
      </form>
    </>
  );
}
