interface PostModel {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export default class PostController {
  static list = [];
  static listPublic = [];
  static single = null;

  static async getList(params: Record<string, any>): Promise<any> {
    try {
      const res = await PostService.getList(params);

      this.list = await res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getListPublic(params: Record<string, any>): Promise<any> {
    try {
      const res = await PostService.getListPublic(params);

      this.listPublic = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async create(formData: PostModel): Promise<any> {
    try {
      const res = await PostService.create(formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getSingle(id: string): Promise<any> {
    try {
      const res = await PostService.getSingle(id);
      this.single = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id: string, formData: Partial<PostModel>): Promise<any> {
    try {
      const res = await PostService.update(id, formData);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async delete(id: string): Promise<any> {
    try {
      const res = await PostService.delete(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
}
