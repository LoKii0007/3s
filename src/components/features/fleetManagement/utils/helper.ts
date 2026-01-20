import type { EquipmentNode, EquipmentNodeType } from "../types";
import { equipmentTreeData } from "./constants";

export const findParent = (
    nodes: EquipmentNode[],
    targetId: string,
    parent: EquipmentNode | null = null,
): EquipmentNode | null => {
    for (const node of nodes) {
        if (node.id === targetId) return parent;
        if (node.children) {
            const found = findParent(node.children, targetId, node);
            if (found !== null) return found;
        }
    }
    return null;
};

export const getSiblingIds = (targetId: string): string[] => {
    const parent = findParent(equipmentTreeData, targetId);
    if (!parent || !parent.children) return [];

    return parent.children
        .filter((child: EquipmentNode) => child.id !== targetId)
        .map((child: EquipmentNode) => child.id);
};

export const allNodeIds = (): string[] => {
    const ids: string[] = [];
    const walk = (nodes: EquipmentNode[]) => {
        nodes.forEach((n) => {
            ids.push(n.id);
            if (n.children) walk(n.children);
        });
    };
    walk(equipmentTreeData);
    return ids;
};


export const initialExpandedIds = (): string[] => {
    const ids: string[] = [];

    const walkFirstBranch = (node: EquipmentNode | undefined) => {
        if (!node) return;
        ids.push(node.id);

        if (node.children && node.children.length > 0) {
            walkFirstBranch(node.children[0]);
        }
    };

    if (equipmentTreeData.length > 0) {
        walkFirstBranch(equipmentTreeData[0]);
    }

    return ids;
};

// Filter tree nodes by search query
export const filterTreeBySearch = (
    nodes: EquipmentNode[],
    searchQuery: string
): { filteredTree: EquipmentNode[]; matchingIds: Set<string>; hasMatchingDescendantsIds: Set<string> } => {
    const query = searchQuery.toLowerCase().trim();
    const matchingIds = new Set<string>();
    const hasMatchingDescendantsIds = new Set<string>(); 

    if (!query) {
        return { filteredTree: nodes, matchingIds, hasMatchingDescendantsIds };
    }

    const filterNode = (node: EquipmentNode): EquipmentNode | null => {
        const nameMatches = node.name.toLowerCase().includes(query);

        let filteredChildren: EquipmentNode[] | undefined;
        if (node.children && node.children.length > 0) {
            filteredChildren = node.children
                .map(child => filterNode(child))
                .filter((child): child is EquipmentNode => child !== null);
        }

        const hasMatchingDescendants = filteredChildren && filteredChildren.length > 0;

        if (nameMatches || hasMatchingDescendants) {
            if (nameMatches) {
                matchingIds.add(node.id);
            }
            if (hasMatchingDescendants) {
                hasMatchingDescendantsIds.add(node.id);
            }
            return {
                ...node,
                children: filteredChildren && filteredChildren.length > 0 ? filteredChildren : undefined
            };
        }

        return null;
    };

    const filteredTree = nodes
        .map(node => filterNode(node))
        .filter((node): node is EquipmentNode => node !== null);

    return { filteredTree, matchingIds, hasMatchingDescendantsIds };
};

export const nodeTypeStyles: Record<EquipmentNodeType, string> = {
    equipmentType: 'bg-[#EF4444] text-[#FFFFFF] border-[#DC2626]',
    equipment: 'bg-[#003366] text-[#FFFFFF] border-[#003366]',
    assembly: 'bg-[#929090] text-[#FFFFFF] border-[#929090]',
    component: 'bg-[#34882D] text-[#FFFFFF] border-[#34882D]',
    equipmentDraft: 'bg-[#5583F7] text-[#FFFFFF] border-[#5583F7]',
    assemblyDraft: 'bg-[#C9C6C5] text-[#79747E] border-[#C9C6C5]',
};