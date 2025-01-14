export interface INote {
  _id: string;
  title: string;
  content: string;
  createdAt: number;
}

export interface INoteResult {
  data: INote[];
}
