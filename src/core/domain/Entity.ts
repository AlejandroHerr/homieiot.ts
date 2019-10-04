export default abstract class Entity<T> {
  public readonly id: string;

  public readonly props: T;

  constructor(props: T, id: string) {
    this.id = id;
    this.props = props;
  }
}
