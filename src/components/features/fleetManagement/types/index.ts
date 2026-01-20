export type EquipmentNodeType =
  | 'equipmentType'
  | 'equipment'
  | 'assembly'
  | 'component'
  | 'equipmentDraft'
  | 'assemblyDraft';

export interface EquipmentNode {
  id: string;
  name: string;
  type: EquipmentNodeType;
  children?: EquipmentNode[];
}

