// ABAS-3 (Adaptive Behavior Assessment System, Third Edition) — Parent/Primary
// Caregiver Form. Items are stable identifiers used to track Levi's
// developmental progress over time.
//
// Each item belongs to a domain. Within a domain, items are roughly ordered
// from easiest to hardest, which the app uses to compute Levi's "active growth
// zone" — the items at the edge of competence that are worth tracking weekly.
//
// Scoring follows ABAS-3 convention:
//   0 — Is not able
//   1 — Never (or almost never) when needed
//   2 — Sometimes when needed
//   3 — Always (or almost always) when needed

export type AbasDomain =
  | "communication"
  | "community-use"
  | "functional-pre-academics"
  | "home-living"
  | "health-safety"
  | "leisure"
  | "self-care"
  | "self-direction"
  | "social"
  | "motor";

export type AbasDomainInfo = {
  id: AbasDomain;
  label: string;
  emoji: string;
  blurb: string;
};

export const DOMAINS: AbasDomainInfo[] = [
  {
    id: "communication",
    label: "Communication",
    emoji: "💬",
    blurb: "Listening, looking, gesturing, words, requests.",
  },
  {
    id: "community-use",
    label: "Community Use",
    emoji: "🏘️",
    blurb: "Behavior in stores, parks, public spaces.",
  },
  {
    id: "functional-pre-academics",
    label: "Pre-Academics",
    emoji: "🔤",
    blurb: "Counting, letters, shapes, colors, names.",
  },
  {
    id: "home-living",
    label: "Home Living",
    emoji: "🏡",
    blurb: "Helping around the house, taking care of his things.",
  },
  {
    id: "health-safety",
    label: "Health & Safety",
    emoji: "🩹",
    blurb: "Awareness of danger, basic self-protection.",
  },
  {
    id: "leisure",
    label: "Leisure",
    emoji: "🎲",
    blurb: "Playing alone, with toys, with others.",
  },
  {
    id: "self-care",
    label: "Self-Care",
    emoji: "🥄",
    blurb: "Eating, dressing, toileting, bathing.",
  },
  {
    id: "self-direction",
    label: "Self-Direction",
    emoji: "🧭",
    blurb: "Attention, focus, controlling impulses.",
  },
  {
    id: "social",
    label: "Social",
    emoji: "🫂",
    blurb: "Engaging with people, sharing emotions.",
  },
  {
    id: "motor",
    label: "Motor",
    emoji: "🤸",
    blurb: "Gross motor + fine motor skills.",
  },
];

export function getDomain(id: AbasDomain): AbasDomainInfo {
  return DOMAINS.find((d) => d.id === id)!;
}

export type AbasItem = {
  id: string;
  domain: AbasDomain;
  text: string;
};

