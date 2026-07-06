export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  emoji: string;
  bg: string;
  tag?: string;
  category: "cat" | "dog" | "fish" | "bird" | "litter" | "care";
  categoryName: string;
  description: string;
  features: string[];
  weight: string;
  inStock: boolean;
  sku: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Purina Friskies Meaty Grills Dry Cat Food 400g",
    brand: "Purina",
    price: 400,
    rating: 4.8,
    reviews: 124,
    emoji: "🍖",
    bg: "from-amber-glow/30 to-terracotta/20",
    tag: "Cat",
    category: "cat",
    categoryName: "Cat Food",
    description:
      "Purina Friskies Meaty Grills delivers a delicious and balanced meal your cat will love. Crafted with high-quality protein sources and enriched with essential vitamins and minerals, this dry cat food supports lean muscle maintenance, healthy skin, and a shiny coat. The crunchy kibble texture helps clean teeth and reduce tartar buildup.",
    features: [
      "High-quality protein for lean muscles",
      "Essential fatty acids for healthy skin & coat",
      "Crunchy kibble helps clean teeth",
      "Complete & balanced nutrition",
      "Antioxidant-rich formula supports immune health",
    ],
    weight: "400g",
    inStock: true,
    sku: "PF-CAT-400",
  },
  {
    id: 2,
    name: "Drools Kitten Booster Milk Replacer",
    brand: "Drools",
    price: 820,
    rating: 4.9,
    reviews: 89,
    emoji: "🥛",
    bg: "from-sage/20 to-secondary",
    category: "cat",
    categoryName: "Cat Food",
    description:
      "Drools Kitten Booster is a premium milk replacer specially formulated for orphaned or nursing kittens. Packed with essential nutrients, antibodies, and DHA for brain development, it provides the perfect start for growing kittens from birth to weaning.",
    features: [
      "Complete nutrition for kittens 0-8 weeks",
      "Contains DHA for brain & eye development",
      "Rich in antibodies for immunity",
      "Easy to digest formula",
      "Supports healthy growth rate",
    ],
    weight: "200g",
    inStock: true,
    sku: "DR-KIT-200",
  },
  {
    id: 3,
    name: "Miow Miow First Milk Kitten Milk Replacer Powder",
    brand: "Miow Miow",
    price: 520,
    rating: 4.7,
    reviews: 56,
    emoji: "🍼",
    bg: "from-terracotta/15 to-amber-glow/15",
    category: "cat",
    categoryName: "Cat Food",
    description:
      "Miow Miow First Milk provides essential nutrition for newborn kittens. This premium milk replacer powder closely matches queen's milk with optimal protein, fat, and carbohydrate ratios to support healthy development.",
    features: [
      "Formulated to match queen's milk",
      "Optimal protein & fat ratio",
      "Easy to mix powder form",
      "Supports healthy weight gain",
      "Suitable from birth",
    ],
    weight: "150g",
    inStock: true,
    sku: "MM-KIT-150",
  },
  {
    id: 4,
    name: "Orijen Cat Food – Healthy Meals for Kittens & Adults",
    brand: "Orijen",
    price: 1400,
    oldPrice: 1500,
    rating: 4.9,
    reviews: 210,
    emoji: "🐟",
    bg: "from-sage/25 to-amber-glow/15",
    tag: "-7%",
    category: "cat",
    categoryName: "Cat Food",
    description:
      "Orijen Cat Food features a Biologically Appropriate recipe with 90% premium animal ingredients. Free-run chicken, turkey, and wild-caught fish deliver protein-rich nutrition that mirrors your cat's natural diet. Grain-free and packed with fresh, raw ingredients.",
    features: [
      "90% premium animal ingredients",
      "Grain-free biologically appropriate recipe",
      "Fresh, raw ingredients",
      "Rich in taurine for heart health",
      "Made in the USA",
    ],
    weight: "1.8kg",
    inStock: true,
    sku: "OR-CAT-1800",
  },
  {
    id: 5,
    name: "Smartheart Cat Pouch Adult 1+ Tuna with Chicken In Jelly",
    brand: "SmartHeart",
    price: 80,
    rating: 4.6,
    reviews: 312,
    emoji: "🐟",
    bg: "from-amber-glow/25 to-terracotta/15",
    category: "cat",
    categoryName: "Cat Food",
    description:
      "SmartHeart Cat Pouch offers a delicious wet food option with real tuna and chicken in jelly. Perfect as a complete meal or tasty topper, it provides essential moisture and high-quality protein for adult cats aged 1 year and older.",
    features: [
      "Real tuna & chicken in jelly",
      "High moisture content for hydration",
      "Taurine for vision & heart health",
      "Convenient single-serve pouch",
      "No artificial colors or preservatives",
    ],
    weight: "80g",
    inStock: true,
    sku: "SH-CAT-80",
  },
  {
    id: 6,
    name: "Drools Puppy Dog Food Chicken And Egg 3kg (Free 700 gm)",
    brand: "Drools",
    price: 1100,
    rating: 4.8,
    reviews: 145,
    emoji: "🦴",
    bg: "from-terracotta/20 to-amber-glow/20",
    tag: "Free 700g",
    category: "dog",
    categoryName: "Dog Food",
    description:
      "Drools Puppy Dog Food with real chicken and egg provides complete nutrition for growing puppies. The high-protein formula supports muscle development, while DHA promotes brain health. Now with 700g extra free!",
    features: [
      "Real chicken #1 ingredient",
      "DHA for brain development",
      "Calcium & phosphorus for strong bones",
      "Antioxidants for immune support",
      "Free 700g extra value pack",
    ],
    weight: "3kg + 700g free",
    inStock: true,
    sku: "DR-PUP-3700",
  },
  {
    id: 7,
    name: "Drools Adult Dog Food Chicken And Egg 3kg (Free 700 gm)",
    brand: "Drools",
    price: 1300,
    rating: 4.7,
    reviews: 98,
    emoji: "🦴",
    bg: "from-sage/20 to-terracotta/15",
    category: "dog",
    categoryName: "Dog Food",
    description:
      "Drools Adult Dog Food provides complete and balanced nutrition for adult dogs of all breeds. Real chicken and egg deliver high-quality protein, while essential vitamins and minerals maintain overall health and vitality.",
    features: [
      "Real chicken & egg formula",
      "Optimal protein for adult dogs",
      "Omega 3 & 6 for healthy coat",
      "Prebiotics for digestive health",
      "Free 700g extra value pack",
    ],
    weight: "3kg + 700g free",
    inStock: true,
    sku: "DR-ADL-3700",
  },
  {
    id: 8,
    name: "Purina Pro Plan Puppy Chicken & Rice, 18 lb Bag",
    brand: "Purina Pro",
    price: 10500,
    rating: 4.9,
    reviews: 76,
    emoji: "🍗",
    bg: "from-amber-glow/20 to-sage/15",
    category: "dog",
    categoryName: "Dog Food",
    description:
      "Purina Pro Plan Puppy Chicken & Rice features real chicken as the #1 ingredient with high-quality rice for easy digestion. This premium formula supports your puppy's developing immune system, brain, and vision with DHA from fish oil.",
    features: [
      "Real chicken #1 ingredient",
      "DHA from fish oil for brain & vision",
      "Antioxidants for immune support",
      "Easily digestible rice formula",
      "Live probiotics for digestive health",
    ],
    weight: "18 lb (8.16kg)",
    inStock: true,
    sku: "PP-PUP-8160",
  },
  {
    id: 9,
    name: "PURINA PRO Plan Puppy Dry Dog Food Medium Breed, Chicken Flavor 2.5kg",
    brand: "Purina Pro",
    price: 4600,
    rating: 4.8,
    reviews: 64,
    emoji: "🍗",
    bg: "from-terracotta/15 to-amber-glow/25",
    category: "dog",
    categoryName: "Dog Food",
    description:
      "Specifically formulated for medium breed puppies, this Purina Pro Plan recipe delivers optimal nutrition for growth. Real chicken provides high-quality protein, while the antioxidant blend supports a developing immune system.",
    features: [
      "Designed for medium breed puppies",
      "Real chicken flavor",
      "Optimal calcium for bone development",
      "Antioxidant-rich immune support",
      "Highly palatable formula",
    ],
    weight: "2.5kg",
    inStock: true,
    sku: "PP-PMB-2500",
  },
  {
    id: 10,
    name: "PURINA PRO Plan Puppy Dry Dog Food for Large Breed",
    brand: "Purina Pro",
    price: 18000,
    rating: 4.9,
    reviews: 42,
    emoji: "🦴",
    bg: "from-amber-glow/25 to-terracotta/20",
    tag: "Premium",
    category: "dog",
    categoryName: "Dog Food",
    description:
      "Purina Pro Plan Large Breed Puppy food supports controlled growth for large breed puppies. The formula features real chicken, optimal calcium levels, and glucosamine for joint health — perfect for breeds that will exceed 25kg at maturity.",
    features: [
      "Designed for large breed puppies",
      "Glucosamine for joint health",
      "Controlled calcium for bone development",
      "Real chicken #1 ingredient",
      "DHA for brain & vision",
    ],
    weight: "18kg",
    inStock: true,
    sku: "PP-PLB-18000",
  },
  {
    id: 11,
    name: "Bentonite Cat Litter – Premium Clumping 5kg",
    brand: "Paws",
    price: 450,
    rating: 4.7,
    reviews: 187,
    emoji: "🪨",
    bg: "from-sage/15 to-secondary",
    tag: "Cat Litter",
    category: "litter",
    categoryName: "Cat Litter",
    description:
      "Premium bentonite cat litter forms tight, easy-to-scoop clumps for effortless cleanup. The natural clay formula controls odors effectively without artificial fragrances, while the dust-free composition keeps your home and your cat's lungs healthy.",
    features: [
      "100% natural bentonite clay",
      "Tight clumping for easy scooping",
      "Superior odor control",
      "99% dust-free",
      "Unscented — gentle on sensitive cats",
    ],
    weight: "5kg",
    inStock: true,
    sku: "PW-LIT-5000",
  },
  {
    id: 12,
    name: "Tropical Fish Food Flakes – Balanced Nutrition 50g",
    brand: "Haisenpet",
    price: 180,
    rating: 4.5,
    reviews: 43,
    emoji: "🐠",
    bg: "from-cocoa/10 to-sage/15",
    tag: "Fish",
    category: "fish",
    categoryName: "Fish Food",
    description:
      "Premium tropical fish flakes provide balanced nutrition for community freshwater fish. The vitamin-enriched formula enhances color, supports immune health, and reduces waste for cleaner aquarium water.",
    features: [
      "Balanced nutrition for tropical fish",
      "Color-enhancing formula",
      "Vitamin-enriched",
      "Reduces waste for cleaner water",
      "Easy-to-digest flakes",
    ],
    weight: "50g",
    inStock: true,
    sku: "HP-FSH-50",
  },
  {
    id: 13,
    name: "Premium Bird Seed Mix – For Parrots & Cockatiels 500g",
    brand: "Nature Bridge",
    price: 320,
    rating: 4.6,
    reviews: 28,
    emoji: "🥜",
    bg: "from-amber-glow/25 to-sage/15",
    tag: "Bird",
    category: "bird",
    categoryName: "Bird Food",
    description:
      "A carefully blended seed mix for parrots, cockatiels, and similar birds. Contains sunflower seeds, millet, safflower, and added vitamins to support feather health, vibrant plumage, and overall vitality.",
    features: [
      "Premium seed blend for parrots",
      "Contains sunflower, millet & safflower",
      "Added vitamins & minerals",
      "Supports feather health & color",
      "Resealable fresh-pack bag",
    ],
    weight: "500g",
    inStock: true,
    sku: "NB-BRD-500",
  },
  {
    id: 14,
    name: "Cat Litter Box with Scoop – Large Size",
    brand: "Trendline",
    price: 850,
    rating: 4.7,
    reviews: 92,
    emoji: "📦",
    bg: "from-terracotta/15 to-amber-glow/20",
    tag: "Accessories",
    category: "litter",
    categoryName: "Cat Litter Box",
    description:
      "Spacious litter box with high walls to prevent tracking and spills. Includes a matching scooper and features a non-stick surface for easy cleaning. The durable plastic construction ensures long-lasting use.",
    features: [
      "Spacious design for comfort",
      "High walls prevent spills",
      "Includes matching scooper",
      "Non-stick easy-clean surface",
      "Durable BPA-free plastic",
    ],
    weight: "Large",
    inStock: true,
    sku: "TL-LBX-L",
  },
  {
    id: 15,
    name: "Whiskas Adult Cat Food Tuna Flavor 1.1kg",
    brand: "Whiskas",
    price: 720,
    rating: 4.8,
    reviews: 156,
    emoji: "🐟",
    bg: "from-amber-glow/25 to-terracotta/15",
    category: "cat",
    categoryName: "Cat Food",
    description:
      "Whiskas Adult Tuna provides complete and balanced nutrition for adult cats. Made with real tuna and enriched with 41 essential nutrients, it supports healthy eyes, strong muscles, and a glossy coat.",
    features: [
      "Real tuna #1 ingredient",
      "41 essential nutrients",
      "Taurine for vision & heart",
      "Crunchy kibble for dental health",
      "Complete & balanced for adult cats",
    ],
    weight: "1.1kg",
    inStock: true,
    sku: "WH-CAT-1100",
  },
  {
    id: 16,
    name: "Royal Canin Indoor Adult Cat Food 2kg",
    brand: "Royal Canin",
    price: 1850,
    rating: 4.9,
    reviews: 178,
    emoji: "🐱",
    bg: "from-sage/20 to-amber-glow/20",
    tag: "Premium",
    category: "cat",
    categoryName: "Cat Food",
    description:
      "Royal Canin Indoor Adult is precisely formulated for indoor cats. The recipe supports digestive health, reduces hairball formation, and helps maintain a healthy weight with controlled calorie content.",
    features: [
      "Designed specifically for indoor cats",
      "Hairball reduction formula",
      "Controlled calories for weight management",
      "Supports digestive health",
      "Reduces stool odor",
    ],
    weight: "2kg",
    inStock: true,
    sku: "RC-CAT-2000",
  },
];

