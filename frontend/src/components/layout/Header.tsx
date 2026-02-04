import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% px-6 py-4 w-full backdrop-blur">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="text-xl font-bold text-blue-600">Promptly Photo AI</div>
        <nav className="flex gap-6">
          <ul className="flex flex-row gap-3">
            <li>
              <NavLink to="#">Nowa rozmowa</NavLink>
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
