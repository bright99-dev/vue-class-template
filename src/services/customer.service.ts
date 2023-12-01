import { BaseService } from './base.service'

export class CustomerService extends BaseService {
  static get entity () {
    return 'customers'
  }
}
