import DarkModeButton from "./DarkModeButton";

export default function Navbar() {
  return (
    <div className="flex items-center border-b-2 justify-between dark:bg-slate-200 bg-slate-100 p-4">
      <p className="text-3xl text-gray-700 font-bold">Yummly</p>
      <DarkModeButton />
    </div>
  );
}
