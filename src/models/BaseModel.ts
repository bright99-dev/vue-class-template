interface BaseService {
  getList(params: Record<string, any>): Promise<any>;
  getListPublic(params: Record<string, any>): Promise<any>;
  create(formData: any): Promise<any>;
  getSingle(id: string): Promise<any>;
  update(id: string, formData: any): Promise<any>;
  delete(id: string): Promise<any>;
}

export class BaseModel {
  static list = [];
  static listPublic = [];
  static single = null;

  static get service(): BaseService {
    throw new Error('service getter not defined');
  }

  static async getList(params: Record<string, any>) {
    try {
      const res = await this.service.getList(params);
      this.list = await res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getListPublic(params: Record<string, any>) {
    try {
      const res = await this.service.getListPublic(params);
      this.listPublic = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async create(formData: any) {
    try {
      const res = await this.service.create(formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getSingle(id: string) {
    try {
      const res = await this.service.getSingle(id);
      this.single = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id: string, formData: any) {
    try {
      const res = await this.service.update(id, formData);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async delete(id: string) {
    try {
      const res = await this.service.delete(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
}
