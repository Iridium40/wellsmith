// Lean & Green recipe library.
//
// Source of truth is the Health Coach Hub project (lib/data.ts); this is a
// synced copy so the public site has no runtime dependency on that app or on
// Pinterest. Re-sync by re-exporting the `recipes` array from the hub.

export type RecipeCategory =
  | "Chicken"
  | "Seafood"
  | "Beef"
  | "Turkey"
  | "Pork"
  | "Vegetarian"
  | "Breakfast";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: RecipeCategory;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  counts: {
    lean: number;
    green: number;
    fat: number;
    condiment: number;
  };
  ingredients: string[];
  instructions: string[];
  favoriteCount?: number;
}

export const RECIPE_CATEGORIES: RecipeCategory[] = [
  "Chicken",
  "Seafood",
  "Beef",
  "Turkey",
  "Pork",
  "Vegetarian",
  "Breakfast",
];

export const recipes: Recipe[] = [

  // ============================================
  // CHICKEN RECIPES
  // ============================================
  {
    id: "recipe-1",
    title: "Lemon Herb Grilled Chicken",
    description: "Tender grilled chicken breast with bright lemon and fresh herbs, served over roasted asparagus.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop",
    category: "Chicken",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 0, condiment: 2 },
    ingredients: [
      "24 oz chicken breast",
      "2 lemons, juiced and zested",
      "4 cloves garlic, minced",
      "2 tbsp fresh oregano, chopped",
      "2 tbsp fresh thyme",
      "1 lb asparagus, trimmed",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Marinate chicken in lemon juice, zest, garlic, and herbs for 30 minutes.",
      "Preheat grill to medium-high heat.",
      "Grill chicken 6-7 minutes per side until internal temp reaches 165°F.",
      "Toss asparagus with salt and grill 3-4 minutes.",
      "Let chicken rest 5 minutes before slicing. Serve over asparagus."
    ]
  },
  {
    id: "recipe-2",
    title: "Caprese Chicken",
    description: "Classic flavors of Caprese served on a tender chicken breast. So simple. So delicious.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    category: "Chicken",
    prepTime: 10,
    cookTime: 20,
    servings: 2,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 1 },
    ingredients: [
      "12 oz chicken breast",
      "2 oz fresh mozzarella, sliced",
      "2 Roma tomatoes, sliced",
      "Fresh basil leaves",
      "1 tbsp balsamic glaze",
      "4 cups mixed greens",
      "1 tbsp olive oil",
      "Salt and pepper"
    ],
    instructions: [
      "Season chicken with salt and pepper.",
      "Grill or pan-sear until cooked through, about 6-7 minutes per side.",
      "Top chicken with mozzarella, tomato slices, and fresh basil.",
      "Drizzle with balsamic glaze.",
      "Serve over mixed greens dressed with olive oil."
    ]
  },
  {
    id: "recipe-3",
    title: "Grilled Fajita Bowl",
    description: "Serve up a taste of the Southwest with a delicious dish perfect for family dinner.",
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop",
    category: "Chicken",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "20 oz chicken breast, sliced",
      "2 bell peppers, sliced",
      "1 onion, sliced",
      "2 tbsp fajita seasoning",
      "4 cups romaine lettuce",
      "1/2 cup salsa",
      "1/4 cup Greek yogurt",
      "1 avocado, sliced"
    ],
    instructions: [
      "Season chicken with fajita seasoning.",
      "Grill chicken 5-6 minutes per side until cooked through.",
      "Grill peppers and onions until slightly charred.",
      "Arrange lettuce in bowls.",
      "Top with chicken, peppers, onions, salsa, yogurt, and avocado."
    ]
  },
  {
    id: "recipe-4",
    title: "Buffalo Chicken Cauliflower Casserole",
    description: "Creamy and delicious buffalo chicken paired with cauliflower florets in a satisfying casserole.",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop",
    category: "Chicken",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "20 oz cooked chicken breast, shredded",
      "4 cups cauliflower florets",
      "4 oz low-fat cream cheese",
      "1/4 cup buffalo sauce",
      "1/4 cup ranch dressing (light)",
      "1/2 cup reduced-fat cheddar cheese",
      "Green onions for garnish"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Steam cauliflower until tender, about 5 minutes.",
      "Mix cream cheese, buffalo sauce, and ranch until smooth.",
      "Combine chicken, cauliflower, and sauce mixture in a baking dish.",
      "Top with cheddar cheese and bake 20 minutes until bubbly.",
      "Garnish with green onions."
    ]
  },
  {
    id: "recipe-5",
    title: "Chicken Cacciatore (Instant Pot)",
    description: "A healthy and flavorful Italian dish with chicken thighs in a rich tomato sauce with peppers.",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop",
    category: "Chicken",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 0, condiment: 3 },
    ingredients: [
      "20 oz boneless skinless chicken thighs",
      "1 can crushed tomatoes (14 oz)",
      "1 red bell pepper, sliced",
      "1 green bell pepper, sliced",
      "1/2 cup scallions, chopped",
      "3 cloves garlic, minced",
      "1 bay leaf",
      "Fresh parsley for garnish",
      "Salt and pepper"
    ],
    instructions: [
      "Season chicken with salt and pepper.",
      "Set Instant Pot to sauté and brown chicken on both sides.",
      "Add tomatoes, peppers, scallions, garlic, and bay leaf.",
      "Pressure cook on high for 15 minutes.",
      "Natural release for 5 minutes, then quick release.",
      "Remove bay leaf and garnish with fresh parsley."
    ]
  },
  {
    id: "recipe-6",
    title: "Crispy Almond Chicken Parmesan",
    description: "Crispy almond flour breaded chicken topped with marinara and melted mozzarella.",
    image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop",
    category: "Chicken",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "20 oz chicken breast, pounded thin",
      "1/2 cup almond flour",
      "1/4 cup grated parmesan",
      "1 egg, beaten",
      "1 cup sugar-free marinara",
      "4 oz part-skim mozzarella",
      "4 cups zucchini noodles",
      "Italian seasoning"
    ],
    instructions: [
      "Preheat oven to 400°F.",
      "Mix almond flour, parmesan, and Italian seasoning.",
      "Dip chicken in egg, then coat in almond mixture.",
      "Bake chicken for 15 minutes.",
      "Top with marinara and mozzarella, bake 10 more minutes.",
      "Serve over zucchini noodles."
    ]
  },
  {
    id: "recipe-7",
    title: "Tropical Chicken Medley",
    description: "Lean chicken with sautéed peppers and broccoli, topped with toasted pine nuts.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    category: "Chicken",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 1 },
    ingredients: [
      "20 oz boneless skinless chicken breast",
      "2 cups broccoli florets",
      "1 red bell pepper, sliced",
      "1 yellow bell pepper, sliced",
      "2 tbsp pine nuts, toasted",
      "2 cloves garlic, minced",
      "1 tbsp olive oil",
      "Salt and pepper"
    ],
    instructions: [
      "Cut chicken into bite-sized pieces and season.",
      "Heat oil in a large skillet over medium-high heat.",
      "Cook chicken until golden, about 6-7 minutes. Remove.",
      "Sauté peppers and broccoli with garlic until tender-crisp.",
      "Return chicken to pan and toss together.",
      "Top with toasted pine nuts before serving."
    ]
  },
  {
    id: "recipe-8",
    title: "Chicken Zucchini Noodles with Pesto",
    description: "Fresh zucchini noodles tossed with grilled chicken and homemade parsley almond pesto.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    category: "Chicken",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 1 },
    ingredients: [
      "20 oz chicken breast",
      "4 medium zucchini, spiralized",
      "1 cup fresh parsley",
      "2 tbsp almonds",
      "2 cloves garlic",
      "2 tbsp olive oil",
      "2 tbsp parmesan cheese",
      "Salt and pepper"
    ],
    instructions: [
      "Blend parsley, almonds, garlic, olive oil, and parmesan for pesto.",
      "Season and grill chicken until cooked through.",
      "Spiralize zucchini into noodles.",
      "Sauté zoodles for 2-3 minutes until slightly tender.",
      "Slice chicken and toss with zoodles and pesto.",
      "Season with salt and pepper to taste."
    ]
  },

  // ============================================
  // SEAFOOD RECIPES
  // ============================================
  {
    id: "recipe-9",
    title: "Blackened Shrimp Lettuce Wraps",
    description: "Spicy blackened shrimp with creamy avocado crema and fresh tomato salsa in crisp lettuce cups.",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop",
    category: "Seafood",
    prepTime: 10,
    cookTime: 8,
    servings: 2,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 1 },
    ingredients: [
      "12 oz large shrimp, peeled and deveined",
      "2 tbsp blackened seasoning (Old Bay)",
      "1 head butter lettuce",
      "1 ripe avocado",
      "1/4 cup Greek yogurt",
      "2 Roma tomatoes, diced",
      "1/4 cup cilantro, chopped",
      "1 lime, juiced",
      "1 jalapeño, minced (optional)"
    ],
    instructions: [
      "Pat shrimp dry and coat evenly with blackened seasoning.",
      "Heat a skillet over high heat. Cook shrimp 2-3 minutes per side until opaque.",
      "Blend avocado, Greek yogurt, and half the lime juice for crema.",
      "Mix tomatoes, cilantro, jalapeño, and remaining lime juice for salsa.",
      "Arrange shrimp in lettuce cups, top with crema and salsa."
    ]
  },
  {
    id: "recipe-10",
    title: "Salmon Piccata with Capers",
    description: "Pan-seared salmon in a light lemon butter caper sauce with sautéed spinach.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    category: "Seafood",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "12 oz salmon fillet",
      "2 tbsp capers, drained",
      "2 lemons, juiced",
      "2 tbsp butter",
      "6 cups fresh spinach",
      "2 cloves garlic, minced",
      "Fresh parsley",
      "Salt and pepper"
    ],
    instructions: [
      "Season salmon with salt and pepper.",
      "Sear salmon in a hot pan 4 minutes per side.",
      "Remove salmon. Add butter, lemon juice, and capers to pan.",
      "In another pan, sauté garlic and spinach until wilted.",
      "Plate spinach, top with salmon, drizzle with piccata sauce."
    ]
  },
  {
    id: "recipe-11",
    title: "Sheet Pan Salmon with Asparagus",
    description: "Easy one-pan meal with perfectly roasted salmon and tender asparagus.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop",
    category: "Seafood",
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 1 },
    ingredients: [
      "20 oz salmon fillets",
      "1 lb asparagus, trimmed",
      "2 tbsp olive oil",
      "4 cloves garlic, minced",
      "1 lemon, sliced",
      "Fresh dill",
      "Salt and pepper"
    ],
    instructions: [
      "Preheat oven to 400°F.",
      "Arrange salmon and asparagus on a sheet pan.",
      "Drizzle with olive oil, sprinkle with garlic, salt, and pepper.",
      "Top salmon with lemon slices.",
      "Roast for 15-20 minutes until salmon flakes easily.",
      "Garnish with fresh dill."
    ]
  },
  {
    id: "recipe-12",
    title: "Shrimp Scampi Zoodles",
    description: "Classic shrimp scampi flavors over light and fresh zucchini noodles.",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop",
    category: "Seafood",
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "12 oz large shrimp, peeled",
      "3 medium zucchini, spiralized",
      "4 cloves garlic, minced",
      "2 tbsp butter",
      "1/4 cup white wine or chicken broth",
      "2 tbsp capers",
      "Red pepper flakes",
      "Fresh parsley"
    ],
    instructions: [
      "Spiralize zucchini into noodles.",
      "Sauté garlic in butter for 1 minute.",
      "Add shrimp, cook 2 minutes per side until pink.",
      "Add wine/broth and capers, simmer 2 minutes.",
      "Toss with zoodles, garnish with parsley and red pepper flakes."
    ]
  },
  {
    id: "recipe-13",
    title: "Za'atar Salmon Salad",
    description: "Middle Eastern spiced salmon served over a fresh cucumber tomato salad.",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400&h=300&fit=crop",
    category: "Seafood",
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "12 oz salmon fillets",
      "1 tbsp za'atar seasoning",
      "2 cups cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/4 red onion, thinly sliced",
      "2 cups mixed greens",
      "2 tbsp olive oil",
      "1 lemon, juiced"
    ],
    instructions: [
      "Season salmon with za'atar and roast at 400°F for 12-15 minutes.",
      "Combine cucumber, tomatoes, onion, and greens.",
      "Whisk olive oil and lemon juice for dressing.",
      "Toss salad with dressing.",
      "Top with roasted salmon and serve with lemon wedges."
    ]
  },
  {
    id: "recipe-14",
    title: "Lobster Roll Lettuce Wraps",
    description: "Light and refreshing, yet filling. The perfect dish for summer!",
    image: "https://images.unsplash.com/photo-1559742811-822873691df8?w=400&h=300&fit=crop",
    category: "Seafood",
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 1 },
    ingredients: [
      "12 oz cooked lobster meat",
      "2 tbsp light mayo",
      "1 tbsp lemon juice",
      "1 celery stalk, diced",
      "1 tbsp chives, chopped",
      "1 head butter lettuce",
      "Old Bay seasoning",
      "Lemon wedges"
    ],
    instructions: [
      "Chop lobster into bite-sized pieces.",
      "Mix mayo, lemon juice, celery, and chives.",
      "Fold in lobster meat gently.",
      "Season with Old Bay to taste.",
      "Serve in lettuce cups with lemon wedges."
    ]
  },
  {
    id: "recipe-15",
    title: "Mediterranean Cod with Tomatoes",
    description: "Flaky cod topped with a zesty tomato mixture and feta cheese over zucchini.",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&h=300&fit=crop",
    category: "Seafood",
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "12 oz cod fillets",
      "2 medium zucchini, sliced",
      "1 cup cherry tomatoes, halved",
      "2 oz feta cheese, crumbled",
      "2 cloves garlic, minced",
      "1 tbsp olive oil",
      "Fresh oregano",
      "Salt and pepper"
    ],
    instructions: [
      "Preheat oven to 400°F.",
      "Arrange zucchini slices on a baking dish, season with salt.",
      "Place cod on top of zucchini.",
      "Mix tomatoes, garlic, olive oil, and oregano. Spoon over cod.",
      "Bake 15-20 minutes until cod flakes easily.",
      "Top with crumbled feta before serving."
    ]
  },
  {
    id: "recipe-16",
    title: "Shrimp and Avocado Salad",
    description: "Fresh and light salad with grilled shrimp, avocado, and pumpkin seeds.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    category: "Seafood",
    prepTime: 15,
    cookTime: 8,
    servings: 2,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 1 },
    ingredients: [
      "12 oz shrimp, peeled and deveined",
      "4 cups mixed greens",
      "1 avocado, sliced",
      "1/4 cup cilantro, chopped",
      "2 tbsp pumpkin seeds",
      "1 lime, juiced",
      "1 tbsp olive oil",
      "Salt and pepper"
    ],
    instructions: [
      "Season shrimp with salt and pepper.",
      "Grill or sauté shrimp until pink, about 2-3 minutes per side.",
      "Arrange greens on plates.",
      "Top with shrimp, avocado, cilantro, and pumpkin seeds.",
      "Drizzle with lime juice and olive oil."
    ]
  },
  {
    id: "recipe-17",
    title: "Cajun Shrimp and Cauliflower Rice",
    description: "Spicy Cajun shrimp served over fluffy cauliflower rice with peppers and onions.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    category: "Seafood",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "20 oz large shrimp",
      "4 cups cauliflower rice",
      "2 tbsp Cajun seasoning",
      "1 bell pepper, diced",
      "1/2 onion, diced",
      "2 cloves garlic, minced",
      "1 tbsp olive oil",
      "Fresh parsley"
    ],
    instructions: [
      "Season shrimp with Cajun seasoning.",
      "Heat oil and sauté peppers and onions until soft.",
      "Add garlic and cauliflower rice, cook 5 minutes.",
      "Push rice to sides, add shrimp to center.",
      "Cook shrimp 2-3 minutes per side.",
      "Toss together and garnish with parsley."
    ]
  },

  // ============================================
  // BEEF RECIPES
  // ============================================
  {
    id: "recipe-18",
    title: "Beef & Chinese Broccoli",
    description: "Quick and flavorful beef stir-fry with tender Chinese broccoli in savory sauce.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    category: "Beef",
    prepTime: 15,
    cookTime: 12,
    servings: 3,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "18 oz lean sirloin, thinly sliced",
      "1 lb Chinese broccoli",
      "3 cloves garlic, minced",
      "1 tbsp fresh ginger, minced",
      "2 tbsp coconut aminos",
      "1 tbsp sesame oil",
      "Red pepper flakes"
    ],
    instructions: [
      "Heat oil in a wok over high heat.",
      "Stir-fry beef 2-3 minutes until browned. Remove and set aside.",
      "Add garlic and ginger, cook 30 seconds.",
      "Add broccoli, cook 3-4 minutes until tender-crisp.",
      "Return beef, add coconut aminos, toss and serve."
    ]
  },
  {
    id: "recipe-19",
    title: "Big Mac Salad Bowl",
    description: "All the flavors of a Big Mac without the bun - beef, cheese, lettuce, and special sauce.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
    category: "Beef",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "12 oz lean ground beef (93%)",
      "4 cups romaine lettuce, chopped",
      "2 oz reduced-fat cheddar, shredded",
      "1/4 cup dill pickles, diced",
      "1/4 cup onion, diced",
      "2 tbsp light Thousand Island dressing",
      "Sesame seeds"
    ],
    instructions: [
      "Brown ground beef in a skillet, breaking into crumbles.",
      "Season with salt and pepper.",
      "Arrange lettuce in bowls.",
      "Top with beef, cheese, pickles, and onion.",
      "Drizzle with Thousand Island dressing.",
      "Sprinkle with sesame seeds."
    ]
  },
  {
    id: "recipe-20",
    title: "Beef Stroganoff with Cauliflower Rice",
    description: "Creamy beef stroganoff served over fluffy cauliflower rice with broccoli.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    category: "Beef",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "20 oz beef sirloin, sliced into strips",
      "4 cups cauliflower rice",
      "2 cups broccoli florets",
      "1 cup beef broth",
      "1/2 cup light sour cream",
      "8 oz mushrooms, sliced",
      "1 tbsp fresh dill",
      "Salt and pepper"
    ],
    instructions: [
      "Season beef and sear in a hot pan until browned.",
      "Remove beef, sauté mushrooms until golden.",
      "Add broth and simmer 5 minutes.",
      "Stir in sour cream and dill.",
      "Return beef to sauce.",
      "Serve over cauliflower rice with steamed broccoli."
    ]
  },
  {
    id: "recipe-21",
    title: "Cheesy Taco Vegetable Skillet",
    description: "Ground beef with fresh vegetables and melted cheese - taco Tuesday made lean!",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    category: "Beef",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 0, condiment: 2 },
    ingredients: [
      "20 oz lean ground beef (93%)",
      "2 cups kale, chopped",
      "1 bell pepper, diced",
      "1/2 onion, diced",
      "2 tbsp taco seasoning",
      "1/2 cup reduced-fat cheddar",
      "Salsa for topping",
      "Fresh cilantro"
    ],
    instructions: [
      "Brown ground beef with taco seasoning.",
      "Add onion and pepper, cook until soft.",
      "Stir in kale and cook until wilted.",
      "Top with cheese and cover until melted.",
      "Serve with salsa and fresh cilantro."
    ]
  },
  {
    id: "recipe-22",
    title: "Spiced Crockpot Roast Beef",
    description: "Tender slow-cooked beef roast with vegetables and aromatic spices.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop",
    category: "Beef",
    prepTime: 20,
    cookTime: 480,
    servings: 6,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 0, condiment: 3 },
    ingredients: [
      "2 lb beef chuck roast",
      "2 cups celery, chopped",
      "2 cups green beans",
      "1 onion, quartered",
      "4 cloves garlic",
      "2 cups beef broth",
      "1 tbsp Italian seasoning",
      "Salt and pepper"
    ],
    instructions: [
      "Season roast with Italian seasoning, salt, and pepper.",
      "Place vegetables in the bottom of slow cooker.",
      "Add roast on top, pour in broth.",
      "Add garlic cloves around the roast.",
      "Cook on low for 8 hours or high for 4-5 hours.",
      "Shred beef and serve with vegetables."
    ]
  },
  {
    id: "recipe-23",
    title: "Korean Beef Lettuce Cups",
    description: "Sweet and savory Korean-style ground beef served in crisp lettuce cups.",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop",
    category: "Beef",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 0, condiment: 2 },
    ingredients: [
      "20 oz lean ground beef",
      "1 head butter lettuce",
      "3 tbsp coconut aminos",
      "1 tbsp sesame oil",
      "2 cloves garlic, minced",
      "1 tbsp fresh ginger, minced",
      "Green onions, sliced",
      "Sesame seeds"
    ],
    instructions: [
      "Brown ground beef in a skillet.",
      "Add garlic and ginger, cook 1 minute.",
      "Stir in coconut aminos and sesame oil.",
      "Simmer 2-3 minutes until sauce thickens.",
      "Spoon into lettuce cups.",
      "Top with green onions and sesame seeds."
    ]
  },

  // ============================================
  // TURKEY RECIPES
  // ============================================
  {
    id: "recipe-24",
    title: "Zucchini Noodles with Turkey Meatballs",
    description: "Light and satisfying zoodles topped with lean turkey meatballs and marinara sauce.",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop",
    category: "Turkey",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "20 oz lean ground turkey (93%)",
      "4 medium zucchini, spiralized",
      "1 cup sugar-free marinara sauce",
      "1/4 cup parmesan cheese",
      "1 egg",
      "2 cloves garlic, minced",
      "Italian seasoning",
      "Fresh basil for garnish"
    ],
    instructions: [
      "Mix turkey, egg, half the parmesan, garlic, and Italian seasoning.",
      "Form into 16 meatballs. Bake at 400°F for 20 minutes.",
      "Spiralize zucchini into noodles.",
      "Sauté zoodles in a pan for 2-3 minutes until slightly tender.",
      "Top with meatballs, marinara, remaining parmesan, and fresh basil."
    ]
  },
  {
    id: "recipe-25",
    title: "Turkey Taco Bake",
    description: "All the flavors of taco night in a satisfying casserole form.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
    category: "Turkey",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 0, condiment: 2 },
    ingredients: [
      "20 oz lean ground turkey",
      "2 cups cauliflower rice",
      "1 can diced tomatoes with green chiles",
      "2 tbsp taco seasoning",
      "1/2 cup reduced-fat Mexican cheese",
      "1/4 cup Greek yogurt",
      "Fresh cilantro",
      "Jalapeños (optional)"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Brown turkey with taco seasoning.",
      "Mix with cauliflower rice and tomatoes.",
      "Pour into baking dish, top with cheese.",
      "Bake 25 minutes until bubbly.",
      "Serve with yogurt and cilantro."
    ]
  },
  {
    id: "recipe-26",
    title: "Turkey Zucchini Lasagna",
    description: "Classic lasagna flavors using zucchini slices instead of pasta.",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop",
    category: "Turkey",
    prepTime: 25,
    cookTime: 45,
    servings: 6,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "24 oz lean ground turkey",
      "4 large zucchini, sliced lengthwise",
      "2 cups sugar-free marinara",
      "1 cup part-skim ricotta",
      "1 cup part-skim mozzarella",
      "1/4 cup parmesan",
      "Italian seasoning",
      "Fresh basil"
    ],
    instructions: [
      "Salt zucchini slices and let drain 15 minutes.",
      "Brown turkey with Italian seasoning.",
      "Layer in baking dish: zucchini, turkey, ricotta, marinara, mozzarella.",
      "Repeat layers, ending with cheese.",
      "Bake at 375°F for 45 minutes.",
      "Rest 10 minutes before serving with fresh basil."
    ]
  },
  {
    id: "recipe-27",
    title: "Crockpot Chicken Taco Soup",
    description: "A healthy and flavorful soup that combines lean protein, vegetables, and taco spices.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    category: "Turkey",
    prepTime: 15,
    cookTime: 360,
    servings: 6,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 0, condiment: 3 },
    ingredients: [
      "24 oz chicken or turkey breast",
      "4 cups chicken broth",
      "1 can diced tomatoes",
      "2 cups cabbage, shredded",
      "2 tbsp taco seasoning",
      "1 tsp cumin",
      "1 tsp chili powder",
      "2 cloves garlic, minced"
    ],
    instructions: [
      "Combine broth, tomatoes, seasonings, and garlic in slow cooker.",
      "Add chicken/turkey breast and cabbage.",
      "Cook on low for 6-8 hours or high for 3-4 hours.",
      "Shred meat with two forks.",
      "Serve in bowls, optionally top with cheese and Greek yogurt."
    ]
  },
  {
    id: "recipe-28",
    title: "BBQ Turkey Stuffed Peppers",
    description: "Colorful bell peppers stuffed with BBQ turkey and cauliflower rice.",
    image: "https://images.unsplash.com/photo-1601000938365-f182c5ec7e46?w=400&h=300&fit=crop", // Option 1 - Colorful stuffed peppers with melted cheese (recommended)
    category: "Turkey",
    prepTime: 20,
    cookTime: 35,
    servings: 4,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 0, condiment: 2 },
    ingredients: [
      "20 oz lean ground turkey",
      "4 large bell peppers, tops removed",
      "2 cups cauliflower rice",
      "1/4 cup sugar-free BBQ sauce",
      "1/2 cup reduced-fat cheddar",
      "1/4 cup onion, diced",
      "Garlic powder",
      "Fresh parsley"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Brown turkey with onion and garlic powder.",
      "Mix in cauliflower rice and BBQ sauce.",
      "Stuff mixture into peppers.",
      "Bake 30 minutes, top with cheese.",
      "Bake 5 more minutes until cheese melts."
    ]
  },

  // ============================================
  // PORK RECIPES
  // ============================================
  {
    id: "recipe-29",
    title: "Pork Tacos",
    description: "Easy, cheesy and perfect for any time you're craving tacos.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    category: "Pork",
    prepTime: 15,
    cookTime: 20,
    servings: 3,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 0, condiment: 2 },
    ingredients: [
      "18 oz pork tenderloin, sliced",
      "2 tbsp taco seasoning",
      "1 head butter lettuce",
      "1/2 cup pico de gallo",
      "1/4 cup Greek yogurt",
      "Fresh cilantro",
      "1 lime",
      "Jalapeño slices"
    ],
    instructions: [
      "Season pork with taco seasoning.",
      "Grill or pan-sear 3-4 minutes per side.",
      "Let rest 5 minutes, then slice.",
      "Arrange pork in lettuce cups.",
      "Top with pico, yogurt, cilantro, and lime."
    ]
  },
  {
    id: "recipe-30",
    title: "Asian Pork Stir-Fry",
    description: "Quick pork tenderloin stir-fry with snap peas and water chestnuts.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    category: "Pork",
    prepTime: 15,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "20 oz pork tenderloin, sliced thin",
      "2 cups snap peas",
      "1 cup water chestnuts, sliced",
      "1 red bell pepper, sliced",
      "3 tbsp coconut aminos",
      "1 tbsp sesame oil",
      "2 cloves garlic, minced",
      "1 tbsp ginger, minced"
    ],
    instructions: [
      "Heat sesame oil in a wok over high heat.",
      "Stir-fry pork 3-4 minutes until cooked. Remove.",
      "Add garlic, ginger, and vegetables. Cook 3-4 minutes.",
      "Return pork to wok.",
      "Add coconut aminos and toss to combine.",
      "Serve immediately."
    ]
  },

  // ============================================
  // VEGETARIAN RECIPES
  // ============================================
  {
    id: "recipe-31",
    title: "Cauliflower Grilled Cheese",
    description: "The grilled cheese flavor you love, without all of the carbs and calories.",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?w=400&h=300&fit=crop",
    category: "Vegetarian",
    prepTime: 15,
    cookTime: 20,
    servings: 2,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 0 },
    ingredients: [
      "3 cups riced cauliflower",
      "2 eggs",
      "1/2 cup shredded cheddar cheese",
      "1/4 cup parmesan cheese",
      "1/4 tsp garlic powder",
      "Salt and pepper",
      "Cooking spray"
    ],
    instructions: [
      "Microwave riced cauliflower 4 minutes. Let cool and squeeze dry.",
      "Mix with 1 egg, parmesan, and seasonings.",
      "Form into 4 thin patties on parchment-lined pan.",
      "Bake at 400°F for 15 minutes until golden.",
      "Add cheddar between two patties and grill until melted."
    ]
  },
  {
    id: "recipe-32",
    title: "Crispy Tofu with Caramelized Veggies",
    description: "Lightly seasoned tofu baked with fresh vegetables for a satisfying plant-based meal.",
    image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400&h=300&fit=crop",
    category: "Vegetarian",
    prepTime: 20,
    cookTime: 30,
    servings: 2,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 3 },
    ingredients: [
      "15 oz extra firm tofu, pressed and cubed",
      "2 cups asparagus, trimmed",
      "1 cup bell peppers, sliced",
      "1 cup zucchini, sliced",
      "2 tbsp olive oil",
      "2 tbsp coconut aminos",
      "1 tbsp sesame seeds",
      "Garlic powder, salt, pepper"
    ],
    instructions: [
      "Press tofu for 15 minutes, then cube.",
      "Toss tofu with half the oil and seasonings.",
      "Bake at 400°F for 20 minutes, flipping halfway.",
      "Toss vegetables with remaining oil.",
      "Add vegetables to pan, bake 10 more minutes.",
      "Drizzle with coconut aminos and sesame seeds."
    ]
  },
  {
    id: "recipe-33",
    title: "Vegetable Tofu Bowl with Eggs",
    description: "A Chinese-inspired bowl with crispy tofu, sautéed vegetables, and poached eggs.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    category: "Vegetarian",
    prepTime: 20,
    cookTime: 25,
    servings: 2,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "10 oz extra firm tofu, cubed",
      "2 eggs",
      "1 cup cauliflower florets",
      "1 cup mushrooms, sliced",
      "1 bell pepper, diced",
      "2 tbsp soy sauce or coconut aminos",
      "1 tsp sriracha",
      "Fresh cilantro, ginger, garlic"
    ],
    instructions: [
      "Press and cube tofu. Pan-fry until golden.",
      "Sauté vegetables with ginger and garlic.",
      "Add soy sauce and sriracha.",
      "Place tofu on vegetables, simmer.",
      "Crack eggs into the pan, cover and cook until set.",
      "Garnish with cilantro."
    ]
  },
  {
    id: "recipe-34",
    title: "Ricotta Spinach Dumplings",
    description: "Italian-style ricotta and spinach dumplings baked with cherry tomatoes and basil.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop",
    category: "Vegetarian",
    prepTime: 25,
    cookTime: 25,
    servings: 2,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 3 },
    ingredients: [
      "1 cup part-skim ricotta cheese",
      "2 cups fresh spinach, wilted and drained",
      "1 egg",
      "1/4 cup parmesan cheese",
      "1 cup cherry tomatoes, halved",
      "Fresh basil",
      "Garlic, Italian seasoning",
      "Salt and pepper"
    ],
    instructions: [
      "Mix ricotta, spinach, egg, parmesan, and seasonings.",
      "Form into small dumplings.",
      "Place in baking dish with cherry tomatoes.",
      "Drizzle with olive oil.",
      "Bake at 400°F for 20-25 minutes.",
      "Garnish with fresh basil."
    ]
  },
  {
    id: "recipe-35",
    title: "Zucchini Pizza Casserole",
    description: "All the pizza flavors you love in a veggie-packed casserole.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    category: "Vegetarian",
    prepTime: 20,
    cookTime: 35,
    servings: 4,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 2 },
    ingredients: [
      "4 medium zucchini, sliced",
      "1 cup sugar-free marinara",
      "1 cup part-skim mozzarella",
      "1/4 cup parmesan",
      "1/2 cup mushrooms, sliced",
      "1/4 cup black olives",
      "Italian seasoning",
      "Fresh basil"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Layer zucchini in a baking dish.",
      "Spread marinara over zucchini.",
      "Add mushrooms and olives.",
      "Top with cheeses and Italian seasoning.",
      "Bake 30-35 minutes until bubbly."
    ]
  },
  {
    id: "recipe-36",
    title: "Vegetarian Chili",
    description: "Plant-based, lower carb chili packed with vegetables and protein.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
    category: "Vegetarian",
    prepTime: 20,
    cookTime: 40,
    servings: 4,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 0, condiment: 3 },
    ingredients: [
      "15 oz extra firm tofu, crumbled",
      "1 can diced tomatoes",
      "2 cups cauliflower, chopped",
      "1 bell pepper, diced",
      "1/2 onion, diced",
      "2 tbsp chili powder",
      "1 tsp cumin",
      "Garlic, salt, pepper"
    ],
    instructions: [
      "Sauté onion and pepper until soft.",
      "Add crumbled tofu and cook 5 minutes.",
      "Stir in tomatoes, cauliflower, and spices.",
      "Simmer 30 minutes until vegetables are tender.",
      "Adjust seasonings to taste.",
      "Serve with Greek yogurt if desired."
    ]
  },

  // ============================================
  // BREAKFAST RECIPES
  // ============================================
  {
    id: "recipe-37",
    title: "Egg White Veggie Scramble",
    description: "Protein-packed breakfast with fluffy egg whites and colorful sautéed vegetables.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
    category: "Breakfast",
    prepTime: 10,
    cookTime: 10,
    servings: 1,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 1 },
    ingredients: [
      "6 egg whites",
      "1 cup spinach",
      "1/2 cup mushrooms, sliced",
      "1/4 cup bell pepper, diced",
      "2 tbsp feta cheese",
      "1 tsp olive oil",
      "Fresh herbs",
      "Salt and pepper"
    ],
    instructions: [
      "Heat oil in a non-stick pan over medium heat.",
      "Sauté mushrooms and peppers for 3 minutes.",
      "Add spinach, cook until wilted.",
      "Pour in egg whites, gently scramble.",
      "Top with feta and fresh herbs."
    ]
  },
  {
    id: "recipe-38",
    title: "Hearty Veggie Frittata",
    description: "A delicious baked frittata packed with fresh vegetables - perfect for any meal.",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop",
    category: "Breakfast",
    prepTime: 15,
    cookTime: 30,
    servings: 2,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 1 },
    ingredients: [
      "6 eggs",
      "2 tbsp almond milk",
      "2 cups spinach",
      "1 cup zucchini, diced",
      "1 cup mushrooms, sliced",
      "1 tbsp olive oil",
      "Salt and pepper",
      "Fresh herbs"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Whisk eggs and almond milk.",
      "Sauté vegetables in an oven-safe skillet.",
      "Pour eggs over vegetables.",
      "Cook on stovetop 2 minutes.",
      "Transfer to oven, bake 20-30 minutes until set."
    ]
  },
  {
    id: "recipe-39",
    title: "Spinach Tomato Egg Muffins",
    description: "Portable egg muffins loaded with spinach, tomatoes, and cheese.",
    image: "https://images.unsplash.com/photo-1608039829572-9b79e4e37f29?w=400&h=300&fit=crop",
    category: "Breakfast",
    prepTime: 15,
    cookTime: 25,
    servings: 6,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 0 },
    ingredients: [
      "6 eggs",
      "2 cups spinach, chopped",
      "1/2 cup cherry tomatoes, diced",
      "1/4 cup onion, diced",
      "1/4 cup goat cheese, crumbled",
      "Salt and pepper",
      "Cooking spray"
    ],
    instructions: [
      "Preheat oven to 350°F. Spray muffin tin.",
      "Sauté spinach and onion until wilted.",
      "Divide vegetables and tomatoes among muffin cups.",
      "Whisk eggs with salt and pepper.",
      "Pour eggs over vegetables.",
      "Top with goat cheese, bake 20-25 minutes."
    ]
  },
  {
    id: "recipe-40",
    title: "Asparagus and Crabmeat Frittata",
    description: "Elegant brunch option with tender crabmeat and fresh asparagus.",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=400&h=300&fit=crop",
    category: "Breakfast",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    difficulty: "Medium",
    counts: { lean: 1, green: 3, fat: 1, condiment: 1 },
    ingredients: [
      "8 eggs",
      "6 oz crabmeat",
      "1 lb asparagus, cut into pieces",
      "1/4 cup parmesan cheese",
      "2 tbsp olive oil",
      "2 cloves garlic, minced",
      "Fresh dill",
      "Salt and pepper"
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Sauté asparagus and garlic in oil until tender.",
      "Add crabmeat, toss gently.",
      "Whisk eggs with parmesan and seasonings.",
      "Pour over asparagus mixture.",
      "Bake 20-25 minutes until set."
    ]
  },
  {
    id: "recipe-41",
    title: "Mason Jar Egg Salad",
    description: "Simple, portable, and packed with lean protein and veggies.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
    category: "Breakfast",
    prepTime: 15,
    cookTime: 12,
    servings: 2,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 1 },
    ingredients: [
      "6 hard-boiled eggs",
      "2 tbsp light mayo",
      "1 tbsp Dijon mustard",
      "2 cups mixed greens",
      "1/2 cup celery, diced",
      "1/4 cup red onion, diced",
      "Salt and pepper",
      "Paprika"
    ],
    instructions: [
      "Hard boil eggs, cool and peel.",
      "Chop eggs and mix with mayo and mustard.",
      "Season with salt, pepper, and paprika.",
      "Layer greens in mason jars.",
      "Top with egg salad, celery, and onion.",
      "Seal and refrigerate until ready to eat."
    ]
  },
  {
    id: "recipe-42",
    title: "Kohlrabi Egg Scramble",
    description: "A unique breakfast featuring kohlrabi paired with fluffy scrambled eggs.",
    image: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=400&h=300&fit=crop",
    category: "Breakfast",
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    difficulty: "Easy",
    counts: { lean: 1, green: 3, fat: 1, condiment: 1 },
    ingredients: [
      "4 eggs",
      "2 egg whites",
      "1 kohlrabi, peeled and diced",
      "1 cup kale, chopped",
      "1 tbsp olive oil",
      "2 cloves garlic, minced",
      "Salt and pepper",
      "Fresh chives"
    ],
    instructions: [
      "Heat oil in a skillet over medium heat.",
      "Sauté kohlrabi until tender, about 8 minutes.",
      "Add garlic and kale, cook 2 minutes.",
      "Whisk eggs and egg whites.",
      "Pour over vegetables and scramble.",
      "Top with chives and serve."
    ]
  }
];
