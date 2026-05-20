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
    lesson: {
      setup:
        "Gather pretend food, plates, cups, and a small notepad if you have one — real snacks work great if those will hold his interest. Decide together what Levi wants to be: chef, waiter, or customer, by holding up two pictures or using the choices app. Make a simple paper menu together with him pointing to two or three foods he wants to include, and decorate it with stickers or markers.",
      duringPlay:
        "Set the table, then act out the scene with exaggerated energy: \"Welcome! Table for one?\" \"What can I get for you today?\" Use repetitive phrases he can fill in or echo: \"more please,\" \"all done,\" \"thank you!\" If Levi is the customer, pause and wait for him to point, look, or use AAC to order. If he's the waiter, model handing the food over: \"Here's your pizza, sir!\" Be a little dramatic with the food — blow on it because it's hot, sniff it, react big to a \"delicious\" first bite. The hammed-up reactions are what keep the scene alive.",
      ifLosingInterest:
        "Pivot the menu. Switch from food to \"silly soup\" with toys floating in it, or pretend a teddy bear walked in and wants to order. Adding an animal customer he can carry around usually pulls him back into the play.",
      wrappingUp:
        "Have him help clear the table, put food back into bins, and wipe the counter — lots of natural one- and two-step directions in context.",
      closingNote:
        "Use real snacks when you can. If he asks for more and gets a real bite, the requesting becomes meaningful immediately.",
    },
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
    lesson: {
      setup:
        "Build a quick circuit using cushions, pillows, a hula hoop, and painter's tape if you have it. Three or four stations is plenty — crawl through the tunnel, jump on the pillow, balance along the tape line, then back to start. Let Levi help pick the stations by holding up two pictures or two cushions and asking, \"Which one next?\"",
      duringPlay:
        "Demo the course yourself first, exaggerating each motion: \"I'm crawling… now I'm JUMPING!\" Then it's his turn. Cheer big at each station. If he wants to do it ten times in a row, let him — repetition builds confidence and motor planning. Add a stuffed animal at the end of the course as the \"finish line\" and have him pick it up. Lots of opportunities for following directions, imitation, and waiting his turn if you're going through it together.",
      ifLosingInterest:
        "Add narration. \"Oh no, lava on the floor — jump!\" \"Can you save the bunny at the end?\" If he wants to break the course apart and pile it up, that's also great gross motor and gives you something to rebuild.",
      wrappingUp:
        "Carrying cushions back to the couch is part of the activity — \"Levi, put the pillow on the chair, please.\"",
    },
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
    lesson: {
      setup:
        "Cue up 3-4 of his favorite songs in a playlist on your phone or speaker. Bluey, Cocomelon, Disney, Bruno Mars — whatever he lights up for. Dim the lights or add lamps to set the mood if you want to make it extra fun.",
      duringPlay:
        "Start dancing — be the silliest version of yourself. Big arms, big stomps, dramatic spins. He will mostly watch and copy. Every couple of verses, pause the music for a beat and wait expectantly — most kids will lean in, vocalize, or hit play themselves. That little pause is one of the best communication opportunities you'll get all day. Try freeze dance: when the music stops, everyone freezes. Try slow-then-fast or low-then-high movements he can imitate.",
      ifLosingInterest:
        "Switch the song. Or pull out an extra prop — scarves to wave, a balloon to bat around, glow sticks if it's getting dim. Try mirroring his movements back to him exactly; sometimes that lights him up.",
      wrappingUp:
        "Put on a slower song to wind down, then put the speaker or phone away together.",
    },
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
    lesson: {
      setup:
        "Blow up 2-3 balloons (different colors if you have them) and grab the bubble wand or machine. A clear floor space is all you need.",
      duringPlay:
        "Bat the balloon back and forth, narrating every contact: \"You got it!\" \"Up high!\" Pause and hold the balloon, waiting for him to reach, gesture, or use AAC to say \"more.\" For bubbles, freeze the wand right before blowing and wait for the request — eye contact, a reach, a vocalization — anything counts. Vary the bubble size: \"Big one!\" \"Tiny ones!\" Catch a bubble on the wand and let him pop it gently. The pause-and-wait is the whole game.",
      ifLosingInterest:
        "Change the rules. Balloon volleyball over the couch, balloon between your knees, who can keep it up the longest. With bubbles, let him try to blow them (great oral-motor exercise) or pop with his elbow, his nose, his toe.",
      wrappingUp:
        "Pick up popped balloon pieces together. Bubbles dry on their own.",
    },
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
    lesson: {
      setup:
        "Roll out a yoga mat or use a rug. Cosmic Kids Yoga on YouTube is fantastic and themed around animals and stories he'll find familiar. Dim lights and calming music if he needs to come down a notch.",
      duringPlay:
        "Start with simple, animal-themed poses: downward dog (\"woof!\"), butterfly (open and close your knees), cat/cow (arch and round your back, \"meow,\" \"moo\"), tree pose, child's pose for a rest. Demonstrate each pose with big body language and let him imitate — even if it's just a partial version. Hold each pose only as long as he stays engaged, which might be a few seconds, and that's totally fine. Slow, deep breaths are gold here — try breathing in as you grow tall, out as you fold forward.",
      ifLosingInterest:
        "Switch to wilder animal poses — frog hops, snake on the floor, bear walk. Movement keeps it interesting.",
      wrappingUp:
        "End in child's pose or savasana for a minute with a gentle hand on his back. Roll up the mat together.",
    },
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
    lesson: {
      setup:
        "Put kinetic sand in a shallow bin or on a tray to keep it contained. Pull out cookie cutters, plastic knives, small scoops, and a few small toys to hide — animals, letters, cars. Let Levi pick which tools and which hidden items to use by holding up two at a time.",
      duringPlay:
        "Start by just letting him squish and explore. Narrate naturally: \"You're squeezing it!\" \"Look, it falls apart!\" Then introduce a little play: hide a lion and ask \"Where's the lion?\" Help him use a scoop or his hands to dig. Make sand pancakes with the cookie cutters. Practice cutting with a plastic knife. The texture and tools give you many opportunities to model requests — \"more sand,\" \"my turn,\" \"the cutter, please.\"",
      ifLosingInterest:
        "Add water in a separate cup to make the sand stickier (only if you have time for cleanup). Or take the sand outside and use it more freely in a bigger space.",
      wrappingUp:
        "Scrape the sand back into its container together and wipe the tray. Cleaning up is part of the game.",
    },
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
    lesson: {
      setup:
        "Bring out a bubble machine if you have one (best for indoor fun), or just a wand and solution outdoors. Make sure his AAC is within reach — this is one of the best moments for requesting practice.",
      duringPlay:
        "Turn the machine on or blow a stream of bubbles, then pause. Wait. Don't fill the silence — just hold the wand still and look at him with eyebrows up. He'll reach, vocalize, point to \"more\" on the AAC, or grab your arm — any of those count as a request, and you respond with more bubbles. Vary it up: \"big one!\" \"tiny ones!\" Catch a bubble on the wand and let him pop it. Pop them on different body parts: \"On your nose!\" \"On your foot!\"",
      ifLosingInterest:
        "Let him try to blow them himself (great for oral motor strength). Or do a bubble-chase around the room.",
      wrappingUp:
        "Put the wand back in the bottle and wipe up wet spots. Sticky floors are no joke.",
    },
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
    lesson: {
      setup:
        "Pick a puzzle that's slightly easier than his ceiling — wooden chunky puzzles, shape sorters, or 6-12 piece floor puzzles are great. Lay out the pieces face-up. Limit it to one puzzle at a time so the table doesn't feel overwhelming.",
      duringPlay:
        "Let him explore the pieces first. Hand him one and model: \"This one is the horse. Where does the horse go?\" Pause and let him try. If he gets stuck, point to the spot or rotate the piece slightly. Don't grab the piece from him — wait and offer hints. Celebrate every fit, even with help. For shape sorters, name the shape and color as you go: \"Red triangle goes in… here!\"",
      ifLosingInterest:
        "Hide one or two pieces around the room and turn it into a tiny scavenger hunt. Or make silly sounds when each piece fits — kazoo noises, woohoos. Pulling out a totally new puzzle sometimes resets his attention.",
      wrappingUp:
        "Put the pieces back in the box or shape sorter together. Closing the box becomes a satisfying \"all done!\" moment.",
    },
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
    lesson: {
      setup:
        "Pick one of Levi's favorites: Candyland, Zingo, Connect 4, Alphabet Bingo, Pop the Pig, Sneaky Snacky Squirrel, Hi-Ho Cherry-O, or Don't Break the Ice. Set it up on the floor or at a low table where you can sit across from each other. If he's not into rules, simplify or skip them entirely — the social interaction is the point.",
      duringPlay:
        "Model turn-taking in an exaggerated way: \"My turn… your turn!\" Use clear hand gestures and pause for him to do something on his turn, even if it's just touching a piece. Narrate everything: colors, shapes, numbers, what's happening. If he's into Pop the Pig, count the burgers together. If he gets stuck on one part of the game (like just spinning the spinner over and over), let him — that's where the joy is.",
      ifLosingInterest:
        "Reduce the demand: just do colors, or just take turns hitting Pop the Pig. Or change the game entirely. Don't force completion — finishing isn't the goal.",
      wrappingUp:
        "Put the pieces back in the box together. \"Where do the cards go?\" \"Can you find the lid?\"",
    },
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
    lesson: {
      setup:
        "Grab a sorting activity that fits where Levi is working: socks by pairs, blocks by color, animals by habitat (zoo vs farm), big vs small. Put everything in one pile and place 2-3 sorting bins or piles nearby.",
      duringPlay:
        "Start a sort yourself, narrating: \"This one is red. It goes here!\" Then hand him an item and ask, \"Where does this one go?\" Wait. If he hesitates, gesture toward the right bin without putting it in. Big celebration when he matches, even if it's hit-or-miss. Mix in some silly mistakes on your own turn — \"This banana goes with the cars!\" — and look puzzled. See if he reacts.",
      ifLosingInterest:
        "Change what you're sorting (switch from color to shape). Or turn it into a game: race to see who can sort their pile fastest. Add a stuffed animal as the \"judge.\"",
      wrappingUp:
        "Combine the piles back into the original container together.",
    },
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
    lesson: {
      setup:
        "Set out one or two craft activities at a time — too many options can be overwhelming. Stickers + colored paper is always a hit. Dot markers, paper plates, stamps, and washable glue sticks are great low-mess options. Cover the surface with newspaper or a craft mat if you're worried about marks.",
      duringPlay:
        "Don't try to make a specific picture — focus on the process. Hand him a sticker and let him peel it (great fine motor) and stick it wherever he wants. With dot markers, model big dots, then a little dot, then dots in a row. Narrate colors, count the dots, name what he's making (even if it's a scribble — \"You made a sun!\"). Resist the urge to direct or correct. Let him do it his way.",
      ifLosingInterest:
        "Switch the medium — markers to stamps, stickers to glue stick. Or let him stick stickers on YOU, your shirt, your face. Big reactions help.",
      wrappingUp:
        "Hang his creation somewhere visible — fridge, his bedroom — so he sees it's valued. Cleanup with a damp cloth he can use himself.",
    },
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
    lesson: {
      setup:
        "Choice Time isn't really a dedicated activity — it's a habit you weave into the whole day. The setup is just keeping the AAC or a choices app within reach during meals, before transitions, and any moment Levi might want to express a preference.",
      duringPlay:
        "At least a few times each hour, present Levi with two options. Hold up two snacks: \"Apple, or cracker?\" Two songs: \"Old MacDonald, or Wheels on the Bus?\" Two activities: \"Bubbles, or coloring?\" Wait for him to point, look, reach, vocalize, or tap the AAC. Whichever option he picks, narrate the choice — \"You picked the apple!\" — and follow through. The whole point is that his choice MATTERS, so always honor it (even when both options were genuinely fine with you).",
      ifLosingInterest:
        "If he ignores both options, try a smaller decision (just one of two colors of marker), or wait a beat and try again later. Choices fail when he doesn't actually care about either option — pick things that are meaningfully different to him.",
      wrappingUp:
        "There's no real wrap-up — Choice Time keeps happening all day.",
      closingNote:
        "You'll know it's working when he starts initiating choices without prompting — leading you to a snack, handing you a book, pointing at the iPad. That's the milestone we're building toward.",
    },
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
    lesson: {
      setup:
        "Pick a snack that requires a few small steps to prepare — peeling a banana, opening a yogurt, scooping crackers from a bag into a bowl. Set out the materials in front of you both.",
      duringPlay:
        "Let Levi do as much as he can. Hand him the closed yogurt and wait for him to ask for help by reaching, vocalizing, or tapping AAC. Open it just a little and let him peel the rest of the foil. Scooping crackers: hand him the scoop, then back off. Pouring his drink: let him try, even if some spills. Narrate each step naturally: \"You're opening it!\" \"Pour, pour, pour…\" Wait for \"more\" before refilling.",
      ifLosingInterest:
        "If he's hungry, just feed him — don't force the prep play. If he's not hungry, this won't go well. Best time is right before snack or meal.",
      wrappingUp:
        "Have him bring his bowl and cup to the sink — \"Levi, put this in the sink please.\" Wiping up his own crumbs with a damp cloth is also a great habit.",
    },
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
    lesson: {
      setup:
        "Pull up 2-3 of his favorite songs with predictable, repetitive parts: Old MacDonald, Wheels on the Bus, The Itsy Bitsy Spider, If You're Happy and You Know It, Twinkle Twinkle. You can sing them yourself or play them and pause.",
      duringPlay:
        "Sing the song, then right before a key word, pause and look at him expectantly. \"Old MacDonald had a ___\" (pause). Even if he doesn't fill in the word, he might vocalize, reach for you, smile, or look at the iPad — all forms of participation. Pair the song with motions when you can: spider crawling fingers up his arm, wheels on the bus rolling arms. The motions give him an opportunity to imitate without needing to vocalize.",
      ifLosingInterest:
        "Switch the song. Or let him pick the next one from two choices.",
      wrappingUp:
        "A natural place to end is right after a song he loves, while he's still happy.",
      closingNote:
        "If he ever does fill in a word or a sound, even a partial one, react like he just won a Grammy. The next time he'll be more likely to try.",
    },
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
    lesson: {
      setup:
        "Bring water, a snack, and his favorite stuffed animal or comfort item. Choose a park that's not too overwhelming — if he's having a high-arousal day, skip the crowded playground.",
      duringPlay:
        "Let him lead. Some days will be all swings, some days he'll be doing laps around the play structure, some days he'll just want to sit on a bench. All are great. As he moves around, narrate: \"You're climbing high!\" \"Whoa, fast slide!\" Practice waiting at the slide if there are other kids — model lining up. Watch for moments of social observation — when he looks at another kid, narrate it: \"That girl is climbing too!\"",
      ifLosingInterest:
        "Try a different piece of equipment. Pull out the comfort toy. If he's done, he's done — don't push it. A short positive visit beats a long meltdown.",
      wrappingUp:
        "Use a transition warning: \"Two more swings, then we go.\" Carry him to the car if needed, or hold his hand and walk. Snack in the car is a nice way to end.",
    },
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
    lesson: {
      setup:
        "Bring a bucket of sidewalk chalk outside. A driveway, sidewalk, or patio works great. Bring a damp cloth or hose if you want to be able to erase.",
      duringPlay:
        "Let him scribble freely first. Then model some simple things: a big circle, a smiley face, his name (\"L… E… V… I!\"). Trace his foot or hand on the ground. Draw a hopscotch path and jump through it together. Try a tic-tac-toe grid. Practice writing letters together by tracing big shapes — \"Make an O! Now an L!\" The big motor movement of drawing on the ground is great regulation.",
      ifLosingInterest:
        "Make a chalk obstacle course — circles to jump in, lines to walk on. Or hide letters around the driveway and ask him to find a specific one.",
      wrappingUp:
        "Wash the chalk off with the hose or a water bottle together — usually his favorite part.",
    },
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
    lesson: {
      setup:
        "Helmet first — make it a non-negotiable, gentle ritual. Pick a safe spot: empty driveway, quiet sidewalk, or a wide path at the park.",
      duringPlay:
        "Let him ride freely first. If he's still learning, help with balance, foot placement, or pushing off. Narrate the experience: \"You're going SO fast!\" \"Steer left!\" Set up little goals — ride to that tree and back, ride to the mailbox, race a stuffed animal you're carrying. Practice stopping at corners or specific spots — great for following directions.",
      ifLosingInterest:
        "Add a goal he cares about — riding to find a treat you've stashed somewhere. Or switch to walking the bike/scooter for a bit and try again later.",
      wrappingUp:
        "Park the bike in its spot together. Helmet off as the final step makes the routine clear.",
    },
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
    lesson: {
      setup:
        "Pack together if you can — let him help choose snacks, fill water bottles, grab the blanket. Bring AAC and a comfort toy. Pack 2-3 snack options so he has choices once you're there.",
      duringPlay:
        "Spread the blanket together. Sit and eat slowly. Use the picnic as a long, low-key opportunity for choice making and requesting — \"Apple or cracker?\" \"More water?\" Point out things in the environment: birds, dogs, kids, leaves blowing. Let him climb on the blanket, lie down, eat in his own way. If he wants to move around, follow him.",
      ifLosingInterest:
        "Picnics are usually a quick activity for him — 15-20 minutes is plenty. Once he's done eating, transition to the playground or a walk.",
      wrappingUp:
        "Have him help pack up — putting trash in the bag, folding the blanket (badly is fine), carrying snacks back to the car.",
    },
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
    lesson: {
      setup:
        "Bring the laundry basket to wherever Levi is, ideally somewhere with floor space. Sort options: socks for matching, shirts vs pants, towels vs clothes. Keep the task simple — pick one sort.",
      duringPlay:
        "Dump the clean clothes in a pile and demo: \"This is a sock. Where's its partner?\" Hand him a sock and let him hunt for the match. Big celebration when he finds it. Other variations: hand him each item and ask him to drop it in the right basket. Have him push the basket from room to room. Practice carrying his own folded clothes to his drawer.",
      ifLosingInterest:
        "Make it physical — race to find the next sock, throw socks into a basket like basketball, hide a few in his shirt and \"find\" them later. The chore disappears when it gets silly.",
      wrappingUp:
        "Have him deliver one finished pile to its destination — his drawer, the closet — for a satisfying \"all done.\"",
    },
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
    lesson: {
      setup:
        "Pick a recipe with 2-3 steps Levi can genuinely help with: stirring pancake batter, spreading peanut butter, pressing buttons on the blender, placing toppings on a pizza. Set up a low surface he can reach. Apron optional, but he'll feel important.",
      duringPlay:
        "Walk through each step with him. Hand him the spoon and let him stir. Cover his hand with yours to spread butter on bread. Let him press the button on the blender (very motivating). Let him put the toppings on the pizza in whatever pattern he wants. Narrate the sensory experience — \"That's STICKY!\" \"Smell the cinnamon!\" — and the steps — \"Now we mix… now we taste!\"",
      ifLosingInterest:
        "Let him just eat the ingredients if he wants — chocolate chips, blueberries, a spoonful of peanut butter. The eating is the real motivation, and that's okay.",
      wrappingUp:
        "He helps clean up — wiping the counter with a damp cloth, putting the bowl in the sink. Then you eat what you made together.",
    },
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
    lesson: {
      setup:
        "Pick a small area — the play room floor, the kitchen table, the bathroom counter. Bring a spray bottle of water, a cloth, and a small broom or dustpan.",
      duringPlay:
        "Make it a race or a game. \"Toy pickup challenge! Can you put all the cars in the basket before this song ends?\" Spray the table once and let him wipe it with the cloth — he'll love the spray bottle. Sweep crumbs into the dustpan together. Sing a cleanup song while you do it. Narrate the difference: \"Look how clean!\" Show him the dirty cloth, then the clean spot.",
      ifLosingInterest:
        "Switch areas. Or add a stuffed animal that needs help \"cleaning its room.\"",
      wrappingUp:
        "Show him the before-and-after by walking through the space. Celebrate the result big.",
    },
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
    lesson: {
      setup:
        "Grab 2-3 dolls or stuffed animals and a small pile of clothing they can wear — doll clothes, baby clothes that fit a teddy bear, or scarves and hats. A buttons-and-zippers practice board (if you have one) is great too.",
      duringPlay:
        "\"Oh no, the bear is cold! Let's put on his sweater.\" Hand the sweater to Levi and help him pull it over the bear's head. Practice each fastener: zipping the zipper, snapping the snap, buttoning a button. After the doll is dressed, switch to Levi: \"Now your turn — can you put on this hat?\" Practice pulling shirts off and on, zipping his own jacket. Keep it playful: take silly photos, parade the dressed-up animals around.",
      ifLosingInterest:
        "Put the clothes on YOU instead — doll shoes on your fingers, a hat on the dog. The absurdity often re-engages him.",
      wrappingUp:
        "Put the dolls to bed in their new outfits, or hang the clothes back up together.",
    },
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
    lesson: {
      setup:
        "Pick a soft, low-stimulation spot — corner of the playroom, his bed, a tent or fort, the cozy couch. Bring his weighted blanket, a couple of favorite stuffed animals, and maybe a soft toy or sensory object. Dim the lights. Optional: soft music or white noise.",
      duringPlay:
        "This isn't really an activity — it's a recovery space. Sit with him quietly. Offer to read a book if he wants one. Offer a deep-pressure hug. Don't fill the silence with talk. Just be there. If he wants to lie under the blanket, let him. If he wants to rock, rock with him. Notice when his breathing slows or his body softens — that's the goal.",
      ifLosingInterest:
        "If he's already regulated and wanting to move, the Cozy Corner has done its job. Transition out gently.",
      wrappingUp:
        "When he's ready, transition slowly. Talk softly. Move slowly. Pick the next activity to be a low-key one.",
      closingNote:
        "The Cozy Corner is most powerful BEFORE he's dysregulated, not just after. Try going there preemptively when you sense the day is getting big.",
    },
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
    lesson: {
      setup:
        "Pick 2-3 of his favorite picture books — repetition is great, not boring. Find a comfortable spot where you can sit close together — couch, bed, floor with cushions.",
      duringPlay:
        "Let him pick the book. Read with energy and big expressions. Pause at predictable parts and wait for him to fill in — point to the picture, tap the AAC, or vocalize. \"Goodnight, ___.\" Use silly voices for different characters. If he wants to flip the pages himself, let him — even if you skip ahead. The point isn't finishing the story; it's the shared moment.",
      ifLosingInterest:
        "Switch books. Or read the same book three times in a row — repetition builds anticipation, which is a great precursor to language.",
      wrappingUp:
        "Put the books back on the shelf together. A simple \"all done\" closing routine helps with transitions.",
    },
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
    lesson: {
      setup:
        "Pick a comfortable spot — his bed, the floor with a soft surface, post-bath when he's already in a calm state. Optional: lotion (a scent he likes), a weighted blanket, a pillow.",
      duringPlay:
        "Start with a few firm, slow hugs. \"Big squeezes!\" Then move into pressure on different parts: gently squeeze his shoulders, his hands, his feet, one at a time. The pressure should be firm and slow — never tickling or light. Try blanket burritos: roll him up in a blanket (head out!) and gently squeeze along the length. Pillow squishes: a pillow on his back as he lies face down, pressed gently. Lotion massage on hands and feet after a bath is incredibly calming for many kids.",
      ifLosingInterest:
        "If he wiggles away, follow his lead. He'll often come back. If he's done, he's done — pressure work isn't something to force.",
      wrappingUp:
        "End with a few moments of just lying or sitting together. The transition to the next activity should be slow.",
      closingNote:
        "Deep pressure is most powerful in transitions — before sleep, before a big shift in the day, when you sense him getting dysregulated. Build it into the daily rhythm.",
    },
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
    lesson: {
      setup:
        "Block off an afternoon. Gather blankets, cushions, pillows, chairs, flashlights, books, his favorite stuffed animals, and snacks. The biggest possible fort — couch cushions removed, blankets draped over chairs and tables, pillows on the floor — is the dream.",
      duringPlay:
        "Build the fort with him. Let him be in charge of where things go. Once it's built, live inside it for as long as he wants — eat snacks in there, read books, watch a show on a tablet, pretend to camp. Crawl in and out together. Bring stuffed animals as \"guests.\" Pretend it's a different place — a cave, a spaceship, a treehouse. The whole afternoon can be one long imaginative game.",
      ifLosingInterest:
        "Crash and rebuild — sometimes that's the best part. Or invite a parent in for a \"fort meeting.\"",
      wrappingUp:
        "Cleanup is part of the play — fold blankets, return pillows to the couch. Take a few minutes to put everything back so the room feels reset.",
    },
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
    lesson: {
      setup:
        "PJs on. Lights low. Glow sticks (a few cheap ones from the dollar store last for hours). Speaker or phone with his favorite songs queued up. This is best as an evening wind-down — but a high-energy one.",
      duringPlay:
        "Hand him a glow stick. Start the music. Dance like you're at a concert. Make it ridiculous. The combination of glow + music + low lights + you being silly tends to be magical. Try freeze dance, slow songs, fast songs. Hold his hands and twirl him.",
      ifLosingInterest:
        "Switch the song or add bubbles. If he's getting too wound up before bed, switch to a slow song to calm down.",
      wrappingUp:
        "End with a slow song while you both lie on the floor with the glow sticks. Then transition straight into the bedtime routine.",
    },
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
    lesson: {
      setup:
        "Hide 5-10 small preferred items around the house — favorite small toys, treats wrapped in foil, a sticker, a tiny note. Make a simple visual map or list using pictures or stickers on paper showing what to find. Have a \"treasure container\" ready — a small bag, basket, or pirate-themed bucket.",
      duringPlay:
        "Hand him the map and head off on the hunt together. \"What does the map say next?\" Point to the picture, then look together. \"It's the elephant! Where's the elephant?\" Search room by room with dramatic narration: \"Maybe in the kitchen? Maybe under the couch?\" Big celebration at every find. Have him put each treasure in his container.",
      ifLosingInterest:
        "Hide one item in really plain sight to give him a quick win. Or add a big \"final treasure\" at the end that he's seen you put away — that anticipation can carry him through.",
      wrappingUp:
        "Count the treasures together when he's done. Open the wrapped items together as the grand finale.",
    },
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
    lesson: {
      setup:
        "Once a month or so, pack up a bin of his current toys — the ones he hasn't been playing with — and put it away in a closet. After a couple of weeks (or whenever boredom hits), pull the bin back out and present it like it's brand new.",
      duringPlay:
        "Bring the bin in dramatically. \"Look what I found!\" Pull out toys one at a time, with surprise: \"Oh my gosh, it's the dinosaur!\" Hand him each toy and watch him explore. Some he'll have totally forgotten about — those become \"new\" again. Sit and play with him, narrating the toys and what they do. Resist explaining how to play with each one — let him discover his own way.",
      ifLosingInterest:
        "Save half the bin for tomorrow. Drip-feeding the surprise extends the magic.",
      wrappingUp:
        "Decide together which toys stay out and which can go back into rotation. Make the put-away a collaborative decision so it doesn't feel like a loss.",
    },
  },
];

export function getActivity(slug: string): Activity | undefined {
  return ACTIVITIES.find((a) => a.slug === slug);
}

export function getActivityById(id: string): Activity | undefined {
  return ACTIVITIES.find((a) => a.id === id);
}
