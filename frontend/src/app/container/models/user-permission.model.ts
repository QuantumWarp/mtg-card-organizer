import { Permission } from './permission';

export class UserPermissionModel {
  userName: string;

  constructor(
    public userId: string,
    public permission: Permission,
  ) { }
}
