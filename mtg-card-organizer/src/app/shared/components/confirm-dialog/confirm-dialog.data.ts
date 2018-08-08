export class ConfirmDialogData {
  title: string;
  description: string;

  constructor(init: Partial<ConfirmDialogData>) {
    Object.assign(this, init);
  }
}
