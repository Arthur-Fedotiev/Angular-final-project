export interface IPowerUp {
  id: string;
  title: string;
  url: string;
  description: string;
  usesLeft: number;
}

export interface IBattleRecord {
  date: number;
  heroName: string;
  opponentName: string;
  result: string;
}
