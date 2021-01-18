export class ToDoItem {
  public id: string;
  public name: string;
  public isDone: boolean;

  constructor(id: string, name: string, isDone: boolean) {
    this.id = id;
    this.name = name;
    this.isDone = isDone;
  }
  public toggle() {
    this.isDone = !this.isDone;
  }
}
