const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const pm2 = require('pm2');
const nodemon = require('nodemon');
const player = require('play-sound')(opts = {});
const adblocker = require('puppeteer-extra-plugin-adblocker')();
const { exec } = require('child_process');
puppeteer.use(adblocker);

const winnerSoundScriptPath = './winnerSound.ps1';
const winnerSoundCommand = `powershell.exe -File ${winnerSoundScriptPath}`;
const confettiSoundScriptPath = './confettiSound.ps1';
const confettiSoundCommand = `powershell.exe -File ${confettiSoundScriptPath}`;
const clickSound = "./digital_click.mp3"
const followSound = "./like_and_follow.mp3"
const powershellScriptPath = 'z_speak.ps1';

var isPlaying = false;

async function runScript() {
    var games =
    {
        game0: ["blueberry", "pear", "potato", "almond", "milk", "cheese", "applesauce", "onion", "cucumber", "pomegranate", "sausage", "bun", "noodle", "pick", "margarine", "hibiscus", "okay"],
        game1: ["neighbor", "village", "place", "historic", "upscale", "demographics", "metro", "portland", "residence", "township", "foreclose", "environment", "california", "old", "locally", "large", "enjoy"],
        game2: ["literature", "book", "page", "report", "archival", "history", "box", "need", "fabric", "given", "color", "general", "genetic", "help", "know", "table", "january"],
        game3: ["orchard", "pasture", "village", "grower", "sheep", "town", "small", "wild", "large", "haven", "slaughter", "benefit", "restaurant", "castle", "housing", "today", "mostly"],
        game4: ["steak", "lamb", "bacon", "pasta", "fry", "salmon", "freeze", "marinate", "spinach", "patty", "homemade", "curry", "serving", "italian", "usually", "tilapia", "contaminate"],
        game5: ["device", "server", "phone", "mac", "program", "tech", "science", "either", "install", "provide", "go", "cellphone", "better", "generally", "realize", "apparently", "via"],
        game6: ["curriculum", "parent", "principal", "graduate", "grade", "leadership", "encourage", "understand", "middle", "participation", "saying", "schoolchild", "hear", "importance", "love", "boy", "talent"],
        game7: ["motorbike", "racing", "tire", "trail", "trike", "tyre", "tricycle", "snowmobile", "treadmill", "route", "anything", "aero", "instead", "comfortable", "hopefully", "hour", "alpine"],
        game8: ["animal", "murine", "cat", "expression", "desktop", "dog", "mickey", "lizard", "cursor", "alter", "unlike", "assay", "stem", "minnie", "hide", "boy", "involve"],
        game9: ["parrot", "fly", "avian", "pigeon", "dove", "snake", "eagle", "beak", "conservation", "forest", "lovely", "know", "pink", "mountain", "occasionally", "sand", "either"],
        game10: ["kid", "interest", "cute", "good", "perfect", "play", "easy", "birthday", "terrific", "certainly", "welcome", "wow", "wo", "theme", "exhilarate", "huge", "sex"],
        game11: ["academic", "science", "princeton", "researcher", "teaching", "purdue", "cambridge", "unite", "recognize", "lead", "among", "throughout", "english", "statistic", "particularly", "group", "british"],
        game12: ["motor", "jeep", "use", "bus", "mazda", "chrysler", "buy", "move", "fast", "bumper", "buyer", "several", "maserati", "stock", "local", "special", "anyway"],
        game13: ["bumble", "burts", "gees", "pollination", "apiary", "bite", "dragonfly", "larva", "cricket", "finch", "making", "rose", "magic", "anything", "sing", "entire", "cake"],
        game14: ["time", "stopwatch", "computer", "quartz", "thermometer", "barometer", "vintage", "feature", "shop", "around", "tabletop", "controller", "animate", "circuit", "mhz", "constantly", "bit"],
        game15: ["really", "know", "actually", "sure", "especially", "also", "enough", "another", "change", "necessary", "following", "apparently", "environment", "play", "everyday", "technical", "familiar"],
        game16: ["cultural", "tradition", "heritage", "many", "genealogy", "write", "various", "throughout", "base", "identity", "general", "two", "vary", "look", "writer", "highlight", "clearly"],
        game17: ["frame", "blue", "acrylic", "vintage", "make", "paint", "jar", "bead", "fill", "pour", "get", "room", "think", "decorate", "similar", "watch", "opening"],
        game18: ["watch", "hd", "bbc", "screen", "cinema", "digital", "music", "online", "get", "think", "never", "microwave", "technology", "major", "anyway", "keep", "inside"],
        game19: ["town", "east", "ride", "south", "land", "river", "dirt", "avenue", "train", "hillside", "come", "two", "six", "break", "flooding", "beach", "horse"],
        game20: ["around", "one", "coming", "inside", "four", "keep", "stand", "thought", "actually", "large", "call", "push", "hole", "government", "particularly", "catch", "brian"],
        game21: ["furnish", "townhomes", "residential", "vacation", "bungalow", "waterfront", "hostel", "duplex", "height", "neighbourhood", "shop", "magnificent", "main", "ocean", "quaint", "club", "agent"],
        game22: ["charm", "fantastic", "pretty", "superb", "colorful", "incredibly", "impressive", "especially", "sunny", "spacious", "nothing", "paradise", "certainly", "intrigue", "portrait", "house", "yummy"],
        game23: ["metropolitan", "york", "kansas", "near", "across", "unite", "new", "neighbor", "northwest", "council", "hospital", "similar", "back", "current", "give", "commercial", "authority"],
        game24: ["notepad", "stylus", "quill", "chalk", "plastic", "nail", "printing", "use", "kit", "product", "miniature", "clock", "jewelry", "thing", "always", "compass", "kid"],
        game25: ["kitten", "paw", "chihuahua", "bull", "kid", "cow", "people", "put", "like", "thought", "herd", "couple", "critter", "certain", "obviously", "snake", "past"],
        game26: ["bowl", "porcelain", "set", "plastic", "flat", "dinner", "bar", "fork", "mold", "small", "coating", "seat", "head", "mint", "rather", "pressure", "present"],
        game27: ["jewelry", "jewel", "crystal", "jewellery", "citrine", "yellow", "brilliant", "facet", "bridal", "cushion", "luster", "velvet", "give", "kay", "six", "nail", "chandelier"],
        game28: ["groom", "photographer", "engagement", "holiday", "gift", "elegant", "mitzvah", "festive", "hire", "inspire", "candle", "making", "hall", "create", "personalise", "cheap", "carnival"],
        game29: ["cola", "syrup", "vinegar", "seltzer", "cocktail", "alcohol", "sandwich", "lime", "toothpaste", "sauce", "orange", "wheat", "spike", "pepsico", "supplement", "grenadine", "bubble"],
        game30: ["follicle", "shaving", "shave", "strand", "brow", "thick", "moustache", "clothe", "treatment", "shape", "genital", "stray", "red", "put", "reason", "fact", "laser"],
        game31: ["york", "manhattan", "park", "new", "house", "place", "bronx", "court", "alexandra", "goddess", "favourite", "lovely", "stone", "unite", "six", "grove", "rise"],
        game32: ["soccer", "pitcher", "cub", "catcher", "bowl", "hit", "jay", "fielder", "batter", "hof", "may", "tailgate", "wolverine", "halladay", "lineup", "american", "sabre"],
        game33: ["interaction", "social", "interpersonal", "communication", "difference", "commitment", "date", "connection", "meaning", "opportunity", "customer", "though", "loyalty", "given", "transition", "choice", "equally"],
        game34: ["publication", "faculty", "academic", "art", "literature", "service", "work", "store", "website", "help", "javascript", "expand", "infrastructure", "especially", "cd", "hardware", "perhaps"],
        game35: ["sunday", "summer", "trip", "next", "one", "dream", "yesterday", "dance", "seven", "house", "august", "leave", "along", "eye", "journey", "beach", "lovely"],
        game36: ["protein", "molecule", "immune", "molecular", "mouse", "liver", "embryo", "number", "normally", "found", "pluripotent", "generate", "characteristic", "lesion", "base", "relatively", "namely"],
        game37: ["flute", "viola", "string", "mandolin", "beethoven", "banjo", "mozart", "choral", "songbook", "furniture", "funky", "stand", "tutor", "funk", "excerpt", "dreamy", "pick"],
        game38: ["profitability", "million", "asset", "payment", "expect", "cent", "consolidate", "share", "boost", "compensation", "current", "effort", "consistent", "development", "approval", "limit", "currency"],
        game39: ["wife", "father", "girl", "dear", "beloved", "annie", "neighbor", "tell", "molly", "aka", "evelyn", "lover", "carolyn", "grow", "eight", "guess", "bailey"],
        game40: ["spinach", "cabbage", "fries", "bacon", "casserole", "gravy", "lettuce", "leek", "delicious", "shallot", "yummy", "grape", "custard", "curd", "molasses", "taro", "bran"],
        game41: ["journal", "chronicle", "article", "columnist", "courier", "bulletin", "editor", "sentinel", "writing", "printing", "coverage", "late", "election", "mostly", "probably", "survey", "collegian"],
        game42: ["sidewalk", "outside", "lane", "highway", "york", "turn", "chinatown", "busy", "day", "paris", "canal", "rooftop", "sydney", "dozen", "without", "rally", "grand"],
        game43: ["box", "shoulder", "accessory", "briefcase", "bottle", "quilt", "case", "trolley", "perfect", "oversized", "supply", "foil", "burlap", "addition", "hang", "add", "fabulous"],
        game44: ["heavy", "solid", "ferrous", "wood", "coating", "resin", "industry", "rubber", "metallurgy", "combination", "supply", "pigment", "set", "transition", "round", "within", "track"],
        game45: ["sibling", "community", "helping", "especially", "group", "need", "caregiver", "enjoy", "american", "baby", "actually", "good", "offering", "outside", "teacher", "choose", "culture"],
        game46: ["orchard", "woodland", "botanical", "pool", "wonderful", "ornamental", "hill", "locate", "great", "blossom", "wood", "shed", "away", "evening", "renovate", "peaceful", "world"],
        game47: ["marketing", "market", "enterprise", "banking", "successful", "helping", "internet", "vendor", "able", "today", "best", "activity", "likely", "still", "group", "seller", "approach"],
        game48: ["cook", "furniture", "interior", "living", "granite", "garden", "shower", "modern", "hallway", "glaze", "look", "ample", "supplier", "easy", "gadget", "keep", "bakeware"],
        game49: ["illuminate", "wall", "exterior", "visor", "reflect", "turn", "lighting", "windshield", "shine", "cloth", "bath", "oversized", "available", "always", "sight", "paper", "lumbar"],
        game50: ["mental", "welfare", "social", "community", "medicare", "safety", "holistic", "help", "exercise", "planning", "every", "say", "office", "partnership", "whose", "available", "like"],
        game51: ["people", "britain", "china", "especially", "india", "one", "community", "continue", "majority", "whereas", "effort", "family", "numerous", "understand", "program", "conflict", "new"],
        game52: ["hd", "show", "news", "relate", "best", "sexy", "girl", "avi", "check", "read", "use", "different", "especially", "fast", "discussion", "xbox", "close"],
        game53: ["chrismas", "snowman", "celebrate", "year", "dad", "moment", "night", "song", "thankful", "storybook", "lovely", "musical", "scary", "think", "look", "postcard", "friendship"],
        game54: ["wall", "floor", "allow", "share", "possible", "accessible", "work", "mean", "virtual", "comfortable", "inner", "transform", "visual", "learning", "residential", "energy", "proper"],
        game55: ["restaurant", "ramada", "tourist", "situate", "downtown", "beach", "hampton", "discount", "village", "star", "cruise", "guesthouses", "popular", "lobby", "chiang", "wedding", "browse"],
        game56: ["stumble", "fortunate", "maybe", "thought", "happy", "though", "probably", "look", "seem", "tonight", "terrible", "time", "bye", "felt", "nowhere", "worth", "realy"],
        game57: ["graduate", "curriculum", "classroom", "parent", "schooling", "catholic", "lesson", "hs", "medical", "must", "outside", "sport", "little", "virginia", "ministry", "entire", "doctor"],
        game58: ["scene", "pic", "actor", "animate", "big", "see", "free", "guy", "adult", "always", "favourite", "almost", "include", "site", "obviously", "gangster", "western"],
        game59: ["lead", "manufacture", "supplier", "establish", "management", "advertise", "also", "similar", "certain", "rather", "first", "strategy", "consultancy", "specialize", "begin", "anyone", "less"],
        game60: ["award", "competition", "title", "honor", "bronze", "derby", "match", "round", "showcase", "golf", "make", "wrestle", "mascot", "garner", "athletic", "liverpool", "capture"],
        game61: ["document", "letter", "manuscript", "interpretation", "speak", "author", "clearly", "name", "reader", "although", "powerpoint", "correctly", "specify", "christianity", "rendering", "two", "changing"],
        game62: ["owe", "donation", "asset", "spend", "debt", "wealth", "finance", "already", "certain", "paycheck", "withdraw", "personal", "assume", "let", "possibly", "membership", "hard"],
        game63: ["mind", "whatever", "suggestion", "reason", "great", "possible", "everything", "yet", "anyway", "writing", "describe", "likely", "everybody", "completely", "usual", "aware", "stick"],
        game64: ["western", "southern", "shore", "devil", "southwest", "queensland", "wilmington", "brisbane", "durban", "westminster", "bismarck", "maine", "chelsea", "cary", "half", "hudson", "mt"],
        game65: ["law", "criminal", "souter", "prosecutor", "prosecution", "chief", "enforcement", "deputy", "democrat", "administration", "office", "affirmative", "lawsuit", "early", "compromise", "bill", "walker"],
        game66: ["text", "imagery", "scan", "use", "show", "art", "imaging", "clipart", "following", "given", "many", "multimedia", "nature", "time", "powerful", "hand", "exist"],
        game67: ["sail", "coastline", "boat", "tropical", "wind", "harbor", "ashore", "fleet", "journey", "cold", "ground", "sun", "species", "hawaii", "hawaiian", "vegetation", "dry"],
        game68: ["bath", "ensuite", "terrace", "dine", "sofa", "sqm", "condominium", "charm", "equip", "sunroom", "rustic", "upscale", "redecorate", "huge", "attractively", "beam", "rug"],
        game69: ["know", "advice", "anyone", "matter", "discuss", "discussion", "might", "must", "doubt", "best", "wo", "ignore", "curious", "evidence", "feel", "presentation", "rational"],
        game70: ["emotion", "passion", "desire", "enthusiasm", "fantastical", "memory", "delusion", "enjoyment", "thrill", "understanding", "learning", "child", "lack", "viewer", "listener", "terrify", "accomplish"],
        game71: ["couch", "bench", "room", "office", "cabinet", "pillow", "leg", "mahogany", "brown", "hon", "interior", "childrens", "doll", "nice", "attach", "ball", "meet"],
        game72: ["pregnant", "mom", "little", "cute", "puppy", "bear", "make", "adult", "really", "everyday", "hand", "saying", "lovely", "special", "best", "choose", "busy"],
        game73: ["whitespace", "asterisk", "decimal", "bolded", "capitalization", "adjective", "concatenate", "wildcards", "parameter", "syntactically", "legible", "stanza", "oops", "transliterate", "instead", "please", "parity"],
        game74: ["spiritual", "encouragement", "sermon", "sacred", "intercession", "wish", "repentance", "heaven", "love", "mean", "greeting", "unity", "say", "especially", "behalf", "place", "priesthood"],
        game75: ["fixture", "mirror", "sconce", "wall", "bright", "vanity", "hanging", "spotlight", "taillight", "rack", "work", "frame", "traditional", "cover", "passenger", "dichroic", "example"],
        game76: ["canoe", "watercraft", "sea", "car", "river", "recreational", "motor", "craft", "schooner", "take", "place", "away", "torpedo", "running", "mud", "almost", "visitor"],
        game77: ["ever", "journey", "paradise", "want", "thing", "imagination", "make", "wake", "secret", "sometimes", "enough", "chase", "trip", "person", "teenage", "ahead", "difficult"],
        game78: ["instrumentalist", "carol", "philharmonic", "recital", "worship", "composer", "flute", "trinity", "cantata", "songwriting", "ring", "minister", "harmonica", "throughout", "dignitary", "team", "presbytery"],
        game79: ["nervous", "cell", "sensory", "understand", "thing", "apparently", "neurological", "whole", "explain", "produce", "take", "biological", "without", "meaning", "habit", "confuse", "determine"],
        game80: ["grapefruit", "purple", "watermelon", "apricot", "fresh", "sweet", "ripe", "walnut", "marmalade", "egg", "squash", "wheat", "well", "hop", "prefer", "crunchy", "pith"],
        game81: ["bread", "gourmet", "donut", "confection", "grocer", "candy", "cheese", "vendor", "upscale", "basket", "flower", "butchery", "corner", "wilton", "daycare", "domino", "jam"],
        game82: ["newsletter", "fax", "website", "notification", "posting", "sender", "bill", "post", "wish", "fedex", "resume", "welcome", "work", "change", "usually", "content", "yet"],
        game83: ["cow", "goat", "duck", "steak", "bean", "rice", "veal", "rooster", "curry", "seed", "put", "spaghetti", "broil", "oven", "salsa", "away", "killing"],
        game84: ["earpiece", "usb", "mics", "hifi", "binaural", "keyboard", "altec", "cellphone", "bud", "compatible", "glass", "kardon", "motherboard", "component", "crosstalk", "touchpad", "con"],
        game85: ["league", "volleyball", "training", "referee", "champion", "talent", "fan", "always", "able", "bring", "wildcat", "gators", "administrator", "already", "first", "different", "stan"],
        game86: ["hexagon", "congruent", "overlap", "diagonal", "round", "pattern", "lattice", "equation", "element", "end", "dimension", "diagram", "radius", "apart", "multi", "glow", "offset"],
        game87: ["upstairs", "roof", "downstairs", "cabinet", "concrete", "laundry", "foyer", "flat", "glass", "luxurious", "penthouse", "second", "extra", "still", "sure", "curve", "see"],
        game88: ["crown", "john", "emperor", "ii", "east", "england", "golden", "holy", "house", "philip", "set", "return", "thing", "southern", "northern", "actually", "phil"],
        game89: ["today", "one", "take", "even", "tomorrow", "happy", "almost", "another", "yet", "making", "turn", "imagine", "hopefully", "plus", "guy", "top", "free"],
        game90: ["user", "smartphones", "web", "let", "microsoft", "nokia", "java", "screen", "nook", "setting", "theme", "like", "one", "login", "sidebar", "relate", "forget"],
        game91: ["teaching", "learning", "scholarship", "course", "mathematics", "writing", "participate", "doctoral", "taking", "instructional", "candidate", "fact", "creative", "ability", "late", "material", "foster"],
        game92: ["glass", "roof", "slide", "mac", "lock", "box", "console", "configuration", "interface", "simply", "also", "include", "check", "cool", "completely", "pack", "stone"],
        game93: ["sweatshirt", "hoodies", "plaid", "tunic", "polos", "coat", "flannel", "mug", "lauren", "fashion", "lacoste", "hollister", "always", "cowboy", "show", "fabulous", "sell"],
        game94: ["wind", "snowfall", "humid", "summer", "snowstorm", "squall", "drench", "irene", "though", "flow", "wo", "climate", "every", "lush", "end", "blind", "constant"],
        game95: ["answer", "study", "midterm", "quiz", "lab", "citrix", "competency", "class", "fundamental", "write", "nurse", "ib", "sem", "research", "module", "choose", "security"],
        game96: ["magistrate", "appellate", "opinion", "dismiss", "guilty", "officer", "say", "give", "know", "although", "never", "criticize", "personally", "still", "five", "suggest", "swear"],
        game97: ["soda", "alcohol", "fruit", "breakfast", "refresh", "bring", "drinker", "good", "whisky", "everyday", "punch", "avoid", "lime", "blood", "veggies", "welcome", "filling"],
        game98: ["economy", "economic", "global", "banking", "grow", "portfolio", "base", "food", "profitability", "better", "though", "drive", "environment", "successful", "last", "realize", "lucrative"],
        game99: ["artistic", "musical", "bring", "songwriting", "enthusiasm", "truly", "genius", "knack", "considerable", "musicianship", "obvious", "recruit", "winner", "masterful", "shine", "direct", "generation"],
        game100: ["instructional", "preschool", "instruction", "pupil", "workplace", "building", "professor", "outreach", "opportunity", "laboratory", "different", "understanding", "grammar", "communicate", "lack", "begin", "text"],
        game101: ["war", "combat", "iraqi", "peacekeeping", "diplomat", "pentagon", "defense", "wwi", "police", "world", "operative", "relation", "bureaucrat", "rely", "international", "one", "adviser"],
        game102: ["bassoon", "harp", "trombone", "continuo", "brahms", "tuba", "basso", "vivaldi", "mendelssohn", "liszt", "harmonic", "variation", "jazzy", "washburn", "doll", "flame", "magnificat"],
        game103: ["brew", "juice", "spice", "milk", "breakfast", "lemon", "espresso", "flavour", "cup", "traditional", "bath", "various", "hop", "chill", "shop", "cacao", "yoga"],
        game104: ["area", "nearby", "hill", "village", "conservation", "campus", "spring", "local", "island", "explore", "preserve", "san", "stroll", "two", "wetland", "last", "turn"],
        game105: ["image", "collage", "sculpture", "drawing", "shot", "inspire", "contemporary", "pencil", "feature", "view", "shooting", "reveal", "interior", "actress", "select", "different", "today"],
        game106: ["ingredient", "liquid", "chemical", "product", "lotion", "formulate", "vinegar", "moisturize", "rosemary", "perfume", "healing", "prove", "lower", "process", "exploration", "sell", "harmful"],
        game107: ["meal", "submenu", "delicious", "setting", "popup", "appetizer", "catering", "table", "add", "cursor", "flavor", "label", "editor", "entire", "vegan", "task", "coupon"],
        game108: ["infancy", "life", "kid", "teenager", "generation", "illness", "father", "maternal", "ordeal", "newborn", "tribulation", "portray", "fantasy", "ending", "orphanage", "adventure", "since"],
        game109: ["music", "concert", "pop", "folk", "tribute", "orchestra", "ensemble", "soulful", "amaze", "nashville", "wilson", "wayne", "amanda", "professional", "meet", "miss", "first"],
        game110: ["much", "year", "next", "today", "work", "far", "month", "possible", "difficult", "usually", "example", "anyway", "busy", "perfect", "watch", "amaze", "truly"],
        game111: ["abdominal", "indigestion", "bloat", "nausea", "gut", "uterus", "hungry", "headache", "mucous", "wound", "itchy", "weight", "rib", "afraid", "stiff", "animal", "bottom"],
        game112: ["buddy", "girlfriend", "brother", "always", "one", "never", "hope", "put", "might", "coming", "nephew", "trouble", "post", "listen", "happily", "agree", "jason"],
        game113: ["beast", "panther", "golden", "moose", "cub", "owl", "hawk", "club", "raven", "seven", "six", "champion", "hat", "fall", "jungle", "killer", "raise"],
        game114: ["turn", "back", "way", "make", "move", "work", "good", "better", "shoulder", "thus", "different", "lucky", "example", "appear", "skin", "wipe", "tip"],
        game115: ["lettuce", "leek", "asparagus", "beetroot", "bean", "fennel", "parsley", "rhubarb", "butternut", "gratin", "puree", "thistle", "ripen", "mozzarella", "red", "amaryllis", "cereal"],
        game116: ["salt", "drink", "boat", "lagoon", "beach", "pollute", "sewage", "around", "outside", "bottom", "road", "spring", "wild", "irrigation", "west", "mix", "rich"],
        game117: ["canyon", "snow", "climb", "scenery", "gorge", "beautiful", "colorado", "winter", "trek", "horseback", "mountaineering", "rain", "territory", "rural", "especially", "cavern", "backpacking"],
        game118: ["literature", "page", "publishing", "great", "kindle", "many", "publisher", "actually", "note", "little", "often", "try", "sometimes", "pretty", "particularly", "create", "realize"],
        game119: ["lone", "fly", "tiger", "mountain", "crow", "viking", "coyote", "pittsburgh", "lady", "camp", "goose", "first", "proud", "black", "watch", "time", "highland"],
        game120: ["payment", "deduction", "gain", "dividend", "saving", "amount", "financial", "inequality", "fee", "exceed", "share", "grant", "term", "electricity", "worth", "given", "diminish"],
        game121: ["connection", "shield", "electrical", "port", "satellite", "comcast", "disconnect", "include", "communication", "headset", "additional", "wall", "also", "wholesale", "via", "heating", "addition"],
        game122: ["rainy", "autumn", "wintertime", "cloud", "melt", "precipitation", "snowflake", "freeze", "dust", "gusty", "unseasonably", "pothole", "nice", "hemisphere", "temperate", "bog", "wear"],
        game123: ["olive", "grill", "spinach", "yogurt", "delicious", "prosciutto", "appetizer", "fresh", "lasagna", "casserole", "quesadillas", "scallop", "raisin", "devil", "scallion", "sirloin", "batch"],
        game124: ["slit", "cold", "ram", "sinus", "cheek", "knee", "licking", "leg", "fill", "pinch", "boyfriend", "yell", "puffy", "nerve", "groin", "terrible", "crazy"],
        game125: ["brick", "exist", "renovation", "apartment", "block", "create", "many", "renovate", "along", "complete", "whose", "village", "centre", "unlike", "mosque", "photograph", "leed"],
        game126: ["sightsee", "itinerary", "summer", "activity", "honeymoon", "expedition", "afternoon", "visitor", "around", "fantastic", "two", "resort", "easy", "northern", "downtown", "worthwhile", "saw"],
        game127: ["car", "exhaust", "honda", "ford", "use", "throttle", "tool", "torque", "ranking", "making", "meta", "functionality", "simply", "tail", "pull", "thousand", "feed"],
        game128: ["crochet", "purse", "yarn", "bandanas", "dress", "beanies", "poncho", "outfit", "quilt", "couture", "chunky", "slack", "reversible", "balaclava", "multicoloured", "mug", "butterfly"],
        game129: ["soda", "dessert", "concoction", "yogurt", "cupcake", "cappuccino", "yummy", "guacamole", "crepes", "frosty", "meal", "yum", "almond", "cauliflower", "stroganoff", "mochi", "churro"],
        game130: ["grape", "blackberry", "juice", "candy", "slice", "cabbage", "corn", "taste", "seed", "cereal", "boil", "yet", "small", "soon", "nicely", "ground", "away"],
        game131: ["hospital", "pediatrician", "health", "pain", "know", "gynecologist", "dr", "telling", "ophthalmologist", "woman", "put", "late", "good", "side", "professor", "injection", "lot"],
        game132: ["ripple", "signal", "sound", "crash", "intensity", "go", "amplitude", "generation", "kind", "create", "use", "drive", "everything", "whereas", "pleasure", "need", "happening"],
        game133: ["result", "due", "bug", "miss", "configuration", "compile", "automatically", "user", "execution", "critical", "though", "understand", "constraint", "answer", "define", "functionality", "anomaly"],
        game134: ["tale", "witch", "whimsical", "godmother", "monster", "frog", "tinker", "mischievous", "god", "peacock", "crystal", "pretend", "polka", "lavender", "night", "undead", "actually"],
        game135: ["wound", "puncture", "circular", "insert", "biopsy", "sock", "ear", "fabric", "winding", "needlepoint", "toothpick", "stem", "eyelet", "interchangeable", "sight", "soap", "tightly"],
        game136: ["monkey", "salamander", "crayfish", "octopus", "mammal", "jump", "fairy", "parrot", "giraffe", "shrimp", "guinea", "rhinoceros", "creek", "mad", "carnivorous", "tune", "guppy"],
        game137: ["flouride", "lotion", "cream", "bleach", "benzoyl", "ointment", "filling", "neutrogena", "pamper", "acne", "carrageenan", "garnier", "compound", "hair", "breath", "ingest", "sud"],
        game138: ["ambulance", "locomotive", "rescue", "uniform", "brigade", "retire", "schoolteacher", "wear", "alert", "wave", "bloke", "fraternal", "uncle", "rollover", "pay", "parent", "constabulary"],
        game139: ["hyena", "warthog", "animal", "quagga", "peacock", "goat", "eland", "print", "mammal", "lamb", "hedgehog", "camo", "triceratops", "crib", "colour", "zulu", "acacia"],
        game140: ["manager", "company", "client", "business", "working", "department", "participant", "health", "contractor", "experience", "patient", "qualify", "temporary", "ultimately", "check", "help", "civil"],
        game141: ["life", "thing", "never", "always", "everything", "together", "truly", "whole", "circle", "truth", "woman", "realize", "often", "lady", "healthy", "pure", "round"],
        game142: ["forget", "think", "tell", "night", "keep", "guess", "though", "making", "probably", "weekend", "whatever", "catching", "reality", "home", "opportunity", "person", "call"],
        game143: ["wonder", "mind", "spiritual", "gentle", "kind", "particular", "earthly", "abundant", "sacred", "know", "realm", "vitamin", "motive", "wondrous", "term", "somehow", "disposition"],
        game144: ["dilemma", "difficulty", "potential", "world", "possible", "important", "involve", "well", "create", "people", "introduce", "journey", "several", "extreme", "include", "simple", "academic"],
        game145: ["crisis", "global", "institution", "europe", "export", "community", "macroeconomic", "consumption", "poor", "globalize", "woe", "stagnant", "reduce", "overseas", "unite", "shortage", "note"],
        game146: ["gift", "store", "mail", "paper", "tin", "carton", "shop", "different", "blank", "send", "pretty", "kid", "cabinet", "unit", "premium", "combination", "luggage"],
        game147: ["nurse", "ambulance", "veterinary", "surgical", "organization", "treatment", "infirmary", "provide", "state", "diagnosis", "pharmaceutical", "maryland", "comprehensive", "carry", "ontario", "francis", "group"],
        game148: ["black", "tiger", "yankee", "phillies", "neon", "oriole", "padre", "marlin", "pitcher", "brilliant", "dusty", "base", "ice", "ivory", "sea", "able", "town"],
        game149: ["nominee", "winning", "recognition", "oscars", "earn", "art", "showcase", "international", "deserve", "design", "school", "past", "entrepreneur", "innovator", "brit", "diversity", "literature"],
        game150: ["sharpen", "axe", "steel", "hand", "sheath", "throw", "forge", "pocketknife", "shovel", "ginsu", "instead", "ball", "hollow", "gouge", "special", "rack", "hole"],
        game151: ["celery", "potato", "spinach", "mushroom", "broth", "turmeric", "dice", "tofu", "bread", "raisin", "shiitake", "coarse", "top", "stalk", "poach", "soda", "cajun"],
        game152: ["episode", "romance", "opera", "story", "series", "fictional", "western", "farce", "intrigue", "subplot", "upcoming", "plotlines", "think", "instrumental", "tell", "ballet", "theatrics"],
        game153: ["spasm", "leg", "joint", "chest", "abdomen", "connective", "bodybuilding", "headache", "spine", "foot", "get", "right", "breath", "rid", "besides", "adipose", "basically"],
        game154: ["pluto", "martian", "planetary", "moonlight", "phobos", "astronomy", "distant", "ocean", "libra", "thing", "never", "howl", "observatory", "nothing", "hear", "enough", "except"],
        game155: ["tread", "firestone", "vehicle", "jeep", "fender", "headlight", "shock", "grip", "driver", "plow", "stock", "radiator", "install", "boat", "entry", "super", "sway"],
        game156: ["wasp", "dragonfly", "termite", "butterfly", "songbird", "mantis", "earwig", "honeybee", "burrow", "pupa", "voracious", "shorebird", "eater", "bark", "cattails", "toil", "omnivore"],
        game157: ["muesli", "yogurt", "rice", "waffle", "raisin", "meat", "quinoa", "crop", "veggie", "pudding", "yummy", "freshly", "mcdonalds", "grass", "hazelnut", "fluffy", "durum"],
        game158: ["chevy", "automobile", "trailer", "dump", "nissan", "pallet", "crane", "plow", "racing", "mud", "stick", "riding", "operator", "manual", "except", "addition", "awesome"],
        game159: ["midnight", "beneath", "twilight", "dawn", "hiding", "visible", "magic", "strange", "beast", "elf", "soft", "doubt", "beginning", "anything", "contrast", "need", "layer"],
        game160: ["worksheet", "freeware", "estimator", "budget", "math", "statistic", "debt", "allow", "tax", "buy", "meter", "modification", "reduction", "student", "desk", "complicate", "bonus"],
        game161: ["stable", "herd", "ride", "equestrian", "filly", "arabian", "rein", "train", "stud", "friesian", "fight", "girl", "talk", "perhaps", "gentle", "finish", "veterinarian"],
        game162: ["galaxy", "celestial", "star", "alien", "astronomy", "nasa", "stellar", "colonize", "possible", "pisces", "nothing", "rising", "massive", "voyage", "next", "leave", "rotation"],
        game163: ["rhubarb", "lemon", "blackberry", "smoothie", "honey", "peanut", "sweet", "yummy", "basil", "roast", "fruity", "dice", "delight", "bakery", "shred", "gin", "clot"],
        game164: ["perennial", "crop", "graze", "meadow", "forbs", "fern", "forest", "yard", "harvest", "mangrove", "thatch", "beneath", "veggies", "moisture", "juniper", "nettle", "unlike"],
        game165: ["satellite", "scope", "nasa", "planetarium", "imaging", "herschel", "interferometer", "robotic", "dome", "diffraction", "flyby", "reflectance", "photon", "emit", "halley", "galilean", "hydroponics"],
        game166: ["chanel", "hermes", "backpack", "jacobs", "shoe", "diaper", "handmade", "sandal", "juicy", "croc", "purple", "dolce", "sleeve", "mcqueen", "pencil", "eyewear", "never"],
        game167: ["crayfish", "halibut", "tuna", "monkfish", "grouper", "ravioli", "whale", "trout", "fishery", "bacon", "tender", "coconut", "lobsterman", "crawdads", "lunch", "bistro", "bluefish"],
        game168: ["condition", "warm", "fahrenheit", "surface", "dry", "observe", "withstand", "characteristic", "generally", "air", "exposure", "different", "meter", "oscillation", "apparent", "remain", "perhaps"],
        game169: ["symbol", "display", "blue", "confederate", "message", "pin", "marking", "place", "indicate", "flash", "emblazon", "many", "umbrella", "lawn", "airplane", "flame", "correct"],
        game170: ["insect", "flutter", "bee", "owl", "yellow", "polka", "snowflake", "stamp", "color", "parrot", "white", "picture", "round", "toad", "look", "swimming", "splash"],
        game171: ["transport", "vehicle", "airport", "road", "operate", "town", "drove", "place", "hour", "allow", "booking", "still", "call", "everyone", "less", "require", "south"],
        game172: ["arcade", "clue", "challenge", "platformer", "piece", "teaser", "cartoon", "intrigue", "matching", "pinball", "found", "customize", "help", "fiction", "quite", "zelda", "read"],
        game173: ["dolphin", "necklace", "spiny", "shark", "pearl", "charm", "rhinestone", "cuff", "daisy", "hibiscus", "leaf", "lapis", "silvery", "decorative", "dune", "gull", "calla"],
        game174: ["cheese", "zucchini", "saute", "cabbage", "olive", "leek", "meat", "lasagna", "oregano", "gorgonzola", "flavorful", "mayonnaise", "powder", "lasagne", "deer", "rib", "nutmeg"],
        game175: ["ballpoint", "notepad", "highlighter", "tweezer", "screwdriver", "steno", "manicure", "calligraphy", "gouache", "blank", "wrench", "mug", "tidy", "melamine", "snot", "savant", "loose"],
        game176: ["album", "folk", "guitar", "performer", "play", "disco", "listen", "like", "rhythm", "event", "enough", "today", "symphonic", "belt", "dylan", "recently", "twist"],
        game177: ["store", "company", "building", "wholesale", "distributor", "automotive", "outside", "refinery", "include", "country", "limit", "nearly", "manual", "far", "standard", "late", "training"],
        game178: ["noodle", "bake", "dish", "appetizer", "linguine", "potato", "quinoa", "broccoli", "pork", "butter", "salt", "kale", "brownie", "ham", "poultry", "ragout", "andouille"],
        game179: ["shostakovich", "quartet", "cello", "composer", "overture", "handel", "serenade", "rhapsody", "composition", "saxophone", "accompaniment", "rehearsal", "portland", "ninth", "macabre", "bohemian", "ep"],
        game180: ["forget", "enchant", "valuable", "adventure", "lose", "cherish", "magnificent", "marvelous", "history", "untold", "plenty", "celebrate", "way", "nothing", "halloween", "titanic", "breathtaking"],
        game181: ["beverage", "chocolate", "cafe", "sandwich", "sip", "spice", "tasty", "cake", "ingredient", "truffle", "grain", "import", "one", "ferment", "teabags", "healthy", "thing"],
        game182: ["barbie", "dora", "creature", "dragon", "vampire", "storybook", "ocean", "jellyfish", "skeleton", "fancy", "castaway", "moon", "grecian", "cherub", "zodiac", "smurfs", "sealife"],
        game183: ["beetle", "squirrel", "mite", "arachnid", "robot", "crab", "poisonous", "poison", "tiny", "unicorn", "really", "shadow", "hummingbird", "goliath", "back", "blast", "space"],
        game184: ["horror", "thriller", "documentary", "screwball", "performance", "romance", "theater", "entertain", "witty", "adventure", "helm", "literature", "villain", "entertainer", "revenge", "escapism", "thrill"],
        game185: ["trainer", "weight", "training", "spa", "bodybuilding", "cafeteria", "coach", "salon", "cheerleading", "hairdresser", "body", "look", "run", "woman", "anymore", "apartment", "backpack"],
        game186: ["banjo", "keyboard", "saxophone", "gibson", "play", "synthesizer", "strat", "songwriting", "dobro", "rickenbacker", "cutaway", "joe", "tom", "brian", "improvise", "definitely", "pete"],
        game187: ["decal", "mug", "attach", "novelty", "place", "postcard", "print", "ornament", "movable", "crystal", "binder", "making", "pencil", "energy", "square", "lure", "hematite"],
        game188: ["potato", "hatch", "duck", "sauce", "pancake", "ingredient", "beef", "avocado", "cereal", "stuff", "tbsp", "granulated", "germ", "like", "two", "cider", "trout"],
        game189: ["cake", "zucchini", "peach", "berry", "cheese", "pepper", "blueberry", "witch", "sugar", "favorite", "pomegranate", "crush", "snow", "fish", "mask", "monster", "relish"],
        game190: ["receive", "alphabet", "copy", "address", "form", "must", "mailing", "blank", "greeting", "recommendation", "without", "section", "see", "money", "draft", "typing", "teacher"],
        game191: ["narrative", "fact", "one", "article", "fascinate", "though", "recent", "never", "early", "continue", "historical", "secret", "full", "relationship", "finding", "tom", "essay"],
        game192: ["pbs", "commercial", "theatrical", "docudrama", "history", "groundbreaking", "biography", "producer", "autobiography", "critically", "provocative", "view", "politic", "original", "seminal", "candid", "host"],
        game193: ["engagement", "crystal", "chain", "pearl", "fancy", "bridal", "pair", "cuff", "rose", "end", "four", "feature", "usually", "line", "next", "navel", "roll"],
        game194: ["equity", "buy", "nasdaq", "profit", "dollar", "currency", "low", "look", "limit", "except", "start", "number", "yen", "half", "tech", "excellent", "transaction"],
        game195: ["build", "structure", "rail", "roadway", "shore", "wall", "gap", "downtown", "past", "make", "fire", "hope", "important", "crew", "stop", "car", "really"],
        game196: ["halloween", "ninja", "zombie", "bandit", "skull", "bounty", "crew", "kid", "navy", "night", "notorious", "mets", "mighty", "rob", "castle", "mlb", "version"],
        game197: ["corridor", "crossing", "underpass", "port", "roadway", "junction", "subterranean", "alley", "cavernous", "loop", "router", "ground", "downtown", "haunt", "airport", "mouth", "surround"],
        game198: ["iss", "soyuz", "pilot", "hubble", "gagarin", "gemini", "asteroid", "ksc", "land", "pluto", "human", "naval", "disembark", "stan", "usn", "wound", "doctor"],
        game199: ["theatre", "rossini", "symphonic", "beethoven", "shakespeare", "cabaret", "melodrama", "teatro", "renaissance", "classic", "sinfonia", "well", "goethe", "spectacle", "since", "currently", "one"],
        game200: ["bodybuilding", "jog", "weightlifting", "trainer", "drill", "body", "motivation", "coach", "regular", "conditioning", "spar", "prepare", "entire", "recommend", "bicycle", "exhaust", "planning"],
        game201: ["hotel", "steakhouse", "diner", "lunch", "nightlife", "inn", "steak", "mcdonald", "cook", "best", "hostel", "several", "traveler", "similar", "beachfront", "setting", "chili"],
        game202: ["urchin", "eel", "starfish", "coral", "creature", "tadpole", "invertebrate", "butterfly", "amoeba", "ladybug", "flatworm", "hermaphrodite", "eater", "sambal", "iceberg", "moth", "tattoo"],
        game203: ["sea", "lion", "orca", "catch", "giant", "saltwater", "lizard", "starfish", "hawk", "eat", "habitat", "lightning", "ever", "sport", "heron", "thought", "able"],
        game204: ["shuttle", "route", "airway", "runway", "station", "laguardia", "office", "airplane", "town", "limousine", "night", "mccarran", "book", "throughout", "geneva", "kathmandu", "campground"],
        game205: ["hitch", "premiere", "tractor", "theater", "story", "duty", "still", "motorcycle", "game", "listing", "multiplayer", "original", "driving", "tanker", "zombie", "battleship", "add"],
        game206: ["silverware", "teaspoon", "jug", "tablespoon", "sugar", "napkin", "stick", "jig", "pyrex", "soda", "souvenir", "snack", "sherbet", "towel", "claw", "wood", "styrofoam"],
        game207: ["lakers", "golden", "sunset", "afternoon", "sunday", "wed", "spot", "friday", "even", "playoff", "enough", "weekend", "atlanta", "fell", "despite", "taking", "phillies"],
        game208: ["freeway", "town", "delhi", "mrt", "underground", "school", "intercity", "rio", "heathrow", "va", "sta", "tier", "demand", "carrier", "nation", "porto", "aug"],
        game209: ["report", "tell", "presentation", "show", "journalist", "regard", "jeff", "producer", "stewart", "opportunity", "say", "taking", "air", "draw", "couple", "george", "judge"],
        game210: ["khufu", "triangle", "tower", "stupa", "cave", "ziggurat", "atop", "wonder", "cone", "pharaonic", "world", "old", "mayans", "kingdom", "remain", "nubia", "etruscan"],
        game211: ["ink", "emboss", "mint", "souvenir", "collector", "alphabet", "unused", "dollar", "pen", "roll", "patriotic", "folder", "backing", "currency", "gorgeous", "etc", "bag"],
        game212: ["cargo", "crew", "dispatch", "submarine", "tanker", "delivery", "usually", "launch", "small", "save", "missile", "america", "instead", "known", "dangerous", "fisherman", "life"],
        game213: ["sound", "amplifier", "spoke", "listen", "conference", "stand", "tweeter", "electronic", "plug", "podium", "main", "compact", "pro", "tell", "preamp", "thought", "direct"],
        game214: ["jar", "honey", "marmalades", "sweet", "bake", "cinnamon", "pineapple", "sour", "currant", "melon", "stick", "luscious", "flavoring", "tuna", "ganache", "tahitian", "walnut"],
        game215: ["entree", "veggie", "tasty", "potato", "fry", "noodle", "condiment", "bacon", "hamburger", "spice", "tapa", "lamb", "oatmeal", "healthy", "crock", "gelato", "side"],
        game216: ["ball", "team", "bowl", "eagle", "championship", "colt", "box", "packer", "cup", "win", "running", "bama", "cleveland", "philadelphia", "much", "vol", "prospect"],
        game217: ["horse", "calf", "deer", "slaughter", "eat", "farmer", "holstein", "wheat", "pregnant", "hide", "offspring", "bring", "zebra", "girl", "money", "need", "indeed"],
        game218: ["photo", "notecards", "letter", "printing", "photographic", "art", "flier", "sign", "canvas", "novelty", "historic", "inspirational", "cityscape", "americana", "motivational", "folder", "girl"],
        game219: ["sustainability", "solution", "opportunity", "pioneer", "business", "strategic", "practice", "introduce", "enterprise", "encourage", "world", "increase", "regional", "valuable", "framework", "stakeholder", "wealth"],
        game220: ["mean", "thought", "vocabulary", "term", "describe", "wrong", "definition", "simply", "need", "ask", "bad", "world", "history", "whenever", "copy", "best", "music"],
        game221: ["mind", "anger", "see", "guilt", "want", "tire", "whatever", "bad", "sensation", "suddenly", "convince", "completely", "tend", "taking", "personal", "relieve", "helping"],
        game222: ["salami", "bake", "onion", "patty", "hamburger", "bread", "vegetable", "bun", "grit", "quiche", "sprout", "cake", "antipasto", "satay", "hog", "fish", "concoction"],
        game223: ["vocabulary", "literature", "writing", "teaching", "bilingual", "expression", "term", "study", "sanskrit", "catalan", "working", "page", "part", "known", "structure", "provide", "article"],
        game224: ["sleep", "futon", "twin", "cottage", "headboard", "kitchen", "rent", "curtain", "wood", "basement", "bookcase", "cleaning", "wide", "bamboo", "thick", "fridge", "suitable"],
        game225: ["sitting", "bookshelf", "iron", "pedestal", "lounge", "lobby", "bed", "television", "downstairs", "task", "patio", "small", "arm", "bring", "hard", "hospitality", "desktops"],
        game226: ["galaxy", "jupiter", "mars", "interstellar", "hubble", "particle", "orbiter", "tsunami", "eruption", "herschel", "spider", "detect", "mysterious", "worm", "magnitude", "submarine", "saturnian"],
        game227: ["laboratory", "theoretical", "insight", "expertise", "experimental", "statistical", "medicine", "technical", "thesis", "ongoing", "fieldwork", "examination", "different", "scientifically", "ethic", "lecturer", "skill"],
        game228: ["ice", "glacial", "ocean", "humpback", "floe", "tower", "lava", "ripple", "bluefin", "dip", "spot", "porpoise", "aegean", "watermelon", "coastal", "wash", "radish"],
        game229: ["creative", "modern", "feature", "construction", "product", "development", "fit", "solution", "also", "particular", "installation", "garden", "finish", "often", "commercial", "knowledge", "nice"],
        game230: ["see", "moon", "rate", "scene", "love", "stellar", "premiere", "club", "jennifer", "never", "ryan", "brilliant", "sexy", "host", "carter", "west", "derek"],
        game231: ["sitting", "alone", "comfortable", "sit", "even", "walk", "think", "beside", "sure", "girl", "besides", "stuff", "old", "therapy", "kitty", "wet", "leg"],
        game232: ["relaxation", "relax", "ayurvedic", "masseur", "parlor", "fitness", "chiropractor", "cupping", "hairdresser", "exotic", "yoni", "sport", "plus", "adult", "childbirth", "forehead", "eat"],
        game233: ["breakdown", "record", "forecast", "spreadsheet", "calendar", "comparison", "stats", "sample", "change", "song", "rising", "though", "right", "abstract", "come", "every", "column"],
        game234: ["crab", "mammal", "shellfish", "reef", "coral", "snail", "jellyfish", "catching", "critter", "hungry", "bacteria", "often", "tiny", "make", "far", "rod", "feeder"],
        game235: ["manicure", "bridal", "cosmetology", "hairstylists", "dentist", "office", "manicurist", "locate", "designer", "ca", "arden", "grocery", "newport", "inn", "vega", "face", "metro"],
        game236: ["focus", "vibrational", "channel", "positive", "element", "technology", "intensity", "emotion", "emotional", "develop", "mineral", "passion", "government", "around", "commitment", "precious", "motivation"],
        game237: ["inhabit", "america", "span", "americas", "travel", "diverse", "glacier", "boundary", "million", "cross", "civilisation", "thus", "along", "cultivate", "era", "civilize", "seemingly"],
        game238: ["win", "football", "soccer", "xbox", "even", "betting", "one", "chess", "slot", "place", "story", "wo", "friday", "internet", "city", "along", "sort"],
        game239: ["brownie", "pumpkin", "wedding", "yummy", "homemade", "scone", "sandwich", "delectable", "centerpiece", "spice", "marshmallow", "plate", "dressing", "mum", "together", "nice", "entree"],
        game240: ["crispy", "coleslaw", "hotdog", "onion", "ketchup", "steam", "carrot", "meatloaf", "tater", "mozzarella", "chorizo", "olive", "broth", "bland", "artichoke", "belgian", "penne"],
        game241: ["amino", "cell", "chemically", "synthesis", "membrane", "adsorb", "residue", "binding", "reaction", "emit", "carbon", "polymerization", "intercellular", "ionization", "object", "polymorphism", "decrease"],
        game242: ["anniversary", "romantic", "themed", "celebrate", "balloon", "sweet", "favor", "mom", "freebie", "decor", "unique", "saturday", "chrismas", "template", "rainbow", "magical", "saint"],
        game243: ["liquid", "pollution", "petroleum", "pollutant", "hydrocarbon", "reduce", "pressurize", "nox", "pollute", "methanol", "industry", "range", "present", "condensation", "buildup", "fertilizer", "move"],
        game244: ["moisturize", "deodorant", "toothpaste", "antibacterial", "scrub", "tea", "dish", "makeup", "fragrant", "jar", "food", "utensil", "recipe", "litter", "rid", "buttermilk", "vaseline"],
        game245: ["plant", "pink", "butterfly", "colorful", "flowering", "hibiscus", "sunflower", "bright", "florals", "small", "fabulous", "artificial", "evening", "forest", "every", "doll", "theme"],
        game246: ["sponge", "broom", "eyeshadow", "airbrush", "cloth", "tip", "tool", "edge", "lash", "cleanser", "suction", "extension", "apron", "floor", "shiny", "sew", "combination"],
        game247: ["star", "supernova", "moon", "cosmic", "telescope", "pulsar", "titan", "intergalactic", "vortex", "kepler", "molecule", "however", "generation", "first", "available", "jovian", "camera"],
        game248: ["waterway", "ocean", "dam", "canal", "danube", "northern", "park", "rapid", "picturesque", "spring", "sky", "blue", "sewage", "steelhead", "blood", "texas", "ecosystem"],
        game249: ["bin", "discard", "destroy", "closet", "debris", "slam", "haul", "eat", "filthy", "unceremoniously", "whine", "turn", "stash", "firewood", "supposedly", "styrofoam", "fake"],
        game250: ["earth", "gulf", "oceanic", "forest", "sky", "mountain", "estuary", "tropic", "rock", "atlantis", "marina", "wild", "subtropical", "escape", "wood", "gravity", "perhaps"],
        game251: ["livestock", "pig", "elephant", "cattle", "insect", "plant", "behavior", "different", "cartoon", "keep", "ever", "planet", "perhaps", "humanity", "extinct", "walk", "commonly"],
        game252: ["meal", "dorm", "supermarket", "facility", "sandwich", "kitchen", "toilet", "foodservice", "serve", "stall", "bartender", "location", "saturday", "entryways", "veggie", "curriculum", "croissant"],
        game253: ["doorway", "floor", "crowd", "dimly", "closet", "space", "light", "corner", "brightly", "strew", "antechamber", "illuminate", "smelly", "ledge", "facility", "past", "swimming"],
        game254: ["boar", "sheep", "antler", "herd", "goose", "meadow", "grouse", "oak", "rifle", "tiger", "dnr", "michigan", "paw", "view", "hickory", "village", "arctic"],
        game255: ["polyethylene", "glass", "polypropylene", "product", "industrial", "coating", "hdpe", "extrude", "laminate", "label", "carton", "consumer", "dye", "grade", "household", "lens", "top"],
        game256: ["verb", "linguistic", "translation", "parser", "grammer", "intonation", "lexicography", "sanskrit", "algebraic", "nonstandard", "uml", "glossary", "poetry", "metaphysics", "bilingual", "infinitive", "cyrillic"],
        game257: ["casserole", "appetizer", "bake", "veggies", "minestrone", "burger", "snack", "yogurt", "hummus", "tortilla", "lasagne", "veal", "chop", "linguine", "honey", "pantry", "refresh"],
        game258: ["kindergarten", "geography", "chemistry", "curriculum", "skill", "subtraction", "pupil", "tuition", "gmat", "grad", "essay", "speak", "require", "schoolwork", "sum", "thesis", "vedic"],
        game259: ["ensuite", "tile", "sink", "kitchenette", "furnishing", "cupboard", "pool", "interior", "detach", "conservatory", "slipper", "laminate", "stone", "idea", "motel", "minimalist", "functional"],
        game260: ["kitchen", "sanitary", "drain", "towel", "plumb", "waste", "drink", "dispenser", "tank", "empty", "stainless", "people", "conditioning", "lock", "pet", "ideal", "terrace"],
        game261: ["sport", "league", "champion", "rugby", "theater", "museum", "facility", "cleveland", "world", "university", "anfield", "new", "inaugural", "centre", "one", "rally", "goodison"],
        game262: ["education", "music", "work", "artwork", "exhibit", "modern", "educational", "public", "include", "addition", "research", "beautiful", "news", "asian", "rather", "phoenix", "french"],
        game263: ["stairway", "room", "wheelchair", "handicap", "carpark", "access", "jacuzzi", "fireplace", "restaurant", "indoor", "locate", "deposit", "cart", "thruster", "aisle", "panoramic", "lead"],
        game264: ["monitoring", "process", "device", "information", "power", "need", "unit", "within", "critical", "mechanism", "user", "manual", "learning", "result", "useful", "global", "scientific"],
        game265: ["donkey", "boar", "farm", "deer", "feta", "olive", "buffalo", "venison", "bunny", "bear", "banana", "avocado", "cider", "desert", "pear", "kind", "freshly"],
        game266: ["fridge", "kitchenaid", "electrolux", "utensil", "bosch", "compactor", "crockery", "heating", "wardrobe", "carafe", "conveyor", "sainsburys", "halogen", "franke", "lawnmower", "residential", "shutoff"],
        game267: ["orthodontics", "hygienist", "chiropractic", "brace", "dermatology", "urologist", "gastroenterologist", "surgical", "health", "firm", "clinical", "afford", "provide", "ct", "houston", "department", "appraiser"],
        game268: ["gorilla", "whale", "baboon", "turtle", "horse", "pig", "circus", "ivory", "elk", "rescue", "temple", "around", "toad", "massive", "hog", "nothing", "might"],
        game269: ["bliss", "feeling", "sense", "laughter", "mind", "inspiration", "loneliness", "delight", "achieve", "patience", "sanity", "bless", "heavenly", "individual", "celebrate", "hopefully", "often"],
        game270: ["synths", "keypad", "instrument", "string", "button", "hardware", "typewriter", "pedal", "console", "instrumental", "track", "combination", "simply", "need", "equipment", "studio", "reason"],
        game271: ["wildlife", "wilderness", "farmland", "plantation", "hill", "grove", "village", "garden", "cedar", "recreation", "autumn", "shore", "misty", "walk", "willow", "ravine", "must"],
        game272: ["porpoise", "miami", "coral", "octopus", "buccaneer", "zoo", "beach", "colt", "surf", "taiji", "henne", "komodo", "happy", "highlight", "discover", "though", "sun"],
        game273: ["trout", "shine", "neon", "dream", "salmon", "swirl", "fairy", "twilight", "white", "brown", "moonstone", "weird", "thing", "tropical", "borealis", "shark", "delight"],
        game274: ["view", "feature", "beautiful", "collage", "pix", "archive", "site", "description", "taking", "free", "old", "photoshop", "different", "miss", "large", "hilton", "wild"],
        game275: ["freight", "passenger", "transit", "take", "operate", "journey", "work", "one", "instead", "class", "connect", "find", "easy", "major", "via", "include", "whilst"],
        game276: ["wheel", "gear", "pack", "picnic", "schoolbag", "travel", "tent", "shirt", "binoculars", "pink", "cinch", "shopper", "grey", "everest", "fun", "snowboarding", "come"],
        game277: ["motorola", "gps", "device", "ringtones", "landlines", "headset", "sprint", "att", "softwares", "enable", "answer", "cyber", "download", "rumor", "wo", "adapter", "msn"],
        game278: ["pillowcase", "bedspread", "sham", "decor", "chair", "pad", "velvet", "patchwork", "hammock", "inflatable", "armchair", "luggage", "pair", "princess", "purse", "waffle", "sure"],
        game279: ["campaign", "offering", "opportunity", "product", "prize", "publicity", "benefit", "commission", "update", "seo", "rebate", "etc", "showcase", "affordable", "position", "due", "friendly"],
        game280: ["brush", "hygiene", "colgate", "rinse", "braun", "scissor", "toy", "dishwashing", "bath", "brite", "crown", "worm", "candy", "gadget", "washbasin", "bedclothes", "mixer"],
        game281: ["short", "knitting", "wool", "warmer", "beanie", "pair", "crochet", "sleeve", "outfit", "adorable", "fuzzy", "drawstring", "sheer", "swap", "kitty", "wonderful", "bow"],
        game282: ["biomedical", "institute", "sociology", "scientist", "undergraduate", "geography", "lecture", "introduction", "system", "conference", "doctorate", "publish", "oncology", "logic", "working", "virology", "people"],
        game283: ["preamp", "transmitter", "input", "noise", "acoustic", "listen", "tripod", "switch", "cord", "lens", "pc", "adjust", "back", "binaural", "doorbell", "clear", "another"],
        game284: ["decoration", "decorative", "lavender", "cake", "flower", "chanukah", "hanging", "wholesale", "shape", "gel", "cream", "incandescent", "diy", "specially", "bayberry", "dance", "edible"],
        game285: ["leaf", "flowering", "oak", "bird", "blossom", "green", "around", "cherry", "several", "everywhere", "lovely", "trimming", "upon", "snowy", "happy", "never", "dot"],
        game286: ["tempera", "freehand", "bluebonnets", "sponge", "painting", "cloth", "sprayer", "grungy", "horsehair", "finger", "arrowhead", "ballpoint", "reapply", "earthenware", "hatchet", "hyssop", "celluloid"],
        game287: ["bangle", "handmade", "silver", "cufflink", "plate", "wholesale", "garnet", "gem", "purple", "silk", "tie", "exquisite", "copper", "cord", "cut", "girl", "print"],
        game288: ["cobol", "compiler", "delphi", "experience", "dev", "interpreter", "novice", "graphical", "functionality", "debugger", "expect", "producer", "season", "dbms", "straightforward", "though", "architecture"],
        game289: ["bag", "valentine", "cake", "bucket", "good", "ornament", "craft", "furniture", "pick", "product", "quilt", "umbrella", "delightful", "bloom", "shelve", "dog", "grandma"],
        game290: ["stair", "entrance", "rear", "curtain", "ceiling", "shut", "turn", "fence", "need", "left", "small", "push", "within", "help", "folding", "stainless", "nice"],
        game291: ["mens", "suede", "flop", "ankle", "flat", "slip", "jacket", "stylish", "tom", "wardrobe", "garment", "eva", "shoelace", "better", "lacoste", "candy", "haan"],
        game292: ["compute", "sun", "dark", "light", "cluster", "surrounding", "background", "sea", "thunder", "sphere", "interstellar", "meteor", "application", "forth", "knowledge", "collaboration", "clearing"],
        game293: ["cyborgs", "automate", "mecha", "ninja", "autonomous", "war", "evil", "electronic", "thing", "design", "object", "something", "best", "easy", "modern", "multiple", "exoskeleton"],
        game294: ["budgie", "pigeon", "animal", "lizard", "pet", "hyacinth", "dove", "exotic", "colorful", "albino", "jungle", "dodo", "large", "flutter", "neotropical", "pebble", "rica"],
        game295: ["illuminate", "shade", "headlight", "smoke", "strobe", "green", "window", "brightness", "outdoor", "dash", "nothing", "less", "perhaps", "tree", "base", "suppose", "electronic"],
        game296: ["crockery", "boil", "skillet", "brew", "bunn", "bowl", "stainless", "mug", "bbq", "pail", "coleman", "warm", "torch", "lukewarm", "wheelbarrow", "hotdog", "filling"],
        game297: ["deodorant", "chanel", "burberry", "incense", "fragrant", "balm", "product", "intoxicate", "perfumer", "accessory", "bag", "collection", "mens", "aloe", "souvenir", "salve", "insecticide"],
        game298: ["soldier", "shipwreck", "yacht", "nautical", "skipper", "capture", "ocean", "kayaker", "retire", "scout", "whale", "thousand", "miner", "greek", "board", "maid", "pow"],
        game299: ["caldera", "arenal", "volcanism", "extinct", "himalayas", "reef", "tectonics", "kilimanjaro", "scenery", "machu", "montserrat", "icelandic", "rage", "national", "world", "cambrian", "sceneries"],
        game300: ["oreo", "dessert", "shortbread", "oatmeal", "toast", "yummy", "pancake", "easter", "gift", "grandma", "place", "baker", "applesauce", "scratch", "really", "tiny", "click"],
        game301: ["rectangle", "along", "center", "ring", "eye", "spot", "shadow", "making", "create", "star", "get", "take", "similar", "ten", "break", "cube", "pearl"],
        game302: ["toupee", "headband", "extension", "outfit", "fur", "corset", "eyebrow", "flapper", "womens", "shirt", "clip", "locs", "natural", "barrette", "redhead", "stuff", "freak"],
        game303: ["presbyterian", "chapel", "parish", "clergy", "prayer", "place", "jewish", "ecumenical", "office", "youth", "cross", "downtown", "presbytery", "gather", "islamic", "activity", "rector"],
        game304: ["brace", "bite", "smile", "skin", "grind", "lip", "incisor", "infection", "peroxide", "procedure", "result", "hence", "pull", "impact", "hammer", "around", "alone"],
        game305: ["granola", "strawberry", "spinach", "cereal", "peanut", "banana", "flavor", "quinoa", "tangy", "tablespoon", "beetroot", "meal", "freshly", "blackberry", "cupcake", "basmati", "dijon"],
        game306: ["vacationer", "travel", "restaurant", "vicinity", "lodging", "arrive", "taxi", "overseas", "discover", "activity", "interest", "influx", "come", "enough", "conveniently", "trail", "generally"],
        game307: ["lip", "sneeze", "hand", "shoulder", "neck", "cheekbone", "skin", "snot", "breast", "thumb", "push", "cross", "badly", "bottom", "cry", "wiggle", "somewhat"],
        game308: ["webmail", "groupwise", "retrieve", "password", "locker", "door", "sender", "postfix", "incoming", "display", "organizer", "cache", "deco", "accessible", "create", "allow", "migration"],
        game309: ["balsamic", "roast", "spinach", "eggplant", "grape", "vinaigrette", "pasta", "grill", "honey", "red", "margarine", "barley", "harvest", "casserole", "greek", "instead", "powder"],
        game310: ["compartment", "bedside", "box", "divider", "hinge", "sink", "cubbies", "adjustable", "corner", "counter", "futon", "leather", "finger", "velcro", "compact", "cube", "ottoman"],
        game311: ["pear", "apple", "avocado", "melon", "juice", "olive", "lychee", "honeydew", "fennel", "pork", "cheesecake", "marmalade", "anchovy", "crunchy", "ounce", "husk", "appetizer"],
        game312: ["bay", "rhode", "cape", "harbor", "place", "oahu", "southeast", "east", "region", "along", "shoreline", "living", "enjoy", "tuvalu", "become", "name", "establish"],
        game313: ["quail", "waterfowl", "bear", "rooster", "cow", "dog", "chick", "hunter", "anaheim", "ruddy", "even", "apparently", "famous", "poop", "feeder", "fluffy", "also"],
        game314: ["mansion", "haunt", "manor", "abbey", "scotland", "mediaeval", "tomb", "ireland", "majestic", "crusader", "inverness", "discover", "cinderella", "colourful", "pine", "dot", "rolling"],
        game315: ["petal", "branch", "fresh", "orange", "bloom", "herb", "small", "flowering", "maple", "celery", "corn", "surface", "harvest", "body", "soon", "magnolia", "sky"],
        game316: ["mortar", "wooden", "plaster", "wood", "patio", "kiln", "pillar", "ceramic", "inside", "flat", "pour", "planter", "tumble", "dark", "stuccoed", "add", "good"],
        game317: ["hottie", "cherry", "peach", "cocoa", "bee", "cuties", "delicious", "blond", "pepper", "goodness", "nubile", "cranberry", "delectable", "whole", "brooke", "gloss", "single"],
        game318: ["wheel", "purse", "crate", "stow", "valuable", "drawer", "carton", "oversize", "trash", "large", "discard", "gusset", "full", "handle", "hallway", "accoutrement", "leg"],
        game319: ["trombone", "tenor", "concerto", "string", "tuba", "accompaniment", "vocal", "virtuoso", "continuo", "sextet", "arrange", "mendelssohn", "recording", "kazoos", "cup", "pearl", "partita"],
        game320: ["sandwich", "breakfast", "bread", "omelette", "grit", "fudge", "bun", "brownie", "nachos", "choc", "meal", "condiment", "basket", "tapioca", "potatoe", "soy", "mmm"],
        game321: ["wrap", "scarf", "suit", "two", "fit", "cotton", "three", "perfect", "might", "try", "mean", "point", "jersey", "boy", "weekend", "dark", "raise"],
        game322: ["fit", "kitchen", "armoires", "bookcase", "upstairs", "tile", "shower", "decor", "sleek", "dishwasher", "collection", "tub", "ideal", "skirting", "spare", "mismatch", "couture"],
        game323: ["america", "religious", "education", "people", "exist", "national", "educational", "ethic", "important", "literary", "liberal", "part", "scientist", "progress", "sometimes", "vital", "philanthropy"],
        game324: ["orchestra", "mandolin", "flute", "melody", "piece", "classical", "value", "row", "byte", "str", "regular", "path", "part", "voice", "pedal", "sonata", "exact"],
        game325: ["last", "endure", "happiness", "faith", "gratitude", "encouragement", "fun", "respect", "confidence", "idea", "coworker", "past", "somehow", "mentorship", "participation", "ongoing", "anything"],
        game326: ["tin", "cook", "spatula", "bundt", "crust", "foil", "stove", "platter", "meat", "glaze", "wash", "powder", "shape", "full", "eggplant", "apron", "storage"],
        game327: ["topo", "guide", "geography", "description", "geographical", "usgs", "base", "available", "local", "help", "give", "earth", "graphic", "follow", "via", "date", "vacation"],
        game328: ["traffic", "turnpike", "railroad", "northbound", "thoroughfare", "mile", "north", "river", "amtrak", "national", "mountain", "nw", "within", "approach", "governor", "construct", "almost"],
        game329: ["track", "classical", "instrumentals", "piano", "audio", "singer", "funk", "performance", "enjoy", "choir", "showcase", "belong", "whatever", "legend", "bach", "app", "lp"],
        game330: ["jacquard", "cashmere", "ivory", "tulle", "dress", "drape", "knit", "bridal", "sequined", "fur", "shantung", "corset", "felted", "mulberry", "napkin", "bloom", "peruvian"],
        game331: ["strawberry", "pepper", "tomato", "pomegranate", "parsley", "sugar", "grape", "grate", "pumpkin", "mushroom", "nut", "seedless", "seasoning", "bowl", "steak", "cocktail", "make"],
        game332: ["titanium", "aluminum", "work", "zinc", "hot", "wooden", "stove", "inch", "ore", "bed", "gold", "equip", "must", "furniture", "belt", "premium", "superman"]
    }

    const filesToClear = ['contexto_responses_dict.json', 'winning_word.json'];

    const browser = await puppeteer.launch({
        headless: false,
        args: [`--window-size=1100,850`],
        timeout: 0
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1000,
        height: 700,
        deviceScaleFactor: 1,
    });

    // const startTime = new Date();

    try {

        await page.goto('https://contexto.me/', { timeout: 8000 });

    } catch (e) {
        console.log('Nav failed')
        process.exit()
    }

    //await page.addScriptTag({url: 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.3.1'});

    await page.click('.btn');
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));
    await page.evaluate(() => {
        document.querySelectorAll(".menu-item")[3].click()
        document.querySelector(".modal").style.width = "200px"
        document.querySelector(".modal").style.marginLeft = "256px"
    });
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

    var randGame = await page.evaluate(() => {
        var randNumber = -1;
        while (randNumber === -1 || randNumber === 0 || randNumber === 217 || randNumber === 249 || randNumber === 251 ||
            randNumber === 25 || randNumber === 27 || randNumber === 33 || randNumber === 199 || randNumber === 106) {
            randNumber = Math.floor(Math.random() * 299)
        }
        
        var game = "";
        
        var modal = document.querySelector(".modal"); // Select the element with class .modal
        if(modal !== null){
        var divs = modal.getElementsByTagName("div"); // Get all div elements within the modal
        for(var i = 0; i < divs.length; i++) {
            if(divs[i].innerText.trim() === ("#"+randNumber).toString()) { // Compare the trimmed innerText with "#1"
            game = randNumber.toString()
            divs[i].click(); // Click on the div if its innerText equals "#1"
            break;
            }
        }
        }
        return game
    });

    const filename = './currGame.txt';
    fs.writeFile(filename, randGame, (err) => {
        if (err) throw err;
        console.log('Text saved to file!');
    });

    //check winner file
    const winFile = 'wins.txt';
    let winCounts = {};

    console.log('passed nav')

    // Get the info-bar element
    const infoBar = await page.$('.info-bar');

    // Get the first two children of the info-bar element
    const children = await infoBar.$$('*:nth-child(-n+2)');

    // Remove the first two children of the info-bar element
    for (const child of children) {
        await page.evaluate((el) => el.style.display = "none", child);
    }

    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5000)));

    // await page.addStyleTag({
    //     content: `
    //         .row span:first-child {
    //             flex: auto;
    //         }
    //     `
    //     });

    // Create a container div for the images
    await page.addScriptTag({
        content: `
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.id = 'image-container';
            container.style.top = '200px';
            container.style.left = '100px';
            container.style.width = '200px';
            container.style.overflow = 'hidden'; // hide overflow
            container.style.animation = 'scrolling 50s linear infinite'; // add scrolling animation
            document.body.appendChild(container);
        `
        });

        await page.addScriptTag({
            content: `
            const leaderboard = document.createElement('div');
            leaderboard.style.position = 'absolute';
            leaderboard.id = 'leaderboard';
            leaderboard.style.top = '1px';
            leaderboard.style.left = '93px';
            leaderboard.style.width = '164px';
            leaderboard.style.height = '200px';
            leaderboard.style.backgroundColor = '#fffbf5';
            leaderboard.style.position = 'absolute';
            leaderboard.style.zIndex = '1';
            document.body.appendChild(leaderboard);
        `
        });

        const scriptContent = `
        var random = Math.random
        , cos = Math.cos
        , sin = Math.sin
        , PI = Math.PI
        , PI2 = PI * 2
        , timer = undefined
        , frame = undefined
        , confetti = [];

    var particles = 10
        , spread = 10
        , sizeMin = 3
        , sizeMax = 12 - sizeMin
        , eccentricity = 10
        , deviation = 100
        , dxThetaMin = -.1
        , dxThetaMax = -dxThetaMin - dxThetaMin
        , dyMin = .13
        , dyMax = .18
        , dThetaMin = .4
        , dThetaMax = .7 - dThetaMin;

    var colorThemes = [
        function() {
        return color(200 * random()|0, 200 * random()|0, 200 * random()|0);
        }, function() {
        var black = 200 * random()|0; return color(200, black, black);
        }, function() {
        var black = 200 * random()|0; return color(black, 200, black);
        }, function() {
        var black = 200 * random()|0; return color(black, black, 200);
        }, function() {
        return color(200, 100, 200 * random()|0);
        }, function() {
        return color(200 * random()|0, 200, 200);
        }, function() {
        var black = 256 * random()|0; return color(black, black, black);
        }, function() {
        return colorThemes[random() < .5 ? 1 : 2]();
        }, function() {
        return colorThemes[random() < .5 ? 3 : 5]();
        }, function() {
        return colorThemes[random() < .5 ? 2 : 4]();
        }
    ];
    function color(r, g, b) {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    // Cosine interpolation
    function interpolation(a, b, t) {
        return (1-cos(PI*t))/2 * (b-a) + a;
    }

    // Create a 1D Maximal Poisson Disc over [0, 1]
    var radius = 1/eccentricity, radius2 = radius+radius;
    function createPoisson() {
        // domain is the set of points which are still available to pick from
        // D = union{ [d_i, d_i+1] | i is even }
        var domain = [radius, 1-radius], measure = 1-radius2, spline = [0, 1];
        while (measure) {
        var dart = measure * random(), i, l, interval, a, b, c, d;

        // Find where dart lies
        for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
            a = domain[i], b = domain[i+1], interval = b-a;
            if (dart < measure+interval) {
            spline.push(dart += a-measure);
            break;
            }
            measure += interval;
        }
        c = dart-radius, d = dart+radius;

        // Update the domain
        for (i = domain.length-1; i > 0; i -= 2) {
            l = i-1, a = domain[l], b = domain[i];
            // c---d          c---d  Do nothing
            //   c-----d  c-----d    Move interior
            //   c--------------d    Delete interval
            //         c--d          Split interval
            //       a------b
            if (a >= c && a < d)
            if (b > d) domain[l] = d; // Move interior (Left case)
            else domain.splice(l, 2); // Delete interval
            else if (a < c && b > c)
            if (b <= d) domain[i] = c; // Move interior (Right case)
            else domain.splice(i, 0, c, d); // Split interval
        }

        // Re-measure the domain
        for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
            measure += domain[i+1]-domain[i];
        }

        return spline.sort();
    }

    // Create the overarching container
    var confettiContainer = document.createElement('div');
    confettiContainer.setAttribute('id', 'confetti_container');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top      = '0';
    confettiContainer.style.left     = '0';
    confettiContainer.style.width    = '100%';
    confettiContainer.style.height   = '0';
    confettiContainer.style.overflow = 'visible';
    confettiContainer.style.zIndex   = '9999';

    // Confetto constructor
    function Confetto(theme) {
        this.frame = 0;
        this.outer = document.createElement('div');
        this.inner = document.createElement('div');
        this.outer.appendChild(this.inner);

        var outerStyle = this.outer.style, innerStyle = this.inner.style;
        outerStyle.position = 'absolute';
        outerStyle.width  = (sizeMin + sizeMax * random()) + 'px';
        outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
        innerStyle.width  = '100%';
        innerStyle.height = '100%';
        innerStyle.backgroundColor = theme();

        outerStyle.perspective = '50px';
        outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
        this.axis = 'rotate3D(' +
        cos(360 * random()) + ',' +
        cos(360 * random()) + ',0,';
        this.theta = 360 * random();
        this.dTheta = dThetaMin + dThetaMax * random();
        innerStyle.transform = this.axis + this.theta + 'deg)';

        this.x = window.innerWidth * random();
        this.y = -deviation;
        this.dx = sin(dxThetaMin + dxThetaMax * random());
        this.dy = dyMin + dyMax * random();
        outerStyle.left = this.x + 'px';
        outerStyle.top  = this.y + 'px';

        // Create the periodic spline
        this.splineX = createPoisson();
        this.splineY = [];
        for (var i = 1, l = this.splineX.length-1; i < l; ++i)
        this.splineY[i] = deviation * random();
        this.splineY[0] = this.splineY[l] = deviation * random();

        this.update = function(height, delta) {
        this.frame += delta;
        this.x += this.dx * delta;
        this.y += this.dy * delta;
        this.theta += this.dTheta * delta;

        // Compute spline and convert to polar
        var phi = this.frame % 7777 / 7777, i = 0, j = 1;
        while (phi >= this.splineX[j]) i = j++;
        var rho = interpolation(
            this.splineY[i],
            this.splineY[j],
            (phi-this.splineX[i]) / (this.splineX[j]-this.splineX[i])
        );
        phi *= PI2;

        outerStyle.left = this.x + rho * cos(phi) + 'px';
        outerStyle.top  = this.y + rho * sin(phi) + 'px';
        innerStyle.transform = this.axis + this.theta + 'deg)';
        return this.y > height+deviation;
        };
    }

    function poof() {
        if (!frame) {
            // Append the container
            document.body.appendChild(confettiContainer);

            // Add confetti
            var theme = colorThemes[0]
            , count = 0;
            (function addConfetto() {
                var confetto = new Confetto(theme);
                confetti.push(confetto);
                confettiContainer.appendChild(confetto.outer);
                timer = setTimeout(addConfetto, spread * random());
            })(0);

            // Start the loop
            var prev = undefined;
            requestAnimationFrame(function loop(timestamp) {
                var delta = prev ? timestamp - prev : 0;
                prev = timestamp;
                var height = window.innerHeight;

                for (var i = confetti.length-1; i >= 0; --i) {
                    if (confetti[i].update(height, delta)) {
                        confettiContainer.removeChild(confetti[i].outer);
                        confetti.splice(i, 1);
                    }
                }

                if (timer || confetti.length)
                    return frame = requestAnimationFrame(loop);

                // Cleanup
                document.body.removeChild(confettiContainer);
                frame = undefined;
            });

            // Stop confetti after 4 seconds
            setTimeout(function(){
                clearTimeout(timer);
                if(frame) cancelAnimationFrame(frame);
                frame = undefined;
                timer = undefined;

                // Remove remaining confetti
                while(confetti.length) {
                    confettiContainer.removeChild(confetti[0].outer);
                    confetti.splice(0, 1);
                }
                console.log(confetti.length)

                // Remove container
                document.body.removeChild(confettiContainer);
            }, 5000);
        }
    }
    `;

    await page.addScriptTag({ content: scriptContent });

    await page.evaluate(() => {
        const leaderboardElement = document.getElementById('leaderboard');
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = "LEADERBOARD";
        paragraphElement.style.textAlign = "center"
        paragraphElement.style.backgroundColor = 'black';
        paragraphElement.style.color = '#fffbf5';
        paragraphElement.style.borderRadius = '5px';
    
        leaderboardElement.appendChild(paragraphElement);
    });

    // Read existing winner counts if the file exists
    if (fs.existsSync(winFile)) {
        try {
            const contents = fs.readFileSync(winFile, 'utf8');
            winCounts = JSON.parse(contents);
        } catch (error) {
            console.log('Could not read from file, initializing an empty word count object');
            winCounts = {};
        }
    }
    //update the winner file
    const updateFile = () => {
        const keyValueArray = Object.entries(winCounts);
        keyValueArray.sort((a, b) => b[1] - a[1]);
        const sortedJsonObject = Object.fromEntries(keyValueArray);
        winCounts = sortedJsonObject
        fs.writeFileSync(winFile, JSON.stringify(sortedJsonObject), 'utf8');
        console.log(`Contents of ${winFile}:`);
        console.log(fs.readFileSync(winFile, 'utf8'));
    };

    const imagesPath = './images';

    // Read the contents of the images folder
    fs.readdir(imagesPath, async (err, files) => {
        if (err) throw err;

        const fileNames = [];
        files.forEach(file => {
            const imageContent = fs.readFileSync("./images/" + file);
            const base64Image = Buffer.from(imageContent).toString('base64');
            fileNames.push(base64Image);
        });

        // Add 10 images to the container div
        for (let i = 0; i < fileNames.length; i++) {
            var fileName = fileNames[i]
            const addedImage = await page.evaluate((fileName) => {
                const img = document.createElement('img');
                img.src = `data:image/jpeg;base64,${fileName}`;
                img.style.position = 'relative';
                img.style.width = '150px';
                img.style.height = '150px';
                document.getElementById("image-container").appendChild(img);

                // const textBox = document.createElement('div');
                // textBox.innerText = 'Image text that is too far';
                // textBox.style.width = '150px';
                // textBox.style.fontSize = '16px';
                // textBox.style.flexWrap = 'break-word';
                // document.getElementById("image-container").appendChild(textBox);
            }, fileName);
        }
    });

    // Add CSS animation
    await page.addStyleTag({
        content: `
      @keyframes scrolling {
        0% { transform: translateY(0); }
        100% { transform: translateY(calc(-100% + 200px)); } /* adjust this value to control the scrolling speed */
      }
    `
    });

    await page.evaluate(() => {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.setAttribute("id", "toasty")
        toast.setAttribute("class", "toast")
        toast.style.bottom = '76px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = '#333';
        toast.style.color = '#fff';
        toast.style.padding = '10px';
        toast.style.borderRadius = '5px';
        toast.style.opacity = '0';
        toast.style.fontSize = "30px";
        toast.style.transition = 'opacity 0.5s';
        document.body.appendChild(toast);
    });

    await page.evaluate(() => {
        document.getElementById("toasty").style.opacity = '1';
    });

    await page.evaluate(() => {
        const toast2 = document.createElement('div');
        toast2.style.position = 'fixed';
        toast2.setAttribute("id", "toasty2")
        toast2.setAttribute("class", "toast")
        toast2.style.bottom = '40px';
        toast2.style.left = '50%';
        toast2.style.transform = 'translateX(-50%)';
        toast2.style.backgroundColor = '#333';
        toast2.style.color = '#fff';
        toast2.style.padding = '10px';
        toast2.style.borderRadius = '5px';
        toast2.style.opacity = '0';
        toast2.style.fontSize = "24px";
        toast2.style.transition = 'opacity 0.5s';
        toast2.style.textAlign = "center";
        toast2.style.width = "500px"
        document.body.appendChild(toast2);
    });

    await page.evaluate(() => {
        document.getElementById("toasty2").style.opacity = '1';
        document.getElementById("toasty2").innerText = "GUESS THE SECRET WORD!"
    });

    await page.evaluate(() => {
        const toast3 = document.createElement('div');
        toast3.style.position = 'absolute';
        toast3.setAttribute("id", "toasty3")
        toast3.setAttribute("class", "toast")
        toast3.style.top = '201px';
        toast3.style.left = '175px';
        toast3.style.transform = 'translateX(-50%)';
        toast3.style.backgroundColor = 'rgb(255,255,255)';
        toast3.style.color = 'rgb(51,51,51)';
        toast3.style.padding = '10px';
        toast3.style.borderRadius = '5px';
        toast3.style.opacity = '0';
        toast3.style.fontSize = "24px";
        toast3.style.transition = 'opacity 0.5s';
        toast3.style.textAlign = "center";
        toast3.style.width = "165px"
        toast3.style.border = "5px solid"
        document.body.appendChild(toast3);
    });

    await page.evaluate(() => {
        document.getElementById("toasty3").style.opacity = '1';
        document.getElementById("toasty3").innerText = "UNLOCK A HINT TO JOIN THE WALL!"
    });

    await page.evaluate(() => {
        const toast4 = document.createElement('div');
        toast4.style.position = 'absolute';
        toast4.setAttribute("id", "toasty4")
        toast4.setAttribute("class", "toast")
        toast4.style.top = '47px';
        toast4.style.left = '560px';
        toast4.style.transform = 'translateX(-50%)';
        toast4.style.backgroundColor = 'rgb(255,255,255)';
        toast4.style.color = 'rgb(51,51,51)';
        toast4.style.padding = '10px';
        toast4.style.borderRadius = '5px';
        toast4.style.opacity = '0';
        toast4.style.fontSize = "18px";
        toast4.style.transition = 'opacity 0.5s';
        toast4.style.textAlign = "center";
        toast4.style.width = "350px"
        toast4.style.border = "5px solid"
        toast4.style.lineHeight = "12px"
        toast4.style.height = "41px"
        document.body.appendChild(toast4);
    });

    await page.evaluate(() => {
        document.getElementById("toasty4").style.opacity = '1';
        document.getElementById("toasty4").innerText = "Follow if you like the game!!!"
    });
    var playedGames = [];
    var gameOn = true;
    var count = 0;
    while (gameOn === true) {
        
        if (count % 8 === 0) {
            await page.evaluate(() => {
                document.getElementById("toasty4").innerText = "Unlock hint for confetti!!!"
            });
        } else {
            await page.evaluate(() => {
                document.getElementById("toasty4").innerText = "Follow Top Viewers!!!"
            });
        }

        //remove winning div if it's there
        await page.evaluate(() => {
            const wElement = document.getElementById('winningToast');
            if (wElement) {
                wElement.parentNode.removeChild(wElement);
            }
        });

        //execute hint
        try {
            if (count % 40 === 0 && count != 0) {

                var topNumber = await page.evaluate(() => {
                    return document.querySelectorAll(".row")[0].children[1].innerText
                });
    
                var coverExists = await page.evaluate(() => {
                    return document.querySelector('.cover') !== null;
                });
    
                console.log(topNumber)
                if (Number(topNumber) !== 2 && !coverExists) {
    
                    await page.click('.btn');
                    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));
                    await page.evaluate(() => {
                        document.querySelectorAll(".menu-item")[1].click();
                    })
                    //cover hint
                    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 200)));
                    try {
                        await page.evaluate(() => {
                        
                            for (var i = 0; i < 2; i++) {
                                const targetDiv = document.querySelectorAll(".row-wrapper")[i];
            
                                // Create a cover div
                                const coverDiv = document.createElement('div');
                                coverDiv.classList.add("cover");
                                coverDiv.style.position = 'absolute';
                                coverDiv.style.top = '0';
                                coverDiv.style.left = '0';
                                coverDiv.style.width = '85%';
                                coverDiv.style.height = '100%';
                                coverDiv.style.backgroundColor = 'rgba(0, 0, 0)';
                                coverDiv.style.color = "white";
                                coverDiv.style.paddingLeft = "10px";
                                coverDiv.style.paddingTop = "3px";
            
                                // Create a text element
                                const textElement = document.createElement('p');
                                textElement.innerHTML = 'Doughnut &#127849; for a hint word!';
            
                                // Add the text element to the cover div
                                coverDiv.appendChild(textElement);
            
                                // Add the cover div to the target div
                                targetDiv.appendChild(coverDiv);
                            }
                        });
                    } catch(e) {
                        console.log(e)
                    }
                    
                    count++;
                    continue;
    
                }
            }
        } catch(e) {
            console.log('error executing hint')
        }

        var tableHTML = ``;
        var tableHTML = `
            <table style="font-size:15px;">
              <thead>
                <tr style="text-align:left;text-decoration:underline;">
                  <th><strong>Player</strong></th>
                  <th><strong>Wins</strong></th>
                </tr>
              </thead>
              <tbody>`;
            var leaderCount = 0;
              for (let key in winCounts) {
                if (winCounts.hasOwnProperty(key)) {
                  tableHTML += `
                    <tr>
                        <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;">`+ key.toString() +`</td>
                        <td>`+ winCounts[key].toString() +`</td>
                    </tr>
                  `;
                  leaderCount++;
                }
                if (leaderCount > 4) { break; }
              }
              tableHTML +=`</tbody>
                        </table>`;
                    

        // Evaluate JavaScript in the page context to insert the HTML table
        await page.evaluate((tableHTML) => {

            const pElement = document.getElementById("leaderboard").querySelector('p');

            // Check if the element exists
            if (pElement.nextElementSibling) {
                // Remove the element from its parent node
                pElement.nextElementSibling.parentNode.removeChild(pElement.nextElementSibling);
            }

            const tableContainer = document.createElement('div');
            tableContainer.innerHTML = tableHTML;
            document.getElementById("leaderboard").insertBefore(tableContainer, pElement.nextSibling);
        }, tableHTML);

        try {

            if (count === 0) {

                fs.open('./winning_word.json', 'w', (err, fd) => {
                    // Truncate the file to a length of 0, effectively erasing its contents
                    fs.ftruncate(fd, 0, (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('File contents erased successfully.');
                        }
                        fs.close(fd, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    });
                });

                var gameNumber = await page.evaluate(() => {
                    return document.querySelectorAll(".info-bar span")[1].innerText.replace("#", "")
                });

                await page.evaluate(() => {
                    const loadingToast = document.createElement('div');
                    loadingToast.style.position = 'fixed';
                    loadingToast.classList.add("loadingElement")
                    loadingToast.style.top = '95px';
                    loadingToast.style.left = '43%';
                    loadingToast.style.transform = 'translateX(-50%)';
                    loadingToast.style.backgroundColor = '#333';
                    loadingToast.style.color = '#fff';
                    loadingToast.style.padding = '10px';
                    loadingToast.style.borderRadius = '5px';
                    loadingToast.style.opacity = '0';
                    loadingToast.style.fontSize = "30px";
                    loadingToast.style.transition = 'opacity 0.5s';
                    loadingToast.style.opacity = "1";
                    loadingToast.style.height = "350px"
                    loadingToast.style.zIndex = "999"
                    loadingToast.innerHTML = " The game is loading!!";
                    document.body.appendChild(loadingToast);
                });

                var payWords = games["game" + gameNumber];
                await page.focus(".word");

                for (var i = 2; i < 3; i++) {
                    var word = payWords[i];
                    await page.focus(".word");
                    await page.evaluate((word) => {
                        document.querySelector(".word").value = word;
                    }, word);
                    await page.keyboard.type(" ");//Change line
                    await page.keyboard.press('Enter');
                    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));
                }

                await page.evaluate(() => {
                    for (var i = 0; i < 2; i++) {
                        const targetDiv = document.querySelectorAll(".row-wrapper")[i];
                
                        // Create a cover div
                        const coverDiv = document.createElement('div');
                        coverDiv.classList.add("cover");
                        coverDiv.style.position = 'absolute';
                        coverDiv.style.top = '0';
                        coverDiv.style.left = '0';
                        coverDiv.style.width = '85%';
                        coverDiv.style.height = '100%';
                        coverDiv.style.backgroundColor = 'rgba(0, 0, 0)';
                        coverDiv.style.paddingLeft = "10px";
                        coverDiv.style.paddingTop = "3px";
                
                        // Create a text element
                        const textElement = document.createElement('p');
                        textElement.innerHTML = 'Doughnut &#127849; for a hint word!';
                        textElement.style.animation = 'color-change 1s infinite alternate';
                
                        // Add the text element to the cover div
                        coverDiv.appendChild(textElement);
                
                        // Add the cover div to the target div
                        targetDiv.appendChild(coverDiv);
                    }
                
                    // Add the color-change animation to the CSS of the page
                    const styleElement = document.createElement('style');
                    styleElement.innerHTML = `
                        @keyframes color-change {
                            from {
                                color: white;
                            }
                            to {
                                color: #00D26A;
                            }
                        }
                    `;
                    document.head.appendChild(styleElement);
                });
                
                
            }

            const element = await page.$('.loadingElement');
            if (element) {
                // Remove the element from the page
                await page.evaluate((el) => {
                    el.remove();
                }, element);

                console.log('Removed loading cover.');
            }

            try {
                // Check if the file has text content and erase if it does
                if (hasTextContent("./gifts.txt")) {
                    eraseFileContents("./gifts.txt");
                    const element = await page.$('.cover');

                    if (element) {
                        // Remove the element from the page
                        playWinnerSound(confettiSoundCommand);
                        await page.evaluate(() => {
                            const elements = document.querySelectorAll('.cover');
                            const lastElement = elements[elements.length - 1];
                            lastElement.remove();
                            poof();
                        });
                    } else {
                        console.log('No element with class "cover" found on the page.');
                    }
                } else {
                    console.log(`The file does not have any text content.`);
                }
            } catch (e) {
                console.log(("The file does not exist."))
            }


            const savedGifters = [];

            fs.readFile('./gifters.json', async (err, data) => {

                try {
                    if (err) throw err;
                    const gifters = JSON.parse(data);
                    for (var i = 0; i < gifters.length; i++) {

                        var alreadyAdded = false;
                        for (var j = 0; j < savedGifters.length; j++) {
                            if (gifters[i].username === savedGifters[j].username) {
                                alreadyAdded = true;
                            }
                        }
                        if (alreadyAdded === false) {
                            try {
                                const imageContent = fs.readFileSync("./images/" + gifters[i].image);
                                const base64Image = Buffer.from(imageContent).toString('base64');
                                savedGifters.push({ "username": gifters[i].username, "image": gifters[i].image, "base": base64Image })
                            } catch (e) {
                                console.log("image error")
                            }

                        }
                    }

                    const inputField = await page.$('.word');

                    await inputField.click();
                    await page.$eval('.word', input => input.value = '');

                    try {
                        // if (count % 20 === 0) {
                        //     playMP3File(followSound).catch(error => console.error('An error occurred:', error));
                        // } else if (count % 2 === 0 && count !== 0) {
                        //     playMP3File(clickSound).catch(error => console.error('An error occurred:', error));
                        // }
                        
                        await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 500)));
                        var jsonData = {}
                        if (!isJsonFileEmpty('winning_word.json')) {
                            console.log('WINNING WORD BEING TYPED!')
                            fs.readFile('./winning_word.json', async (err, data) => {
                                try {
                                    if (err) throw err;
                                    console.log(data)
                                    jsonData = JSON.parse(data);
                                    var word = jsonData["text"].toString().toLowerCase().split(" ")[0];
                                    await page.evaluate((word) => {
                                        document.querySelector(".word").value = word;
                                    }, word);
                                    await page.keyboard.type(" ");//Change line
                                    await page.keyboard.press('Enter');
                                    var username = jsonData["username"];
                                    var text = jsonData["text"];
                                    await page.evaluate((username, text) => {
                                        document.getElementById("toasty").innerText = "@" + username + " commented " + text
                                    }, username, text);

                                    fs.open('./winning_word.json', 'w', (err, fd) => {
                                        // Truncate the file to a length of 0, effectively erasing its contents
                                        fs.ftruncate(fd, 0, (err) => {
                                            if (err) {
                                                console.error(err);
                                            } else {
                                                console.log('File contents erased successfully.');
                                            }
                                            fs.close(fd, (err) => {
                                                if (err) {
                                                    console.error(err);
                                                }
                                            });
                                        });
                                    });

                                } catch (e) {
                                    console.log(e)
                                }
                            });

                        } else {
                            fs.readFile('./contexto_responses_dict.json', async (err, data) => {
                                try {
                                    if (err) throw err;
                                    jsonData = JSON.parse(data);
                                    var word = jsonData["text"].toString().toLowerCase().split(" ")[0];

                                    await page.evaluate((word) => {
                                        document.querySelector(".word").value = word;
                                    }, word);
                                    await page.keyboard.type(" ");//Change line
                                    await page.keyboard.press('Enter');
                                    var username = jsonData["username"]
                                    var text = jsonData["text"]
                                    await page.evaluate((username, text) => {
                                        document.getElementById("toasty").innerText = "@" + username + " commented " + text
                                        setTimeout(() => {
                                            if (document.querySelectorAll(".message")[0].querySelector(".current")) {
                                                var newSpan = document.createElement('span');
                                                newSpan.textContent = "@" + username;
                                                newSpan.style.width = '37px';
                                                newSpan.style.height = '37px';
                                                newSpan.style.position = 'relative';
                                                newSpan.style.margin = "auto";
                                                newSpan.style.flexBasis = "content";
                                            
                                                // Insert the new span immediately after the first span
                                                var firstSpan = document.querySelectorAll(".message")[0].querySelector(".current").querySelector(".row").firstChild;
                                                firstSpan.parentNode.insertBefore(newSpan, firstSpan.nextSibling);                                                
                                            }

                                            if (document.querySelectorAll(".current").length > 1) {
                                                var newSpan = document.createElement('span');
                                                newSpan.textContent = "@" + username;
                                                newSpan.style.width = '37px';
                                                newSpan.style.height = '37px';
                                                newSpan.style.position = 'relative';
                                                newSpan.style.margin = "auto";
                                                newSpan.style.flexBasis = "content";
                                            
                                                // Insert the new span immediately after the first span
                                                var firstSpan = document.querySelectorAll(".current")[1].querySelector(".row").firstChild;
                                                firstSpan.parentNode.insertBefore(newSpan, firstSpan.nextSibling);
                                            }
                                        }, 300)
                                    }, username, text);
                                } catch (e) {
                                    console.log(e)
                                }
                            });
                        }
                        // Read the contents of the images folder
                        fs.readdir(imagesPath, async (err, files) => {
                            try {
                                if (err) throw err;

                                const className = 'profile-image'; // Replace with your desired class name
                                const profilesCount = await page.$$eval(`.${className}`, elements => elements.length);

                                if (files.length > profilesCount) {
                                    console.log('adding profile image')
                                    await page.evaluate(() => { document.getElementById("image-container").innerHTML = "" })

                                    const addedImage = await page.evaluate((savedGifters) => {
                                        var fragment = document.createDocumentFragment();
                                        for (var i = 0; i < savedGifters.length; i++) {
                                            const img = document.createElement('img');
                                            img.classList.add("profile-image")
                                            img.src = `data:image/jpeg;base64,${savedGifters[i].base}`;
                                            img.style.position = 'relative';
                                            img.style.width = '150px';
                                            img.style.height = '150px';
                                            fragment.appendChild(img);

                                            const textBox = document.createElement('div');
                                            textBox.innerText = savedGifters[i].username;
                                            textBox.style.width = '150px';
                                            textBox.style.fontSize = '16px';
                                            textBox.style.flexWrap = 'break-word';
                                            fragment.appendChild(textBox);
                                        }

                                        while (document.getElementById("image-container").firstChild) {
                                            document.getElementById("image-container").removeChild(document.getElementById("image-container").firstChild);
                                        }
                                        document.getElementById("image-container").appendChild(fragment)
                                    }, savedGifters);
                                }

                            } catch (e) {
                                console.log(e)
                            }

                        });
                    } catch (e) {
                        print('ERROR CAUGHT')
                        console.log(e)
                    }


                } catch (e) {
                    console.log(e)
                }

            });

            const exists = await page.evaluate(() => {
                return document.querySelector('.end-msg') !== null;
            });
            console.log(exists)

            if (exists) {
                
                //reset count to set the game up again
                count = 0;
                playWinnerSound(winnerSoundCommand);
                var winningUser = await page.evaluate(() => {
                    poof();
                    var winningUser = document.getElementById("toasty").innerHTML.split(" commented")[0];
                    var winningWord = document.getElementById("toasty").innerHTML.split(" commented ")[1];
                    const winningToast = document.createElement('div');
                    winningToast.style.position = 'fixed';
                    winningToast.setAttribute("id", "winningToast")
                    winningToast.style.top = '150px';
                    winningToast.style.left = '375px';
                    winningToast.style.transform = 'translateX(-50%)';
                    winningToast.style.backgroundColor = '#333';
                    winningToast.style.color = "#00D26A";
                    winningToast.style.padding = '10px';
                    winningToast.style.borderRadius = '5px';
                    winningToast.style.opacity = '0';
                    winningToast.style.fontSize = "40px";
                    winningToast.style.transition = 'opacity 0.5s';
                    winningToast.style.opacity = "1";
                    winningToast.style.width = "300px"
                    winningToast.style.zIndex = "999"
                    winningToast.innerHTML = "<br/>" + winningUser + " wins 1 with '" + winningWord + "'";
                    document.body.appendChild(winningToast);

                    var div = document.querySelector('div.title');
                    var h1 = div.querySelector('h1');
                    h1.style.fontSize = "14px";
                    h1.innerHTML = winningUser + ' won with: "' + winningWord + '"'; 

                    return winningUser
                });
                
                //Update winning user file
                if (winCounts[winningUser]) {
                    winCounts[winningUser]++;
                } else {
                    winCounts[winningUser] = 1;
                }
                updateFile();

                await page.click('.btn');
                await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 3000)));
                await page.evaluate(() => {
                    document.querySelectorAll(".menu-item")[3].click()
                    document.querySelector(".modal").style.width = "200px"
                    document.querySelector(".modal").style.marginLeft = "256px"
                });

                //refresh mp3 player
                setTimeout(() => {
                    exec(`powershell.exe -File ${powershellScriptPath}`, (error, stdout, stderr) => {
                        if (error) {
                          console.error(`Error executing PowerShell script: ${error.message}`);
                          return;
                        }
                        if (stderr) {
                          console.error(`PowerShell script encountered an error: ${stderr}`);
                          return;
                        }
                        // Process the output from the PowerShell script
                        console.log(`PowerShell script output:\n${stdout}`);
                      });
                }, 5000)


                randGame = await page.evaluate((playedGames) => {
                    var randNumber = -1;
                    while (randNumber === -1 || randNumber === 0 || randNumber === 217 || randNumber === 249 || randNumber === 251 ||
                        randNumber === 25 || randNumber === 27 || randNumber === 33 || randNumber === 199 || playedGames.includes(randNumber) || randNumber === 106) {
                        randNumber = Math.floor(Math.random() * 299)
                    }

                    var game = "";
                    
                    var modal = document.querySelector(".modal"); // Select the element with class .modal
                    if(modal !== null){
                    var divs = modal.getElementsByTagName("div"); // Get all div elements within the modal
                    for(var i = 0; i < divs.length; i++) {
                        if(divs[i].innerText.trim() === ("#"+randNumber).toString()) { // Compare the trimmed innerText with "#1"
                        game = randNumber.toString()
                        divs[i].click(); // Click on the div if its innerText equals "#1"
                        break;
                        }
                    }
                    }
                    return game
                }, playedGames);
                
                playedGames.push(Number(randGame))
                console.log(playedGames)

                const filename = './currGame.txt';
                fs.writeFile(filename, randGame, (err) => {
                    if (err) throw err;
                    console.log('Text saved to file!');
                });

                await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

                await page.evaluate(() => {
                    const wElement = document.getElementById('winningToast');
                    if (wElement) {
                        wElement.parentNode.removeChild(wElement);
                    }
                });
                await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));


                // var currentTime = new Date();
                // var elapsed = currentTime.getTime() - startTime.getTime();
                // var elapsedMinutes = elapsed / 60000;

                // if (elapsedMinutes >= 30) {
                //     console.log('30 minutes have passed, restarting.');
                //     process.exit();
                // } else {
                //     console.log(`Elapsed time: ${elapsedMinutes.toFixed(2)} minutes`);
                // }
                exists = false;

            } else {
                count++;
            }

            await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1200)));

        } catch (error) {

            console.error('Caught an error:', error);

        }
    }
    await browser.close();
};

