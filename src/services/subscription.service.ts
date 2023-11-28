import { BaseService } from './base.service'

export class SubscriptionService extends BaseService {
  static get entity () {
    return 'subscriptions'
  }
}
