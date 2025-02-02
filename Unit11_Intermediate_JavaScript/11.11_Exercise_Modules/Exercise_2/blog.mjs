// Default Export and Import
// Post class
export default class Post {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
  publish() {
    console.log(`Title: ${this.title}`);
    console.log(`Content: ${this.content}`);
  }
}
