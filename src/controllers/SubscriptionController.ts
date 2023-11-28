interface SubscriptionModel {
  customer_id: string;
  studio_id: string;
  package_id: string;
  price: number;
  start_at: string;
  sign_at: string;
  discount_percent: number;
  total_amount: number;
  salesperson_id: string;
  notes: string;
}

export default class SubscriptionController {
  static list = [];
  static listPublic = [];
  static single = null;

  static async getList(params: Record<string, any>): Promise<any> {
    try {
      const res = await SubscriptionService.getList(params);

      this.list = await res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getListPublic(params: Record<string, any>): Promise<any> {
    try {
      const res = await SubscriptionService.getListPublic(params);

      this.listPublic = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async create(formData: SubscriptionModel): Promise<any> {
    try {
      const res = await SubscriptionService.create(formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async getSingle(id: string): Promise<any> {
    try {
      const res = await SubscriptionService.getSingle(id);
      this.single = res.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async update(id: string, formData: Partial<SubscriptionModel>): Promise<any> {
    try {
      const res = await SubscriptionService.update(id, formData);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  static async delete(id: string): Promise<any> {
    try {
      const res = await SubscriptionService.delete(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
}
