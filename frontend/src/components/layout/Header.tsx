import { NavLink } from "react-router-dom";
import iconPromptly from "../../assets/icon-promptly.svg";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-80% px-6 py-4 w-full shadow-2xl">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex flex-row gap-3 items-center text-xl font-bold">
          <img
            src={iconPromptly}
            alt="Promptly"
            title="Promptly"
            className="h-10"
          />
          <div>Promptly Photo AI</div>
        </div>
        <nav>
          <ul className="flex flex-row gap-6 items-center font-bold">
            <li>
              <NavLink to="#">
                <div className="bg-blue-500 shadow-lg shadow-blue-500/50 px-4 py-2 rounded-md text-white">
                  Nowa rozmowa
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="#">O projekcie</NavLink>
            </li>
            <li>
              <NavLink to="#">Jak to działa?</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
