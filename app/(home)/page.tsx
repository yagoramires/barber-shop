import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "../_components/Header";
import SearchBar from "./_components/SearchBar";

export default function Home() {
  return (
    <main className="">
      <Header />

      <div className="mt-6 px-5">
        <h2 className="text-xl font-bold">Olá, {"Yago"}!</h2>
        <p className="text-sm first-letter:uppercase">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <SearchBar />
      </div>

      <div className="mt-6 px-5"></div>

      <div className="mt-6 px-5"></div>
    </main>
  );
}
