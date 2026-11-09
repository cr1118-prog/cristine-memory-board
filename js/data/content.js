/* =====================================================================
   CONTENT: all the words and structure of the board.
   Edit text here; the components in js/components render it.
   Depends on: media.js
   ===================================================================== */

const folders = [
  {name:"Childhood Memories",    t:"gallery", layout:"polaroid", key:"childhood", ph:5, label:"Childhood photo"},
  {name:"My Family & Relatives", t:"gallery", layout:"strip",    key:"family",    ph:5, label:"Family photo"},
  {name:"My Friends",            t:"gallery", layout:"masonry",  key:"friends",   ph:6, label:"Friends photo"},
  {name:"Me & My Love",          t:"gallery", layout:"duo",      key:"love",      ph:4, label:"Us together"},
  {name:"My Favorite Food",      t:"food"},
  {name:"My Favorite Movie",     t:"movie", key:"movieStills"},
  {name:"My Song",               t:"song",  key:"songPhotos"},
  {name:"Joke Time",             t:"jokes"},
  {name:"Secret Stage",          t:"secret", hidden:true}
];
const HINT = {food:"a family recipe", movie:"cinema, cast & photos", song:"video, lyrics & photos", jokes:"flip cards, win stickers", secret:"you found it"};
const groups = [
  {name:"Photo Memories", kids:[0,1,2,3], note:"Four little folders of photos. Pick one to open it."},
  {name:"My Favorites",   kids:[4,5,6],   note:"A food, a movie and a song I love. Pick one to open it."},
  {name:"Joke Time",      kids:[7]},
  {name:"Secret Stage",   kids:[8], hidden:true}
];

/* Template text: replace with your own */
const CAST = [
  {name:"Georgie Henley",   role:"Lucy Pevensie",   bio:"The youngest Pevensie. She is the first to find Narnia through the wardrobe, and she never stops believing in it, even when no one else does."},
  {name:"Skandar Keynes",   role:"Edmund Pevensie", bio:"He is tricked by the White Witch and betrays his siblings, but he learns from it and finds his way back to being brave and loyal."},
  {name:"Anna Popplewell",  role:"Susan Pevensie",  bio:"The careful, gentle older sister who looks out for the others. In Narnia she becomes Queen Susan the Gentle."},
  {name:"William Moseley",  role:"Peter Pevensie",  bio:"The eldest brother, who learns to lead and protect his family. He grows into High King Peter the Magnificent."},
  {name:"Liam Neeson",      role:"Aslan",           bio:"The great and kind lion, the true king of Narnia. Liam Neeson gives him his voice."},
  {name:"Tilda Swinton",    role:"The White Witch", bio:"Jadis, the cold queen who keeps Narnia in endless winter, where it is always winter but never Christmas."},
  {name:"James McAvoy",     role:"Mr. Tumnus",      bio:"The gentle faun Lucy meets under the lamp-post. He risks his life to do the right thing."}
];
const FOOD = {
  title:"Adobong Atay ng Manok",
  tag:"Savory, tangy and tender, best with hot rice.",
  meta:"Serves 4 · Prep 15 min · Cook 15 min",
  ing:["500 g chicken liver (atay ng manok)","1 cup milk or water, for soaking","6 cloves garlic, minced","1 medium onion, sliced","3 tbsp soy sauce","3 tbsp vinegar","½ cup water","2 dried bay leaves (laurel)","1 tsp whole peppercorns","1 tbsp sugar, optional","2 tbsp cooking oil","Salt, to taste","1–2 siling labuyo, if you like it spicy"],
  tip:"Don’t overcook the liver. Once it is no longer pink inside, it’s done. Cooking it longer makes it hard and chalky.",
  steps:[
    "Rinse the liver and trim off any white or greenish bits. Cut it into bite-size pieces.",
    "Soak the liver in milk or water for 10 minutes to soften the strong taste. Drain well.",
    "Heat the oil in a pan over medium heat. Sauté the garlic until golden, then add the onion and cook until soft.",
    "Add the liver and stir for 2–3 minutes, until the outside is no longer pink.",
    "Pour in the soy sauce, then add the peppercorns and bay leaves. Stir to coat.",
    "Add the vinegar and let it boil for 2 minutes without stirring, so the sharp smell cooks off. Then pour in the water.",
    "Simmer on low for 8–10 minutes, until the sauce thickens a little and the liver is cooked through.",
    "Add the sugar if you want a hint of sweetness and the siling labuyo if you like heat. Taste, adjust the salt, and serve with hot rice."
  ]
};
const SYNOPSIS = "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe (2005) begins in London during World War II. Four siblings, Peter, Susan, Edmund and Lucy Pevensie, are sent to a professor’s big country house to stay safe. While playing hide and seek, Lucy steps into an old wardrobe and finds a snowy forest on the other side. It is Narnia, a magical land that has been stuck in winter for a hundred years under the rule of the White Witch.\n\nOne by one, the siblings follow her in. Edmund is tempted by the Witch’s Turkish delight and her promises, and he betrays the others. The rest meet Mr. and Mrs. Beaver, who tell them about Aslan, the true king of Narnia, and about a prophecy that two sons of Adam and two daughters of Eve will end the Witch’s rule. When Edmund is captured, Aslan offers himself in his place at the Stone Table. He comes back to life, leads the final battle, and the four children are crowned kings and queens at Cair Paravel. Years later, they tumble back out of the wardrobe, still children.\n\nIt is a story about family, forgiveness, courage and sacrifice, and about believing in something even when you can’t see it yet.";
const WHY = "Alive by Planetshakers makes me feel full of joy and hope. Whenever it plays, I feel lighter and more thankful, like I can face anything because I’m not doing it alone. The energy of the song lifts me up on tired days and reminds me to keep praising, keep smiling and keep going. It feels like a happy reset every time I listen to it.";
/* Paste the song lyrics between the backticks below, one line per row. They will load by themselves and follow the music. */
const LYRICS = ``;
const JOKES = [
  ["Ano’ng kinakain ng mga pusa sa umaga?","Eh ’di MICE KRISPIES!"],
  ["Pa’no mo hahatiin sa dalawa ang dagat?","Gumamit ka ng SEASAW!"],
  ["Hulaan mo kung sa’n iniiwan ng mga aso ang kotse nila...","Sa BARKING LOT!"],
  ["Ano’ng puno ang hindi pwedeng akyatin?","’Yung nakatumba!"],
  ["Ano’ng bagay ang nagsisimula sa T at nagtatapos sa T at may T rin sa loob?","Eh ’di... TEAPOT!"],
  ["Ano’ng gamot sa mga sugat ng balat ng baboy?","OINKMENT!"]
];
const CREDITS = [
  ["A memory book","Cristine’s Memory Board"],
  ["Starring","the family"],
  ["Second family","my friends"],
  ["Movie night","my favorite movie"],
  ["Music","my favorite song"],
  ["Special thanks","everyone in the photos"],
  ["","Thank you for visiting"]
];

const REWARDS = [{i:"🎀",n:"Pink Bow"},{i:"💜",n:"Violet Heart"},{i:"💀",n:"Mini Skull"},{i:"⭐",n:"Lucky Star"},{i:"🍭",n:"Sweet Candy"},{i:"👑",n:"Kuromi Crown"}];
