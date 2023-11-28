import { BaseService } from './base.service'

export class PostService extends BaseService {
  static get entity () {
    return 'posts'
  }
}
