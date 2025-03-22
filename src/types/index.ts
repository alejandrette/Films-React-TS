export type Films = {
  id: number;
  title: string;
  overview: string;
  media_type: string | undefined;
  poster_path: string;
  vote_average: number;
}

export type Categories = {
  value: string;
  category: string;
}

export type MediaTypes = {
  value: string;
  mediaType: string;
}