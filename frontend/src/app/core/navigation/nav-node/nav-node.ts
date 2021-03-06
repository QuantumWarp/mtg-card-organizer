export interface NavNode {
  text: string;
  routerLink?: string;
  icon?: string;
  action?: () => void;
  children?: NavNode[];
  open?: boolean;
  requiredRole?: string;
}
