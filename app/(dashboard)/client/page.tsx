import { getFoods } from "../admin/foods-management/foods/data/get-foods";
import { getServingUnits } from "../admin/foods-management/serving-units/data/get-serving-units";
import ClientFilterMeal from "./_component/filter-meals";
import { getMeals } from "./data/get-meals";

const page = async () => {
  const foods = await getFoods();
  const servingUnits = await getServingUnits();
  const initialMeals = await getMeals(new Date());
  return (
    <ClientFilterMeal
      foods={foods}
      servingUnits={servingUnits}
      initialMeals={initialMeals}
    />
  );
};

export default page;