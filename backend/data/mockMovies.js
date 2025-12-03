/**
 * Mock movie and TV show data
 * In production, this would be replaced by calls to TMDb API or similar
 */

export const mockMovies = [
  {
    id: "hp1",
    title: "Harry Potter and the Sorcerer's Stone",
    year: 2001,
    type: "movie",
    overview: "An orphaned boy discovers he's a wizard and enrolls in a magical school. There, he uncovers the truth about his parents' mysterious deaths and confronts dark forces threatening the wizarding world. Along the way, he makes lifelong friends and learns about courage, loyalty, and destiny.",
    genres: ["Fantasy", "Adventure"],
    posterUrl: "https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    runtimeMinutes: 152,
    availability: [
      { service: "Peacock", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 3.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=VyHV0BRtdxo"
  },
  {
    id: "atla",
    title: "Avatar: The Last Airbender",
    year: 2005,
    type: "tv",
    overview: "A young boy awakens from a century-long slumber to discover he's the Avatar, master of all four elements. With war ravaging the world, he must master his powers to defeat the Fire Nation and restore balance. Joined by loyal friends, he embarks on an epic journey of self-discovery and heroism.",
    genres: ["Fantasy", "Adventure", "Animation"],
    posterUrl: "https://image.tmdb.org/t/p/w500/9RQhVb3r3mCMqYVhLoCu4EvuipP.jpg",
    seasons: 3,
    episodesPerSeason: [20, 20, 21],
    availability: [
      { service: "Netflix", type: "included", price: null },
      { service: "Paramount+", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=d1EnW4kn2fg"
  },
  {
    id: "lotr1",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    type: "movie",
    overview: "A humble hobbit inherits a powerful ring that could destroy the world. He joins a diverse fellowship of heroes on a perilous quest to destroy it in the fires where it was forged. Epic battles, ancient prophecies, and the fate of Middle-earth hang in the balance.",
    genres: ["Fantasy", "Adventure", "Action"],
    posterUrl: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    runtimeMinutes: 178,
    availability: [
      { service: "Max", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 3.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=V75dMMIW2B4"
  },
  {
    id: "st-things",
    title: "Stranger Things",
    year: 2016,
    type: "tv",
    overview: "A group of kids in a small town uncover supernatural mysteries and government experiments when their friend mysteriously disappears. They encounter a girl with telekinetic powers who escaped from a secret laboratory. Together, they battle creatures from an alternate dimension while navigating the challenges of growing up in the 1980s.",
    genres: ["Sci-Fi", "Horror", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    seasons: 4,
    episodesPerSeason: [8, 9, 8, 9],
    availability: [
      { service: "Netflix", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=b9EkMc79ZSU"
  },
  {
    id: "inception",
    title: "Inception",
    year: 2010,
    type: "movie",
    overview: "A skilled thief who steals secrets from people's dreams is given a chance at redemption. His final job: plant an idea deep in a target's subconscious rather than steal one. As he assembles a team and dives into layered dream worlds, reality and illusion blur in spectacular ways.",
    genres: ["Sci-Fi", "Action", "Thriller"],
    posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    runtimeMinutes: 148,
    availability: [
      { service: "Netflix", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 3.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=YoHD9XEInc0"
  },
  {
    id: "got",
    title: "Game of Thrones",
    year: 2011,
    type: "tv",
    overview: "Noble families vie for control of the Iron Throne in a vast medieval fantasy realm. Political intrigue, brutal battles, and supernatural threats converge as winter approaches. Dragons, white walkers, and complex characters navigate a deadly game where you win or you die.",
    genres: ["Fantasy", "Drama", "Action"],
    posterUrl: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    seasons: 8,
    episodesPerSeason: [10, 10, 10, 10, 10, 10, 7, 6],
    availability: [
      { service: "Max", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=KPLWWIOCOOQ"
  },
  {
    id: "interstellar",
    title: "Interstellar",
    year: 2014,
    type: "movie",
    overview: "Earth is dying, and a team of astronauts travels through a wormhole to find humanity a new home. A former pilot must leave his family behind to explore distant galaxies and confront the mysteries of space and time. Love, sacrifice, and survival collide in this epic space odyssey.",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    runtimeMinutes: 169,
    availability: [
      { service: "Paramount+", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 3.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=zSWdZVtXT7E"
  },
  {
    id: "breakingbad",
    title: "Breaking Bad",
    year: 2008,
    type: "tv",
    overview: "A high school chemistry teacher diagnosed with cancer turns to cooking methamphetamine to secure his family's future. What starts as desperation evolves into a descent into the criminal underworld. His transformation from mild-mannered teacher to ruthless drug lord is both tragic and compelling.",
    genres: ["Drama", "Crime", "Thriller"],
    posterUrl: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    seasons: 5,
    episodesPerSeason: [7, 13, 13, 13, 16],
    availability: [
      { service: "Netflix", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=HhesaQXLuRY"
  },
  {
    id: "matrix",
    title: "The Matrix",
    year: 1999,
    type: "movie",
    overview: "A computer hacker discovers that reality is a simulation controlled by sentient machines. He joins a rebellion to free humanity from their digital prison. Mind-bending action sequences and philosophical questions about the nature of reality define this groundbreaking sci-fi thriller.",
    genres: ["Sci-Fi", "Action"],
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    runtimeMinutes: 136,
    availability: [
      { service: "Max", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 2.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=vKQi3bBA1y8"
  },
  {
    id: "witcher",
    title: "The Witcher",
    year: 2019,
    type: "tv",
    overview: "A mutant monster hunter navigates a world where people are often more wicked than beasts. His destiny intertwines with a powerful sorceress and a young princess with a dangerous secret. Magic, political intrigue, and brutal combat fill this dark fantasy epic.",
    genres: ["Fantasy", "Action", "Adventure"],
    posterUrl: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg",
    seasons: 3,
    episodesPerSeason: [8, 8, 8],
    availability: [
      { service: "Netflix", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=ndl1W4ltcmg"
  },
  {
    id: "dune",
    title: "Dune",
    year: 2021,
    type: "movie",
    overview: "A young nobleman travels to a desert planet to oversee the harvest of a valuable spice that grants superhuman abilities. Betrayal and prophecy thrust him into a war for control of the galaxy's most precious resource. He must embrace his destiny to become a legendary leader among the desert people.",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    runtimeMinutes: 155,
    availability: [
      { service: "Max", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 5.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=8g18jFHCLXk"
  },
  {
    id: "mandalorian",
    title: "The Mandalorian",
    year: 2019,
    type: "tv",
    overview: "A lone bounty hunter in the Star Wars universe takes on a mysterious job and discovers an unexpected cargo: a small, Force-sensitive child. As he protects the child from those who would harm him, they journey across the galaxy facing mercenaries, warlords, and Imperial remnants.",
    genres: ["Sci-Fi", "Action", "Adventure"],
    posterUrl: "https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
    seasons: 3,
    episodesPerSeason: [8, 8, 8],
    availability: [
      { service: "Disney+", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=aOC8E8z_ifw"
  },
  {
    id: "shawshank",
    title: "The Shawshank Redemption",
    year: 1994,
    type: "movie",
    overview: "A banker wrongly convicted of murder spends decades in prison, where he befriends a fellow inmate and finds hope in the darkest of places. Through patience, intelligence, and unwavering determination, he plans his path to freedom. This powerful tale explores friendship, hope, and the resilience of the human spirit.",
    genres: ["Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    runtimeMinutes: 142,
    availability: [
      { service: "Netflix", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 2.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=6hB3S9bIaco"
  },
  {
    id: "dark",
    title: "Dark",
    year: 2017,
    type: "tv",
    overview: "A child's disappearance in a small German town exposes the dark secrets of four interconnected families. As the investigation unfolds, time travel, parallel worlds, and a complex web of cause and effect emerge. This mind-bending thriller spans multiple generations and challenges perceptions of fate and free will.",
    genres: ["Sci-Fi", "Mystery", "Thriller"],
    posterUrl: "https://image.tmdb.org/t/p/w500/5tRS9dRNGomYm3Ux4aqb2l3KbaF.jpg",
    seasons: 3,
    episodesPerSeason: [10, 8, 8],
    availability: [
      { service: "Netflix", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=rrwycJ08PSA"
  },
  {
    id: "parasite",
    title: "Parasite",
    year: 2019,
    type: "movie",
    overview: "A poor family schemes to infiltrate the household of a wealthy family by posing as highly qualified professionals. As they embed themselves deeper into the lives of the rich, class tensions escalate in unexpected and darkly comedic ways. The film is a gripping social commentary that builds to a shocking climax.",
    genres: ["Thriller", "Drama", "Comedy"],
    posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    runtimeMinutes: 132,
    availability: [
      { service: "Hulu", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 3.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=5xH0HfJHsaY"
  },
  {
    id: "tedlasso",
    title: "Ted Lasso",
    year: 2020,
    type: "tv",
    overview: "An optimistic American football coach is hired to manage a struggling English soccer team despite having no experience with the sport. His relentless positivity and folksy wisdom win over skeptical players and staff. This heartwarming comedy explores themes of kindness, leadership, and second chances.",
    genres: ["Comedy", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/5fhZdwP1DVJ0FyVH6vrFdHwpXIn.jpg",
    seasons: 3,
    episodesPerSeason: [10, 12, 12],
    availability: [
      { service: "Apple TV+", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=3u7EIiohs6U"
  },
  {
    id: "bladerunner",
    title: "Blade Runner 2049",
    year: 2017,
    type: "movie",
    overview: "A young blade runner uncovers a long-buried secret that could plunge society into chaos. His discovery leads him on a quest to find a former blade runner who has been missing for thirty years. Stunning visuals and profound questions about humanity, memory, and what it means to be alive permeate this sci-fi masterpiece.",
    genres: ["Sci-Fi", "Thriller", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    runtimeMinutes: 164,
    availability: [
      { service: "Prime Video", type: "rent", price: 3.99 },
      { service: "Apple TV+", type: "rent", price: 3.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=gCcx85zbxz4"
  },
  {
    id: "thelastofus",
    title: "The Last of Us",
    year: 2023,
    type: "tv",
    overview: "Twenty years after a fungal pandemic devastates civilization, a hardened survivor is tasked with escorting a teenage girl across a post-apocalyptic America. The girl may hold the key to a cure, but the journey is fraught with infected creatures, hostile survivors, and moral dilemmas. Their bond deepens as they navigate a brutal world.",
    genres: ["Drama", "Action", "Horror"],
    posterUrl: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    seasons: 1,
    episodesPerSeason: [9],
    availability: [
      { service: "Max", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=uLtkt8BonwM"
  },
  {
    id: "gladiator",
    title: "Gladiator",
    year: 2000,
    type: "movie",
    overview: "A betrayed Roman general is forced into slavery and becomes a gladiator, fighting his way through the arena to seek vengeance against the corrupt emperor who murdered his family. Epic battles, political intrigue, and themes of honor and revenge drive this historical drama. His quest for justice captivates Rome and threatens the throne.",
    genres: ["Action", "Drama", "Adventure"],
    posterUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAr1H1nRIsgwvim.jpg",
    runtimeMinutes: 155,
    availability: [
      { service: "Paramount+", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 3.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=owK1qxDselE"
  },
  {
    id: "squidgame",
    title: "Squid Game",
    year: 2021,
    type: "tv",
    overview: "Desperate people deep in debt accept a mysterious invitation to compete in children's games for a massive cash prize. As the games progress, they discover that losing means death. This Korean thriller explores class struggle, human nature, and the lengths people will go to for survival and wealth.",
    genres: ["Thriller", "Drama", "Action"],
    posterUrl: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    seasons: 1,
    episodesPerSeason: [9],
    availability: [
      { service: "Netflix", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=oqxAJKy0ii4"
  },
  {
    id: "madmax",
    title: "Mad Max: Fury Road",
    year: 2015,
    type: "movie",
    overview: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the help of a lone wanderer. Together they lead a group of female prisoners on a high-octane chase across the desert. Non-stop action, stunning practical effects, and themes of redemption and survival make this a modern action classic.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    posterUrl: "https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    runtimeMinutes: 120,
    availability: [
      { service: "Max", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 3.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=hEJnMQG9ev8"
  },
  {
    id: "blackmirror",
    title: "Black Mirror",
    year: 2011,
    type: "tv",
    overview: "An anthology series that examines the dark and often dystopian aspects of modern society and technology. Each standalone episode tells a different story, exploring themes like social media obsession, artificial intelligence, and surveillance. Thought-provoking and unsettling, it holds up a mirror to our relationship with technology.",
    genres: ["Sci-Fi", "Thriller", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/5UaYsGZOFhjFDwQix4y7U01G6dU.jpg",
    seasons: 6,
    episodesPerSeason: [3, 4, 6, 6, 3, 5],
    availability: [
      { service: "Netflix", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=jDiYGjp5iFg"
  },
  {
    id: "arrival",
    title: "Arrival",
    year: 2016,
    type: "movie",
    overview: "When mysterious alien spacecrafts touch down across the globe, a linguist is recruited to communicate with the extraterrestrials. As she learns their language, she experiences visions that alter her perception of time. This cerebral sci-fi film explores language, memory, and the nature of human connection.",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    posterUrl: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
    runtimeMinutes: 116,
    availability: [
      { service: "Paramount+", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 3.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=tFMo3UJ4B4g"
  },
  {
    id: "succession",
    title: "Succession",
    year: 2018,
    type: "tv",
    overview: "The Roy family controls one of the world's largest media empires, but when the patriarch's health declines, his four grown children scramble for control. Backstabbing, betrayal, and dark humor abound as they navigate corporate warfare and family dysfunction. This sharp drama dissects wealth, power, and the corrupting influence of both.",
    genres: ["Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/7HW47XbkNQ5fiwQFYGWdw9gs144.jpg",
    seasons: 4,
    episodesPerSeason: [10, 10, 9, 10],
    availability: [
      { service: "Max", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=OdYsPNhU8LM"
  },
  {
    id: "everythingeverywhere",
    title: "Everything Everywhere All at Once",
    year: 2022,
    type: "movie",
    overview: "A Chinese-American woman running a laundromat discovers she can access alternate versions of herself across the multiverse. To save all of reality from a powerful force, she must learn to harness her newfound abilities. This wild, genre-bending film blends action, comedy, and heartfelt family drama in spectacular fashion.",
    genres: ["Sci-Fi", "Action", "Comedy"],
    posterUrl: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    runtimeMinutes: 139,
    availability: [
      { service: "Hulu", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 4.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=wxN1T1uxQ2g"
  },
  {
    id: "peakyblinders",
    title: "Peaky Blinders",
    year: 2013,
    type: "tv",
    overview: "A gangster family in post-World War I Birmingham, England, rises through the criminal underworld with ambition and violence. Led by their cunning and ruthless leader, they clash with rival gangs, corrupt police, and the IRA. Stylish cinematography and a powerful soundtrack enhance this gritty period crime drama.",
    genres: ["Crime", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg",
    seasons: 6,
    episodesPerSeason: [6, 6, 6, 6, 6, 6],
    availability: [
      { service: "Netflix", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=oVzVdvGIC7U"
  },
  {
    id: "whiplash",
    title: "Whiplash",
    year: 2014,
    type: "movie",
    overview: "A young jazz drummer enrolls at a prestigious music conservatory where he encounters an abusive instructor who will stop at nothing to push his students to perfection. The psychological battle between teacher and student escalates to dangerous extremes. This intense drama explores ambition, obsession, and the cost of greatness.",
    genres: ["Drama", "Music"],
    posterUrl: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    runtimeMinutes: 106,
    availability: [
      { service: "Netflix", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 3.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=7d_jQycdQGo"
  },
  {
    id: "arcane",
    title: "Arcane",
    year: 2021,
    type: "tv",
    overview: "Two sisters are torn apart by conflict in a city divided between the wealthy utopia of Piltover and the oppressed undercity of Zaun. As tensions rise, their paths diverge—one becoming a defender of order, the other an agent of chaos. Stunning animation and a gripping story explore family, loyalty, and revolution.",
    genres: ["Animation", "Action", "Fantasy"],
    posterUrl: "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    seasons: 1,
    episodesPerSeason: [9],
    availability: [
      { service: "Netflix", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=fXmAurh012s"
  },
  {
    id: "topgunmaverick",
    title: "Top Gun: Maverick",
    year: 2022,
    type: "movie",
    overview: "After decades of service as a top naval aviator, a pilot is called back to train a new generation of fighter pilots for a dangerous mission. Confronting ghosts from his past and the evolving future of aerial combat, he must prove himself once again. Stunning flight sequences and emotional depth make this a thrilling sequel.",
    genres: ["Action", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    runtimeMinutes: 130,
    availability: [
      { service: "Paramount+", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 5.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=giXco2jaZ_4"
  },
  {
    id: "beef",
    title: "Beef",
    year: 2023,
    type: "tv",
    overview: "Two strangers become embroiled in a road rage incident that spirals into an all-consuming feud. As they seek revenge and one-upmanship, their lives unravel in unexpected ways. This darkly comedic thriller examines rage, resentment, and the consequences of letting anger consume you.",
    genres: ["Comedy", "Drama", "Thriller"],
    posterUrl: "https://image.tmdb.org/t/p/w500/g9KVgT92ycIDGNMj5hWPxJhzbdT.jpg",
    seasons: 1,
    episodesPerSeason: [10],
    availability: [
      { service: "Netflix", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=m2jUE5w6THU"
  },
  {
    id: "cars",
    title: "Cars",
    year: 2006,
    type: "movie",
    overview: "A hotshot race car gets stranded in a forgotten desert town on Route 66 and learns that life is about the journey, not the finish line. Along the way, he befriends a quirky cast of talking cars and discovers what really matters. This heartwarming Pixar film features anthropomorphic vehicles in a world where cars are alive.",
    genres: ["Animation", "Family", "Comedy"],
    posterUrl: "https://image.tmdb.org/t/p/w500/abW5AzHDaIK1n9C36VdAeOwORRA.jpg",
    runtimeMinutes: 117,
    availability: [
      { service: "Disney+", type: "included", price: null },
      { service: "Prime Video", type: "rent", price: 3.99 }
    ],
    trailerUrl: "https://youtube.com/watch?v=SbXIj2T-_uk"
  },
  {
    id: "toystory",
    title: "Toy Story",
    year: 1995,
    type: "movie",
    overview: "A group of toys come to life when humans aren't around. When a new high-tech toy threatens to replace him as a child's favorite, the old cowboy doll must learn to share the spotlight. This groundbreaking Pixar film features toys with personalities who talk, think, and have adventures of their own.",
    genres: ["Animation", "Family", "Comedy"],
    posterUrl: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    runtimeMinutes: 81,
    availability: [
      { service: "Disney+", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=v-PjgYDrg70"
  },
  {
    id: "findingnemo",
    title: "Finding Nemo",
    year: 2003,
    type: "movie",
    overview: "A clownfish embarks on an epic journey across the ocean to find his captured son. Along the way, he meets a forgetful blue tang fish and encounters numerous sea creatures. This Pixar adventure features talking fish navigating the vast underwater world with humor and heart.",
    genres: ["Animation", "Family", "Adventure"],
    posterUrl: "https://image.tmdb.org/t/p/w500/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
    runtimeMinutes: 100,
    availability: [
      { service: "Disney+", type: "included", price: null }
    ],
    trailerUrl: "https://youtube.com/watch?v=wZdpNglLbt8"
  }
];
