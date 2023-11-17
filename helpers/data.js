const data = [
    {
        "sku": "BOOK808",
        "title": "Bestseller Hardcover Novel",
        "description": "Get lost in the pages of our Bestseller Hardcover Novel. A captivating story that will keep you hooked from start to finish. 📖📚",
        "price": 24.99
    },
    {
        "sku": "WAT1001",
        "title": "Waterproof Outdoor Backpack",
        "description": "Explore the great outdoors with our Waterproof Outdoor Backpack. It's designed to keep your gear dry in any weather. 🌦️🌲",
        "price": 69.99
    },
    {
        "sku": "CAM1203",
        "title": "4K Action Camera Kit",
        "description": "Capture your adventures in stunning detail with our 4K Action Camera Kit. It includes all the accessories you need for epic shots. 📷🏞️",
        "price": 149.99
    },
    {
        "sku": "ORG1505",
        "title": "Organic Facial Skincare Set",
        "description": "Nourish your skin with our Organic Facial Skincare Set. It's a natural, cruelty-free way to achieve a healthy, radiant complexion. 🌿🌺",
        "price": 39.99
    },
    {
        "sku": "PLT1807",
        "title": "Indoor Plant Collection",
        "description": "Bring the beauty of nature into your home with our Indoor Plant Collection. Perfect for adding a touch of green to any space. 🌱🪴",
        "price": 29.99
    },
    {
        "sku": "KIT2109",
        "title": "DIY Home Repair Tool Kit",
        "description": "Tackle household projects with confidence using our DIY Home Repair Tool Kit. It has everything you need for minor repairs and maintenance. 🔧🏡",
        "price": 49.99
    },
    {
        "sku": "GAM2411",
        "title": "Gaming Mouse and Keyboard Combo",
        "description": "Elevate your gaming experience with our Gaming Mouse and Keyboard Combo. Designed for precision and comfort during intense gaming sessions. 🎮⌨️",
        "price": 79.99
    },
    {
        "sku": "PET2713",
        "title": "Pet Grooming Kit",
        "description": "Keep your furry friend looking their best with our Pet Grooming Kit. It includes all the tools for a pampered pet. 🐶🐱",
        "price": 34.99
    },
    {
        "sku": "BAG3015",
        "title": "Leather Tote Bag",
        "description": "Upgrade your style with our Leather Tote Bag. A timeless accessory that complements your outfit, perfect for work or a night out. 👜👠",
        "price": 59.99
    },
    {
        "sku": "FIT3317",
        "title": "Yoga Mat with Carrying Strap",
        "description": "Achieve inner peace and flexibility with our Yoga Mat. It's non-slip and comes with a carrying strap for easy transport to your yoga sessions. 🧘‍♀️🧘‍♂️",
        "price": 24.99
    },
    {
        "sku": "ECO123",
        "title": "Organic Cotton Throw Blanket",
        "description": "Stay warm and cozy with our Organic Cotton Throw Blanket. Made from 100% organic cotton, it's perfect for chilly nights or lazy days on the couch. 🌿",
        "price": 39.99
    },
    {
        "sku": "FIT456",
        "title": "Fitness Tracker Smartwatch",
        "description": "Achieve your fitness goals with our Fitness Tracker Smartwatch. It tracks your steps, heart rate, and sleep quality, helping you live a healthier life. 💪🏋️‍♂️",
        "price": 89.99
    },
    {
        "sku": "HOM789",
        "title": "Rustic Wooden Wall Clock",
        "description": "Add a touch of rustic charm to your home with our Rustic Wooden Wall Clock. It's a stylish timepiece that complements any decor. ⏰",
        "price": 49.99
    },
    {
        "sku": "BEA101",
        "title": "Rose Gold Beauty Mirror",
        "description": "Enhance your beauty routine with our Rose Gold Beauty Mirror. With LED lighting and a 10x magnification feature, it's your new beauty essential. 💄✨",
        "price": 29.99
    },
    {
        "sku": "TEA202",
        "title": "Premium Loose Leaf Tea Sampler",
        "description": "Experience the world of tea with our Premium Loose Leaf Tea Sampler. This set includes a variety of exquisite teas for the tea connoisseur. ☕🍵",
        "price": 19.99
    },
    {
        "sku": "TRV303",
        "title": "Travel Backpack with USB Charging Port",
        "description": "Stay connected while on the go with our Travel Backpack featuring a built-in USB charging port. Ideal for tech-savvy travelers. 🎒🔌",
        "price": 59.99
    },
    {
        "sku": "COF404",
        "title": "Stainless Steel French Press Coffee Maker",
        "description": "Brew the perfect cup of coffee with our Stainless Steel French Press Coffee Maker. It's a durable and elegant addition to your kitchen. ☕👌",
        "price": 29.99
    },
    {
        "sku": "GAD505",
        "title": "Wireless Bluetooth Earbuds",
        "description": "Enjoy wireless freedom with our Bluetooth Earbuds. They offer high-quality sound and a comfortable fit for your on-the-go lifestyle. 🎵🎧",
        "price": 69.99
    },
    {
        "sku": "ART606",
        "title": "Acrylic Paint Set with Easel",
        "description": "Unleash your inner artist with our Acrylic Paint Set. It comes with a wooden easel, canvases, and a variety of vibrant colors. 🎨✨",
        "price": 49.99
    },
    {
        "sku": "KID707",
        "title": "Children's Play Kitchen Set",
        "description": "Spark your child's imagination with our Children's Play Kitchen Set. It's a fun and educational toy for budding chefs. 🍳👩‍🍳",
        "price": 79.99
    },
    {
        "title": "Premium Smartphone",
        "sku": "SPH12345",
        "description": "A top-tier smartphone with cutting-edge features.",
        "price": 799.99
    },
    {
        "title": "Smart TV 55-Inch",
        "sku": "TV78901",
        "description": "Immerse yourself in stunning 4K entertainment.",
        "price": 549.99
    },
    {
        "title": "Laptop Pro X",
        "sku": "LPX54321",
        "description": "Powerful laptop for work and play.",
        "price": 1299.99
    },
    {
        "title": "Bluetooth Headphones",
        "sku": "BHP98765",
        "description": "Wireless headphones for a seamless audio experience.",
        "price": 149.99
    },
    {
        "title": "High-Performance Router",
        "sku": "RTR24680",
        "description": "Maximize your internet speed with this router.",
        "price": 99.99
    },
    {
        "title": "Fitness Tracker",
        "sku": "FIT13579",
        "description": "Track your health and fitness goals with style.",
        "price": 79.99
    },
    {
        "title": "Digital Camera Kit",
        "sku": "CAM86420",
        "description": "Capture memories in stunning detail.",
        "price": 449.99
    },
    {
        "title": "Tablet for Kids",
        "sku": "KID11223",
        "description": "Educational tablet designed for children.",
        "price": 199.99
    },
    {
        "title": "Home Security System",
        "sku": "SEC55555",
        "description": "Protect your home with the latest security technology.",
        "price": 299.99
    },
    {
        "title": "Noise-Canceling Earbuds",
        "sku": "NCB99999",
        "description": "Enjoy peace and quiet with these earbuds.",
        "price": 119.99
    },
    {
        "title": "Coffee Maker Deluxe",
        "sku": "CM55555",
        "description": "Brew your favorite coffee like a pro.",
        "price": 69.99
    },
    {
        "title": "Gaming Console X",
        "sku": "GCX24680",
        "description": "Experience gaming at its finest.",
        "price": 399.99
    },
    {
        "title": "Designer Handbag",
        "sku": "HB12345",
        "description": "Elegant and stylish handbag for fashion lovers.",
        "price": 299.99
    },
    {
        "title": "Kitchen Blender",
        "sku": "BLN54321",
        "description": "Blend your way to delicious and healthy smoothies.",
        "price": 59.99
    },
    {
        "title": "Smart Refrigerator",
        "sku": "RFR12345",
        "description": "A refrigerator with smart features for modern kitchens.",
        "price": 1699.99
    },
    {
        "title": "Designer Sunglasses",
        "sku": "SG78901",
        "description": "Stay stylish while protecting your eyes from the sun.",
        "price": 199.99
    },
    {
        "title": "Electric Toothbrush",
        "sku": "ETB54321",
        "description": "Keep your teeth clean and healthy with this electric toothbrush.",
        "price": 69.99
    },
    {
        "title": "Wireless Speaker",
        "sku": "WS98765",
        "description": "Enjoy high-quality sound without the hassle of wires.",
        "price": 79.99
    },
    {
        "title": "Home Projector",
        "sku": "PRJ24680",
        "description": "Transform your living room into a home theater with this projector.",
        "price": 299.99
    },
    {
        "title": "Fancy Wristwatch",
        "sku": "WCH13579",
        "description": "Elevate your style with this exquisite wristwatch.",
        "price": 349.99
    },
    {
        "title": "Compact Blender",
        "sku": "CBL86420",
        "description": "Blend your favorite drinks with this space-saving blender.",
        "price": 49.99
    },
    {
        "title": "Outdoor Grill",
        "sku": "GRLL11223",
        "description": "Host barbecue parties with this top-notch outdoor grill.",
        "price": 399.99
    },
    {
        "title": "Gourmet Coffee Maker",
        "sku": "CMX55555",
        "description": "Brew the finest coffee in the comfort of your home.",
        "price": 229.99
    },
    {
        "title": "Professional Hair Dryer",
        "sku": "HD99999",
        "description": "Achieve salon-quality hair drying at home.",
        "price": 79.99
    },
    {
        "title": "Action Camera Kit",
        "sku": "ACK55555",
        "description": "Capture your adventures in high-definition action.",
        "price": 159.99
    },
    {
        "title": "Gaming Laptop",
        "sku": "GLP24680",
        "description": "Experience gaming on the go with this powerful laptop.",
        "price": 1299.99
    },
    {
        "title": "Digital Drawing Tablet",
        "sku": "DTB12345",
        "description": "Unleash your creativity with precision drawing on this tablet.",
        "price": 249.99
    },
    {
        "title": "Stainless Steel Cookware Set",
        "sku": "CSS78901",
        "description": "Upgrade your kitchen with this durable and stylish cookware set.",
        "price": 199.99
    },
    {
        "title": "Smart Home Security Camera",
        "sku": "SHSC54321",
        "description": "Keep an eye on your home from anywhere with this smart camera.",
        "price": 129.99
    }
]

module.exports = data;

