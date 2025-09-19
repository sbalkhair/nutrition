import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  // Clean up existing data
  await prisma.foodServingUnit.deleteMany({});
  await prisma.mealFood.deleteMany({});
  await prisma.meal.deleteMany({});
  await prisma.food.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.servingUnit.deleteMany({});

  // Create categories
  const categoriesData = [
    { name: 'Fruits' },
    { name: 'Vegetables' },
    { name: 'Grains' },
    { name: 'Protein' },
    { name: 'Dairy' },
  ];
  const categories = await Promise.all(
    categoriesData.map((category) => prisma.category.create({ data: category })),
  );
  console.log('Created categories.');

  // Create serving units
  const servingUnitNames = ['g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'oz', 'piece'];
  const servingUnits = await Promise.all(
    servingUnitNames.map((name) => prisma.servingUnit.create({ data: { name } })),
  );
  console.log('Created serving units.');

  const gUnit = servingUnits.find((unit) => unit.name === 'g');
  const pieceUnit = servingUnits.find((unit) => unit.name === 'piece');
  const cupUnit = servingUnits.find((unit) => unit.name === 'cup');
  const ozUnit = servingUnits.find((unit) => unit.name === 'oz');

  // Create foods
  const foodsData = [
    // Fruits
    { name: 'Apple', calories: 52, protein: 0.3, fat: 0.2, carbohydrates: 14, fiber: 2.4, sugar: 10, category: 'Fruits', units: [{ unit: pieceUnit, grams: 182 }, { unit: gUnit, grams: 1 }] },
    { name: 'Banana', calories: 89, protein: 1.1, fat: 0.3, carbohydrates: 23, fiber: 2.6, sugar: 12, category: 'Fruits', units: [{ unit: pieceUnit, grams: 118 }, { unit: gUnit, grams: 1 }] },
    { name: 'Orange', calories: 47, protein: 0.9, fat: 0.1, carbohydrates: 12, fiber: 2.4, sugar: 9, category: 'Fruits', units: [{ unit: pieceUnit, grams: 131 }, { unit: gUnit, grams: 1 }] },
    { name: 'Strawberry', calories: 32, protein: 0.7, fat: 0.3, carbohydrates: 8, fiber: 2, sugar: 5, category: 'Fruits', units: [{ unit: cupUnit, grams: 152 }, { unit: gUnit, grams: 1 }] },
    { name: 'Grapes', calories: 67, protein: 0.6, fat: 0.2, carbohydrates: 17, fiber: 0.9, sugar: 16, category: 'Fruits', units: [{ unit: cupUnit, grams: 151 }, { unit: gUnit, grams: 1 }] },

    // Vegetables
    { name: 'Carrot', calories: 41, protein: 0.9, fat: 0.2, carbohydrates: 10, fiber: 2.8, sugar: 5, category: 'Vegetables', units: [{ unit: pieceUnit, grams: 61 }, { unit: gUnit, grams: 1 }] },
    { name: 'Spinach', calories: 23, protein: 2.9, fat: 0.4, carbohydrates: 3.6, fiber: 2.2, sugar: 0.4, category: 'Vegetables', units: [{ unit: cupUnit, grams: 30 }, { unit: gUnit, grams: 1 }] },
    { name: 'Tomato', calories: 18, protein: 0.9, fat: 0.2, carbohydrates: 3.9, fiber: 1.2, sugar: 2.6, category: 'Vegetables', units: [{ unit: pieceUnit, grams: 123 }, { unit: gUnit, grams: 1 }] },
    { name: 'Broccoli', calories: 34, protein: 2.8, fat: 0.4, carbohydrates: 7, fiber: 2.6, sugar: 1.7, category: 'Vegetables', units: [{ unit: cupUnit, grams: 91 }, { unit: gUnit, grams: 1 }] },

    // Grains
    { name: 'Oats', calories: 389, protein: 16.9, fat: 6.9, carbohydrates: 66.3, fiber: 10.6, sugar: 0, category: 'Grains', units: [{ unit: cupUnit, grams: 81 }, { unit: gUnit, grams: 1 }] },
    { name: 'Quinoa', calories: 120, protein: 4.4, fat: 1.9, carbohydrates: 21.3, fiber: 2.8, sugar: 0.9, category: 'Grains', units: [{ unit: cupUnit, grams: 185 }, { unit: gUnit, grams: 1 }] },
    { name: 'White Bread', calories: 265, protein: 9, fat: 3.2, carbohydrates: 49, fiber: 2.7, sugar: 5, category: 'Grains', units: [{ unit: pieceUnit, grams: 25 }, { unit: gUnit, grams: 1 }] },

    // Protein
    { name: 'Chicken Breast', calories: 165, protein: 31, fat: 3.6, carbohydrates: 0, fiber: 0, sugar: 0, category: 'Protein', units: [{ unit: ozUnit, grams: 28.35 }, { unit: gUnit, grams: 1 }] },
    { name: 'Salmon', calories: 208, protein: 20, fat: 13, carbohydrates: 0, fiber: 0, sugar: 0, category: 'Protein', units: [{ unit: ozUnit, grams: 28.35 }, { unit: gUnit, grams: 1 }] },
    { name: 'Eggs', calories: 155, protein: 13, fat: 11, carbohydrates: 1.1, fiber: 0, sugar: 1.1, category: 'Protein', units: [{ unit: pieceUnit, grams: 50 }, { unit: gUnit, grams: 1 }] },
    { name: 'Tofu', calories: 76, protein: 8, fat: 5, carbohydrates: 2, fiber: 1, sugar: 0, category: 'Protein', units: [{ unit: cupUnit, grams: 252 }, { unit: gUnit, grams: 1 }] },

    // Dairy
    { name: 'Milk', calories: 42, protein: 3.4, fat: 1, carbohydrates: 5, fiber: 0, sugar: 5, category: 'Dairy', units: [{ unit: cupUnit, grams: 244 }, { unit: gUnit, grams: 1 }] },
    { name: 'Yogurt', calories: 59, protein: 10, fat: 0.4, carbohydrates: 3.6, fiber: 0, sugar: 3.6, category: 'Dairy', units: [{ unit: cupUnit, grams: 245 }, { unit: gUnit, grams: 1 }] },
    { name: 'Cheddar Cheese', calories: 404, protein: 25, fat: 33, carbohydrates: 1.3, fiber: 0, sugar: 0.5, category: 'Dairy', units: [{ unit: ozUnit, grams: 28.35 }, { unit: gUnit, grams: 1 }] },
  ];

  for (const foodData of foodsData) {
    const category = categories.find((c) => c.name === foodData.category);
    if (category) {
      const food = await prisma.food.create({
        data: {
          name: foodData.name,
          calories: foodData.calories,
          protein: foodData.protein,
          fat: foodData.fat,
          carbohydrates: foodData.carbohydrates,
          fiber: foodData.fiber,
          sugar: foodData.sugar,
          categoryId: category.id,
        },
      });

      for (const unitInfo of foodData.units) {
        if (unitInfo.unit) {
          await prisma.foodServingUnit.create({
            data: {
              foodId: food.id,
              servingUnitId: unitInfo.unit.id,
              grams: unitInfo.grams,
            },
          });
        }
      }
    }
  }
  console.log('Created foods and food serving units.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
