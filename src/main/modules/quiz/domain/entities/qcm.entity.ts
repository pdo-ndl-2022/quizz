export type QcmProps = {
  id?: string;
  title: string;
  category: string;
};

export class Qcm {
  private constructor(
    public readonly id: string,
    public title: string,
    public category: string
  ) {}

  static create(props: QcmProps): Qcm {
    const qcm = new Qcm(props.id, props.title, props.category);
    return qcm;
  }
}
