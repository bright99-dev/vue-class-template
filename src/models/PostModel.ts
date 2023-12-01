interface IPostModel {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default class PostModel extends BaseModel {
  static get service() {
    return PostService;
  }
}

