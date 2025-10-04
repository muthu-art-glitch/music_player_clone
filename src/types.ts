export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: Song[];
  isPublic: boolean;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  followers: number;
}
