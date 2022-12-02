export type UserProps = {
  email: string;
  given_name: string;
  picture: string;
  score: number;
};

export class User {
  private constructor(
    public readonly email: string,
    public given_name: string,
    public picture: string,
    public score: number
  ) {}

  static create(props: UserProps): User {
    const user = new User(
      props.email,
      props.given_name,
      props.picture,
      props.score
    );
    return user;
  }
}
