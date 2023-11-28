import { BaseService } from './base.service'

export class UserService extends BaseService {
  static get entity () {
    return 'users'
  }
}
