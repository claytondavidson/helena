interface IPhoto {
  id: string;
  url: string;
  isMain: boolean;
}

export interface IProfile {
  displayName: string;
  username: string;
  bio: string;
  image: string;
  photos: IPhoto[];
}
