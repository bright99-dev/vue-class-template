// PostModel.ts

export default class PostModel {
  private _postId: number;
  private _title: string;
  private _content: string;

  constructor(postId: number, title: string, content: string) {
    this._postId = postId;
    this._title = title;
    this._content = content;
  }

  get postId(): number {
    return this._postId;
  }

  get title(): string {
    return this._title;
  }

  set title(newTitle: string) {
    this._title = newTitle;
  }

  get content(): string {
    return this._content;
  }

  set content(newContent: string) {
    this._content = newContent;
  }

  displayPostInfo(): void {
    console.log(`Post ID: ${this._postId}`);
    console.log(`Title: ${this._title}`);
    console.log(`Content: ${this._content}`);
  }
}
