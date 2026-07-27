import mongoose from "mongoose";
import TeamData from "./models/SecondaryTeam.js";
`1`;
const teams = [
  {
    teamId: "T1X9A2",
    qrId: "Oj5PLQr6",
    name: "Team-1",
    penaltyUntil: null,
    codes: [
      {
        value: "dr0IC8pL",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I can paddle without hands, float without a raft, and some of my kind hunt in water. Who am I?",
        options: ["Dog", "Tiger", "Elephant", "Horse"],
        answer: "Tiger",
        hint: "Na tyre, na rail par chalti hoon, Floor se floor tak tum le jaati hoon. Button dabte hi khulti meri dehleez, Guess karo, main kaun hoon is CSE ki breeze?",
      },
      {
        value: "LKKBoDUy",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "In C programming, what is the correct output type for sizeof('A') on a 64-bit GCC compiler?",
        options: ["1", "4", "8", "Depends on flags"],
        answer: "4",
        hint: "Na kitab, na board, bas comfort yahan, Friends ke saath guzar jaate breaks ke raan. Khushbu se pehchano is jagah ka naam, Har break ka main intezaam.",
      },
      {
        value: "YDDm505s",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question: "Decode the given into correct word: 'isntel'?",
        options: ["listen", "silent", "tinsel", "enlist"],
        answer: "silent",
        hint: "Shor se door, shanti ka asra, Haathon mein judta sab ka basera. Ghanti ki goonj, sukh ka pal, Kaun si jagah banaye mann nirmal?",
      },
      {
        value: "tyRKA5ZM",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "The story spans the invention of the wheel, color theory, and famous waterfalls, but slips in a remark about the object on the desk that moves a cursor on a screen.",
        options: ["Mouse", "Keyboard", "Trackpad", "Joystick"],
        answer: "Mouse",
        hint: "Lohe aur machines ka yeh ghar, Tools ki goonj sunai padti har pehar. Mandir ke paas, jahan bacche paani bharne aate, Yeh hai wo jagah jahan lohe ke raaz samjhate.",
      },
      {
        value: "62tMOzMe",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question: "In Python, what will 0.1 + 0.2 == 0.3 return?",
        options: ["TRUE", "FALSE", "Float precision", "Error"],
        answer: "FALSE",
        hint: "Samne se nahi, par piche se hai raasta, Lens, prism, CRT aur pendulum ka basta. Experiments ki goonj, theory ka raaz, Batao kahan hai physics ka andaaz?",
      },
      {
        value: "b5X7r9yG",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I can be eaten raw, made into juice, and some call me a berry (though I'm not). Which am I?",
        options: ["Tomato", "Banana", "Mango", "Avocado"],
        answer: "Banana",
        hint: "Building ke paas, chhoti si jagah, Gaadiyon ka baithta yahan chhota basera. Suvidha ke raaste me milta yeh spot, Pedh ke saaye me hai konsa lot",
      },
      {
        value: "hqYUOqVZ",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "Which sorting algorithm has the best average case complexity among these for large datasets in practical use?",
        options: ["Merge Sort", "Tim Sort", "Heap Sort", "Quick Sort"],
        answer: "Tim Sort",
        hint: "🎉 Congrats, you completed the hunt!",
      },
    ],
  },
  {
    teamId: "T2B7K5",
    qrId: "Oj5PLQr6",
    name: "Team-2",
    penaltyUntil: null,
    codes: [
      {
        value: "LKKBoDUy",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question: "In Python, what will 0.1 + 0.2 == 0.3 return?",
        options: ["TRUE", "FALSE", "Float precision", "Error"],
        answer: "FALSE",
        hint: "Shor se door, shanti ka asra, Haathon mein judta sab ka basera. Ghanti ki goonj, sukh ka pal, Kaun si jagah banaye mann nirmal?",
      },
      {
        value: "tyRKA5ZM",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "Without me you can’t live, without me your bones weaken, without me your muscles fade. What am I?",
        options: ["Water", "Calcium", "Iron", "Protein"],
        answer: "Iron",
        hint: "Auditorium ke paas, badi si jagah, Dhalan par padi, mitti ki raah. Na koi machine, bas khula sa ground, Batao wo jagah jahan gaadiyan paati thikaana found.",
      },
      {
        value: "qJwZa4NJ",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question: "Decode the given into correct word: 'opst'?",
        options: ["post", "spot", "stop", "tops"],
        answer: "tops",
        hint: "Naap, tol aur design ka hota yahan kaam, Models aur drawings se sajta iska naam. Roz guzarte bacche mere paas se, College aate ya college se jaate raaste.",
      },
      {
        value: "VsuvZOXK",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I'm a silent river for electricity; jewelry loves me, wires need me. Which am I?",
        options: ["Copper", "Gold", "Silver", "Aluminium"],
        answer: "Copper",
        hint: "Na library, na canteen stall, Class aur guests ke saath mera hall. Mic aur stage, taaliyon ka jahan, Sabse upar milta, ek anokha hall.",
      },
      {
        value: "dr0IC8pL",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I leave a trail of words wherever I touch; I can be ink, graphite, dust, or dye. Who am I?",
        options: ["Pen", "Pencil", "Chalk", "Marker"],
        answer: "Marker",
        hint: "Na kitab, na board, bas comfort yahan, Friends ke saath guzar jaate breaks ke raan. Khushbu se pehchano is jagah ka naam, Har break ka main intezaam.",
      },
      {
        value: "YDDm505s",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question: "Decode the given into correct word: 'cinema'?",
        options: ["cinema", "anemic", "iceman", "amine"],
        answer: "iceman",
        hint: "Lohe aur machines ka yeh ghar, Tools ki goonj sunai padti har pehar. Mandir ke paas, jahan bacche paani bharne aate, Yeh hai wo jagah jahan lohe ke raaz samjhate.",
      },
      {
        value: "62tMOzMe",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I bounce, I roll, I fly over nets; I'm the heart of many games. What am I?",
        options: ["Cricket", "Basketball", "Tennis", "Volleyball"],
        answer: "Tennis",
        hint: "🎉 Congrats, you completed the hunt!",
      },
    ],
  },
  {
    teamId: "T3M4Q8",
    qrId: "Oj5PLQr6",
    name: "Team-3",
    penaltyUntil: null,
    codes: [
      {
        value: "YDDm505s",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "After describing the diet of penguins, the density of icebergs, and the chemical formula for salt, the passage suddenly mentions that the only thing in the room that opens to let someone leave is made of wood with a handle.",
        options: ["Door", "Window", "Gate", "Cabinet"],
        answer: "Door",
        hint: "Lohe aur machines ka yeh ghar, Tools ki goonj sunai padti har pehar. Mandir ke paas, jahan bacche paani bharne aate, Yeh hai wo jagah jahan lohe ke raaz samjhate.",
      },
      {
        value: "62tMOzMe",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I bounce, I roll, I fly over nets; I’m the heart of many games. What am I?",
        options: ["Cricket", "Basketball", "Tennis", "Volleyball"],
        answer: "Tennis",
        hint: "Naap, tol aur design ka hota yahan kaam, Models aur drawings se sajta iska naam. Roz guzarte bacche mere paas se, College aate ya college se jaate raaste.",
      },
      {
        value: "VsuvZOXK",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "Without me you can't live, without me your bones weaken, without me your muscles fade. What am I?",
        options: ["Water", "Calcium", "Iron", "Protein"],
        answer: "Iron",
        hint: "IT ke samne, screen aur ideas ka mela, Code aur circuits ka yahan hota khela. Seekhne, banane aur dikhane ka hub, Kaun si jagah hai tech lovers ka club?",
      },
      {
        value: "cY4dRNfl",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question: "In CSS, which selector has the highest specificity?",
        options: [
          "ID selector",
          "Inline style",
          "Class selector",
          "Attribute selector",
        ],
        answer: "Inline style",
        hint: "Na tyre, na rail par chalti hoon, Floor se floor tak tum le jaati hoon. Button dabte hi khulti meri dehleez, Guess karo, main kaun hoon is CSE ki breeze?",
      },
      {
        value: "LKKBoDUy",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "Your AI assistant refuses to answer until it's given pizza. Which machine learning model is it running?",
        options: [
          "Convolutional Appetite Network",
          "Recurrent Snack Memory",
          "Generative Hunger Transformer",
          "Support Vector Pizza",
        ],
        answer: "Generative Hunger Transformer",
        hint: "Shor se door, shanti ka asra, Haathon mein judta sab ka basera. Ghanti ki goonj, sukh ka pal, Kaun si jagah banaye mann nirmal?",
      },
      {
        value: "tyRKA5ZM",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "A discussion begins about art history, digresses into train timetables, explores volcanic rock types, and then nonchalantly mentions that the rectangular transparent thing you can look through is made of glass and part of the wall.",
        options: ["Window", "Screen", "Painting", "Mirror"],
        answer: "Window",
        hint: "Samne se nahi, par piche se hai raasta, Lens, prism, CRT aur pendulum ka basta. Experiments ki goonj, theory ka raaz, Batao kahan hai physics ka andaaz?",
      },
      {
        value: "b5X7r9yG",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I speak to computers in my own tongue, some of my names sound like animals or fruits. Who am I?",
        options: ["Python", "Ruby", "Swift", "Go"],
        answer: "Swift",
        hint: "🎉 Congrats, you completed the hunt!",
      },
    ],
  },
  {
    teamId: "T4R6Z1",
    qrId: "Oj5PLQr6",
    name: "Team-4",
    penaltyUntil: null,
    codes: [
      {
        value: "tyRKA5ZM",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I fly on flags, proud in crimson; my color stands for blood, courage, or luck. Who am I?",
        options: ["Canada", "Japan", "China", "Switzerland"],
        answer: "Canada",
        hint: "Samne se nahi, par piche se hai raasta, Lens, prism, CRT aur pendulum ka basta. Experiments ki goonj, theory ka raaz, Batao kahan hai physics ka andaaz?",
      },
      {
        value: "b5X7r9yG",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question: "In Git, what does git reset --hard HEAD~1 do?",
        options: [
          "Deletes last commit permanently",
          "Removes commit but keeps changes",
          "Moves HEAD but keeps files",
          "Reverts commit with new commit",
        ],
        answer: "Deletes last commit permanently",
        hint: "Building ke paas, chhoti si jagah, Gaadiyon ka baithta yahan chhota basera. Suvidha ke raaste me milta yeh spot, Pedh ke saaye me hai konsa lot",
      },
      {
        value: "hqYUOqVZ",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "While elaborating on ocean currents, the boiling point of water, and the evolution of amphibians, a single remark indicates that the object that keeps you dry in rain has a collapsible canopy.",
        options: ["Umbrella", "Raincoat", "Tent", "Tarp"],
        answer: "Umbrella",
        hint: "Auditorium ke paas, badi si jagah, Dhalan par padi, mitti ki raah. Na koi machine, bas khula sa ground, Batao wo jagah jahan gaadiyan paati thikaana found.",
      },
      {
        value: "qJwZa4NJ",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "Inspired by Swami Dayanand Saraswati and pioneered by Lala Hansraj in Lahore in 1886, this network of over 780 educational institutions blends Indian values with modern technology. What is it?",
        options: [
          "Kendriya Vidyalayas",
          "Delhi Public Schools (DPS)",
          "Ryan International Schools",
          "D.A.V. (Dayanand Anglo-Vedic) Schools",
        ],
        answer: "D.A.V. (Dayanand Anglo-Vedic) Schools",
        hint: "Samne se nahi, par piche se hai raasta, Lens, prism, CRT aur pendulum ka basta. Experiments ki goonj, theory ka raaz, Batao kahan hai physics ka andaaz?",
      },
      {
        value: "b5X7r9yG",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I breathe air, feed milk to my young, and live in water, sky, or land. What am I?",
        options: ["Dolphin", "Bat", "Human", "Whale"],
        answer: "Dolphin",
        hint: "Naap, tol aur design ka hota yahan kaam, Models aur drawings se sajta iska naam. Roz guzarte bacche mere paas se, College aate ya college se jaate raaste.",
      },
      {
        value: "VsuvZOXK",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "Which data structure is most efficient for implementing a priority queue?",
        options: ["Stack", "Heap", "Linked List", "BST"],
        answer: "Heap",
        hint: "Na kitab, na board, bas comfort yahan, Friends ke saath guzar jaate breaks ke raan. Khushbu se pehchano is jagah ka naam, Har break ka main intezaam.",
      },
      {
        value: "YDDm505s",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "The narrative overexplains traffic patterns, jet engine thrust, and the shape of Saturn's rings before revealing in passing that the footwear you're wearing now is laced.",
        options: ["Slippers", "Sandals", "Shoes", "Boots"],
        answer: "Shoes",
        hint: "🎉 Congrats, you completed the hunt!",
      },
    ],
  },
  {
    teamId: "T5L8D3",
    qrId: "Oj5PLQr6",
    name: "Team-5",
    penaltyUntil: null,
    codes: [
      {
        value: "62tMOzMe",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I hum when plucked, sing when bowed, and can make a whole room dance. Who am I?",
        options: ["Guitar", "Violin", "Sitar", "Harp"],
        answer: "Guitar",
        hint: "Building ke paas, chhoti si jagah, Gaadiyon ka baithta yahan chhota basera. Suvidha ke raaste me milta yeh spot, Pedh ke saaye me hai konsa lot",
      },
      {
        value: "hqYUOqVZ",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "In Python, which module is used for decimal fixed-point and floating-point arithmetic with exact precision?",
        options: ["math", "decimal", "fractions", "bigfloat"],
        answer: "decimal",
        hint: "Na library, na canteen stall, Class aur guests ke saath mera hall. Mic aur stage, taaliyon ka jahan, Sabse upar milta, ek anokha hall.",
      },
      {
        value: "dr0IC8pL",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "The passage discusses weather vanes, the history of typewriters, and the role of sugar in baking, then slips in the fact that you just placed your coffee on a flat horizontal surface in front of you.",
        options: ["Chair", "Table", "Shelf", "Floor"],
        answer: "Table",
        hint: "Na tyre, na rail par chalti hoon, Floor se floor tak tum le jaati hoon. Button dabte hi khulti meri dehleez, Guess karo, main kaun hoon is CSE ki breeze?",
      },
      {
        value: "LKKBoDUy",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "Derived from the Latin for 'a bundle of sticks,' this word was associated with an ancient Roman symbol of authority (rods tied around an axe) and came to represent a political ideology. What is the word?",
        options: ["Communism", "Fascism", "Socialism", "Syndicalism"],
        answer: "Fascism",
        hint: "IT ke samne, screen aur ideas ka mela, Code aur circuits ka yahan hota khela. Seekhne, banane aur dikhane ka hub, Kaun si jagah hai tech lovers ka club?",
      },
      {
        value: "cY4dRNfl",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "After considering road construction methods, famous novels, and mineral mining, the writer inserts a line about the device that lets you speak to someone far away instantly.",
        options: ["Telephone", "Telegram", "Letter", "Radio"],
        answer: "Telephone",
        hint: "Auditorium ke paas, badi si jagah, Dhalan par padi, mitti ki raah. Na koi machine, bas khula sa ground, Batao wo jagah jahan gaadiyan paati thikaana found.",
      },
      {
        value: "qJwZa4NJ",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "A labyrinthine explanation of the postal system, mountain climbing, and bird anatomy eventually remarks that the item used to cut paper has two metal blades joined at a pivot.",
        options: ["Knife", "Scissors", "Cutter", "Razor"],
        answer: "Scissors",
        hint: "Naap, tol aur design ka hota yahan kaam, Models aur drawings se sajta iska naam. Roz guzarte bacche mere paas se, College aate ya college se jaate raaste.",
      },
      {
        value: "VsuvZOXK",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "In the 1958 FIFA World Cup, Brazilian manager Vicente Feola told his team to get the ball to player X, who then created 'the greatest three minutes of football.' Who was X, often called the greatest dribbler ever?",
        options: ["Pelé", "Didi", "Vavá", "Garrincha"],
        answer: "Garrincha",
        hint: "🎉 Congrats, you completed the hunt!",
      },
    ],
  },
  {
    teamId: "T6N2W7",
    qrId: "Oj5PLQr6",
    name: "Team-6",
    penaltyUntil: null,
    codes: [
      {
        value: "b5X7r9yG",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I'm a blanket in the sky, sometimes fluffy, sometimes thin as silk. What am I?",
        options: ["Cirrus", "Cumulus", "Stratus", "Nimbus"],
        answer: "Nimbus",
        hint: "Naap, tol aur design ka hota yahan kaam, Models aur drawings se sajta iska naam. Roz guzarte bacche mere paas se, College aate ya college se jaate raaste.",
      },
      {
        value: "VsuvZOXK",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question: "Which algorithm is used in public key cryptography?",
        options: ["AES", "RSA", "SHA-256", "MD5"],
        answer: "RSA",
        hint: "Shor se door, shanti ka asra, Haathon mein judta sab ka basera. Ghanti ki goonj, sukh ka pal, Kaun si jagah banaye mann nirmal?",
      },
      {
        value: "tyRKA5ZM",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "The narrative drifts through stories about famous painters, the anatomy of frogs, and the structure of snowflakes before mentioning the object that lets you see in the dark with a battery-powered beam.",
        options: ["Flashlight", "Lamp", "Candle", "Torch"],
        answer: "Flashlight",
        hint: "Na kitab, na board, bas comfort yahan, Friends ke saath guzar jaate breaks ke raan. Khushbu se pehchano is jagah ka naam, Har break ka main intezaam.",
      },
      {
        value: "YDDm505s",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "During the Battle of Britain, the government popularized a myth to hide its new radar technology, which was the real reason for RAF pilots' improved night-time success. What was the myth?",
        options: [
          "The pilots had genetically superior eyesight",
          "Eating carrots improves night vision",
          "Their planes were equipped with silent engines",
          "They were guided by trained owls",
        ],
        answer: "Eating carrots improves night vision",
        hint: "Auditorium ke paas, badi si jagah, Dhalan par padi, mitti ki raah. Na koi machine, bas khula sa ground, Batao wo jagah jahan gaadiyan paati thikaana found.",
      },
      {
        value: "qJwZa4NJ",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I leave a trail of words wherever I touch; I can be ink, graphite, dust, or dye. Who am I?",
        options: ["Pen", "Pencil", "Chalk", "Marker"],
        answer: "Marker",
        hint: "Na library, na canteen stall, Class aur guests ke saath mera hall. Mic aur stage, taaliyon ka jahan, Sabse upar milta, ek anokha hall.",
      },
      {
        value: "dr0IC8pL",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question: "In IPv6, how many bits are in an address?",
        options: ["32", "64", "128", "256"],
        answer: "128",
        hint: "Na tyre, na rail par chalti hoon, Floor se floor tak tum le jaati hoon. Button dabte hi khulti meri dehleez, Guess karo, main kaun hoon is CSE ki breeze?",
      },
      {
        value: "LKKBoDUy",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "A drawn-out commentary on energy conservation, Shakespearean plays, and bicycle gears eventually hints that the only moving vehicle in the driveway has four wheels.",
        options: ["Car", "Bicycle", "Bus", "Tractor"],
        answer: "Car",
        hint: "🎉 Congrats, you completed the hunt!",
      },
    ],
  },
  {
    teamId: "T7P9H4",
    qrId: "Oj5PLQr6",
    name: "Team-7",
    penaltyUntil: null,
    codes: [
      {
        value: "hqYUOqVZ",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "Club 33 is an exclusive private club first opened in 1967. It was notably the only location within this larger establishment (X) to serve alcohol. What is X?",
        options: ["Universal Studios", "Six Flags", "SeaWorld", "Disneyland"],
        answer: "Disneyland",
        hint: "IT ke samne, screen aur ideas ka mela, Code aur circuits ka yahan hota khela. Seekhne, banane aur dikhane ka hub, Kaun si jagah hai tech lovers ka club?",
      },
      {
        value: "cY4dRNfl",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I'm indivisible by all but one and myself, and I'm proud to be odd. Who am I?",
        options: ["1", "2", "3", "5"],
        answer: "5",
        hint: "Samne se nahi, par piche se hai raasta, Lens, prism, CRT aur pendulum ka basta. Experiments ki goonj, theory ka raaz, Batao kahan hai physics ka andaaz?",
      },
      {
        value: "b5X7r9yG",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "The text moves between cloud seeding, sewing techniques, and Mars exploration, before saying that the object strapped on your shoulder carries books.",
        options: ["Satchel", "Suitcase", "Backpack", "Tote"],
        answer: "Backpack",
        hint: "Na library, na canteen stall, Class aur guests ke saath mera hall. Mic aur stage, taaliyon ka jahan, Sabse upar milta, ek anokha hall.",
      },
      {
        value: "dr0IC8pL",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "In Python, which statement is used to manually raise an exception?",
        options: ["throw", "raise", "except", "assert"],
        answer: "raise",
        hint: "Shor se door, shanti ka asra, Haathon mein judta sab ka basera. Ghanti ki goonj, sukh ka pal, Kaun si jagah banaye mann nirmal?",
      },
      {
        value: "tyRKA5ZM",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "The story spans the invention of the wheel, color theory, and famous waterfalls, but slips in a remark about the object on the desk that moves a cursor on a screen.",
        options: ["Mouse", "Keyboard", "Trackpad", "Joystick"],
        answer: "Mouse",
        hint: "Lohe aur machines ka yeh ghar, Tools ki goonj sunai padti har pehar. Mandir ke paas, jahan bacche paani bharne aate, Yeh hai wo jagah jahan lohe ke raaz samjhate.",
      },
      {
        value: "62tMOzMe",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I'm perfectly balanced in my sides, wearing symmetry like a crown. Who am I?",
        options: [
          "Square",
          "Rhombus",
          "Equilateral Triangle",
          "Regular Pentagon",
        ],
        answer: "Rhombus",
        hint: "Auditorium ke paas, badi si jagah, Dhalan par padi, mitti ki raah. Na koi machine, bas khula sa ground, Batao wo jagah jahan gaadiyan paati thikaana found.",
      },
      {
        value: "qJwZa4NJ",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "After talking about desert ecosystems, electric circuits, and origami folding, a casual line says that the only wearable object showing numerals is on your wrist.",
        options: ["Watch", "Bracelet", "Ring", "Locket"],
        answer: "Watch",
        hint: "🎉 Congrats, you completed the hunt!",
      },
    ],
  },
  {
    teamId: "T8C5J6",
    qrId: "Oj5PLQr6",
    name: "Team-8",
    penaltyUntil: null,
    codes: [
      {
        value: "qJwZa4NJ",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I fly on flags, proud in crimson; my color stands for blood, courage, or luck. Who am I?",
        options: ["Canada", "Japan", "China", "Switzerland"],
        answer: "Canada",
        hint: "Na library, na canteen stall, Class aur guests ke saath mera hall. Mic aur stage, taaliyon ka jahan, Sabse upar milta, ek anokha hall.",
      },
      {
        value: "dr0IC8pL",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "After going through a deep discussion on dinosaur fossils, the periodic table, and rainfall measurement, the author notes that the object on the table displays moving images when switched on.",
        options: ["Radio", "Television", "Laptop", "Projector"],
        answer: "Television",
        hint: "Lohe aur machines ka yeh ghar, Tools ki goonj sunai padti har pehar. Mandir ke paas, jahan bacche paani bharne aate, Yeh hai wo jagah jahan lohe ke raaz samjhate.",
      },
      {
        value: "62tMOzMe",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question: "In web security, what does XSS stand for?",
        options: [
          "XML Style Sheet",
          "Cross Site Scripting",
          "Cross Server Session",
          "Xtreme Secure System",
        ],
        answer: "Cross Site Scripting",
        hint: "Samne se nahi, par piche se hai raasta, Lens, prism, CRT aur pendulum ka basta. Experiments ki goonj, theory ka raaz, Batao kahan hai physics ka andaaz?",
      },
      {
        value: "b5X7r9yG",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I wear feathers, I hatch from eggs, but I don’t all fly. Who am I?",
        options: ["Peacock", "Sparrow", "Penguin", "Ostrich"],
        answer: "Penguin",
        hint: "Na kitab, na board, bas comfort yahan, Friends ke saath guzar jaate breaks ke raan. Khushbu se pehchano is jagah ka naam, Har break ka main intezaam.",
      },
      {
        value: "YDDm505s",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I can paddle without hands, float without a raft, and some of my kind hunt in water. Who am I?",
        options: ["Dog", "Tiger", "Elephant", "Horse"],
        answer: "Tiger",
        hint: "Building ke paas, chhoti si jagah, Gaadiyon ka baithta yahan chhota basera. Suvidha ke raaste me milta yeh spot, Pedh ke saaye me hai konsa lot",
      },
      {
        value: "hqYUOqVZ",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I can paddle without hands, float without a raft, and some of my kind hunt in water. Who am I?",
        options: ["Dog", "Tiger", "Elephant", "Horse"],
        answer: "Tiger",
        hint: "Shor se door, shanti ka asra, Haathon mein judta sab ka basera. Ghanti ki goonj, sukh ka pal, Kaun si jagah banaye mann nirmal?",
      },
      {
        value: "tyRKA5ZM",
        scanned: false,
        scannedAt: null,
        timeOnly: null,
        question:
          "I can paddle without hands, float without a raft, and some of my kind hunt in water. Who am I?",
        options: ["Dog", "Tiger", "Elephant", "Horse"],
        answer: "Tiger",
        hint: "🎉 Congrats, you completed the hunt!",
      },
    ],
  },
  // {
  //   teamId: "team009",
  //   qrId: "Oj5PLQr6",
  //   penaltyUntil: null,
  //   codes: [
  //     {
  //       value: "VsuvZOXK",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question:
  //         "I open windows to the web, some say I’m fast as a fox, others polished like an apple. Who am I?",
  //       options: ["Chrome", "Firefox", "Safari", "Edge"],
  //       answer: "Safari",
  //       hint: "Na kitab, na board, bas comfort yahan, Friends ke saath guzar jaate breaks ke raan. Khushbu se pehchano is jagah ka naam, Har break ka main intezaam.",
  //     },
  //     {
  //       value: "YDDm505s",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question:
  //         "I keep you awake, make your heart race, and hide in beans, leaves, or cocoa. What am I?",
  //       options: ["Coffee", "Tea", "Cola", "Dark Chocolate"],
  //       answer: "Dark Chocolate",
  //       hint: "IT ke samne, screen aur ideas ka mela, Code aur circuits ka yahan hota khela. Seekhne, banane aur dikhane ka hub, Kaun si jagah hai tech lovers ka club?",
  //     },
  //     {
  //       value: "cY4dRNfl",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question:
  //         "I’m perfectly balanced in my sides, wearing symmetry like a crown. Who am I?",
  //       options: [
  //         "Square",
  //         "Rhombus",
  //         "Equilateral Triangle",
  //         "Regular Pentagon",
  //       ],
  //       answer: "Rhombus",
  //       hint: "Building ke paas, chhoti si jagah, Gaadiyon ka baithta yahan chhota basera. Suvidha ke raaste me milta yeh spot, Pedh ke saaye me hai konsa lot",
  //     },
  //     {
  //       value: "hqYUOqVZ",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question:
  //         "I build muscles, repair tissues, and can be eaten in many forms. What am I?",
  //       options: ["Eggs", "Chicken", "Almonds", "Lentils"],
  //       answer: "Eggs",
  //       hint: "Naap, tol aur design ka hota yahan kaam, Models aur drawings se sajta iska naam. Roz guzarte bacche mere paas se, College aate ya college se jaate raaste.",
  //     },
  //     {
  //       value: "VsuvZOXK",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question: "Decode the given into correct word: 'cinema'?",
  //       options: ["cinema", "anemic", "iceman", "amine"],
  //       answer: "iceman",
  //       hint: "Na tyre, na rail par chalti hoon, Floor se floor tak tum le jaati hoon. Button dabte hi khulti meri dehleez, Guess karo, main kaun hoon is CSE ki breeze?",
  //     },
  //     {
  //       value: "LKKBoDUy",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question: "Decode the given into correct word: 'cinema'?",
  //       options: ["cinema", "anemic", "iceman", "amine"],
  //       answer: "iceman",
  //       hint: "Na library, na canteen stall, Class aur guests ke saath mera hall. Mic aur stage, taaliyon ka jahan, Sabse upar milta, ek anokha hall.",
  //     },
  //     {
  //       value: "dr0IC8pL",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question: "Decode the given into correct word: 'cinema'?",
  //       options: ["cinema", "anemic", "iceman", "amine"],
  //       answer: "iceman",
  //       hint: "🎉 Congrats, you completed the hunt!",
  //     },
  //   ],
  // },
  // {
  //   teamId: "team010",
  //   qrId: "Oj5PLQr6",
  //   penaltyUntil: null,
  //   codes: [
  //     {
  //       value: "cY4dRNfl",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question:
  //         "I leave a trail of words wherever I touch; I can be ink, graphite, dust, or dye. Who am I?",
  //       options: ["Pen", "Pencil", "Chalk", "Marker"],
  //       answer: "Marker",
  //       hint: "Auditorium ke paas, badi si jagah, Dhalan par padi, mitti ki raah. Na koi machine, bas khula sa ground, Batao wo jagah jahan gaadiyan paati thikaana found.",
  //     },
  //     {
  //       value: "qJwZa4NJ",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question:
  //         "In Java, which collection class allows null keys and null values?",
  //       options: ["Hashtable", "ConcurrentHashMap", "TreeMap", "HashMap"],
  //       answer: "HashMap",
  //       hint: "Na tyre, na rail par chalti hoon, Floor se floor tak tum le jaati hoon. Button dabte hi khulti meri dehleez, Guess karo, main kaun hoon is CSE ki breeze?",
  //     },
  //     {
  //       value: "LKKBoDUy",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question:
  //         "Between anecdotes about skiing, honeybees, and jazz music, there’s a hint that the hot drink in your mug is made by steeping leaves.",
  //       options: ["Coffee", "Tea", "Cocoa", "Soup"],
  //       answer: "Tea",
  //       hint: "Lohe aur machines ka yeh ghar, Tools ki goonj sunai padti har pehar. Mandir ke paas, jahan bacche paani bharne aate, Yeh hai wo jagah jahan lohe ke raaz samjhate.",
  //     },
  //     {
  //       value: "62tMOzMe",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question: "Decode the given into correct word: 'opst'?",
  //       options: ["post", "spot", "stop", "tops"],
  //       answer: "tops",
  //       hint: "Building ke paas, chhoti si jagah, Gaadiyon ka baithta yahan chhota basera. Suvidha ke raaste me milta yeh spot, Pedh ke saaye me hai konsa lot",
  //     },
  //     {
  //       value: "hqYUOqVZ",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question:
  //         "The passage meanders through discussions of coffee bean roasting, the migration of monarch butterflies, and the sound patterns of whale songs, until it quietly notes that the liquid in the cup is both black and aromatic, leading to an obvious beverage.",
  //       options: ["Tea", "Coffee", "Juice", "Cola"],
  //       answer: "Coffee",
  //       hint: "Shor se door, shanti ka asra, Haathon mein judta sab ka basera. Ghanti ki goonj, sukh ka pal, Kaun si jagah banaye mann nirmal?",
  //     },
  //     {
  //       value: "tyRKA5ZM",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question:
  //         "The passage meanders through discussions of coffee bean roasting, the migration of monarch butterflies, and the sound patterns of whale songs, until it quietly notes that the liquid in the cup is both black and aromatic, leading to an obvious beverage.",
  //       options: ["Tea", "Coffee", "Juice", "Cola"],
  //       answer: "Coffee",
  //       hint: "Naap, tol aur design ka hota yahan kaam, Models aur drawings se sajta iska naam. Roz guzarte bacche mere paas se, College aate ya college se jaate raaste.",
  //     },
  //     {
  //       value: "VsuvZOXK",
  //       scanned: false,
  //       scannedAt: null,
  //       timeOnly: null,
  //       question:
  //         "The passage meanders through discussions of coffee bean roasting, the migration of monarch butterflies, and the sound patterns of whale songs, until it quietly notes that the liquid in the cup is both black and aromatic, leading to an obvious beverage.",
  //       options: ["Tea", "Coffee", "Juice", "Cola"],
  //       answer: "Coffee",
  //       hint: "🎉 Congrats, you completed the hunt!",
  //     },
  //   ],
  // },
];

async function insertTeams() {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error("Missing MONGO_URI in environment");

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");

    await TeamData.deleteMany({});
    console.log("🗑 Existing team data cleared");

    await TeamData.insertMany(teams);
    console.log("✅ Teams inserted successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error inserting teams:", error);
    await mongoose.disconnect();
  }
}

insertTeams();
