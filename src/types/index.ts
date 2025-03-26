export type Films = {
  id: number;
  title: string;
  overview: string;
  media_type: string | undefined;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export type Categories = {
  value: string;
  category: string;
}

export type MediaTypes = {
  value: string;
  mediaType: string;
}

export type Notification = {
  text: string;
  error: boolean;
  show: boolean;
}