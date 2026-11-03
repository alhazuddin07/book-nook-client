export type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  image: string;
  description: string;
  userName?: string;
  userEmail?: string;
  addedBy?: {
    name: string,
    email: string,
  } | null;
};

export type Borrow = {
  _id: string;
  bookId: string;
  name?: string;
  email: string;
  imageUrl?: string;
  bookinDate: string;
  title: string;
  author: string;
  category: string;
  image: string;
};