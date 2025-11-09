import { FaPen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

type ChangeMovieModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ChangeMovieModal({ isOpen, onClose }: ChangeMovieModalProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <FaPen className="m-auto" />

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 flex items-center justify-center bg-black/65 z-50 cursor-default"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative flex flex-col items-center gap-4">
            <button
              onClick={onClose}
              className="absolute top-3 right-90 cursor-pointer text-gray-600 hover:text-red-500 transition"
              aria-label="Fechar modal"
            >
              <IoMdClose size={25}/>
            </button>

            <h1 className="text-[2.3rem] font-bold">Inserir Filme</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-72 w-80 justify-around items-center"
            >
              <input
                className="pl-1 border-2 text-[1.2rem] rounded-[5px] w-64 h-10"
                placeholder="Digite um título"
                type="text"
                name="title"
                id="title"
              />
              <input
                className="pl-1 border-2 text-[1.2rem] rounded-[5px] w-64 h-10"
                placeholder="Digite uma faixa etária"
                type="text"
                name="age_group"
                id="age_group"
              />
              <input
                className="pl-1 border-2 text-[1.2rem] rounded-[5px] w-64 h-10"
                placeholder="Digite um Ator"
                type="text"
                name="actor"
                id="actor"
              />
              <input
                className="pl-1 border-2 text-[1.2rem] rounded-[5px] w-64 h-10"
                placeholder="Digite um Gênero"
                type="text"
                name="gender"
                id="gender"
              />
              <input
                className="border-2 w-40 h-8 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition duration-200 cursor-pointer"
                type="submit"
                value="Cadastrar"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
