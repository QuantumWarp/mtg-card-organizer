import { NavNode } from "./nav-node";

export class NavModel {
    nodes: NavNode[];

    constructor(...nodes: NavNode[]) {
        this.nodes = nodes;
    }

    static default(): NavModel {
        return new NavModel(
            new NavNode("Import Cards", "/admin/import-cards"),
            new NavNode("Card Search", "/search/card-search"),
        );
    }
}
