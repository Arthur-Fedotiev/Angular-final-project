import { IStats } from '../interfaces/heroInterface';
import { IPowerUp } from '../interfaces/userDataInterfaces';
import randomNumber from './randomNumber';

export const mockedStats: IStats = {
  intelligence: randomNumber(1, 100).toString(),
  strength: randomNumber(1, 100).toString(),
  speed: randomNumber(1, 100).toString(),
  durability: randomNumber(1, 100).toString(),
  power: randomNumber(1, 100).toString(),
  combat: randomNumber(1, 100).toString(),
};

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
