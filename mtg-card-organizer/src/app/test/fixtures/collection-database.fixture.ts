import { Collection } from '../../collection/models/collection';

export const collectionDatabase: Collection[] = [
  { id: 1, name: 'Test Collection A', parentId: null, hasSubCollections: false, hasCards: true },
  { id: 2, name: 'Test Collection B', parentId: null, hasSubCollections: true, hasCards: false },
  { id: 3, name: 'Test Sub Collection C', parentId: 2, hasSubCollections: false, hasCards: true },
  { id: 4, name: 'Test Sub Collection D', parentId: 2, hasSubCollections: false, hasCards: true },
];
