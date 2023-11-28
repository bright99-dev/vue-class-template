interface UserModel {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  gender: string;
  birthday: string;
  email: string;
  address: string;
}

export default class UserController {
  static list = [];
  static listPublic = [];
  static single = null;

  static async getList(params: Record<string, any>): Promise<any> {
    try {
      const res = await UserService.getList(params);

      this.list = await res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getListPublic(params: Record<string, any>): Promise<any> {
    try {
      const res = await UserService.getListPublic(params);

      this.listPublic = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async create(formData: UserModel): Promise<any> {
    try {
      const res = await UserService.create(formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getSingle(id: string): Promise<any> {
    try {
      const res = await UserService.getSingle(id);
      this.single = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id: string, formData: Partial<UserModel>): Promise<any> {
    try {
      const res = await UserService.update(id, formData);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async delete(id: string): Promise<any> {
    try {
      const res = await UserService.delete(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
}
