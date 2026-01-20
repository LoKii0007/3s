import type { EquipmentNode } from '../types';

export const equipmentTreeData: EquipmentNode[] = [
    {
        id: 'equipments',
        name: 'Equipments',
        type: 'equipmentDraft',
        children: [
            {
                id: 'engine',
                name: 'Engine',
                type: 'equipmentDraft',
                children: [
                    {
                        id: 'main-engine-propulsion',
                        name: 'Main Engine & Propulsion',
                        type: 'equipmentType',
                        children: [
                            {
                                id: 'main-engine',
                                name: 'Main Engine',
                                type: 'equipment',
                                children: [
                                    {
                                        id: 'air-exhaust-system',
                                        name: 'Air & Exhaust System',
                                        type: 'assembly',
                                        children: [
                                            {
                                                id: 'me-turbocharger',
                                                name: 'ME Turbocharger',
                                                type: 'assembly',
                                                children: [
                                                    {
                                                        id: 'spare-parts-box',
                                                        name: 'Spare Parts Box',
                                                        type: 'component',
                                                    },
                                                    {
                                                        id: 'seal',
                                                        name: 'Seal',
                                                        type: 'component',
                                                    },
                                                    {
                                                        id: 'o-ring',
                                                        name: 'O-Ring',
                                                        type: 'component',
                                                    },
                                                    {
                                                        id: 'seal-turbine-side',
                                                        name: 'Seal -Turbine Side',
                                                        type: 'component',
                                                    },
                                                    {
                                                        id: 'seal-compressor-side',
                                                        name: 'Seal -Compressor Side',
                                                        type: 'component',
                                                    },
                                                    {
                                                        id: 'seal-engine-mount',
                                                        name: 'Seal -Engine Mount',
                                                        type: 'component',
                                                    },
                                                    {
                                                        id: 'seal-exhaust-flange',
                                                        name: 'Seal -Exhaust Flange',
                                                        type: 'component',
                                                    },
                                                    {
                                                        id: 'seal-oil-pan',
                                                        name: 'Seal -Oil Pan',
                                                        type: 'component',
                                                    },
                                                    {
                                                        id: 'seal-intake-manifold',
                                                        name: 'Seal -Intake Manifold',
                                                        type: 'component',
                                                    },
                                                    {
                                                        id: 'seal-transmission-case',
                                                        name: 'Seal -Transmission Case',
                                                        type: 'component',
                                                    },
                                                ],
                                            },
                                            {
                                                id: 'aux-blower',
                                                name: 'Aux Blower',
                                                type: 'assembly',
                                            },
                                            {
                                                id: 'aux-blower-2',
                                                name: 'Aux Blower 2',
                                                type: 'assemblyDraft',
                                            },
                                            {
                                                id: 'charge-air-cooler',
                                                name: 'Charge Air Cooler',
                                                type: 'assemblyDraft',
                                            },
                                            {
                                                id: 'exhaust-valve-complete',
                                                name: 'Exhaust Valve Complete',
                                                type: 'assembly',
                                            },
                                        ],
                                    },
                                    {
                                        id: 'control-safety-system',
                                        name: 'Control & Safety System',
                                        type: 'assembly',
                                    },
                                    {
                                        id: 'fuel-system',
                                        name: 'Fuel System',
                                        type: 'assembly',
                                    },
                                    {
                                        id: 'cooling-water-system',
                                        name: 'Cooling Water System',
                                        type: 'assembly',
                                    },
                                    {
                                        id: 'cylinder-liner-lubrication',
                                        name: 'Cylinder Liner & Lubrication',
                                        type: 'assembly',
                                    },
                                ],
                            },
                            {
                                id: 'propeller',
                                name: 'Propeller',
                                type: 'equipment',
                            },
                            {
                                id: 'shafting',
                                name: 'Shafting',
                                type: 'equipment',
                            },
                        ]
                    },
                    {
                        id: 'power-generation',
                        name: 'Power Generation',
                        type: 'equipmentType',
                    },
                    {
                        id: 'aux-boiler',
                        name: 'Aux boiler',
                        type: 'equipmentType',
                    },
                    {
                        id: 'aux-machinary',
                        name: 'Aux machinary',
                        type: 'equipmentType',
                    },
                    {
                        id: 'electrical-automation',
                        name: 'Electrical & Automation',
                        type: 'equipmentType',
                    },
                    {
                        id: 'tank-systems',
                        name: 'Tank Systems',
                        type: 'equipmentType',
                    },
                    {
                        id: 'dp-system',
                        name: 'DP System',
                        type: 'equipmentType',
                    },
                    {
                        id: 'others',
                        name: 'Others',
                        type: 'equipmentType',
                    },
                ]
            },
            {
                id: 'deck',
                name: 'Deck',
                type: 'equipmentDraft',
                children: [
                    {
                        id: 'deck-machinary',
                        name: 'Deck Machinary',
                        type: 'equipmentType',
                    },
                    {
                        id: 'cargo',
                        name: 'Cargo',
                        type: 'equipmentType',
                    },
                    {
                        id: 'lsa-ffa',
                        name: 'LSA/FFA',
                        type: 'equipmentType',
                    },
                    {
                        id: 'radio-navigation',
                        name: 'Radio & Navigation',
                        type: 'equipmentType',
                    },
                    {
                        id: 'deck-others',
                        name: 'Others',
                        type: 'equipmentType',
                    },
                ],
            },
            {
                id: 'accommodation',
                name: 'Accomodation',
                type: 'equipmentDraft',
                children: [
                    {
                        id: 'deck-machinary',
                        name: 'Deck Machinary',
                        type: 'equipmentType',
                    },
                    {
                        id: 'cargo',
                        name: 'Cargo',
                        type: 'equipmentType',
                    },
                    {
                        id: 'lsa-ffa',
                        name: 'LSA/FFA',
                        type: 'equipmentType',
                    },
                    {
                        id: 'radio-navigation',
                        name: 'Radio & Navigation',
                        type: 'equipmentType',
                    },
                    {
                        id: 'deck-others',
                        name: 'Others',
                        type: 'equipmentType',
                    },
                ],
            },
            {
                id: 'misc',
                name: 'Misc.',
                type: 'equipmentDraft',
            },
        ],
    },
];

