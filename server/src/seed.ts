import { Pool } from 'pg';
import * as url from 'url';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export const baseProducts = [
  {
    id: 1,
    name: "Simple Spiderman Theme Decoration",
    originalPrice: 1999,
    salePrice: 1699,
    rating: 5,
    image_url: "/spider_man_theme.jpg",
    isNew: true,
    description: "A simple yet elegant Spiderman theme decoration for your kid's birthday party. Includes balloons, banners, and cutouts.",
    images: [
      "/spider_man_theme.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Balloons",
      "Banners",
      "Cutouts",
      "Tablecloth",
      "Plates and Cups"
    ],
    reviews: "120 reviews",
    cuisines: ["Themes", "Decoration"],
  },
  {
    id: 2,
    name: "Surprise Unicorn Birthday Wall Decoration",
    originalPrice: 2499,
    salePrice: 1999,
    rating: 4.9,
    image_url: "/unicorn_theme.jpg",
    description: "A beautiful unicorn-themed wall decoration to surprise your little one. Perfect for creating a magical atmosphere.",
    images: [
      "/unicorn_theme.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Unicorn Banner",
      "Pastel Balloons",
      "Fairy Lights",
      "Tassels",
      "Photo Booth Props"
    ],
    reviews: "98 reviews",
    cuisines: ["Themes", "Decoration"],
  },
  {
    id: 3,
    name: "Elegant Boss Baby Theme Decoration",
    originalPrice: 2199,
    salePrice: 1799,
    rating: 4.5,
    image_url: "/boss_baby_theme.jpg",
    description: "A sophisticated Boss Baby theme decoration for a stylish birthday celebration. Includes everything you need for a memorable party.",
    images: [
      "/boss_baby_theme.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Briefcase Prop",
      "Black and White Balloons",
      "Custom Banner",
      "Cupcake Toppers",
      "Themed Tableware"
    ],
    reviews: "75 reviews",
    cuisines: ["Themes", "Decoration"],
  },
  {
    id: 4,
    name: "Peppa Pig Birthday Theme Decoration",
    originalPrice: 1899,
    salePrice: 1599,
    rating: 4.6,
    image_url: "/peppa_pig_theme.jpg",
    description: "A fun and colorful Peppa Pig theme decoration for your child's special day. Oink oink!",
    images: [
      "/peppa_pig_theme.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Peppa Pig Cutouts",
      "Muddy Puddle Decals",
      "Pink and Blue Balloons",
      "Happy Birthday Banner",
      "Themed Napkins"
    ],
    reviews: "88 reviews",
    cuisines: ["Themes", "Decoration"],
  },
  {
    id: 5,
    name: "Cute Baby Shark Birthday Home Decoration",
    originalPrice: 2299,
    salePrice: 1899,
    rating: 4.9,
    image_url: "/baby_shark_theme.jpg",
    description: "Doo doo doo doo doo doo! A cute Baby Shark theme decoration that will have everyone singing along.",
    images: [
      "/baby_shark_theme.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Shark Family Cutouts",
      "Under the Sea Backdrop",
      "Blue and Yellow Balloons",
      "Seaweed Streamers",
      "Fish Nets"
    ],
    reviews: "150 reviews",
    cuisines: ["Themes", "Decoration"],
  },
  {
    id: 6,
    name: "Girls Lipstick Theme Birthday Decoration",
    originalPrice: 2099,
    salePrice: 1699,
    rating: 5,
    image_url: "/girl_lipstick_theme.jpg",
    description: "A chic and glamorous lipstick-themed decoration for the little fashionista in your life.",
    images: [
      "/girl_lipstick_theme.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Lipstick Balloon",
      "Pink and Gold Decorations",
      "Makeup-themed Banner",
      "Glittery Cutouts",
      "Fashionable Tableware"
    ],
    reviews: "65 reviews",
    cuisines: ["Themes", "Decoration"],
  },
  {
    id: 7,
    name: "Cocomelon Cute Birthday Wall Decoration",
    originalPrice: 2399,
    salePrice: 1999,
    rating: 4.3,
    image_url: "/cocomelon.jpg",
    description: "Bring the world of Cocomelon to life with this adorable and colorful wall decoration.",
    images: [
      "/cocomelon.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "JJ and Friends Cutouts",
      "Rainbow Balloon Arch",
      "Musical Notes Decorations",
      "Customizable Banner",
      "Themed Plates and Cups"
    ],
    reviews: "92 reviews",
    cuisines: ["Themes", "Decoration"],
  },
  {
    id: 8,
    name: "Magical Unicorn Half Arch Balloon Decor",
    originalPrice: 3199,
    salePrice: 2699,
    rating: 5,
    image_url: "/half_unicorn.jpg",
    description: "Create a magical entrance with this stunning half arch balloon decoration in a unicorn theme.",
    images: [
      "/half_unicorn.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Pastel Balloon Arch",
      "Unicorn Foil Balloon",
      "Glittery Stars",
      "Ribbons and Tassels",
      "Easy to Assemble Kit"
    ],
    reviews: "110 reviews",
    cuisines: ["Themes", "Decoration"],
  },
  {
    id: 9,
    name: "2BHK Budget Friendly Griha Pravesh Flower Decor",
    originalPrice: 5999,
    salePrice: 4999,
    rating: 4.8,
    image_url: "/2bhk_housewarming.jpg",
    description: "A beautiful and budget-friendly flower decoration for your new 2BHK home's Griha Pravesh ceremony.",
    images: [
      "/2bhk_housewarming.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Marigold Garlands",
      "Toran for Main Door",
      "Flower Rangoli",
      "Decorative Diyas",
      "Fresh Flowers for Puja"
    ],
    reviews: "85 reviews",
    cuisines: ["House Warming", "Flower Decoration"],
  },
  {
    id: 10,
    name: "1BHK House Warming Flower Decoration",
    originalPrice: 4799,
    salePrice: 3999,
    rating: 4.6,
    image_url: "/1bhk_housewarming.jpg",
    description: "Welcome prosperity and happiness into your new 1BHK home with this elegant flower decoration.",
    images: [
      "/1bhk_housewarming.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Mixed Flower Garlands",
      "Mango Leaves Toran",
      "Swastik Rangoli",
      "Scented Candles",
      "Rose Petals for Puja"
    ],
    reviews: "70 reviews",
    cuisines: ["House Warming", "Flower Decoration"],
  },
  {
    id: 11,
    name: "Yellow Marigold Garland Decor",
    originalPrice: 15999,
    salePrice: 12999,
    rating: 4.9,
    image_url: "/marigold.jpg",
    description: "A traditional and auspicious yellow marigold garland decoration for all your festive needs.",
    images: [
      "/marigold.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Fresh Marigold Garlands",
      "Customizable Length",
      "Long-lasting Freshness",
      "Perfect for Pooja, Weddings, and Festivals",
      "Handcrafted by Experts"
    ],
    reviews: "200 reviews",
    cuisines: ["House Warming", "Flower Decoration"],
  },
  {
    id: 12,
    name: "2 BHK Griha Pravesh Decoration",
    originalPrice: 15999,
    salePrice: 12999,
    rating: 4.7,
    image_url: "/griha.jpg",
    description: "A complete Griha Pravesh decoration package for your new 2BHK home. Includes everything you need for a beautiful ceremony.",
    images: [
      "/griha.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Main Door Decoration",
      "Pooja Room Decoration",
      "Hall and Balcony Decoration",
      "Flower Rangoli",
      "Welcome Board"
    ],
    reviews: "130 reviews",
    cuisines: ["House Warming", "Flower Decoration"],
  },
  {
    id: 13,
    name: "Balloon Surprise",
    originalPrice: 3999,
    salePrice: 3299,
    rating: 5,
    image_url: "/balloon.jpg",
    isNew: true,
    description: "Surprise your loved ones with a room full of balloons! Perfect for birthdays, anniversaries, and other special occasions.",
    images: [
      "/balloon.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "200 Balloons",
      "Customizable Colors",
      "Helium or Air-filled",
      "Delivery and Setup",
      "Add-ons available"
    ],
    reviews: "300 reviews",
    cuisines: ["Birthday", "Decoration"],
  },
  {
    id: 14,
    name: "Simple Superman Theme Decoration",
    originalPrice: 5199,
    salePrice: 3699,
    rating: 5,
    image_url: "/superman.jpg",
    description: "It's a bird, it's a plane, it's a Superman-themed birthday party! A simple yet powerful decoration for your little superhero.",
    images: [
      "/superman.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Superman Logo Banner",
      "Red, Blue, and Yellow Balloons",
      "Cityscape Backdrop",
      "Kryptonite Crystals (props)",
      "Superhero Cape for the Birthday Boy"
    ],
    reviews: "95 reviews",
    cuisines: ["Birthday", "Decoration"],
  },
  {
    id: 15,
    name: "Pink Birthday Bedroom Decoration",
    originalPrice: 4299,
    salePrice: 3699,
    rating: 5,
    image_url: "/pink.jpg",
    description: "Transform your bedroom into a pink paradise with this beautiful and elegant birthday decoration.",
    images: [
      "/pink.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Pink and White Balloons",
      "Fairy Lights",
      "Happy Birthday Banner",
      "Rose Petals",
      "Scented Candles"
    ],
    reviews: "115 reviews",
    cuisines: ["Birthday", "Decoration"],
  },
  {
    id: 16,
    name: "Mickey Mouse Birthday Theme Decoration",
    originalPrice: 6099,
    salePrice: 4699,
    rating: 4.6,
    image_url: "/mickey.jpg",
    description: "Hot dog, hot dog, hot diggity dog! A classic Mickey Mouse theme decoration for a fun-filled birthday party.",
    images: [
      "/mickey.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Mickey Mouse Ears Banner",
      "Red, Black, and Yellow Balloons",
      "Polka Dot Tablecloth",
      "Mickey-shaped Confetti",
      "Clubhouse-inspired Cutouts"
    ],
    reviews: "80 reviews",
    cuisines: ["Birthday", "Decoration"],
  },
  {
    id: 17,
    name: "Blue Baby Shower Decoration Set",
    originalPrice: 5499,
    salePrice: 4799,
    rating: 4.8,
    image_url: "/blue_boy.jpg",
    isNew: true,
    description: "Welcome the little prince with this adorable blue-themed baby shower decoration set.",
    images: [
      "/blue_boy.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "It's a Boy Banner",
      "Blue and White Balloons",
      "Baby Bottle Centerpieces",
      "Themed Cupcake Toppers",
      "Mom-to-be Sash"
    ],
    reviews: "90 reviews",
    cuisines: ["Baby Shower", "Decoration"],
  },
  {
    id: 18,
    name: "Pink Baby Girl Shower Decor",
    originalPrice: 6299,
    salePrice: 5599,
    rating: 4.7,
    image_url: "/girl_shower.jpg",
    description: "A beautiful and elegant pink-themed baby shower decoration to welcome the little princess.",
    images: [
      "/girl_shower.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "It's a Girl Banner",
      "Pink and Gold Balloons",
      "Floral Centerpieces",
      "Themed Cupcake Toppers",
      "Mom-to-be Tiara"
    ],
    reviews: "82 reviews",
    cuisines: ["Baby Shower", "Decoration"],
  },
  {
    id: 19,
    name: "Gender Neutral Baby Shower Setup",
    originalPrice: 6199,
    salePrice: 5499,
    rating: 4.9,
    image_url: "/neutral.jpg",
    description: "A stylish and modern gender-neutral baby shower setup, perfect for surprising the parents-to-be.",
    images: [
      "/neutral.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Oh Baby Banner",
      "White and Green Balloons",
      "Eucalyptus Garlands",
      "Wooden Blocks Centerpieces",
      "Mom-to-be Sash"
    ],
    reviews: "105 reviews",
    cuisines: ["Baby Shower", "Decoration"],
  },
  {
    id: 20,
    name: "Elegant Baby Shower Backdrop",
    originalPrice: 10999,
    salePrice: 9890,
    rating: 4.5,
    image_url: "/elegant.jpg",
    description: "Create a stunning photo booth with this elegant baby shower backdrop. Perfect for capturing memories.",
    images: [
      "/elegant.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Customizable Backdrop",
      "Flower Wall",
      "Fairy Lights",
      "Photo Booth Props",
      "Easy to set up"
    ],
    reviews: "78 reviews",
    cuisines: ["Baby Shower", "Decoration"],
  },
  {
    id: 21,
    name: "Mickey Mouse Mascot",
    originalPrice: 2599,
    salePrice: 2299,
    rating: 4.8,
    image_url: "/mickey_mascot.jpg",
    isNew: true,
    description: "A fun and friendly Mickey Mouse mascot to entertain your guests.",
    images: [
      "/mickey.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Mascot Costume",
      "Interaction with Guests",
      "Photo Opportunities",
      "Energetic Performance",
      "Music and Dancing"
    ],
    reviews: "150 reviews",
    cuisines: ["Mascots"],
  },
  {
    id: 22,
    name: "Creative Mascot",
    originalPrice: 2799,
    salePrice: 2499,
    rating: 4.9,
    image_url: "/mascot.jpg",
    description: "Your friendly neighborhood Spiderman mascot, ready to swing into your party.",
    images: [
      "/spider_man_theme.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Mascot Costume",
      "Interaction with Guests",
      "Photo Opportunities",
      "Energetic Performance",
      "Music and Dancing"
    ],
    reviews: "180 reviews",
    cuisines: ["Mascots"],
  },
  {
    id: 23,
    name: "Unicorn Mascot",
    originalPrice: 2699,
    salePrice: 2399,
    rating: 4.7,
    image_url: "/unicorn_mascot.jpg",
    description: "The Man of Steel is here to make your party super!",
    images: [
      "/superman.jpg",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Mascot Costume",
      "Interaction with Guests",
      "Photo Opportunities",
      "Energetic Performance",
      "Music and Dancing"
    ],
    reviews: "160 reviews",
    cuisines: ["Mascots"],
  },
  {
    id: 24,
    name: "Sassy Mascot",
    originalPrice: 2499,
    salePrice: 2199,
    rating: 4.6,
    image_url: "/mascot2.jpg",
    description: "The boss is in the house! Get ready for some serious fun with the Boss Baby mascot.",
    images: [

      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800"
    ],
    amenities: [
      "Mascot Costume",
      "Interaction with Guests",
      "Photo Opportunities",
      "Energetic Performance",
      "Music and Dancing"
    ],
    reviews: "140 reviews",
    cuisines: ["Mascots"],
  }
];