// Item IDs use the format "<domain-prefix><index>" so they're stable forever.
// Items within each domain are ordered from easiest to hardest, which lets the
// growth-zone algorithm find Levi's edge of competence.
export const ABAS_ITEMS: AbasItem[] = [
  // ===== COMMUNICATION (com) =====
  { id: "com-01", domain: "communication", text: "Looks at other people's faces when they are talking to him." },
  { id: "com-02", domain: "communication", text: "Looks up or smiles when someone says his name." },
  { id: "com-03", domain: "communication", text: "Laughs when a parent or other person laughs." },
  { id: "com-04", domain: "communication", text: "Raises and lowers voice to express different feelings or needs." },
  { id: "com-05", domain: "communication", text: "Says the names of other people (for example, \"Mama,\" \"Daddy,\" or names of friends)." },
  { id: "com-06", domain: "communication", text: "Follows simple commands (for example, \"No\" or \"Come here\")." },
  { id: "com-07", domain: "communication", text: "Uses one or more words to get something he wants, even if the word is not said correctly or pronounced well." },
  { id: "com-08", domain: "communication", text: "Shakes head or says \"Yes\" or \"No\" in response to a simple question (for example, \"Do you want something to drink?\")." },
  { id: "com-09", domain: "communication", text: "Points to common items in a room when asked (for example, \"Show me the TV\")." },
  { id: "com-10", domain: "communication", text: "Repeats words others say (for example, says \"baby\" when an adult says \"baby\")." },
  { id: "com-11", domain: "communication", text: "Says phrases with at least two words (for example, \"My book\")." },
  { id: "com-12", domain: "communication", text: "Says the name of an object clearly enough that others recognize it (for example, \"ball,\" \"dog,\" \"cup\")." },
  { id: "com-13", domain: "communication", text: "Listens closely for at least 1 minute when people talk." },
  { id: "com-14", domain: "communication", text: "Speaks clearly enough that others who do not know him can understand most of what is said." },
  { id: "com-15", domain: "communication", text: "Follows simple, one-step directions that include \"over\" or \"under\" (for example, \"Put your hands over your head\")." },
  { id: "com-16", domain: "communication", text: "Refrains from repeating what he says over and over again." },
  { id: "com-17", domain: "communication", text: "Names 20 or more familiar objects." },
  { id: "com-18", domain: "communication", text: "Sings all or part of the words to songs." },
  { id: "com-19", domain: "communication", text: "Makes plurals of words by adding an -s (for example, \"shoes,\" \"socks,\" \"dogs\")." },
  { id: "com-20", domain: "communication", text: "Uses sentences with a noun and verb." },
  { id: "com-21", domain: "communication", text: "Tells parent, friends, or others about his favorite activities." },
  { id: "com-22", domain: "communication", text: "Asks questions such as \"Will you play with me?\"" },
  { id: "com-23", domain: "communication", text: "Speaks in sentences of six or more words." },
  { id: "com-24", domain: "communication", text: "Uses past tense to talk about prior events (for example, \"I stayed inside\")." },
  { id: "com-25", domain: "communication", text: "Has a conversation with another person for at least 3 minutes." },
  { id: "com-26", domain: "communication", text: "Waits for others to finish what they are saying, without interrupting." },

  // ===== COMMUNITY USE (cmu) =====
  { id: "cmu-01", domain: "community-use", text: "Stays with parents or other family members in a store and does not wander off." },
  { id: "cmu-02", domain: "community-use", text: "Recognizes own home in his immediate neighborhood." },
  { id: "cmu-03", domain: "community-use", text: "Walks on sidewalk rather than street." },
  { id: "cmu-04", domain: "community-use", text: "Informs parents when someone comes to the door." },
  { id: "cmu-05", domain: "community-use", text: "Shows respect for public property (for example, throws trash in cans, does not damage property)." },
  { id: "cmu-06", domain: "community-use", text: "Obeys an adult's request to \"don't touch\" items when shopping." },
  { id: "cmu-07", domain: "community-use", text: "Asks to go to a park or other favorite community place." },
  { id: "cmu-08", domain: "community-use", text: "Knocks on a door or rings the doorbell before entering another person's home." },
  { id: "cmu-09", domain: "community-use", text: "Refrains from talking loudly in a public place (for example, in a theater, movie, or church)." },
  { id: "cmu-10", domain: "community-use", text: "Remains seated during a religious service or a movie." },
  { id: "cmu-11", domain: "community-use", text: "Asks to eat in a favorite restaurant." },
  { id: "cmu-12", domain: "community-use", text: "Recognizes and names buildings (for example, hospital, gas station, fire department)." },
  { id: "cmu-13", domain: "community-use", text: "Identifies neighborhood locations where his family obtains needed items (for example, where to buy food)." },
  { id: "cmu-14", domain: "community-use", text: "Recognizes the need to pay for an item before leaving a store." },
  { id: "cmu-15", domain: "community-use", text: "Describes the duties of workers (for example, says that firefighters put out fires and doctors help the sick)." },
  { id: "cmu-16", domain: "community-use", text: "Looks both ways before crossing a street or parking lot." },
  { id: "cmu-17", domain: "community-use", text: "Asks to go to the library." },
  { id: "cmu-18", domain: "community-use", text: "Finds the restroom in public places." },
  { id: "cmu-19", domain: "community-use", text: "Orders own meals when eating out." },
  { id: "cmu-20", domain: "community-use", text: "Makes a small purchase at a food store." },
  { id: "cmu-21", domain: "community-use", text: "Carries enough money to make small purchases (for example, a soft drink)." },
  { id: "cmu-22", domain: "community-use", text: "Walks alone to friends' houses or apartments in the neighborhood." },

  // ===== FUNCTIONAL PRE-ACADEMICS (fpa) =====
  { id: "fpa-01", domain: "functional-pre-academics", text: "Points to at least one body part when asked (for example, \"head\" or \"leg\")." },
  { id: "fpa-02", domain: "functional-pre-academics", text: "Turns book pages one by one." },
  { id: "fpa-03", domain: "functional-pre-academics", text: "Points to pictures in books when asked (for example, points to a horse or cow)." },
  { id: "fpa-04", domain: "functional-pre-academics", text: "Counts three or more objects." },
  { id: "fpa-05", domain: "functional-pre-academics", text: "States his age in years when asked." },
  { id: "fpa-06", domain: "functional-pre-academics", text: "Sings the alphabet song." },
  { id: "fpa-07", domain: "functional-pre-academics", text: "Names six or more colors, including red, blue, and yellow." },
  { id: "fpa-08", domain: "functional-pre-academics", text: "Names four or more shapes (for example, circle, square, rectangle, triangle)." },
  { id: "fpa-09", domain: "functional-pre-academics", text: "Recites nursery rhymes from memory." },
  { id: "fpa-10", domain: "functional-pre-academics", text: "Reads his name when printed." },
  { id: "fpa-11", domain: "functional-pre-academics", text: "Names at least two letters when shown his name." },
  { id: "fpa-12", domain: "functional-pre-academics", text: "Identifies at least one coin by name (for example, penny or dime)." },
  { id: "fpa-13", domain: "functional-pre-academics", text: "Answers simple questions about a story read to him." },
  { id: "fpa-14", domain: "functional-pre-academics", text: "Counts 10 or more objects without using fingers." },
  { id: "fpa-15", domain: "functional-pre-academics", text: "Draws a recognizable face that includes two eyes, a nose, a mouth, and hair." },
  { id: "fpa-16", domain: "functional-pre-academics", text: "Names most letters when shown the alphabet." },
  { id: "fpa-17", domain: "functional-pre-academics", text: "Counts from 1 to 20." },
  { id: "fpa-18", domain: "functional-pre-academics", text: "Prints at least two letters in his name." },
  { id: "fpa-19", domain: "functional-pre-academics", text: "Reads and obeys common signs (for example, Do Not Enter, Exit, Stop)." },
  { id: "fpa-20", domain: "functional-pre-academics", text: "States the days of the week in order." },
  { id: "fpa-21", domain: "functional-pre-academics", text: "Writes or prints his first and last name." },
  { id: "fpa-22", domain: "functional-pre-academics", text: "Writes numbers 1 through 10 correctly." },
  { id: "fpa-23", domain: "functional-pre-academics", text: "Tells which day comes before another (for example, \"Wednesday comes before Thursday\")." },
  { id: "fpa-24", domain: "functional-pre-academics", text: "States days and times of favorite after-school activities, such as sports practice, music lessons, or television shows." },

  // ===== HOME LIVING (hom) =====
  { id: "hom-01", domain: "home-living", text: "Removes cookies, chips, or other food from a box or bag." },
  { id: "hom-02", domain: "home-living", text: "Shows concern when he spills something (for example, says \"Oh no\" or tells an adult)." },
  { id: "hom-03", domain: "home-living", text: "Points to where commonly used foods are kept in his home (for example, the refrigerator)." },
  { id: "hom-04", domain: "home-living", text: "Points to the place where his clothes are stored." },
  { id: "hom-05", domain: "home-living", text: "Takes a shirt or other piece of clothing out of a drawer when asked." },
  { id: "hom-06", domain: "home-living", text: "Assists other people with putting away toys, games, and other items." },
  { id: "hom-07", domain: "home-living", text: "Picks up and throws away trash or paper at home." },
  { id: "hom-08", domain: "home-living", text: "Does a simple errand when asked (for example, runs to get a towel for a spill)." },
  { id: "hom-09", domain: "home-living", text: "Refrains from kicking or hitting furniture." },
  { id: "hom-10", domain: "home-living", text: "Turns television on and off." },
  { id: "hom-11", domain: "home-living", text: "Refrains from throwing food or paper on the floor." },
  { id: "hom-12", domain: "home-living", text: "Washes hands without splashing water on the floor." },
  { id: "hom-13", domain: "home-living", text: "Gets own snacks from cabinet or pantry." },
  { id: "hom-14", domain: "home-living", text: "Assists adults with preparing simple snacks or meals (for example, hands slices of bread to adult for making sandwiches)." },
  { id: "hom-15", domain: "home-living", text: "Places dirty clothes in the proper place (for example, a hamper or clothes basket)." },
  { id: "hom-16", domain: "home-living", text: "Wipes up spills at home." },
  { id: "hom-17", domain: "home-living", text: "Takes own clothes from drawers or closet when getting dressed." },
  { id: "hom-18", domain: "home-living", text: "Keeps dirty shoes and feet off furniture." },
  { id: "hom-19", domain: "home-living", text: "Puts his own dirty glass or plate in the sink or dishwasher." },
  { id: "hom-20", domain: "home-living", text: "Puts things in their proper places when finished using them." },
  { id: "hom-21", domain: "home-living", text: "Keeps toys, games, and other belongings neat and clean." },
  { id: "hom-22", domain: "home-living", text: "Disposes of his leftover food." },
  { id: "hom-23", domain: "home-living", text: "Pours liquid from a larger container into own cup or glass without spilling." },
  { id: "hom-24", domain: "home-living", text: "Makes his bed." },
  { id: "hom-25", domain: "home-living", text: "Folds clean clothes." },

  // ===== HEALTH & SAFETY (hes) =====
  { id: "hes-01", domain: "health-safety", text: "Swallows liquid medicines as needed, without fussing." },
  { id: "hes-02", domain: "health-safety", text: "Sits still in high chair, booster seat, or chair, without climbing or sliding off." },
  { id: "hes-03", domain: "health-safety", text: "Avoids bumping into walls or objects when crawling or walking." },
  { id: "hes-04", domain: "health-safety", text: "Allows temperature to be taken without fussing." },
  { id: "hes-05", domain: "health-safety", text: "Shows, points to, or tells another person about a cut, bruise, or other minor injury." },
  { id: "hes-06", domain: "health-safety", text: "Follows another person's direction to \"stop\" when near danger, such as fire or broken glass." },
  { id: "hes-07", domain: "health-safety", text: "Points to the body part that hurts when he is sick or injured." },
  { id: "hes-08", domain: "health-safety", text: "Remains fairly still when an adult treats a cut or scrape." },
  { id: "hes-09", domain: "health-safety", text: "Refrains from putting non-edible objects in mouth (for example, crayons, blocks, sand)." },
  { id: "hes-10", domain: "health-safety", text: "Avoids getting too near a fire, broken glass, or other potential danger." },
  { id: "hes-11", domain: "health-safety", text: "Avoids touching or playing with dangerous items (for example, insect spray or sharp knives)." },
  { id: "hes-12", domain: "health-safety", text: "Avoids crawling or climbing on high or dangerous places." },
  { id: "hes-13", domain: "health-safety", text: "Tells an adult if he has a stomachache or other illness." },
  { id: "hes-14", domain: "health-safety", text: "Tests hot foods before eating them." },
  { id: "hes-15", domain: "health-safety", text: "Puts on a coat or sweater when cold." },
  { id: "hes-16", domain: "health-safety", text: "Carries breakable objects safely and carefully." },
  { id: "hes-17", domain: "health-safety", text: "Asks an adult before going near something that might be dangerous (for example, animals, busy streets, or high playground equipment)." },
  { id: "hes-18", domain: "health-safety", text: "Buckles own car seat or seat belt." },
  { id: "hes-19", domain: "health-safety", text: "Carries scissors safely." },
  { id: "hes-20", domain: "health-safety", text: "Carries hot containers safely and carefully." },
  { id: "hes-21", domain: "health-safety", text: "Uses electrical outlets or sockets safely." },
  { id: "hes-22", domain: "health-safety", text: "Cares for own minor injuries (for example, paper cuts, knee scrapes, nosebleeds)." },

  // ===== LEISURE (lei) =====
  { id: "lei-01", domain: "leisure", text: "Smiles or shows interest when he sees a favorite toy." },
  { id: "lei-02", domain: "leisure", text: "Plays with a variety of toys instead of only one or two." },
  { id: "lei-03", domain: "leisure", text: "Plays with a single toy or game for at least 1 minute." },
  { id: "lei-04", domain: "leisure", text: "Plays alone with toys and games, or does other fun activities." },
  { id: "lei-05", domain: "leisure", text: "Plays simple games like \"peek-a-boo\" or rolls a ball to others." },
  { id: "lei-06", domain: "leisure", text: "Looks with an adult at pictures in books or magazines." },
  { id: "lei-07", domain: "leisure", text: "Watches for a few minutes as people play with toys or games." },
  { id: "lei-08", domain: "leisure", text: "Shows interest in a toy or other object by pointing to it." },
  { id: "lei-09", domain: "leisure", text: "Chooses a game or toy during playtime." },
  { id: "lei-10", domain: "leisure", text: "Plays with toys, games, or other fun items with others." },
  { id: "lei-11", domain: "leisure", text: "Plays with a single toy or game for more than 5 minutes." },
  { id: "lei-12", domain: "leisure", text: "Plays on playground equipment." },
  { id: "lei-13", domain: "leisure", text: "Asks to be read to from a favorite book." },
  { id: "lei-14", domain: "leisure", text: "Attends fun activities at another's home." },
  { id: "lei-15", domain: "leisure", text: "Engages in imaginary or make-believe play with others." },
  { id: "lei-16", domain: "leisure", text: "Participates regularly in a specific fun activity (for example, listening to a certain type of music or playing a favorite computer game)." },
  { id: "lei-17", domain: "leisure", text: "Plays simple games with playmates without adult supervision." },
  { id: "lei-18", domain: "leisure", text: "Invites others to join him in playing games and other fun activities." },
  { id: "lei-19", domain: "leisure", text: "Saves things of interest (for example, rocks, feathers, pictures)." },
  { id: "lei-20", domain: "leisure", text: "Waits for his turn in games and other fun activities." },
  { id: "lei-21", domain: "leisure", text: "Follows the rules in games and other fun activities." },
  { id: "lei-22", domain: "leisure", text: "Invites others home for a fun activity." },
  { id: "lei-23", domain: "leisure", text: "Plays simple board games." },
  { id: "lei-24", domain: "leisure", text: "Participates in an organized program for a sport or hobby (for example, practices basketball or takes a music class)." },

  // ===== SELF-CARE (scr) =====
  { id: "scr-01", domain: "self-care", text: "Swallows liquids without difficulty." },
  { id: "scr-02", domain: "self-care", text: "Sleeps through most of the night, waking no more than one or two times." },
  { id: "scr-03", domain: "self-care", text: "Swallows soft, strained, or mashed food such as baby food or applesauce." },
  { id: "scr-04", domain: "self-care", text: "Opens mouth when offered food on a spoon." },
  { id: "scr-05", domain: "self-care", text: "Feeds himself crackers, cookies, dry cereal, or other finger foods." },
  { id: "scr-06", domain: "self-care", text: "Eats firm foods that require biting and chewing (for example, steamed vegetables)." },
  { id: "scr-07", domain: "self-care", text: "Drinks from a cup or glass, even if another person must hold it." },
  { id: "scr-08", domain: "self-care", text: "Lifts arms as needed when another person is dressing or undressing him." },
  { id: "scr-09", domain: "self-care", text: "Points to or asks for food when hungry." },
  { id: "scr-10", domain: "self-care", text: "Takes shoes off." },
  { id: "scr-11", domain: "self-care", text: "Feeds himself with a spoon or fork, not hands." },
  { id: "scr-12", domain: "self-care", text: "Washes hands with both soap and water." },
  { id: "scr-13", domain: "self-care", text: "Wipes his own face when given a washcloth by an adult." },
  { id: "scr-14", domain: "self-care", text: "Remains dry without wetting throughout the day." },
  { id: "scr-15", domain: "self-care", text: "Sits on the toilet or potty seat without being held." },
  { id: "scr-16", domain: "self-care", text: "Tells parent or other adult when he needs to use the bathroom." },
  { id: "scr-17", domain: "self-care", text: "Remains dry without wetting throughout the night." },
  { id: "scr-18", domain: "self-care", text: "Brushes teeth with little fussing when told to do so by an adult." },
  { id: "scr-19", domain: "self-care", text: "Uses bathroom without help." },
  { id: "scr-20", domain: "self-care", text: "Dresses himself." },
  { id: "scr-21", domain: "self-care", text: "Buttons own clothing." },
  { id: "scr-22", domain: "self-care", text: "Takes a bath or shower without help." },
  { id: "scr-23", domain: "self-care", text: "Washes his own hair." },
  { id: "scr-24", domain: "self-care", text: "Cuts meats or other foods into bite-size pieces with a knife." },

  // ===== SELF-DIRECTION (sdi) =====
  { id: "sdi-01", domain: "self-direction", text: "Shows interest in a toy or other object by looking at it for a few seconds." },
  { id: "sdi-02", domain: "self-direction", text: "Sits quietly for at least 1 minute without demanding attention." },
  { id: "sdi-03", domain: "self-direction", text: "Finds something to do for at least 5 minutes without demanding attention." },
  { id: "sdi-04", domain: "self-direction", text: "Plays with a toy without putting it into his mouth." },
  { id: "sdi-05", domain: "self-direction", text: "Explores an unfamiliar room or other new situation, even if a parent must encourage it (for example, a doctor's waiting room)." },
  { id: "sdi-06", domain: "self-direction", text: "Chooses the food or snack he wishes to eat when given a choice." },
  { id: "sdi-07", domain: "self-direction", text: "Moves a few feet away from a parent in a new situation as long as the parent is in sight (for example, when visiting an unfamiliar residence)." },
  { id: "sdi-08", domain: "self-direction", text: "Tries to do most things alone without an adult's help (for example, dressing or feeding self)." },
  { id: "sdi-09", domain: "self-direction", text: "Follows an adult's request to \"quiet down\" or \"behave.\"" },
  { id: "sdi-10", domain: "self-direction", text: "Resists pushing or hitting another child when angry or upset." },
  { id: "sdi-11", domain: "self-direction", text: "Follows simple household rules (for example, \"No running in the house\")." },
  { id: "sdi-12", domain: "self-direction", text: "Stands still when needed, without fidgeting or moving around." },
  { id: "sdi-13", domain: "self-direction", text: "Starts an activity at once when told to do so (for example, \"Go take a bath\")." },
  { id: "sdi-14", domain: "self-direction", text: "Controls temper when a parent or other adult takes a toy or object away." },
  { id: "sdi-15", domain: "self-direction", text: "Asks permission from an adult when needed (for example, \"May I go outside to play?\")." },
  { id: "sdi-16", domain: "self-direction", text: "Keeps working on hard tasks without becoming discouraged, quitting, or needing reminders." },
  { id: "sdi-17", domain: "self-direction", text: "Works independently and asks for help only when necessary." },
  { id: "sdi-18", domain: "self-direction", text: "Stops a fun activity, without complaining, when told that time is up." },
  { id: "sdi-19", domain: "self-direction", text: "Controls temper when disagreeing with friends." },
  { id: "sdi-20", domain: "self-direction", text: "Follows a routine without being reminded (for example, brushing teeth before bedtime or feeding a pet)." },
  { id: "sdi-21", domain: "self-direction", text: "Asks permission before playing with another child's toy or game." },
  { id: "sdi-22", domain: "self-direction", text: "Chooses own clothes almost every day." },
  { id: "sdi-23", domain: "self-direction", text: "Works on one home or school activity for at least 15 minutes without reminders." },
  { id: "sdi-24", domain: "self-direction", text: "Discusses ways to solve conflicts with others (for example, \"You can have this now if I can have it later\")." },

  // ===== SOCIAL (soc) =====
  { id: "soc-01", domain: "social", text: "Smiles when he sees a parent." },
  { id: "soc-02", domain: "social", text: "Relaxes body when held (for example, snuggles)." },
  { id: "soc-03", domain: "social", text: "Squeals or laughs when happy or delighted." },
  { id: "soc-04", domain: "social", text: "Displays closeness to a parent (for example, is happy when parent returns)." },
  { id: "soc-05", domain: "social", text: "Shows a sense of humor (for example, laughs when someone acts silly)." },
  { id: "soc-06", domain: "social", text: "Lifts arms to express a desire to be picked up." },
  { id: "soc-07", domain: "social", text: "Responds differently to familiar and unfamiliar persons (for example, is less warm to an unfamiliar person)." },
  { id: "soc-08", domain: "social", text: "Hugs and kisses parents or others." },
  { id: "soc-09", domain: "social", text: "Imitates actions of adults (for example, pretends to clean house or drive a car)." },
  { id: "soc-10", domain: "social", text: "Shows respect for persons in authority by following their rules and directions (for example, parents, teachers, police officers)." },
  { id: "soc-11", domain: "social", text: "Shares toys willingly with others." },
  { id: "soc-12", domain: "social", text: "Greets other children (for example, says \"Hi\")." },
  { id: "soc-13", domain: "social", text: "Says \"Thank you\" when given a gift." },
  { id: "soc-14", domain: "social", text: "Shows sympathy for others when they are sad or upset." },
  { id: "soc-15", domain: "social", text: "Seeks friendship with others in his age group." },
  { id: "soc-16", domain: "social", text: "Responds appropriately when introduced to others (for example, says \"Hello\")." },
  { id: "soc-17", domain: "social", text: "Says \"Please\" when asking for something." },
  { id: "soc-18", domain: "social", text: "Says when he feels happy, sad, scared, or angry." },
  { id: "soc-19", domain: "social", text: "Displays good table manners (for example, by using a napkin and remaining at the table until excused)." },
  { id: "soc-20", domain: "social", text: "Offers assistance to others (for example, to carry packages or put away food)." },
  { id: "soc-21", domain: "social", text: "Apologizes if he hurts the feelings of others." },
  { id: "soc-22", domain: "social", text: "Places reasonable demands on friends (for example, does not become upset when a friend plays with another friend)." },
  { id: "soc-23", domain: "social", text: "Refrains from saying or doing things that might embarrass or hurt others." },
  { id: "soc-24", domain: "social", text: "Personally makes or buys gifts for family members on birthdays or major holidays." },

  // ===== MOTOR (mot) =====
  { id: "mot-01", domain: "motor", text: "Lifts head to look around." },
  { id: "mot-02", domain: "motor", text: "Follows a moving object by turning head." },
  { id: "mot-03", domain: "motor", text: "Rolls from stomach to side." },
  { id: "mot-04", domain: "motor", text: "Shakes rattle or other toys." },
  { id: "mot-05", domain: "motor", text: "Reaches for objects such as a bottle or toy." },
  { id: "mot-06", domain: "motor", text: "Transfers objects from one hand to the other." },
  { id: "mot-07", domain: "motor", text: "Sits upright on the floor without support." },
  { id: "mot-08", domain: "motor", text: "Moves to a sitting position, even if balance is unsteady." },
  { id: "mot-09", domain: "motor", text: "Pulls himself to a standing position (for example, in a crib)." },
  { id: "mot-10", domain: "motor", text: "Picks up small flat objects from a table (for example, coins or buttons)." },
  { id: "mot-11", domain: "motor", text: "Crawls for about 10 feet without falling over." },
  { id: "mot-12", domain: "motor", text: "When standing, bends over to pick up items from the floor." },
  { id: "mot-13", domain: "motor", text: "Stands up from a sitting position." },
  { id: "mot-14", domain: "motor", text: "Rolls ball to others." },
  { id: "mot-15", domain: "motor", text: "Walks without help." },
  { id: "mot-16", domain: "motor", text: "Throws a small ball overhand." },
  { id: "mot-17", domain: "motor", text: "Walks up at least five to six steps without falling (may use handrail)." },
  { id: "mot-18", domain: "motor", text: "Kicks a ball without falling." },
  { id: "mot-19", domain: "motor", text: "Runs without falling." },
  { id: "mot-20", domain: "motor", text: "Bounces a ball for several seconds." },
  { id: "mot-21", domain: "motor", text: "Catches a ball tossed from 5 to 10 feet away." },
  { id: "mot-22", domain: "motor", text: "Draws straight lines across a piece of paper." },
  { id: "mot-23", domain: "motor", text: "Colors within the lines of a drawing or in a coloring book." },
  { id: "mot-24", domain: "motor", text: "Puts twist-off tops back on jars and closes them tightly." },
  { id: "mot-25", domain: "motor", text: "Uses scissors to cut along a straight line." },
  { id: "mot-26", domain: "motor", text: "Uses scissors to cut shapes with curved lines." },
];

export type AbasRating = 0 | 1 | 2 | 3;

export const RATING_OPTIONS: {
  value: AbasRating;
  emoji: string;
  label: string;
  shortLabel: string;
}[] = [
  { value: 0, emoji: "🚫", label: "Not yet able", shortLabel: "Not yet" },
  { value: 1, emoji: "🌱", label: "Never (when needed)", shortLabel: "Never" },
  { value: 2, emoji: "🌿", label: "Sometimes", shortLabel: "Sometimes" },
  { value: 3, emoji: "🌳", label: "Always (or almost)", shortLabel: "Always" },
];

export function getItem(id: string): AbasItem | undefined {
  return ABAS_ITEMS.find((i) => i.id === id);
}

export function itemsByDomain(domain: AbasDomain): AbasItem[] {
  return ABAS_ITEMS.filter((i) => i.domain === domain);
}
