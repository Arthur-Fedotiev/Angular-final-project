import { IPowerUp } from '../interfaces/userDataInterfaces';

export const powerUps: IPowerUp[] = [
  {
    id: 'durability',
    title: 'Captain America shield',
    url: 'https://avatarfiles.alphacoders.com/113/113498.jpg',
    description: 'Durability +10',
    usesLeft: 1,
  },
  {
    id: 'power',
    title: 'Mjolnir',
    url: 'https://avatarfiles.alphacoders.com/200/200482.jpg',
    description: 'Power +10',
    usesLeft: 0,
  },
  {
    id: 'combat',
    title: 'Ironman nano armor',
    url: 'https://avatarfiles.alphacoders.com/234/234487.jpg',
    description: 'Combat +10',
    usesLeft: 6,
  },
  {
    id: 'intelligence',
    title: "Dr. Strange's cloak",
    url: 'https://avatarfiles.alphacoders.com/160/160213.jpg',
    description: 'Intelligence +10',
    usesLeft: 3,
  },
  {
    id: 'strength',
    title: "Green lantern's ring",
    url: 'https://avatarfiles.alphacoders.com/164/164308.jpg',
    description: 'Strength + 10',
    usesLeft: 3,
  },
  {
    id: 'speed',
    title: 'Flash boots',
    url: 'https://avatarfiles.alphacoders.com/923/92354.png',
    description: 'Speed +10',
    usesLeft: 5,
  },
];
