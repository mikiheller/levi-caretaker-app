export type ActivityCategory =
  | "pretend-play"
  | "gross-motor"
  | "sensory"
  | "structured-table"
  | "communication"
  | "outdoor"
  | "functional"
  | "regulation"
  | "special";

export type Category = {
  id: ActivityCategory;
  label: string;
  emoji: string;
  blurb: string;
  cssVar: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "pretend-play",
    label: "Pretend Play",
    emoji: "🎭",
    blurb: "Imaginative scenes that grow language and flexibility.",
    cssVar: "--cat-pretend",
  },
  {
    id: "gross-motor",
    label: "Gross Motor & Movement",
    emoji: "🤸",
    blurb: "Get the wiggles out while practicing turn-taking and following directions.",
    cssVar: "--cat-motor",
  },
  {
    id: "sensory",
    label: "Sensory Play",
    emoji: "💧",
    blurb: "Calming, regulating activities that invite communication.",
    cssVar: "--cat-sensory",
  },
  {
    id: "structured-table",
    label: "Structured Table",
    emoji: "🧩",
    blurb: "Quieter sit-down activities for focus and fine motor.",
    cssVar: "--cat-table",
  },
  {
    id: "communication",
    label: "Communication-Focused",
    emoji: "💬",
    blurb: "Built-in opportunities for AAC, choices, and requests.",
    cssVar: "--cat-comm",
  },
  {
    id: "outdoor",
    label: "Outdoor & Community",
    emoji: "🌳",
    blurb: "Get out of the house — Levi loves it.",
    cssVar: "--cat-outdoor",
  },
  {
    id: "functional",
    label: "Functional / Adaptive",
    emoji: "🧺",
    blurb: "Real-life tasks dressed up as play.",
    cssVar: "--cat-functional",
  },
  {
    id: "regulation",
    label: "Regulation & Calm",
    emoji: "🧘",
    blurb: "For winding down or recovering from a tough moment.",
    cssVar: "--cat-regulation",
  },
  {
    id: "special",
    label: "Special High-Engagement",
    emoji: "✨",
    blurb: "Pull these out when the day needs a lift.",
    cssVar: "--cat-special",
  },
];

export function getCategory(id: ActivityCategory): Category {
  return CATEGORIES.find((c) => c.id === id)!;
}

export type LessonPlan = {
  setup?: string;
  duringPlay?: string;
  ifLosingInterest?: string;
  wrappingUp?: string;
  closingNote?: string;
};

export type Activity = {
  id: string;
  slug: string;
  title: string;
  category: ActivityCategory;
  emoji: string;
  summary: string;
  miniSteps?: string[];
  estimatedMinutes: [number, number];
  materials?: string[];
  learningGoals?: string[];
  lesson?: LessonPlan;
};

