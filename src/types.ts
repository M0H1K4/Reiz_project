export interface Show {
    id: number;
    name: string;
    genres: string[];
    rating: {
      average: number | null;
    };
    image?: {
      medium: string;
      original: string;
    };
    summary: string;
  }