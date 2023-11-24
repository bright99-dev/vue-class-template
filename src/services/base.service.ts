export class BaseService {
  static get entity(): string {
    throw new Error("entity getter not defined");
  }

  static request() {
    return Http;
  }

  static async getList(
    parameters: Record<string, any> = {}
  ): Promise<any> {
    const params = { ...parameters };

    try {
      return await Http.get(`${this.entity}`, { params });
    } catch (error) {
      console.log(error);
    }
  }

  static async getListPublic(
    parameters: Record<string, any> = {}
  ): Promise<any> {
    const params = { ...parameters };

    try {
      return await Http.get(`${this.entity}`, { params });
    } catch (error) {
      console.log(error);
    }
  }

  static async getSingle(id: string): Promise<any> {
    try {
      return await Http.get(`${this.entity}/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSinglePublic(id: string): Promise<any> {
    try {
      return await Http.get(`${this.entity}/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  static async create(data: Record<string, any>): Promise<any> {
    try {
      return await Http.post(`${this.entity}`, data);
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id: string, data: Record<string, any>): Promise<any> {
    try {
      return await Http.put(`${this.entity}/${id}`, data);
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(id: string): Promise<any> {
    try {
      return await Http.delete(`${this.entity}/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
}
