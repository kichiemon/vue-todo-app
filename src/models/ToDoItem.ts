export class ToDoItem {
  public name: string;
  public isDone: boolean;

  constructor(name: string, isDone: boolean) {
    this.name = name;
    this.isDone = isDone;
  }
  public toggle() {
    this.isDone = !this.isDone;
  }
}

export class ToDoItemsRepository {
  public static fetchItems(): Promise<ToDoItem[]> {
    return new Promise((r, _) =>
      setTimeout(
        () =>
          r(
            Array.from(Array(10).keys()).map(
              (i) => new ToDoItem(`sample_${i}`, i % 2 == 1)
            )
          ),
        2000
      )
    );
  }
}
