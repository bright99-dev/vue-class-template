interface IPostModel {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default class PostModel {
  static list = [];
  static listPublic = [];
  static single = null;

  static async getList(params: Record<string, any>): Promise<any> {
    try {
      const res = await PostsService.getList(params);

      this.list = await res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getListPublic(params: Record<string, any>): Promise<any> {
    try {
      const res = await PostsService.getListPublic(params);

      this.listPublic = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async create(formData: IPostModel): Promise<any> {
    try {
      const res = await PostsService.create(formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getSingle(id: string): Promise<any> {
    try {
      const res = await PostsService.getSingle(id);
      PostModel.single = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id: string, formData: Partial<IPostModel>): Promise<any> {
    try {
      const res = await PostsService.update(id, formData);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  static async delete(id: string): Promise<any> {
    try {
      const res = await PostsService.delete(id);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
