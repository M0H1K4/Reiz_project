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
  premiered?: string;
  ended?: string;
  status?: string;
  network?: {
    name: string;
  };
  schedule?: {
    time: string;
    days: string[];
  };
  officialSite?: string;  // Added official site
  averageRuntime?: number; // Added average runtime
  language?: string; // Added language
}