// Categories with full details
export const categories = [
  {
    id: "cat",
    name: "For Cats",
    count: 209,
    desc: "Premium cat food, litter & care",
    emoji: "🐱",
    bg: "from-amber-glow/30 to-terracotta/15",
    longDesc:
      "Discover our extensive range of premium cat food, treats, litter, and accessories. We stock top brands like Purina, Royal Canin, Whiskas, Orijen, and Drools — all guaranteed genuine and delivered fast across Bangladesh.",
  },
  {
    id: "dog",
    name: "For Dogs",
    count: 31,
    desc: "Healthy meals for every breed",
    emoji: "🐶",
    bg: "from-sage/25 to-amber-glow/15",
    longDesc:
      "Nutritious dog food for puppies and adults of all breeds. From everyday meals to specialized formulas, find the right nutrition for your canine companion's life stage and size.",
  },
  {
    id: "fish",
    name: "For Fish",
    count: 1,
    desc: "Nutritious aquatic food",
    emoji: "🐠",
    bg: "from-cocoa/10 to-sage/15",
    longDesc:
      "Premium fish food flakes, pellets, and wafers for tropical, goldfish, and bottom-feeders. Balanced nutrition that enhances color and keeps your aquarium water clean.",
  },
  {
    id: "bird",
    name: "For Birds",
    count: 2,
    desc: "Quality seeds & bird mixes",
    emoji: "🦜",
    bg: "from-amber-glow/25 to-sage/15",
    longDesc:
      "Carefully selected seed mixes and formulated diets for parrots, cockatiels, finches, and other companion birds. Vitamin-enriched for vibrant feathers and overall vitality.",
  },
  {
    id: "litter",
    name: "Cat Litter",
    count: 12,
    desc: "Bentonite, clumping & scented",
    emoji: "🪨",
    bg: "from-sage/15 to-secondary",
    longDesc:
      "Premium cat litter solutions — from natural bentonite clumping litter to scented varieties and litter box accessories. Odor control, easy cleanup, and dust-free formulas.",
  },
  {
    id: "care",
    name: "Pet Care",
    count: 8,
    desc: "Wellness essentials & vaccines",
    emoji: "💉",
    bg: "from-terracotta/15 to-amber-glow/20",
    longDesc:
      "Pet wellness products including supplements, vaccines, grooming tools, and healthcare essentials. Keep your companion happy and healthy with vet-recommended products.",
  },
];

