export interface IFriend {
  id: number | string;
  name: string;
  gender: string;
  previus?: {
    name?: string;
    gender?: string;
  }
}
