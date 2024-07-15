import DarkModeButton from "./DarkModeButton";

export default function Navbar() {
  return (
    <div className="flex items-center border-b sm:border-b-2 justify-between dark:bg-[#0F0F0F] bg-slate-100 p-4">
      <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-gray-100 font-bold">
        Yummly
      </p>
      <DarkModeButton />
    </div>
  );
}