// Blog posts
export type BlogPost = {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  content: { heading: string; body: string }[];
  date: string;
  readTime: string;
  comments: number;
  author: string;
  emoji: string;
  bg: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: "Dog Care",
    title: "Level 2 Dog Bite: What It Means, What to Do, and What It Could Cost You",
    excerpt:
      "A practical guide to understanding level 2 dog bites — from immediate first aid and warning signs to medical costs and legal considerations every pet owner should know.",
    content: [
      {
        heading: "Understanding the Dunbar Bite Scale",
        body: "Dr. Ian Dunbar developed a 6-level bite scale to classify dog bites by severity. A Level 2 bite involves skin contact but no puncture — the dog's teeth make contact but do not break the skin. While this may sound minor, it is a critical warning sign that requires immediate attention and behavioral intervention. Statistics show that approximately 81% of dog bites fall into Level 1 or Level 2, making it the most common type of incident reported by pet owners and the general public alike.",
      },
      {
        heading: "Immediate First Aid Steps",
        body: "Even though Level 2 bites don't break the skin, proper first aid is essential. Wash the contact area thoroughly with soap and warm water for at least 5 minutes. Apply an antiseptic solution and monitor for any redness, swelling, or bruising. If the dog is unknown to you, document the incident with photographs and contact local animal control. Seek medical advice if you have any concerns about rabies or infection, especially if you cannot verify the dog's vaccination history.",
      },
      {
        heading: "Behavioral Assessment & Intervention",
        body: "A Level 2 bite is a clear communication from the dog that something triggered a fear or stress response. Working with a certified applied animal behaviorist or veterinary behaviorist is strongly recommended. They will assess triggers, body language patterns, and the dog's overall environment. Common interventions include desensitization and counterconditioning protocols, management strategies to avoid trigger situations, and in some cases, medication prescribed by a veterinarian to reduce baseline anxiety.",
      },
      {
        heading: "Legal & Financial Considerations",
        body: "In Bangladesh, dog owners are generally responsible for injuries caused by their pets. Even without broken skin, victims may pursue compensation for emotional distress, medical monitoring, and behavioral therapy costs. Insurance considerations vary — many homeowner policies cover dog bites, but certain breeds may be excluded. Average out-of-pocket costs for a Level 2 incident can range from 2,000 to 15,000 BDT depending on medical consultations and behavioral intervention needs.",
      },
    ],
    date: "Mar 18, 2026",
    readTime: "6 min read",
    comments: 0,
    author: "bd71shopbd",
    emoji: "🦴",
    bg: "from-terracotta/20 to-amber-glow/20",
  },
  {
    id: 2,
    category: "Pet Care",
    title: "Nutrition Strength Cognitive Supplement for Dogs: Does It Actually Work?",
    excerpt:
      "We dig into the science behind cognitive supplements for senior dogs — examining ingredients, dosages, real-world results, and whether they're worth the investment.",
    content: [
      {
        heading: "The Science of Canine Cognitive Decline",
        body: "As dogs age — typically beginning around 7 years for medium breeds and 5 years for large breeds — they can experience cognitive decline similar to Alzheimer's in humans. This condition, formally known as Canine Cognitive Dysfunction (CCD), affects up to 28% of dogs aged 11-12 and over 68% of dogs aged 15-16. Symptoms include disorientation, altered interactions with family, sleep-wake cycle disruptions, and loss of housetraining.",
      },
      {
        heading: "Key Ingredients to Look For",
        body: "Effective cognitive supplements typically contain a combination of antioxidants (vitamins E and C, selenium), omega-3 fatty acids (especially DHA and EPA), phosphatidylserine, S-adenosylmethionine (SAMe), and medium-chain triglycerides (MCTs) from coconut oil. These compounds work synergistically to reduce oxidative stress, support cell membrane integrity, and provide alternative energy sources for aging brain cells.",
      },
      {
        heading: "What the Research Shows",
        body: "Multiple double-blind, placebo-controlled studies have demonstrated meaningful improvements in cognitive function for supplemented dogs. A landmark 2002 study published in the Journal of the American Veterinary Medical Association showed that 74% of older dogs on antioxidant-enriched diets showed improvement in cognitive tasks within 8 weeks. However, results vary significantly based on the severity of decline at the start of supplementation — earlier intervention consistently yields better outcomes.",
      },
      {
        heading: "Practical Recommendations",
        body: "If you're considering a cognitive supplement for your senior dog, start with a veterinary consultation to rule out other medical conditions that can mimic CCD. Look for products with third-party testing and clinical backing. Combine supplementation with mental enrichment (puzzle toys, training sessions), regular exercise appropriate for your dog's age, and a high-quality diet. Expect to commit to at least 8-12 weeks of consistent use before evaluating results.",
      },
    ],
    date: "Mar 15, 2026",
    readTime: "8 min read",
    comments: 0,
    author: "bd71shopbd",
    emoji: "🧠",
    bg: "from-sage/20 to-amber-glow/15",
  },
  {
    id: 3,
    category: "Pet Foods",
    title: "Fresh Pet Cat Food: The Complete Guide to Benefits, Best Brands, and How to Make the Switch",
    excerpt:
      "Everything you need to know about fresh cat food — nutritional advantages, top brands available in Bangladesh, and a step-by-step transition plan for picky eaters.",
    content: [
      {
        heading: "What Makes Fresh Cat Food Different",
        body: "Fresh cat food refers to minimally processed meals made with whole, human-grade ingredients that are gently cooked and refrigerated or frozen. Unlike dry kibble (which is extruded at high temperatures) or traditional canned food, fresh food retains more natural nutrients, enzymes, and moisture content. This translates to higher bioavailability of vitamins and a meal that more closely mimics what cats would eat in the wild.",
      },
      {
        heading: "Key Nutritional Benefits",
        body: "Fresh cat food typically contains 70-80% moisture, compared to just 6-10% in dry kibble. This is significant because cats have a low thirst drive and often live in a state of mild dehydration. Higher moisture intake supports kidney health, urinary tract function, and overall hydration. Fresh food also tends to have higher quality protein sources, fewer artificial additives, and lower carbohydrate content — all beneficial for obligate carnivores.",
      },
      {
        heading: "Top Brands Available in Bangladesh",
        body: "While fresh pet food delivery services are still emerging in Bangladesh, several brands offer high-quality alternatives. Whiskas Pouches, Sheba Premium Cuts, and SmartHeart wet food options provide convenient moisture-rich meals. For premium options, Royal Canin's wet food line and Orijen's freeze-dried formulas offer excellent nutrition. Local pet stores increasingly stock refrigerated options — check specialty pet boutiques in Dhaka's Gulshan and Banani areas for the freshest selection.",
      },
      {
        heading: "Transitioning Your Cat Successfully",
        body: "Cats are notoriously resistant to dietary changes. Plan a 10-14 day transition period: start by mixing 25% new food with 75% old food for 3-4 days, then move to a 50/50 mix for another 3-4 days, followed by 75/25 for 3-4 days before fully transitioning. If your cat refuses the new food, try warming it slightly to enhance aroma, offering small frequent meals, or using toppers like freeze-dried chicken. Consult your vet immediately if you notice vomiting, diarrhea, or refusal to eat for more than 24 hours.",
      },
    ],
    date: "Mar 12, 2026",
    readTime: "10 min read",
    comments: 0,
    author: "bd71shopbd",
    emoji: "🐟",
    bg: "from-amber-glow/25 to-sage/15",
  },
  {
    id: 4,
    category: "Dog Care",
    title: "Can Dogs Eat Cat Food? A Vet-Informed Guide to Risks, Effects & What to Do",
    excerpt:
      "If your dog raided the cat's bowl, here's what you need to know about the risks, symptoms to watch for, and when to call your vet.",
    content: [
      {
        heading: "Why Cat Food Tempts Dogs",
        body: "Cat food is significantly higher in protein, fat, and flavor compounds than dog food — designed to appeal to obligate carnivores. Dogs, being opportunistic scavengers, find this rich flavor profile irresistible. The strong smell and high fat content make cat food a frequent target for canine counter-surfing and bowl-raiding behavior.",
      },
      {
        heading: "Short-Term Health Effects",
        body: "A one-time small indulgence typically causes only mild gastrointestinal upset — perhaps some loose stool or temporary vomiting. However, larger quantities can trigger pancreatitis, a painful and potentially serious inflammation of the pancreas. Symptoms include repeated vomiting, abdominal pain (often displayed as a hunched posture), lethargy, and loss of appetite. Pancreatitis requires immediate veterinary attention.",
      },
      {
        heading: "Long-Term Risks of Regular Consumption",
        body: "If your dog regularly eats cat food, several health issues can develop over time. The high protein content strains kidneys and liver, particularly in dogs with pre-existing conditions. Excessive fat leads to weight gain, pancreatitis risk, and gastrointestinal disease. Cat food also lacks the proper balance of vitamins and minerals dogs need — particularly vitamin C, B-complex vitamins, and certain fatty acids formulated specifically for canine health.",
      },
      {
        heading: "Prevention Strategies",
        body: "The most effective strategy is physical separation — feed cats and dogs in different rooms or at different heights (cats can comfortably eat on elevated surfaces dogs can't reach). Use automatic feeders with RFID tags that only open for the designated pet. If your dog has already consumed cat food, monitor closely for 24-48 hours. Offer plenty of fresh water, feed a bland diet (boiled chicken and rice) for a day, and contact your vet if any concerning symptoms develop.",
      },
    ],
    date: "Mar 10, 2026",
    readTime: "7 min read",
    comments: 0,
    author: "bd71shopbd",
    emoji: "🦴",
    bg: "from-terracotta/20 to-sage/15",
  },
  {
    id: 5,
    category: "Pet Care",
    title: "How to Tell How Old a Kitten Is: A Complete Guide from Newborn to Adult",
    excerpt:
      "Whether you've found a stray or adopted without paperwork, here's how to accurately estimate a kitten's age by examining physical and behavioral milestones.",
    content: [
      {
        heading: "Why Age Estimation Matters",
        body: "Knowing a kitten's age is crucial for providing appropriate nutrition, vaccination scheduling, and socialization timing. Kittens develop rapidly in their first 8 weeks, with each week bringing significant changes in physical capabilities, dietary needs, and behavioral milestones. A few days of misestimation can mean the difference between appropriate and inappropriate care.",
      },
      {
        heading: "Weeks 0-2: The Neonatal Stage",
        body: "Newborn kittens are completely helpless — eyes closed, ears folded, unable to regulate body temperature. By week 1, they typically weigh 4-7 ounces. Around days 7-10, their eyes begin to open, initially blue in color. Ears start to unfold around day 5-8. They cannot yet stand, walk, or eliminate on their own — mother cat stimulation is required. Bottle feeding with kitten milk replacer (never cow's milk) is needed every 2-3 hours if mother is absent.",
      },
      {
        heading: "Weeks 3-4: Transition Phase",
        body: "By week 3, kittens can stand and begin attempting to walk, though still wobbly. Eyes are fully blue and fully open. The first deciduous (baby) teeth — incisors and canines — begin emerging around 3-4 weeks. This is the ideal time to introduce shallow dishes of wet kitten food mixed with kitten formula. By week 4, kittens can usually eliminate on their own and begin litter box training.",
      },
      {
        heading: "Weeks 5-8: Socialization & Weaning",
        body: "Weeks 5-7 are the critical socialization window — experiences during this period shape lifelong temperament. By week 6, kittens are fully mobile, playful, and exploring their environment. Premolars emerge around 5-6 weeks. Weaning should be complete by 7-8 weeks. By 8 weeks, kittens weigh 1.5-2 pounds, have all baby teeth, and are ready for their first vaccinations. From 8 weeks onward, they're considered ready for adoption.",
      },
    ],
    date: "Mar 8, 2026",
    readTime: "9 min read",
    comments: 0,
    author: "bd71shopbd",
    emoji: "🐱",
    bg: "from-amber-glow/20 to-terracotta/15",
  },
  {
    id: 6,
    category: "Dog Care",
    title: "Dog Bite on Finger: What to Do, When to Worry, and Your Legal Rights",
    excerpt:
      "Finger bites are among the most common dog bite injuries. Learn the proper treatment protocol, infection warning signs, and what legal recourse you may have.",
    content: [
      {
        heading: "Why Finger Bites Are Common",
        body: "Fingers are the most frequently bitten body part, accounting for nearly 40% of all dog bite injuries. This is largely because people instinctively extend their hands when greeting, feeding, or separating dogs. The hand's complex anatomy — with tendons, nerves, and joints close to the surface — makes even small punctures potentially serious.",
      },
      {
        heading: "Immediate Treatment Protocol",
        body: "Run warm water over the wound for 5-10 minutes to flush out bacteria. Gently clean with mild soap — avoid harsh antiseptics that damage tissue. Apply gentle pressure with a clean cloth to stop bleeding. Apply antibiotic ointment and cover with a sterile bandage. Take clear photographs of the wound for documentation. Even if the bite seems minor, medical evaluation is recommended within 24 hours because hand infections can progress rapidly.",
      },
      {
        heading: "Infection Warning Signs",
        body: "Watch carefully for these infection indicators over the following 3-5 days: increasing redness that spreads from the wound, swelling that extends beyond the immediate area, throbbing pain that worsens rather than improves, pus or cloudy drainage, red streaks extending up the arm, swollen lymph nodes, fever above 100.4°F (38°C), or restricted finger movement. Any of these symptoms warrants immediate medical attention — hand infections can cause permanent damage within hours if untreated.",
      },
      {
        heading: "Legal Rights in Bangladesh",
        body: "Under Bangladeshi law, dog owners bear responsibility for injuries their pets cause, regardless of the dog's prior behavior. Document the incident with photographs, witness statements, and the owner's contact information. Even minor bites may warrant compensation for medical expenses, lost wages, and pain. For serious injuries, consult with a personal injury attorney experienced in animal bite cases. Time limits apply for filing claims, so prompt action is essential.",
      },
    ],
    date: "Mar 5, 2026",
    readTime: "7 min read",
    comments: 0,
    author: "bd71shopbd",
    emoji: "🦴",
    bg: "from-sage/20 to-terracotta/15",
  },
];

