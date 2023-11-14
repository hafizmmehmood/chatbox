const products =

  [
    {
      "title": "Smart Coffee Maker",
      "sku": "SCM5678",
      "description": "Brew your favorite coffee with this smart coffee maker.",
      "color": [
        "black",
        "white"
      ],
      "category": "Kitchen",
      "price": 49.99,
      "sale_price": 39.99
    },
    {
      "title": "Wireless Bluetooth Headphones",
      "sku": "WBH7890",
      "description": "Immerse yourself in music with these wireless Bluetooth headphones.",
      "color": [
        "blue",
        "silver"
      ],
      "category": "Electronics",
      "price": 129.99,
      "sale_price": 119.99
    },
    {
      "title": "High-Performance Soccer Ball",
      "sku": "HPSB4567",
      "description": "Enhance your game with this high-performance soccer ball.",
      "color": [
        "red",
        "white"
      ],
      "category": "Sports",
      "price": 19.99,
      "sale_price": 15.99
    },
    {
      "title": "Educational Building Blocks",
      "sku": "EBB2345",
      "description": "Encourage learning and creativity with these educational building blocks for kids.",
      "color": [
        "yellow",
        "blue"
      ],
      "category": "Kids",
      "price": 29.99,
      "sale_price": 24.99
    },
    {
      "title": "Casual Cotton T-Shirt",
      "sku": "CCTS7890",
      "description": "Stay comfortable and stylish with this casual cotton t-shirt.",
      "color": [
        "black",
        "gray"
      ],
      "category": "Clothes",
      "price": 14.99,
      "sale_price": 11.99
    },
    {
      "title": "Smart Blender",
      "sku": "SB1234",
      "description": "Create healthy and delicious smoothies with this smart blender.",
      "color": [
        "green",
        "orange"
      ],
      "category": "Kitchen",
      "price": 79.99,
      "sale_price": 69.99
    },
    {
      "title": "Noise-Canceling Earbuds",
      "sku": "NCE5678",
      "description": "Enjoy immersive audio with these noise-canceling earbuds.",
      "color": [
        "white",
        "gold"
      ],
      "category": "Electronics",
      "price": 89.99,
      "sale_price": 79.99
    },
    {
      "title": "Basketball Hoop Set",
      "sku": "BHS7890",
      "description": "Practice your slam dunks with this basketball hoop set for indoors or outdoors.",
      "color": [
        "orange",
        "black"
      ],
      "category": "Sports",
      "price": 49.99,
      "sale_price": 39.99
    },
    {
      "title": "Interactive Learning Tablet for Kids",
      "sku": "ILT2345",
      "description": "Make learning fun for kids with this interactive tablet featuring educational games.",
      "color": [
        "pink",
        "purple"
      ],
      "category": "Kids",
      "price": 34.99,
      "sale_price": 29.99
    },
    {
      "title": "Denim Shorts",
      "sku": "DS7890",
      "description": "Stay cool and stylish in these denim shorts for the summer.",
      "color": [
        "blue",
        "light blue"
      ],
      "category": "Clothes",
      "price": 24.99,
      "sale_price": 19.99
    },
    {
      "title": "Smart Toaster Oven",
      "sku": "STO1234",
      "description": "Upgrade your kitchen with this smart toaster oven for versatile cooking options.",
      "color": [
        "silver",
        "black"
      ],
      "category": "Kitchen",
      "price": 109.99,
      "sale_price": 99.99
    },
    {
      "title": "Fitness Smartwatch",
      "sku": "FSW5678",
      "description": "Monitor your health and workouts with this feature-packed fitness smartwatch.",
      "color": [
        "black",
        "green"
      ],
      "category": "Electronics",
      "price": 149.99,
      "sale_price": 139.99
    },
    {
      "title": "Yoga Mat",
      "sku": "YM7890",
      "description": "Enhance your yoga practice with this comfortable and durable yoga mat.",
      "color": [
        "purple",
        "pink"
      ],
      "category": "Sports",
      "price": 29.99,
      "sale_price": 24.99
    },
    {
      "title": "Building Blocks Play Set",
      "sku": "BBPS2345",
      "description": "Stimulate creativity and imagination with this building blocks play set for kids.",
      "color": [
        "blue",
        "yellow"
      ],
      "category": "Kids",
      "price": 19.99,
      "sale_price": 15.99
    },
    {
      "title": "Striped Polo Shirt",
      "sku": "SPS7890",
      "description": "Add a classic touch to your wardrobe with this striped polo shirt.",
      "color": [
        "navy",
        "white"
      ],
      "category": "Clothes",
      "price": 29.99,
      "sale_price": 24.99
    },
    {
      "title": "Multifunctional Blender",
      "sku": "MB1234",
      "description": "Blend, chop, and mix with ease using this multifunctional blender for your kitchen.",
      "color": [
        "red",
        "silver"
      ],
      "category": "Kitchen",
      "price": 69.99,
      "sale_price": 59.99
    },
    {
      "title": "Wireless Gaming Mouse",
      "sku": "WGM5678",
      "description": "Experience precise gaming control with this wireless gaming mouse.",
      "color": [
        "black",
        "RGB"
      ],
      "category": "Electronics",
      "price": 59.99,
      "sale_price": 49.99
    },
    {
      "title": "Tennis Racket Set",
      "sku": "TRS7890",
      "description": "Improve your tennis game with this high-quality racket set.",
      "color": [
        "yellow",
        "black"
      ],
      "category": "Sports",
      "price": 79.99,
      "sale_price": 69.99
    },
    {
      "title": "Educational Puzzle Set",
      "sku": "EPS2345",
      "description": "Challenge young minds with this educational puzzle set for kids.",
      "color": [
        "orange",
        "green"
      ],
      "category": "Kids",
      "price": 14.99,
      "sale_price": 11.99
    },
    {
      "title": "Compact Food Processor",
      "sku": "CFP5678",
      "description": "Effortlessly prepare meals with this compact and versatile food processor for your kitchen.",
      "color": ["white", "silver"],
      "category": "Kitchen",
      "price": 79.99,
      "sale_price": 69.99
    },
    {
      "title": "Wireless Charging Pad",
      "sku": "WCP7890",
      "description": "Charge your devices wirelessly with this sleek and efficient charging pad.",
      "color": ["black", "rose gold"],
      "category": "Electronics",
      "price": 39.99,
      "sale_price": 34.99
    },
    {
      "title": "Cycling Helmet",
      "sku": "CH4567",
      "description": "Ensure safety on your cycling adventures with this comfortable and aerodynamic cycling helmet.",
      "color": ["blue", "yellow"],
      "category": "Sports",
      "price": 49.99,
      "sale_price": 39.99
    },
    {
      "title": "Interactive Storybook for Kids",
      "sku": "ISB2345",
      "description": "Ignite imagination with this interactive storybook designed to captivate young minds.",
      "color": ["purple", "green"],
      "category": "Kids",
      "price": 19.99,
      "sale_price": 16.99
    },
    {
      "title": "Winter Knit Sweater",
      "sku": "WKS7890",
      "description": "Stay warm and stylish in this cozy winter knit sweater for the colder months.",
      "color": ["gray", "burgundy"],
      "category": "Clothes",
      "price": 44.99,
      "sale_price": 39.99
    },
    {
      "title": "Juicer Blender Combo",
      "sku": "JBC1234",
      "description": "Blend and juice with one versatile appliance using this juicer blender combo.",
      "color": ["orange", "white"],
      "category": "Kitchen",
      "price": 89.99,
      "sale_price": 79.99
    },
    {
      "title": "HD Action Camera",
      "sku": "HAC5678",
      "description": "Capture your adventures in stunning detail with this high-definition action camera.",
      "color": ["black", "silver"],
      "category": "Electronics",
      "price": 129.99,
      "sale_price": 119.99
    },
    {
      "title": "Golf Club Set",
      "sku": "GCS7890",
      "description": "Improve your golf game with this complete set of high-quality golf clubs.",
      "color": ["green", "black"],
      "category": "Sports",
      "price": 179.99,
      "sale_price": 159.99
    },
    {
      "title": "Educational Science Kit",
      "sku": "ESK2345",
      "description": "Explore the wonders of science with this educational science kit designed for kids.",
      "color": ["blue", "red"],
      "category": "Kids",
      "price": 29.99,
      "sale_price": 24.99
    },
    {
      "title": "Athletic Jogging Pants",
      "sku": "AJP7890",
      "description": "Stay comfortable during workouts with these breathable and flexible athletic jogging pants.",
      "color": ["black", "navy"],
      "category": "Clothes",
      "price": 34.99,
      "sale_price": 29.99
    },
    {
      "title": "Digital Air Fryer",
      "sku": "DAF1234",
      "description": "Cook healthier meals with less oil using this digital air fryer for your kitchen.",
      "color": ["silver", "black"],
      "category": "Kitchen",
      "price": 109.99,
      "sale_price": 99.99
    },
    {
      "title": "Wireless Noise-Canceling Headphones",
      "sku": "WNCH5678",
      "description": "Immerse yourself in your favorite music with these advanced wireless noise-canceling headphones.",
      "color": ["black", "gold"],
      "category": "Electronics",
      "price": 149.99,
      "sale_price": 139.99
    },
    {
      "title": "Skiing and Snowboarding Goggles",
      "sku": "SSG7890",
      "description": "Ensure clear vision on the slopes with these high-performance skiing and snowboarding goggles.",
      "color": ["blue", "orange"],
      "category": "Sports",
      "price": 59.99,
      "sale_price": 49.99
    },
    {
      "title": "Colorful Building Blocks",
      "sku": "CBB2345",
      "description": "Inspire creativity with this set of colorful building blocks for kids.",
      "color": ["pink", "yellow"],
      "category": "Kids",
      "price": 22.99,
      "sale_price": 19.99
    },
    {
      "title": "Slim Fit Dress Shirt",
      "sku": "SFDS7890",
      "description": "Look sharp and stylish in this slim-fit dress shirt for various occasions.",
      "color": ["white", "blue"],
      "category": "Clothes",
      "price": 49.99,
      "sale_price": 44.99
    },
    {
      "title": "Portable Smoothie Blender",
      "sku": "PSB1234",
      "description": "Blend delicious smoothies on the go with this portable and rechargeable smoothie blender.",
      "color": ["green", "purple"],
      "category": "Kitchen",
      "price": 34.99,
      "sale_price": 29.99
    },
    {
      "title": "Foldable Wireless Keyboard",
      "sku": "FWK5678",
      "description": "Increase productivity with this compact and foldable wireless keyboard for your electronics.",
      "color": ["black", "silver"],
      "category": "Electronics",
      "price": 49.99,
      "sale_price": 39.99
    },
    {
      "title": "Mountain Biking Helmet",
      "sku": "MBH7890",
      "description": "Stay safe on your mountain biking adventures with this durable and stylish helmet.",
      "color": ["red", "gray"],
      "category": "Sports",
      "price": 69.99,
      "sale_price": 59.99
    },
    {
      "title": "Stainless Steel Blender",
      "sku": "SSB5678",
      "description": "Upgrade your kitchen with this durable stainless steel blender for smooth and efficient blending.",
      "color": ["silver", "black"],
      "category": "Kitchen",
      "price": 99.99,
      "sale_price": 89.99
    },
    {
      "title": "Smart Home Security Camera",
      "sku": "SHSC7890",
      "description": "Monitor your home with this smart security camera featuring HD video and motion detection.",
      "color": ["white", "black"],
      "category": "Electronics",
      "price": 129.99,
      "sale_price": 119.99
    },
    {
      "title": "Camping Tent",
      "sku": "CT4567",
      "description": "Enjoy the great outdoors with this spacious and weather-resistant camping tent.",
      "color": ["green", "blue"],
      "category": "Sports",
      "price": 79.99,
      "sale_price": 69.99
    },
    {
      "title": "Interactive Science Book for Kids",
      "sku": "ISBK2345",
      "description": "Make learning fun with this interactive science book designed to engage young minds.",
      "color": ["orange", "purple"],
      "category": "Kids",
      "price": 24.99,
      "sale_price": 19.99
    },
    {
      "title": "Quilted Winter Jacket",
      "sku": "QWJ7890",
      "description": "Stay warm and stylish in cold weather with this quilted winter jacket.",
      "color": ["black", "navy"],
      "category": "Clothes",
      "price": 79.99,
      "sale_price": 69.99
    },
    {
      "title": "Digital Air Fryer Oven",
      "sku": "DAFO1234",
      "description": "Cook healthier meals with versatility using this digital air fryer oven for your kitchen.",
      "color": ["red", "silver"],
      "category": "Kitchen",
      "price": 119.99,
      "sale_price": 109.99
    },
    {
      "title": "Wireless Charging Stand",
      "sku": "WCS5678",
      "description": "Charge your devices in style with this sleek and convenient wireless charging stand.",
      "color": ["black", "rose gold"],
      "category": "Electronics",
      "price": 44.99,
      "sale_price": 39.99
    },
    {
      "title": "Trail Running Shoes",
      "sku": "TRS7890",
      "description": "Conquer the trails with these lightweight and durable trail running shoes.",
      "color": ["blue", "gray"],
      "category": "Sports",
      "price": 89.99,
      "sale_price": 79.99
    },
    {
      "title": "Educational Math Puzzle Set",
      "sku": "EMPS2345",
      "description": "Enhance math skills with this engaging educational puzzle set designed for kids.",
      "color": ["yellow", "green"],
      "category": "Kids",
      "price": 19.99,
      "sale_price": 16.99
    },
    {
      "title": "Cozy Hooded Sweatshirt",
      "sku": "CHS7890",
      "description": "Stay cozy in style with this hooded sweatshirt, perfect for casual outings.",
      "color": ["gray", "burgundy"],
      "category": "Clothes",
      "price": 34.99,
      "sale_price": 29.99
    },
    {
      "title": "Sous Vide Precision Cooker",
      "sku": "SVPC1234",
      "description": "Achieve restaurant-quality meals at home with this sous vide precision cooker for your kitchen.",
      "color": ["silver", "black"],
      "category": "Kitchen",
      "price": 129.99,
      "sale_price": 119.99
    },
    {
      "title": "Bluetooth Fitness Earbuds",
      "sku": "BFE5678",
      "description": "Stay motivated during workouts with these Bluetooth fitness earbuds featuring sweat resistance.",
      "color": ["black", "blue"],
      "category": "Electronics",
      "price": 59.99,
      "sale_price": 49.99
    },
    {
      "title": "Mountain Climbing Gear Set",
      "sku": "MCGS7890",
      "description": "Gear up for mountain climbing adventures with this comprehensive climbing gear set.",
      "color": ["orange", "black"],
      "category": "Sports",
      "price": 159.99,
      "sale_price": 149.99
    },
    {
      "title": "Interactive World Map for Kids",
      "sku": "IWMK2345",
      "description": "Explore geography with this interactive world map designed to educate and entertain kids.",
      "color": ["blue", "green"],
      "category": "Kids",
      "price": 29.99,
      "sale_price": 24.99
    },
    {
      "title": "Casual Striped Dress",
      "sku": "CSD7890",
      "description": "Elevate your casual style with this comfortable and chic striped dress.",
      "color": ["navy", "white"],
      "category": "Clothes",
      "price": 39.99,
      "sale_price": 34.99
    },
    {
      "title": "Compact Food Steamer",
      "sku": "CFS1234",
      "description": "Prepare healthy meals with ease using this compact and efficient food steamer for your kitchen.",
      "color": ["white", "green"],
      "category": "Kitchen",
      "price": 49.99,
      "sale_price": 39.99
    },
    {
      "title": "Wireless Ergonomic Mouse",
      "sku": "WEM5678",
      "description": "Enhance your productivity with this wireless ergonomic mouse designed for comfort and precision.",
      "color": ["black", "silver"],
      "category": "Electronics",
      "price": 34.99,
      "sale_price": 29.99
    },
    {
      "title": "Road Cycling Shoes",
      "sku": "RCS7890",
      "description": "Optimize your cycling performance with these lightweight and breathable road cycling shoes.",
      "color": ["red", "black"],
      "category": "Sports",
      "price": 69.99,
      "sale_price": 59.99
    },
  ]
module.exports = products;