// Data from CustomizationModal.tsx
const addOnItems = [
    {
      id: "rectangle-arch",
      name: "Rectangle Arch",
      description: "Rectangle arch of 200 balloons as per your choice of balloon colors",
      price: "₹2499",
      image_url: "/balloon.jpg",
    },
    {
      id: "u-shaped-arch",
      name: "U shaped Entrance Arch",
      description: "U shaped entrance arch of 200 balloons as per your choice of balloon colors",
      price: "₹2299",
      image_url: "/balloon.jpg",
    },
    {
      id: "l-shaped-arch",
      name: "L Shaped Arch",
      description: "L shaped arch of 100 balloons as per your choice of balloon colors",
      price: "₹1999",
      image_url: "/balloon.jpg",
    },
    {
      id: "curve-arch",
      name: "Curve Arch",
      description: "Curve arch of 100 balloons as per your choice of balloon colors",
      price: "₹2099",
      image_url: "/balloon.jpg",
    },
];

const activityItems = [
    {
      id: "magician",
      name: "Magician",
      description: "A magician to perform various fun magic tricks to engage the kids and adults on the stage",
      price: "₹4599",
      image_url: "/balloon.jpg",
    },
    {
      id: "charlie-chaplin",
      name: "Charlie Chaplin",
      description: "A Person with Charlie Chaplin costume. An Artist will be available for 3 hrs.",
      price: "₹5500",
      image_url: "/balloon.jpg",
    },
    {
      id: "game-host",
      name: "Game Host",
      description: "1 Experienced Male emcee who involves kids and adults in games",
      price: "₹3899",
      image_url: "/balloon.jpg",
    },
    {
      id: "tattoo-artist",
      name: "Tattoo Artist",
      description: "The Artist has been in this field for 12 years and will arrive 5 mins before the party begins.",
      price: "₹3999",
      image_url: "/balloon.jpg",
    },
    {
      id: "cleaner",
      name: "Cleaner",
      description: "A Cleaner to clean up after the conclusion of celebrations",
      price: "₹2000",
      image_url: "/balloon.jpg",
    },
    {
      id: "reelmaker",
      name: "Reel Maker",
      description: "An individual assigned to document all your moments",
      price: "₹4000",
      image_url: "/balloon.jpg",
    },
    {
      id: "mascot",
      name: "Mascot",
      description: "The artist will arrive 30 mins before the party begins and perform interactive games.",
      price: "₹3999",
      image_url: "/balloon.jpg",
    }
];