// ===== Site Info (from bd71shop.com.bd) =====
export const siteInfo = {
  name: "BD71 Pet Shop",
  legalName: "Bd71 Pet Shop",
  domain: "bd71shop.com.bd",
  email: "contact@bd71shop.com.bd",
  phone: "01627-001719",
  address: "Bus Stand, Savar, Dhaka",
  hours: "Monday to Sunday: Always Open (24/7)",
  founder: "Late Akter",
  founded: "2021",
};

// ===== About Page Content (from bd71shop.com.bd/about/) =====
export const aboutContent = {
  title: "Trusted Online Pet Shop in Bangladesh Since 2021",
  intro:
    "BD71Shop is Bangladesh's one of the trusted online pet food stores, serving pet lovers across the country since 2021. We believe every pet deserves the best nutrition, and that's why we bring you a wide range of premium quality pet food from internationally recognized brands — all at affordable prices, delivered right to your door.",
  brands:
    "From cats and dogs to birds, fish, and small animals — we have everything your furry, feathery, or finned friend needs. Our product range includes Royal Canin, Whiskas, Purina, Orijen, IAMS, Sheba, SmartHeart, Versele Laga, and many more trusted brands.",
  vision:
    "To become Bangladesh's most trusted destination for premium pet nutrition — a place where every pet owner can find the right food for their beloved companion, with confidence and ease.",
  mission:
    "Our mission is to make quality pet food accessible to every pet owner in Bangladesh. We are committed to offering genuine, fresh, and affordable products with fast delivery, honest pricing, and reliable customer support.",
  serviceTitle: "We Are Proud To Provide The Best Service For Customers",
  serviceDesc:
    "At BD71Shop, customer satisfaction is our top priority. We carefully source every product to ensure authenticity and freshness. With over 300+ products available online, easy ordering, and nationwide delivery, we make pet care simple and stress-free for you.",
  historyTitle: "Our History",
  history:
    "BD71Shop was founded in 2021 with a simple goal — to make quality pet food easily available in Bangladesh. What started as a small online venture has grown into a trusted platform with hundreds of happy customers and 300+ products. Over the years, we have expanded our catalog to include food for cats, dogs, birds, fish, and more — always staying committed to quality and affordability.",
  operationsTitle: "Operations",
  operations:
    "We operate fully online, serving customers all across Bangladesh. Orders are processed quickly and delivered through reliable courier services. Our team works every day to ensure smooth operations — from product sourcing to packaging and delivery — so your pet never has to wait for their meal.",
  founderName: "Late Akter",
  founderRole: "Founder",
  faqs: [
    {
      q: "What Shipping Methods Are Available?",
      a: "We deliver nationwide across Bangladesh through trusted courier services. Dhaka deliveries are typically completed within 1–2 business days, while other districts may take 2–4 business days.",
    },
    {
      q: "Are the products genuine and fresh?",
      a: "Yes, absolutely. We source all our products directly from authorized distributors and importers to ensure 100% authenticity and freshness.",
    },
    {
      q: "What types of pet food do you sell?",
      a: "We sell food for cats, dogs, birds, fish, and small animals. Our brands include Royal Canin, Whiskas, Purina Friskies, IAMS, Orijen, Sheba, SmartHeart, Versele Laga, Wanpy, and many more.",
    },
    {
      q: "How do I place an order?",
      a: "Simply browse our website, add your desired products to the cart, and complete the checkout. You can also contact us directly via phone or social media for assistance.",
    },
    {
      q: "What if I receive a damaged or wrong product?",
      a: "If you receive a damaged or incorrect item, please contact us within 24 hours of delivery. We will arrange a replacement or refund as quickly as possible.",
    },
  ],
};

