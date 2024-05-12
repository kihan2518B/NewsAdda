type Team = {
    id: number;
    name: string;
  };
  
  type Sport = {
    id: number;
    name: string;
  };
  
export type Article = {
    id: number;
    title: string;
    thumbnail: string;
    sport: Sport;
    date: string;
    summary: string;
    teams: Team[];
  };
  