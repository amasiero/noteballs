interface Date {
  seconds: number;
  nanoseconds: number;
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
}