export const ACTIVITIES: Activity[] = [
  // ===== PRETEND PLAY =====
  {
    id: "restaurant",
    slug: "restaurant",
    title: "Restaurant Pretend Play",
    category: "pretend-play",
    emoji: "🍔",
    summary:
      "Set up a tiny restaurant and let Levi take orders, deliver food, and practice 'more' and 'all done' along the way.",
    miniSteps: [
      "Be waiter or customer",
      "Practice 'more', 'all done', 'eat', 'drink'",
      "Use toy food or real snacks",
      "Practice taking turns",
    ],
    estimatedMinutes: [15, 25],
    materials: ["Toy food or real snacks", "Plates and cups", "Notepad (pretend order pad)", "Apron or chef hat (optional)"],
    learningGoals: ["AAC use", "Requesting", "Turn taking", "Following directions"],
  },
  {
    id: "doctor-kit",
    slug: "doctor-kit",
    title: "Doctor / Vet Kit",
    category: "pretend-play",
    emoji: "🩺",
    summary:
      "Open a vet or doctor's office, treat stuffed-animal patients, and naturally label body parts as you go.",
    miniSteps: [
      "Check heartbeat",
      "Take temperature",
      "Identify body parts",
      "Practice turn-taking",
    ],
    estimatedMinutes: [15, 30],
    materials: [
      "3–5 stuffed animals",
      "Doctor kit (stethoscope, thermometer, etc.)",
      "White paper + markers/crayons",
      "Foam blocks or the Nugget (for the waiting room)",
    ],
    learningGoals: [
      "Choice making",
      "AAC use",
      "Body part labeling",
      "Following 1- and 2-step directions",
      "Imaginative play",
    ],
    lesson: {
      setup:
        "Collect 3–5 stuffed animals, the doctor kit, and a list of pretend symptoms (sore throat, broken bone, scrape). Write 'Doctor' or 'Vet' on a piece of paper using whichever color and writing utensil Levi picks — give him a choice between markers or crayons, then offer 2–3 colors using the choices app or by holding two up in front of him. Let Levi decorate the sign with stickers or markers; this is a nice moment to reinforce that doctors are there to help us and so it's important to make patients feel calm. Help Levi tape the sign somewhere visible. Then use the Nugget or foam blocks to build a little waiting room, and place the animals inside.",
      duringPlay:
        "Use the choices app to input all of the animals in the waiting room and have Levi select an order — \"Levi, which animal should go first?\" When he touches one, narrate: \"Elephant is first.\" This is also a great chance to spell elephant out loud or make the \"eh\" sound and use the app to ask which letter it starts with — \"g\" or \"e\"? Continue until he has picked the order. Then call animals in one at a time and use the iPad to practice body identification: label \"head,\" \"nose,\" \"back,\" and give him a chance to respond. You can play for as long or as little as he wants.",
      ifLosingInterest:
        "If he looks bored, add movement: walk like the animal, race the animals around the room, or make silly animal noises (he loves that). You can also let him give the next patient a piggy-back ride into the exam room.",
      wrappingUp:
        "Have Levi help you clean up — \"Levi please pick up the stuffed animals and put them on the shelf,\" \"Levi stack the blocks over here.\" Lots of opportunities for one- and two-step directions.",
      closingNote:
        "The setup (making the sign, gathering things, offering choices) may take longer than the actual play — and that's okay, because there are so many natural learning opportunities along the way. The bar can be low: exposing Levi to imaginative play and creating small natural ways for him to respond is the goal.",
    },
  },
  {
    id: "animal-rescue",
    slug: "animal-rescue",
    title: "Animal Rescue / Zoo",
    category: "pretend-play",
    emoji: "🦁",
    summary:
      "Animals are stuck around the house and need rescuing. Levi finds, carries, and cares for each one.",
    miniSteps: [
      "Hide and rescue animals",
      "Sort by habitat",
      "Follow directions",
      "Label animals",
      "Request help/items",
    ],
    estimatedMinutes: [15, 30],
    materials: [
      "Several stuffed animals",
      "A few pretend rescue tools (flashlight, basket, doctor kit)",
      "Paper + stickers for an \"Animal Rescue Team\" sign",
    ],
    learningGoals: [
      "AAC use",
      "Choice making",
      "Following directions",
      "Labeling animals",
      "Requesting help/items",
      "Imitation",
      "Imaginative play",
    ],
    lesson: {
      setup:
        "Gather several stuffed animals and place them around the room or house in different \"rescue locations\" — under pillows, behind the couch, under a blanket, inside a laundry basket. Collect a few pretend rescue tools too, like a flashlight, a basket, or a doctor kit. Let Levi choose which tools he wants to use by holding up two choices at a time or using the choices app, narrating his selections: \"Ooh, a flashlight! That's a great choice.\" Then make a simple \"Animal Rescue Team\" sign on paper and let Levi decorate it with markers, stickers, or stamps. While writing, verbalize letters and sounds naturally — \"A says ahhh for animal.\" Even if he only scribbles or places one sticker, that's enthusiastic praise territory — the goal is participation, not perfection. Place the sign on whatever you're using to collect the animals.",
      duringPlay:
        "Begin pretend play by acting dramatically and silly. \"Oh no! The tiger is stuck under the couch! We have to rescue him!\" Encourage Levi to search while you narrate: \"You found the elephant!\" \"The lion needs help!\" \"Should we carry him or pull him?\" This creates natural opportunities for AAC, choice-making, following directions, labeling animals, requesting help, and imitation. Once an animal is rescued, transition into caring for it with the doctor kit or a pretend feeding station — you can cook a pretend meal together, or grab a real snack and bring it to the play. Pretend you're in a different climate (tropical, frozen tundra, desert) to extend the play without needing a new activity.",
      ifLosingInterest:
        "Add movement immediately: walking like different animals, stomping like elephants, hopping like frogs, racing animals around the room, or pretending to carry \"heavy\" animals.",
      wrappingUp:
        "Have Levi help clean up by putting animals back in bins or on shelves — natural one-step and multi-step directions in context.",
    },
  },
  {
    id: "car-wash",
    slug: "car-wash",
    title: "Car Wash",
    category: "pretend-play",
    emoji: "🚗",
    summary:
      "Wash toy cars with real water and bubbles. As messy and sensory as you want it to be.",
    miniSteps: [
      "Wash toy cars",
      "Use sponges, spray bottles, towels",
      "Practice sequencing",
      "Sensory engagement",
    ],
    estimatedMinutes: [15, 30],
    materials: [
      "Several toy cars or trucks",
      "Bin of water",
      "Soap bubbles",
      "Sponges and scrub brushes",
      "Towels",
      "Spray bottles",
      "Cups",
    ],
    learningGoals: [
      "Requesting items",
      "Following directions",
      "Turn taking",
      "Sensory exploration",
      "Imitation",
      "AAC use",
      "Motor planning",
    ],
    lesson: {
      setup:
        "Set everything up in one central area, either outside or on a towel indoors. Let Levi choose which cars to wash and which tools to use — the choices app, or just hold two options up at a time. Make a \"Car Wash\" sign together on paper and let him decorate it. Model writing words like \"wash,\" \"car,\" or color names while naming them aloud.",
      duringPlay:
        "Be animated and playful — \"Oh no! This car is SO dirty!\" \"We need the super sponge!\" Model a simple sequence: spray, scrub, rinse, dry. Encourage Levi to imitate in whatever way he's comfortable. If he only briefly interacts with the materials, that's still valuable engagement. If he gets more interested in the sensory aspect than the pretend play, follow his lead — spray numbers or letters drawn in chalk, wash large objects outside, or spray toy animals.",
      ifLosingInterest:
        "Make the play more dramatic. \"This car is SO stinky!\" \"Oh no! Giant mud puddle!\" Sometimes adding humor and exaggerated reactions is what sustains the interaction.",
      wrappingUp:
        "Involve Levi in cleanup: drying the cars, dumping the water, putting tools away, wiping surfaces.",
      closingNote:
        "The goal isn't perfect pretend play — it's shared engagement, communication opportunities, flexibility, and positive interactions around play.",
    },
  },
  {
    id: "grocery-store",
    slug: "grocery-store",
    title: "Grocery Store",
    category: "pretend-play",
    emoji: "🛒",
    summary:
      "Build a tiny shop and let Levi shop, scan, bag, or be the cashier. Lots of natural functional play.",
    miniSteps: [
      "Find items from picture list",
      "Match and request",
      "Practice waiting",
      "Practice 'money'",
    ],
    estimatedMinutes: [15, 30],
    materials: [
      "Pretend food items",
      "Grocery bags",
      "Baskets",
      "Empty food containers",
      "Toy cash register (optional)",
      "Pretend money (or paper coins)",
    ],
    learningGoals: [
      "Matching",
      "Sorting",
      "Requesting",
      "Waiting",
      "Turn taking",
      "Following directions",
      "AAC communication",
      "Functional pretend play",
    ],
    lesson: {
      setup:
        "Collect pretend food, grocery bags, baskets, empty food containers, and a toy cash register if you have one. Place items around the room on shelves, bins, or tables so it looks like a little store. Before starting, let Levi choose what foods should be in the store, who's the shopper, and which basket or cart to use. Make a grocery store sign together — and maybe a short shopping list using simple pictures or drawings. While writing, name letters and food names naturally so it doesn't feel like instruction.",
      duringPlay:
        "Narrate dramatically and playfully: \"We need groceries!\" \"Oh no, we forgot bananas!\" \"Can you help me find apples?\" Encourage Levi to place items in the basket, push the cart, scan items, hand over pretend money (great fine-motor practice), and bag groceries. This creates natural opportunities for matching, sorting, requesting, waiting, turn taking, following directions, AAC use, and functional pretend play. If he loses interest in the grocery theme, pivot fast with the same materials — hide food around the room for a \"shopping scavenger hunt\" using real snacks he likes, pretend the foods are silly (\"This apple is actually a phone!\"), crash carts dramatically, or race the foods.",
      ifLosingInterest:
        "Add movement: pushing heavy baskets, carrying grocery bags around the house, racing to find foods.",
      wrappingUp:
        "Have Levi help restock shelves, sort foods, throw away pretend trash, or stack baskets.",
      closingNote:
        "Keep the emphasis on flexibility, engagement, and natural communication — not structured performance.",
    },
  },
  {
    id: "camping-adventure",
    slug: "camping-adventure",
    title: "Camping Adventure",
    category: "pretend-play",
    emoji: "⛺",
    summary:
      "Build a blanket fort campsite, roast pretend marshmallows, and listen for bears outside the tent.",
    miniSteps: [
      "Build a blanket fort",
      "Flashlights, stuffed animals, pretend marshmallows",
      "Read books inside",
      "Songs around the campfire",
    ],
    estimatedMinutes: [20, 40],
    materials: [
      "Blankets",
      "Pillows",
      "Stuffed animals",
      "Flashlights",
      "Pretend food",
      "Books",
      "Camping-themed toys (optional)",
    ],
    learningGoals: [
      "Shared attention",
      "Imaginative play",
      "Requesting",
      "Following directions",
      "Turn taking",
      "AAC use",
      "Flexible play sequences",
    ],
    lesson: {
      setup:
        "Gather blankets, pillows, stuffed animals, flashlights, pretend food, books, and any camping-themed toys you have. Together, build a campsite using cushions, the Nugget, chairs, or blankets. Let Levi make choices: where the campsite should go (garage or playroom), which animals come camping, which snacks to bring. Make a \"Camp Levi\" sign together and decorate it.",
      duringPlay:
        "Narrate the pretend play with exaggerated faces, whispers, and silly storytelling: \"We're going camping!\" \"I hear a bear outside!\" \"We need flashlights!\" Activities inside the camp might include roasting pretend marshmallows, feeding stuffed animals, hiding animals outside the tent, reading books inside the fort, singing songs with flashlights, or pretending it's raining.",
      ifLosingInterest:
        "Add movement: crawling through tunnels, \"hiking\" around the house, animal walks, carrying camping supplies, flashlight scavenger hunts.",
      wrappingUp:
        "Have Levi help fold blankets, stack pillows, put away animals, and carry materials back.",
      closingNote:
        "Sometimes the most engaging part will be building and crashing the fort over and over, and that's totally fine. Following his motivation keeps engagement positive.",
    },
  },

  // ===== GROSS MOTOR =====
  {
    id: "obstacle-courses",
    slug: "obstacle-courses",
    title: "Obstacle Courses",
    category: "gross-motor",
    emoji: "🏃",
    summary:
      "Crawl under, jump over, and balance across. Set up a quick circuit with whatever you have around.",
    miniSteps: [
      "Crawl under, jump over, balance",
      "Use cushions, scooter, pads",
      "Animal walks, crash into pillows",
      "Imitation, following directions",
    ],
    estimatedMinutes: [10, 25],
    materials: ["Couch cushions", "Pillows", "Painter's tape (for lines on the floor)", "Hula hoop (optional)"],
    learningGoals: ["Imitation", "Following directions", "Waiting", "Motor planning"],
  },
  {
    id: "dance-parties",
    slug: "dance-parties",
    title: "Dance Parties",
    category: "gross-motor",
    emoji: "🪩",
    summary:
      "Cue up favorites and dance. Pause the song to practice 'more' and 'again'.",
    miniSteps: [
      "Freeze dance, fast/slow movements",
      "Jump, spin, clap, stomp",
      "Copy movements",
      "Request songs or 'more'",
    ],
    estimatedMinutes: [10, 20],
    materials: ["Phone or speaker for music"],
    learningGoals: ["Imitation", "Requesting more", "AAC use", "Joint attention"],
  },
  {
    id: "balloon-bubble",
    slug: "balloon-bubble",
    title: "Balloon & Bubble Fun",
    category: "gross-motor",
    emoji: "🎈",
    summary:
      "Bat balloons, chase bubbles, and use 'more' over and over again.",
    miniSteps: [
      "Keep balloon up, volleyball",
      "Balloon baseball, pop bubbles",
      "Colors, big vs small",
      "Request 'more'",
    ],
    estimatedMinutes: [10, 20],
    materials: ["Balloons", "Bubble solution and wand"],
    learningGoals: ["Requesting", "AAC use", "Joint attention", "Motor planning"],
  },
  {
    id: "yoga-for-kids",
    slug: "yoga-for-kids",
    title: "Yoga for Kids",
    category: "gross-motor",
    emoji: "🧘",
    summary:
      "Simple animal-themed poses. Calming and regulating, with built-in imitation.",
    miniSteps: [
      "Simple poses (downward dog, butterfly, cat/cow)",
      "Help with regulation",
      "Imitation, body awareness",
    ],
    estimatedMinutes: [5, 15],
    materials: ["Yoga mat or rug", "Cosmic Kids Yoga on YouTube (optional)"],
    learningGoals: ["Imitation", "Body awareness", "Regulation", "Following directions"],
  },
  {
    id: "scavenger-hunts",
    slug: "scavenger-hunts",
    title: "Scavenger Hunts",
    category: "gross-motor",
    emoji: "🔍",
    summary:
      "Hide things around the house and hunt them down together, with as much movement as he wants.",
    miniSteps: [
      "Find colors, shapes, animals, letters, favorite toys",
      "Use visual checklists",
    ],
    estimatedMinutes: [10, 25],
    materials: [
      "Small items to hide (colors, shapes, animals, letters, favorite toys)",
      "A simple visual checklist or the choices app",
    ],
    learningGoals: [
      "Following directions",
      "Visual scanning",
      "Communication",
      "Joint attention",
      "Motor movement",
    ],
    lesson: {
      setup:
        "Pick a small group of items for Levi to find around the house. Depending on his interest, the hunt can focus on colors, animals, letters, shapes, favorite toys, or sensory items. Make a simple visual checklist or use the choices app to show the targets.",
      duringPlay:
        "Be excited and playful — \"We need to find the hidden animals!\" \"Where is the red car?!\" As Levi searches, narrate his actions and celebrate every attempt. Natural opportunities for following directions, visual scanning, communication, joint attention, and movement.",
      ifLosingInterest:
        "Increase the silliness: race to objects, hide items in funny places, make the toys \"talk\" to him, pretend the objects are hiding from you both.",
      wrappingUp:
        "Have Levi help return items to their proper places — natural one- and two-step direction practice.",
    },
  },

  // ===== SENSORY =====
  {
    id: "water-play",
    slug: "water-play",
    title: "Water Play",
    category: "sensory",
    emoji: "💦",
    summary:
      "Pouring, scooping, spraying. Calming and full of communication openings.",
    miniSteps: [
      "Pour, scoop, spray",
      "Wash animals or cars",
      "Squirt bottles",
    ],
    estimatedMinutes: [15, 30],
    materials: [
      "Cups",
      "Bowls",
      "Spray bottles",
      "Toy animals/cars",
      "Funnels",
      "Scoops",
      "Sponges",
      "Towels",
    ],
    learningGoals: [
      "Sensory regulation",
      "Requesting",
      "Imitation",
      "Motor planning",
      "Communication",
    ],
    lesson: {
      setup:
        "Gather cups, bowls, spray bottles, toy animals or cars, funnels, scoops, sponges, and towels. Set up either outside or indoors on towels, and let Levi choose which tools he wants to use.",
      duringPlay:
        "Rather than directing heavily, follow his lead and narrate: \"You're pouring!\" \"Big splash!\" \"The car needs a bath!\" Natural support for sensory regulation, requesting, imitation, engagement, and motor planning.",
      ifLosingInterest:
        "Add movement: spraying targets, sponge-toss games, running water relay games, or washing large outdoor toys.",
      wrappingUp:
        "Have Levi help dry surfaces and put materials away.",
    },
  },
  {
    id: "kinetic-sand",
    slug: "kinetic-sand",
    title: "Kinetic Sand",
    category: "sensory",
    emoji: "🏖️",
    summary:
      "Squish, slice, pour, mold. Great for fine motor and turn-taking.",
    miniSteps: [
      "Stir, pour, build, slice",
      "Hide objects, request tools",
      "Practice turn-taking",
    ],
    estimatedMinutes: [10, 25],
    materials: ["Kinetic sand", "Plastic knife or scoops", "Molds or cookie cutters", "Small hidden objects"],
    learningGoals: ["Fine motor", "Requesting", "Sensory regulation", "Imitation"],
  },
  {
    id: "sensory-bins",
    slug: "sensory-bins",
    title: "Sensory Bins",
    category: "sensory",
    emoji: "🫘",
    summary:
      "A big bin of pasta or rice with treasures hidden inside.",
    miniSteps: [
      "Pasta, beans, rice, pom poms",
      "Hide animals, letters",
      "Scoop and pour",
    ],
    estimatedMinutes: [10, 25],
    materials: [
      "A large bin",
      "Filler (pasta, rice, beans, pom poms)",
      "Hidden treasures (toy animals, letters, cars, puzzle pieces, pretend food)",
      "Scoops or tongs",
    ],
    learningGoals: [
      "Requesting",
      "Sensory regulation",
      "Engagement",
      "Fine motor practice",
      "Following directions",
      "AAC use",
    ],
    lesson: {
      setup:
        "Fill a large bin with a sensory material — pasta in the garage works great — and hide preferred items inside: toy animals, letters, cars, puzzle pieces, pretend food. Before starting, let Levi choose what to hide and which scoops or tools to use.",
      duringPlay:
        "Narrate naturally: \"You found the lion!\" \"Dig deep!\" \"Should we scoop or pour?\" Creates natural opportunities for requesting, sensory regulation, engagement, fine motor practice, following directions, and AAC use.",
      ifLosingInterest:
        "If he's overstimulated, simplify the activity and reduce demands. If he's under-engaged, add movement or silly pretend elements — \"The dinosaur is trapped!\"",
      wrappingUp:
        "Have Levi help pour the filler back into its container and put the toys away.",
      closingNote: "The goal is shared engagement and sensory exploration, not compliance.",
    },
  },
  {
    id: "bubble-play",
    slug: "bubble-play",
    title: "Bubble Play",
    category: "sensory",
    emoji: "🫧",
    summary:
      "Bubble machine on, AAC ready. He can ask for 'more', 'pop', or 'again' on repeat.",
    miniSteps: [
      "Bubble machine, pop bubbles",
      "Big vs small",
      "Request 'more'",
    ],
    estimatedMinutes: [5, 15],
    materials: ["Bubble solution and wand", "Bubble machine (optional)"],
    learningGoals: ["Requesting", "AAC use", "Joint attention"],
  },

  // ===== STRUCTURED TABLE =====
  {
    id: "puzzles",
    slug: "puzzles",
    title: "Puzzles",
    category: "structured-table",
    emoji: "🧩",
    summary:
      "Wooden, interlocking, or shape puzzles. Targets persistence, attention, and fine motor.",
    miniSteps: [
      "Wooden, interlocking, matching, sound puzzles",
      "Target attention, fine motor",
    ],
    estimatedMinutes: [5, 15],
    materials: ["A puzzle (wooden, interlocking, or matching)"],
    learningGoals: ["Fine motor", "Persistence", "Following directions", "Visual scanning"],
  },
  {
    id: "board-games",
    slug: "board-games",
    title: "Board Games",
    category: "structured-table",
    emoji: "🎲",
    summary:
      "Levi's favorites: Candyland, Zingo, Connect 4, Alphabet Bingo, Pop the Pig, Sneaky Snacky Squirrel, Hi-Ho Cherry-O, Don't Break the Ice.",
    miniSteps: [
      "Favorites: Candyland, Zingo, Connect 4, Alphabet Bingo, Pop the Pig, Sneaky Snacky, Hi-Ho Cherry-O, Don't Break the Ice",
    ],
    estimatedMinutes: [10, 25],
    materials: ["A board game from his favorites"],
    learningGoals: ["Turn taking", "Following directions", "Waiting", "Matching", "Joint attention"],
  },
  {
    id: "matching-sorting",
    slug: "matching-sorting",
    title: "Matching & Sorting",
    category: "structured-table",
    emoji: "🔵",
    summary:
      "Sort by color, animal, size, letters, or household items.",
    miniSteps: [
      "Sort by color, animal, size, letters, household items",
    ],
    estimatedMinutes: [5, 15],
    materials: ["Items to sort (animals, colored blocks, magnetic letters, etc.)"],
    learningGoals: ["Categorization", "Following directions", "Visual scanning", "Fine motor"],
  },
  {
    id: "stickers-crafts",
    slug: "stickers-crafts",
    title: "Sticker & Craft Activities",
    category: "structured-table",
    emoji: "🎨",
    summary:
      "Stickers, dot markers, paper plate animals. Focus on process, not outcome.",
    miniSteps: [
      "Sticker scenes, dot markers",
      "Peel and place",
      "Paper plate animals, gluing",
      "Sponge painting",
      "Stamps and paint — process over product",
    ],
    estimatedMinutes: [10, 25],
    materials: ["Stickers", "Markers", "Glue stick", "Paper plates", "Construction paper", "Stamps + ink"],
    learningGoals: ["Fine motor", "Following directions", "Choice making", "Engagement"],
  },

  // ===== COMMUNICATION =====
  {
    id: "choice-time",
    slug: "choice-time",
    title: "Choice Time",
    category: "communication",
    emoji: "👉",
    summary:
      "Offer 2–3 choices throughout the day: snacks, toys, songs, books, movement.",
    miniSteps: [
      "Offer 2–3 choices: snacks, toys, songs, books, movement",
      "Encourage pointing, AAC, gaze, gestures",
    ],
    estimatedMinutes: [5, 15],
    materials: ["Two preferred items (held up at once) or the choices app on the iPad"],
    learningGoals: ["AAC use", "Requesting", "Choice making", "Joint attention"],
  },
  {
    id: "snack-helper",
    slug: "snack-helper",
    title: "Snack Helper",
    category: "communication",
    emoji: "🍎",
    summary:
      "Levi helps open containers, pour drinks, wipe the table, throw away trash. So many natural openings.",
    miniSteps: [
      "Open containers, pour drinks",
      "Wipe table, throw away trash",
      "Great natural communication opportunities",
    ],
    estimatedMinutes: [10, 20],
    materials: ["A snack and drink", "A small cloth or paper towel"],
    learningGoals: ["Requesting", "Following directions", "Functional skills", "Imitation"],
  },
  {
    id: "song-fill-ins",
    slug: "song-fill-ins",
    title: "Song Fill-ins",
    category: "communication",
    emoji: "🎵",
    summary:
      "Pause during favorite songs (Old MacDonald, Wheels on the Bus, If You're Happy) and wait for his fill-in.",
    miniSteps: [
      "Pause during favorite songs (Old MacDonald, Wheels on the Bus, If You're Happy)",
      "Wait expectantly for participation",
    ],
    estimatedMinutes: [5, 15],
    learningGoals: ["Anticipation", "AAC use", "Vocal imitation", "Joint attention"],
  },

  // ===== OUTDOOR =====
  {
    id: "parks",
    slug: "parks",
    title: "Parks",
    category: "outdoor",
    emoji: "🛝",
    summary:
      "Swing, slide, climb. Practice safe walking, waiting at transitions, and social observation.",
    miniSteps: [
      "Practice safe walking",
      "Waiting, transitions, social observation",
    ],
    estimatedMinutes: [20, 60],
    learningGoals: ["Motor planning", "Waiting", "Joint attention", "Following directions"],
  },
  {
    id: "nature-walks",
    slug: "nature-walks",
    title: "Nature Walks",
    category: "outdoor",
    emoji: "🍂",
    summary:
      "Bring a basket on a walk and collect leaves, flowers, rocks, sticks together.",
    miniSteps: [
      "Collect leaves, rocks, flowers",
      "Make a simple collage after",
    ],
    estimatedMinutes: [20, 45],
    materials: ["A small basket or bag", "(Optional) a simple visual list of things to find"],
    learningGoals: ["Joint attention", "Communication", "Flexibility", "Gross motor"],
    lesson: {
      setup:
        "Bring a small basket or bag on a walk and make a very simple visual list of things to find: leaves, flowers, rocks, sticks, birds. Don't make it overly structured — focus on exploration and shared attention.",
      duringPlay:
        "As Levi finds things, narrate naturally: \"You found a big leaf!\" \"Should we collect the rock?\" If he's more interested in movement than collecting, shift the activity: running to objects, climbing, jumping over sticks, racing leaves.",
      ifLosingInterest:
        "Lean into whatever's motivating him. Sometimes the goal becomes just running and feeling the wind, and that's a great walk.",
      wrappingUp:
        "Bring the collected items home and arrange them on the table or make a quick collage.",
      closingNote:
        "The goal is engagement with the environment while naturally creating opportunities for communication, flexibility, and shared enjoyment.",
    },
  },
  {
    id: "chalk-fun",
    slug: "chalk-fun",
    title: "Chalk Fun",
    category: "outdoor",
    emoji: "🖍️",
    summary:
      "Trace, draw shapes, hopscotch. Great for regulation, motor planning, and writing practice.",
    miniSteps: [
      "Trace, draw shapes, hopscotch",
      "Motor planning and writing",
    ],
    estimatedMinutes: [15, 30],
    materials: ["Sidewalk chalk"],
    learningGoals: ["Fine motor", "Pre-writing", "Following directions", "Joint attention"],
  },
  {
    id: "bike-scooter",
    slug: "bike-scooter",
    title: "Bike / Scooter Time",
    category: "outdoor",
    emoji: "🚲",
    summary:
      "Get him moving on the bike or scooter — fantastic for regulation and motor planning.",
    miniSteps: [
      "Motor planning, safety practice",
    ],
    estimatedMinutes: [15, 45],
    materials: ["His bike or scooter", "Helmet"],
    learningGoals: ["Gross motor", "Regulation", "Motor planning", "Following directions"],
  },
  {
    id: "picnic",
    slug: "picnic",
    title: "Picnic at the Park",
    category: "outdoor",
    emoji: "🧺",
    summary:
      "Pack snacks together, find a spot, eat outside. Built-in opportunities for sequencing and choice.",
    miniSteps: [
      "Practice sitting, eating, waiting",
      "Functional communication",
    ],
    estimatedMinutes: [30, 60],
    materials: ["A picnic blanket", "Snacks", "Drinks"],
    learningGoals: ["Functional communication", "Waiting", "Requesting", "Joint attention"],
  },

  // ===== FUNCTIONAL =====
  {
    id: "laundry-helper",
    slug: "laundry-helper",
    title: "Laundry Helper",
    category: "functional",
    emoji: "🧺",
    summary:
      "Match socks, transfer clothes, push the laundry basket. Real chores as play.",
    miniSteps: [
      "Match socks, transfer clothes, push laundry basket",
    ],
    estimatedMinutes: [10, 25],
    learningGoals: ["Functional skills", "Following directions", "Matching", "Fine motor"],
  },
  {
    id: "cooking-helper",
    slug: "cooking-helper",
    title: "Cooking Helper",
    category: "functional",
    emoji: "👨‍🍳",
    summary:
      "Stir, pour, spread toppings, make sandwiches, choose a snack.",
    miniSteps: [
      "Stir, pour, spread toppings",
      "Make sandwiches",
      "Choose a snack",
    ],
    estimatedMinutes: [15, 30],
    learningGoals: ["Functional skills", "Sequencing", "Following directions", "Choice making"],
  },
  {
    id: "cleaning-games",
    slug: "cleaning-games",
    title: "Cleaning Games",
    category: "functional",
    emoji: "🧽",
    summary:
      "Wipe, spray and wipe, toy-clean-up races. Real cleaning, dressed up as play.",
    miniSteps: [
      "Spray and wipe table",
      "Toy clean-up races",
      "Vacuum together",
    ],
    estimatedMinutes: [10, 20],
    materials: ["Spray bottle with water", "Cloth", "Small broom"],
    learningGoals: ["Functional skills", "Following directions", "Motor planning"],
  },
  {
    id: "dressing-practice",
    slug: "dressing-practice",
    title: "Dressing Practice Through Play",
    category: "functional",
    emoji: "👕",
    summary:
      "Dress dolls or stuffed animals, then 'practice' on yourself. Lots of fine motor.",
    miniSteps: [
      "Dress dolls/stuffed animals",
      "Practice buttons, zippers, snaps",
    ],
    estimatedMinutes: [10, 20],
    materials: ["Dolls or stuffed animals with clothes", "Buttons/zippers practice board (optional)"],
    learningGoals: ["Fine motor", "Self-care", "Following directions", "Sequencing"],
  },

  // ===== REGULATION =====
  {
    id: "cozy-corner",
    slug: "cozy-corner",
    title: "Cozy Corner Time",
    category: "regulation",
    emoji: "🛋️",
    summary:
      "Weighted blanket, soft toys, dim lights. For when he needs to come down a notch.",
    miniSteps: [
      "Weighted blanket, soft toys",
      "Dim lights, calm music",
    ],
    estimatedMinutes: [5, 20],
    materials: ["Weighted blanket", "Soft toys", "Dim or warm lighting"],
    learningGoals: ["Regulation", "Self-soothing", "Body awareness"],
  },
  {
    id: "read-aloud-time",
    slug: "read-aloud-time",
    title: "Read-Aloud Time",
    category: "regulation",
    emoji: "📚",
    summary:
      "A few favorite books with predictable patterns. Repetition is a feature, not a bug.",
    miniSteps: [
      "Books with repetition",
      "Interactive lift-the-flap, sounds, predictable stories",
    ],
    estimatedMinutes: [10, 20],
    materials: ["A few favorite picture books"],
    learningGoals: ["Joint attention", "Vocabulary", "Anticipation", "AAC use"],
  },
  {
    id: "deep-pressure-massage",
    slug: "deep-pressure-massage",
    title: "Deep Pressure & Massage",
    category: "regulation",
    emoji: "💆",
    summary:
      "Bear hugs, blanket burritos, pillow squishes, lotion hands and feet after a bath. Calming.",
    miniSteps: [
      "Bear hugs, blanket burritos",
      "Pillow squishes",
      "Lotion hands/feet after bath",
    ],
    estimatedMinutes: [5, 15],
    materials: ["A soft blanket", "Lotion (optional)"],
    learningGoals: ["Regulation", "Body awareness", "Connection"],
  },

  // ===== SPECIAL =====
  {
    id: "indoor-fort-day",
    slug: "indoor-fort-day",
    title: "Indoor Fort Day",
    category: "special",
    emoji: "🏕️",
    summary:
      "Build a fort and live inside it for the afternoon — books, snacks, pretend camping.",
    miniSteps: [
      "Flashlights, books, snacks",
      "Pretend camping inside the fort",
    ],
    estimatedMinutes: [30, 90],
    materials: ["Blankets, chairs, cushions", "Books, flashlights, snacks"],
    learningGoals: ["Imaginative play", "Joint attention", "Communication"],
  },
  {
    id: "pajama-dance-party",
    slug: "pajama-dance-party",
    title: "Pajama Dance Party",
    category: "special",
    emoji: "🩷",
    summary:
      "PJs on, lights low, glow sticks out. Best 15 minutes of his week.",
    miniSteps: [
      "Glow sticks, bubbles, music",
    ],
    estimatedMinutes: [10, 20],
    materials: ["Glow sticks", "Bubbles", "Speaker/phone with music"],
    learningGoals: ["Joint attention", "Imitation", "Regulation through movement"],
  },
  {
    id: "treasure-hunt",
    slug: "treasure-hunt",
    title: "Treasure Hunt",
    category: "special",
    emoji: "🗺️",
    summary:
      "A high-stakes scavenger hunt with a prize at the end. Hide small toys around the house.",
    miniSteps: [
      "Hide favorite small toys around the house",
    ],
    estimatedMinutes: [15, 30],
    materials: ["Small preferred items to hide", "A treasure container"],
    learningGoals: ["Visual scanning", "Following directions", "Motor movement"],
  },
  {
    id: "toy-rotation-surprise",
    slug: "toy-rotation-surprise",
    title: "Toy Rotation Surprise Bin",
    category: "special",
    emoji: "🎁",
    summary:
      "Bring out hidden toys for a 'new toy day'. Re-engagement on a budget.",
    miniSteps: [
      "Bring out hidden toys for a 'new toy day'",
    ],
    estimatedMinutes: [15, 30],
    learningGoals: ["Engagement", "Choice making", "Joint attention"],
  },
];

export function getActivity(slug: string): Activity | undefined {
  return ACTIVITIES.find((a) => a.slug === slug);
}

export function getActivityById(id: string): Activity | undefined {
  return ACTIVITIES.find((a) => a.id === id);
}