// Data from PackageSelector.tsx
const packages = [
  {
    name: 'Silver',
    price: 9999,
    features: ['Balloon Decor', 'Game Host', 'Tattoo Artist', 'Cleaner'],
  },
  {
    name: 'Gold',
    price: 15999,
    features: ['Balloon Decor', 'Game Host', 'Tattoo Artist', 'Cleaner', 'Magician', 'Reel Maker'],
  },
  {
    name: 'Diamond',
    price: 26999,
    features: ['Balloon Decor', 'Game Host', 'Tattoo Artist', 'Cleaner', 'Magician', 'Reel Maker', 'Backdrop', 'Speaker & Mic Combo'],
  },
  {
    name: 'Platinum',
    price: 38999,
    features: ['Balloon Decor', 'Game Host', 'Tattoo Artist', '2 x Cleaners', 'Magician', 'Reel Maker', 'Backdrop', 'Speaker & Mic Combo', 'Aesthetics'],
  },
];

const params = url.parse(process.env.DATABASE_URL || '');
const auth = params.auth?.split(':');

const pool = new Pool({
  user: auth?.[0] || undefined,
  password: auth?.[1] || undefined,
  host: params.hostname || undefined,
  port: params.port ? parseInt(params.port) : undefined,
  database: params.pathname ? params.pathname.split('/')[1] : undefined,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

function parsePrice(price: string | number): number {
    if (typeof price === 'number') {
        return price;
    }
    return parseFloat(price.replace('₹', '').replace(',', ''));
}

async function seed() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Create Schema (from init.sql) - REMOVED FOR MANUAL SEEDING
        // console.log('Creating database schema...');
        // const schemaSql = `
        // DROP SCHEMA public CASCADE;
        // CREATE SCHEMA public;
        // ... (rest of init.sql content)
        // `;
        // await client.query(schemaSql);
        // console.log('Database schema created successfully.');

        // 2. Seed Data
        console.log('Seeding Categories...');
        const categoriesToSeed = [
            "Themes", "Decoration", "House Warming", "Flower Decoration",
            "Birthday", "Baby Shower", "Mascots", "Add-On Decor", "Activity"
        ];

        const categoryMap = new Map<string, number>();
        for (const categoryName of categoriesToSeed) {
            // Check if category already exists
            let res = await client.query('SELECT category_id FROM Categories WHERE name = $1', [categoryName]);
            let categoryId;
            if (res.rows.length > 0) {
                categoryId = res.rows[0].category_id;
                console.log(`Category '${categoryName}' already exists with ID ${categoryId}. Skipping insertion.`);
            } else {
                // If not, insert it
                res = await client.query('INSERT INTO Categories (name) VALUES ($1) RETURNING category_id', [categoryName]);
                categoryId = res.rows[0].category_id;
                console.log(`Category '${categoryName}' inserted with ID ${categoryId}.`);
            }
            categoryMap.set(categoryName, categoryId);
        }
        console.log('Categories seeding complete.');

        console.log('Seeding Products...');
        const productMap = new Map<string, number>();

        // Seed Base Products
        for (const product of baseProducts) {
            // A product can belong to multiple categories, we'll just pick the first for the relationship
            const categoryId = categoryMap.get(product.cuisines[0]);
            if (!categoryId) {
                console.warn(`Category not found for product: ${product.name}`);
                continue;
            }
            const res = await client.query(
                'INSERT INTO Products (name, description, price, image_url, category_id, product_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING product_id',
                [product.name, product.description, parsePrice(product.salePrice), product.image_url, categoryId, 'BASE']
            );
            productMap.set(product.name, res.rows[0].product_id);
        }

        // Seed Add-On Decor Products
        const addOnDecorCatId = categoryMap.get('Add-On Decor');
        for (const item of addOnItems) {
            const res = await client.query(
                'INSERT INTO Products (name, description, price, image_url, category_id, product_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING product_id',
                [item.name, item.description, parsePrice(item.price), item.image_url, addOnDecorCatId, 'ADD_ON']
            );
            productMap.set(item.name, res.rows[0].product_id);
        }

        // Seed Activity Products
        const activityCatId = categoryMap.get('Activity');
        for (const item of activityItems) {
            const res = await client.query(
                'INSERT INTO Products (name, description, price, image_url, category_id, product_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING product_id',
                [item.name, item.description, parsePrice(item.price), item.image_url, activityCatId, 'ADD_ON']
            );
            productMap.set(item.name, res.rows[0].product_id);
        }
        console.log('Products seeded.');

        console.log('Seeding Packages...');
        const packageMap = new Map<string, number>();
        for (const pkg of packages) {
            // Check if package already exists
            let res = await client.query('SELECT package_id FROM Packages WHERE name = $1', [pkg.name]);
            let packageId;
            if (res.rows.length > 0) {
                packageId = res.rows[0].package_id;
                console.log(`Package '${pkg.name}' already exists with ID ${packageId}. Skipping insertion.`);
            } else {
                // If not, insert it
                res = await client.query(
                    'INSERT INTO Packages (name, description, total_price) VALUES ($1, $2, $3) RETURNING package_id',
                    [pkg.name, `Includes: ${pkg.features.join(', ')}`, parsePrice(pkg.price)]
                );
                packageId = res.rows[0].package_id;
                console.log(`Package '${pkg.name}' inserted with ID ${packageId}.`);
            }
            packageMap.set(pkg.name, packageId);
        }
        console.log('Packages seeding complete.');

        console.log('Seeding Package Items...');
        for (const pkg of packages) {
            const packageId = packageMap.get(pkg.name);
            if (!packageId) continue;

            for (const feature of pkg.features) {
                // A bit of fuzzy matching for features vs product titles
                const productTitle = [...productMap.keys()].find(key => feature.toLowerCase().includes(key.toLowerCase()));
                const productId = productTitle ? productMap.get(productTitle) : undefined;

                if (productId) {
                    await client.query('INSERT INTO Package_Items (package_id, product_id) VALUES ($1, $2)', [packageId, productId]);
                } else {
                    console.warn(`Could not find a matching product for feature: "${feature}" in package: "${pkg.name}"`);
                }
            }
        }
        console.log('Package Items seeded.');

        await client.query('COMMIT');
        console.log('Seeding completed successfully!');

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error during seeding:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
        } else {
            console.error('An unknown error occurred during seeding.');
        }
    } finally {
        client.release();
        await pool.end();
    }
}

seed();