runScript()

function hasTextContent(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.trim().length > 0;
}

// Function to erase the contents of a file
function eraseFileContents(filePath) {
    // Read the current contents of the file
    let fileContents = fs.readFileSync(filePath, 'utf-8');

    // Remove the first instance of 'g#'
    fileContents = fileContents.replace('g#', '');

    // Write the modified contents back to the file
    fs.writeFileSync(filePath, fileContents);

    console.log(`Removed one instance of 'g#' from ${filePath}`);
}

function isJsonFileEmpty(filePath) {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf8');
        var parsedData = {}
        try {
            parsedData = JSON.parse(jsonData);
        } catch (error) {
            console.log("Unable to parse.")
        }

        return Object.keys(parsedData).length === 0;
    } catch (error) {

        console.error('Error reading or parsing JSON file:', error);
        return true;
    }
}

function playMP3File(fileURL) {
    return new Promise((resolve, reject) => {
    player.play(fileURL, (error) => {
        if (error) {
          reject(error);
        } else {
          console.log('MP3 file is now playing!');
          resolve();
        }
      });
    });
  }

  function playMP3FileNoInterrupt(fileURL) {
    return new Promise((resolve, reject) => {
      if (isPlaying) {
        console.log('A sound is already playing, skipping this one.');
        resolve();
        return;
      }
  
      isPlaying = true;
  
      player.play(fileURL, (error) => {
        if (error) {
          reject(error);
        } else {
          console.log('MP3 file is now playing!');
          resolve();
        }
  
        isPlaying = false; // Reset the playing state when the sound finishes
      });
    });
  }

  function playWinnerSound(soundCommand) {
    exec(soundCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`An error occurred: ${error}`);
            return;
        }
    
        if (stderr) {
            console.error(`An error occurred: ${stderr}`);
            return;
        }
    
        console.log(`Output: ${stdout}`);
    });
  }


  function clearFileContent(fileName) {
    fs.writeFile(fileName, '', err => {
        if (err) {
            console.error(`Error while clearing the content of ${fileName}:`, err);
        } else {
            console.log(`${fileName} content has been cleared.`);
        }
    });
}

