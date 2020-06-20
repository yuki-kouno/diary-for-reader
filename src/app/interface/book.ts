export interface Book {
  id: string;
  createdAt: Date;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string;
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: number;
    ratingsCount: number;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
}
