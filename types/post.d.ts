interface IComment {
  user: string;
  comment: string;
}

interface IPost {
  image: string;
  user: string;
  title: string;
  caption: string;
  profile_img: string;
  likes: string;
  comments: IComment[];
}
