import { NavNode } from './nav-node';

export const navModel: NavNode[] = [
  {
    text: 'Admin',
    icon: 'lock',
    children: [
      {
        text: 'Import Cards',
        icon: 'get_app',
        routerLink: '/admin/import-cards',
      },
    ]
  },
  {
    text: 'Collections',
    icon: 'view_list',
    children: [
      {
        text: 'My Collections',
        icon: 'view_list',
        routerLink: '/collections',
      },
      {
        text: 'Search',
        icon: 'search',
        routerLink: '/collections',
      },
    ]
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
