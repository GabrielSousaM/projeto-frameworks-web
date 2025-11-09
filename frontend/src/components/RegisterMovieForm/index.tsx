export function RegisterMovieForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <>
      <h1 className="text-[2.3rem] font-semibold">Cadastrar Filme</h1>
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
    </>
  );
}
