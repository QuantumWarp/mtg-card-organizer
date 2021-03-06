import { NavNode } from './nav-node/nav-node';

export const navModel: NavNode[] = [
  {
    text: 'Admin',
    icon: 'lock',
    requiredRole: 'Administrator',
    children: [
      {
        text: 'Import Cards',
        icon: 'get_app',
        routerLink: '/admin/import-cards',
      },
      {
        text: 'User Admin',
        icon: 'account_box',
        routerLink: '/admin/users',
      },
    ]
  },
  {
    text: 'My Containers',
    icon: 'view_list',
    routerLink: '/containers',
  },
  {
    text: 'Bookmarks',
    icon: 'bookmark',
    routerLink: '/bookmarks',
  },
  {
    text: 'Tools',
    icon: 'build',
    children: [
      {
        text: 'Card Search',
        icon: 'view_list',
        routerLink: '/cards/search',
      },
      {
        text: 'Life Counter',
        icon: 'favorite',
        routerLink: '/life-counter',
      },
    ]
  },
];
