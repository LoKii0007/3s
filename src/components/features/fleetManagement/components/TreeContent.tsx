import { useState, useMemo } from 'react';
import { equipmentTreeData } from '../utils/constants';
import { getSiblingIds, initialExpandedIds, filterTreeBySearch } from '../utils/helper';
import TreeNode from './TreeNodes';
import { motion } from 'motion/react';

interface EquipmentTreeProps {
  searchQuery?: string;
}

const EquipmentTree = ({ searchQuery = '' }: EquipmentTreeProps) => {
  // Initially keep only the first branch of siblings open by default
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(initialExpandedIds()),
  );

  // Filter tree data based on search query
  const { filteredTree, matchingIds, hasMatchingDescendantsIds } = useMemo(() => {
    return filterTreeBySearch(equipmentTreeData, searchQuery);
  }, [searchQuery]);

  const containerVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0, transition: { duration: 0.5 } },
  };

  const toggleNode = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      const isCurrentlyExpanded = next.has(id);

      if (isCurrentlyExpanded) {
        next.delete(id);
      } else {
        const siblingIds = getSiblingIds(id);
        siblingIds.forEach((siblingId) => {
          next.delete(siblingId);
        });
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="relative z-10 flex h-full w-full items-start justify-start ps-6">
      <motion.div variants={containerVariants}
        animate={expanded.size > 0 ? 'open' : 'closed'}
        className="flex flex-col gap-6 relative">
        {filteredTree.map((root, index) => (
          <TreeNode
            key={root.id}
            node={root}
            depth={0}
            expanded={expanded}
            toggle={toggleNode}
            index={index}
            parentCount={root.children?.length ?? 0}
            parentIndex={undefined}
            searchQuery={searchQuery}
            matchingIds={matchingIds}
            hasMatchingDescendantsIds={hasMatchingDescendantsIds}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default EquipmentTree;

