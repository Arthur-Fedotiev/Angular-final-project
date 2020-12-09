import { IBattleRecord, IPowerUp } from '../interfaces/userDataInterfaces';

export const powerUps: IPowerUp[] = [
  {
    id: 'stat_1',
    title: 'Captain America shield',
    url: 'https://avatarfiles.alphacoders.com/113/113498.jpg',
    description: 'Durability +10',
    usesLeft: 1,
  },
  {
    id: 'stat_2',
    title: 'Mjolnir',
    url: 'https://avatarfiles.alphacoders.com/200/200482.jpg',
    description: 'Power +10',
    usesLeft: 0,
  },
  {
    id: 'stat_3',
    title: 'Ironman nano armor',
    url: 'https://avatarfiles.alphacoders.com/234/234487.jpg',
    description: 'Combat +10',
    usesLeft: 6,
  },
  {
    id: 'stat_4',
    title: "Dr. Strange's cloak",
    url: 'https://avatarfiles.alphacoders.com/160/160213.jpg',
    description: 'Intelligence +10',
    usesLeft: 3,
  },
  {
    id: 'stat_5',
    title: "Green lantern's ring",
    url: 'https://avatarfiles.alphacoders.com/164/164308.jpg',
    description: 'Strength + 10',
    usesLeft: 3,
  },
  {
    id: 'stat_6',
    title: 'Flash boots',
    url: 'https://avatarfiles.alphacoders.com/923/92354.png',
    description: 'Speed +10',
    usesLeft: 5,
  },
];

export const battleHistory: IBattleRecord[] = [
  {
    date: Date.now(),
    heroName: 'lol',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'john',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'Batdfdfman',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'uuu',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'aa',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'Batman',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'lol',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'sdsd',
    opponentName: 'Superman',
    result: 'defeat',
  },
  {
    date: Date.now(),
    heroName: 'uncle sam',
    opponentName: 'Superman',
    result: 'defeat',
  },
];