// ===== Contact Page Content (from bd71shop.com.bd/contact/) =====
export const contactContent = {
  title: "Get In Touch",
  subtitle: "Feel free to reach us.",
  sectionsTitle: "Have An Question? Contact Us!",
  info: [
    { label: "Address", value: "Bus Stand, Savar, Dhaka", icon: "MapPin" },
    { label: "Phone", value: "01627-001719", icon: "Phone" },
    { label: "Mail", value: "contact@bd71shop.com.bd", icon: "Mail" },
    { label: "Opening Time", value: "Monday to Sunday: Always Open (24/7)", icon: "Clock" },
  ],
  formFields: {
    name: "Your name",
    email: "Your email",
    subject: "Subject",
    message: "Your message (optional)",
    note: "Your email address will not be published. Required fields are marked *",
    submit: "Send Message",
  },
};

// ===== Legal Content (from bd71shop.com.bd) =====
export type LegalSection = { heading: string; body: string; bullets?: string[] };
export type LegalDoc = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};

export const legalContent: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "March 1, 2026",
    intro:
      "This Privacy Policy describes how bd71shop.com.bd (the \"Site\" or \"we\") collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.",
    sections: [
      {
        heading: "1. Information Collection",
        body: "We collect information about you for various reasons, primarily to process your orders and improve your shopping experience.",
      },
      {
        heading: "A. Personal Information You Provide to Us",
        body: "When you interact with the Site, we may collect the following types of Personal Information:",
        bullets: [
          "Order Information: Name, billing address, shipping address, payment information (including credit card numbers, which are processed by secure third-party gateways and we do not store the full details), email address, and phone number.",
          "Account Information: Name, email address, password, and order history, when you create an account on our Site.",
          "Communication Data: Information you provide when contacting us directly, such as customer support inquiries, feedback, or marketing communication preferences.",
        ],
      },
      {
        heading: "B. Device and Usage Data (Automatically Collected)",
        body: "When you access the Site, we automatically collect certain information about your device and interaction:",
        bullets: [
          "Device Information: Web browser type, IP address, time zone, and some of the cookies that are installed on your device.",
          "Usage Information: Details about how you browse the Site, including the web pages or products you view, what websites or search terms referred you to the Site, and how you interact with the Site.",
        ],
      },
      {
        heading: "2. Use of Your Personal Information",
        body: "We use the Personal Information we collect to:",
        bullets: [
          "Fulfill Orders: Process your purchases, arrange for shipping, and provide you with invoices and order confirmations.",
          "Customer Support: Communicate with you about your orders, returns, and service-related issues.",
          "Account Management: Manage your registered user account.",
          "Marketing & Advertising (with consent): Send you promotional offers, newsletters, or advertisements we believe may be of interest to you, based on your preferences and purchase history. You can opt-out at any time.",
          "Improve the Site: Screen for potential risk and fraud (in particular, your IP address), and to generally improve and optimize our Site (e.g., by generating analytics about how our customers browse and interact with the Site).",
        ],
      },
      {
        heading: "3. Sharing Your Personal Information",
        body: "We share your Personal Information with third parties to help us run our business and services, as described above.",
        bullets: [
          "Service Providers: We share your information with trusted third parties who perform functions on our behalf, such as: Payment processors (e.g., banks, secure gateways) to handle transactions. Shipping and logistics partners (e.g., courier services) to deliver your orders. Analytics providers (e.g., Google Analytics) to help us understand how our customers use the Site. Marketing and advertising partners.",
          "Legal Compliance: We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.",
        ],
      },
      {
        heading: "4. Cookies",
        body: "Like many websites, we use \"cookies\" to enhance your experience. Cookies are small data files placed on your device or computer. They help us remember your preferences, track site usage, and support advertising efforts. You have the ability to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. However, this may prevent you from taking full advantage of the website.",
      },
      {
        heading: "5. Security of Your Information",
        body: "We take reasonable steps to protect your Personal Information from unauthorized access, disclosure, alteration, or destruction. While we strive to use commercially acceptable means to protect our data, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee its absolute security.",
      },
      {
        heading: "6. Your Rights (Bangladesh)",
        body: "You have the right to access the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.",
      },
      {
        heading: "7. Changes to This Privacy Policy",
        body: "We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised policy on this page with the \"Last Updated\" date.",
      },
      {
        heading: "8. Contact Us",
        body: "For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please visit our contact us page.",
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    lastUpdated: "March 1, 2026",
    intro:
      "Welcome to bd71shop.com.bd. These Terms of Use govern your use of the Site and the purchase of products offered on the Site. By accessing or using the Site, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the Site.",
    sections: [
      {
        heading: "1.1 Acceptance of Terms",
        body: "By placing an order or using any service provided by the Site, you represent that you are at least the age of majority in your place of residence (Bangladesh) and have the legal capacity to enter into this agreement.",
      },
      {
        heading: "1.2 Amendments",
        body: "We reserve the right to update, change, or replace any part of these Terms by posting updates and changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.",
      },
      {
        heading: "2.1 Products and Services",
        body: "All products are subject to availability. We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your device's display of any color will be accurate. We reserve the right to limit the sales of our products or services to any person, geographic region, or jurisdiction.",
      },
      {
        heading: "2.2 Order Acceptance and Pricing",
        body: "We reserve the right to refuse any order you place with us. The prices of our products are subject to change without notice. In the event a product is listed at an incorrect price, we have the right to refuse or cancel any orders placed for the product listed at the incorrect price, regardless of whether the order has been confirmed and your payment processed.",
      },
      {
        heading: "2.3 Payment",
        body: "Payment must be made in full before shipment. We accept various forms of payment as indicated on the Site. All transactions are processed through secure, third-party payment gateways.",
      },
      {
        heading: "2.4 Shipping and Delivery",
        body: "We will arrange for the shipment of the products to you. Delivery times are estimates only and are not guaranteed. We are not liable for any delays in shipments. Risk of loss and title for items purchased from the Site pass to you upon our delivery to the carrier.",
      },
      {
        heading: "3.1 Account Responsibility",
        body: "If you create an account, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.",
      },
      {
        heading: "3.2 Prohibited Use",
        body: "You agree not to use the Site for any illegal or unauthorized purpose, nor may you violate any laws in your jurisdiction (including but not limited to copyright laws) by using the Site.",
      },
      {
        heading: "4. Intellectual Property",
        body: "The Site and all of its original content, features, and functionality (including graphics, text, logos, and service names) are owned by Bd71 Pet Shop and are protected by international copyright, trademark, and other intellectual property laws. You are not permitted to use any content without our express written permission.",
      },
      {
        heading: "5.1 Disclaimer of Warranties",
        body: "The Site and all products are provided \"as is\" and \"as available,\" without any warranties of any kind, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
      },
      {
        heading: "5.2 Limitation of Liability",
        body: "In no event shall bd71shop.com.bd, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, arising from your use of any product or service procured using the Site.",
      },
      {
        heading: "6. Indemnification",
        body: "You agree to indemnify, defend, and hold harmless bd71shop.com.bd and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your breach of these Terms of Use or your violation of any law or the rights of a third-party.",
      },
      {
        heading: "7. Governing Law",
        body: "These Terms of Use and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of Bangladesh.",
      },
      {
        heading: "8. Contact Information",
        body: "Questions about the Terms of Use should be sent to us at contact@bd71shop.com.bd",
      },
    ],
  },
  dmca: {
    title: "DMCA Policy",
    lastUpdated: "March 1, 2026",
    intro:
      "This DMCA Policy explains how copyright infringement claims are handled on our website.",
    sections: [
      {
        heading: "1. Copyright Infringement Notification",
        body: "If you believe that any content on BD71Shop.com.bd infringes your copyright, you may submit a formal DMCA takedown request. Your request must include the following information:",
        bullets: [
          "A physical or electronic signature of the copyright owner or authorized representative.",
          "Identification of the copyrighted work you claim has been infringed.",
          "Identification of the specific content or URL on our site where the infringement is occurring.",
          "Your contact information, including name, email address, phone number, and address.",
          "A statement that you have a good-faith belief that the use of the content is not authorized.",
          "A statement under penalty of perjury that the information in your notice is accurate and you are the copyright owner or authorized representative.",
        ],
      },
      {
        heading: "2. Where to Send DMCA Notices",
        body: "You may send DMCA notices to: Email: contact@bd71shop.com.bd | Subject: DMCA Takedown Request",
      },
      {
        heading: "3. Counter-Notification",
        body: "If you believe that your content was removed or disabled by mistake or misidentification, you may submit a counter-notification which must include:",
        bullets: [
          "Your physical or electronic signature.",
          "Identification of the content that was removed or disabled.",
          "A statement under penalty of perjury that the content was removed due to a mistake or misidentification.",
          "Your name, address, phone number, and email.",
          "A statement that you consent to the jurisdiction of local courts for any legal matters related to the claim.",
        ],
      },
      {
        heading: "4. Repeat Infringer Policy",
        body: "BD71Shop.com.bd may terminate or restrict access to any user who repeatedly violates copyright laws.",
      },
      {
        heading: "5. Removal of Content",
        body: "Upon receiving a valid DMCA takedown notice, we will:",
        bullets: [
          "Review the complaint",
          "Remove or disable access to the infringing content",
          "Notify the content uploader (if applicable)",
        ],
      },
      {
        heading: "6. Changes to This Policy",
        body: "BD71Shop.com.bd reserves the right to update or modify this DMCA Policy at any time. Updates will be posted on this page.",
      },
      {
        heading: "Contact Information",
        body: "If you have any questions about this DMCA Policy, please contact us: Email: contact@bd71shop.com.bd",
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    lastUpdated: "March 1, 2026",
    intro:
      "Welcome to bd71shop.com.bd. This website is owned and operated by Bd71 Pet Shop. By accessing and using this website, you agree to the terms of this disclaimer. If you do not agree with these terms, please refrain from using the site.",
    sections: [
      {
        heading: "1. General Information",
        body: "The content on this website is for general informational purposes only. While we strive to provide accurate and up-to-date information, we make no warranties or guarantees regarding the completeness, reliability, or accuracy of the information provided.",
      },
      {
        heading: "2. Product Information",
        body: "The descriptions, images, and specifications of the products listed on our website are provided for informational purposes. Actual products may vary in appearance due to differences in packaging, color, or product updates by manufacturers. Please read all labels, warnings, and directions before using any product.",
      },
      {
        heading: "3. Limitation of Liability",
        body: "Under no circumstances shall bd71shop.com.bd or its owners, employees, or affiliates be held liable for any damages or losses arising from:",
        bullets: [
          "The use or inability to use the website.",
          "Errors, inaccuracies, or omissions in the website content.",
          "Any purchase or use of products listed on this site.",
        ],
      },
      {
        heading: "4. Third-Party Links",
        body: "Our website may include links to external websites for your convenience. We are not responsible for the content, policies, or practices of these third-party websites. Accessing such websites is at your own risk.",
      },
      {
        heading: "5. Pricing and Availability",
        body: "We strive to ensure accurate pricing and availability information; however, errors may occur. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.",
      },
      {
        heading: "6. Medical and Nutritional Advice",
        body: "The information provided on this website regarding pet food and related products is not intended as medical or nutritional advice. Always consult a veterinarian or a qualified professional before making changes to your pet's diet or health regimen.",
      },
      {
        heading: "7. Changes to the Disclaimer",
        body: "We reserve the right to modify this disclaimer at any time without prior notice. Please review this page periodically for updates. Your continued use of the website signifies your acceptance of the revised terms.",
      },
      {
        heading: "8. Contact Us",
        body: "If you have any questions or concerns about this disclaimer, please visit our contact page.",
      },
    ],
  },
};

export function formatPrice(n: number) {
  return n.toLocaleString("en-US");
}

export function getProductById(id: number) {
  return products.find((p) => p.id === id);
}

export function getBlogById(id: number) {
  return blogPosts.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}
