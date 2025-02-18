"use client";

import { useEffect, useState } from "react";
import DishCard, { Dish } from "../components/dish/DishCard";
import Navbar from "../components/navbar/Navbar";
import AddDishItemButton from "@/components/dish/AddDishItemButton";
import { Spinner } from "@phosphor-icons/react";

export default function Home() {
  const [dishes, setDishes] = useState<Array<Dish>>([]);
  const [isDishLoading, setIsDishLoading] = useState<boolean>(false);

  useEffect(() => {
    const getDishes = async () => {
      setIsDishLoading(true);
      try {
        const dish = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dishes`
        );
        const jsonDish = await dish.json();
        setDishes(jsonDish);
      } catch (error) {
        console.log(error);
      } finally {
        setIsDishLoading(false);
      }
    };
    getDishes();
  }, []);

  return (
    <main className="flex flex-col gap-6 bg-white dark:bg-[#191919] min-h-screen">
      <Navbar />
      <div className="flex flex-col gap-6 pb-2 sm:pb-0 sm:px-8 px-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-gray-50 font-semibold">
            Dishes You Like
          </h1>
          <AddDishItemButton setDishes={setDishes} />
        </div>
        <div className="flex flex-wrap place-content-evenly px-2 gap-6">
          {isDishLoading && (
            <div className="flex gap-2 items-center justify-center h-64 w-full">
              <Spinner className="animate-spin" size={32} />
              <h1 className="text-xl"> Loading...</h1>
            </div>
          )}
          {dishes.map((dish, _) => (
            <div key={_}>
              <DishCard dish={dish} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
