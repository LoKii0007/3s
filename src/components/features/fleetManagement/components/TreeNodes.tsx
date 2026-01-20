import type { EquipmentNode, EquipmentNodeType } from "../types";
import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "../../../../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { nodeTypeStyles } from "../utils/helper";
import HighlightedText from "./HighlightText";

type NodeProps = {
  node: EquipmentNode;
  depth: number;
  expanded: Set<string>;
  toggle: (id: string) => void;
  index: number;
  parentIndex?: number;
  parentCount?: number;
  motionVariants?: typeof childVariants;
  searchQuery?: string;
  matchingIds?: Set<string>;
  hasMatchingDescendantsIds?: Set<string>;
  onWidthReport?: (id: string, width: number) => void;
  maxSiblingWidth?: number;
};

const childVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

const TreeNode: React.FC<NodeProps> = ({
  node,
  depth,
  expanded,
  toggle,
  index,
  parentIndex,
  parentCount,
  motionVariants,
  searchQuery = "",
  matchingIds = new Set(),
  hasMatchingDescendantsIds = new Set(),
  onWidthReport,
  maxSiblingWidth = 0,
}) => {
  const parentElement = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);
  const [childWidths, setChildWidths] = useState<Map<string, number>>(
    new Map(),
  );
  const [ownWidth, setOwnWidth] = useState(0);

  const hasChildren = !!node.children && node.children.length > 0;
  const isExpanded = expanded.has(node.id);
  const styles = nodeTypeStyles[node.type as EquipmentNodeType];

  // Calculate max width among children (siblings of each other)
  const maxChildWidth =
    childWidths.size > 0 ? Math.max(...childWidths.values()) : 0;
  const connectorLineWidth =
    maxSiblingWidth > 0 ? maxSiblingWidth - ownWidth + 16 : 16;

  const handleChildWidthReport = useCallback((id: string, width: number) => {
    setChildWidths((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, width);
      return newMap;
    });
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      const width = buttonRef.current.offsetWidth;
      setOwnWidth(width);
      if (onWidthReport) {
        onWidthReport(node.id, width);
      }
    }
  }, [node.id, onWidthReport]);

  const containerVariants = {
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  useEffect(() => {
    if (!parentElement.current) return;

    const updateDimensions = () => {
      if (parentElement.current) {
        const width = parentElement.current.clientWidth;
        setParentWidth(width);
        setParentHeight(parentElement.current.clientHeight);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (parentElement.current) {
      resizeObserver.observe(parentElement.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [isExpanded]);

  const RootComponent = motionVariants ? motion.div : "div";
  const rootProps = motionVariants
    ? {
        variants: motionVariants,
        initial: "closed" as const,
        animate: "open" as const,
        exit: "closed" as const,
      }
    : {};

  const isLastChild = parentCount !== undefined && index === parentCount - 1;

  return (
    <RootComponent
      className={cn("flex gap-2 items-center pr-10", isLastChild && "pb-10")}
      {...rootProps}
    >
      {/* //? parent node and edges  */}
      <div ref={parentElement} className="flex w-full h-full items-center">
        {depth > 0 && parentIndex !== undefined && (
          <div className="h-full flex items-center justify-center min-w-10">
            {index !== parentIndex ? (
              <div
                className={`w-full relative h-full border-[#C7C7C7] border-l-2 ${index < parentIndex ? "translate-y-1/2 rounded-tl-2xl border-t-2 " : "-translate-y-1/2 border-b-2 rounded-bl-2xl"}`}
              >
                {index !== parentCount! - 1 && (
                  <div
                    className={`absolute bottom-0 left-0 w-0.5 ${-index + parentIndex > 0 ? "h-0" : "h-20"} translate-y-1/2 -translate-x-full bg-[#C7C7C7]`}
                  ></div>
                )}

                {/* //? bottom curve for children node connection with parent node  */}
                {index === parentIndex + 1 && (
                  <div
                    className={`absolute -bottom-1 left-0 w-full h-full -translate-y-full -translate-x-full border-[#C7C7C7] border-t-2 border-r-2 rounded-tr-2xl`}
                  ></div>
                )}

                {/* //? top curve for children node connection with parent node  */}
                {index === parentIndex - 1 && (
                  <div
                    className={`absolute -top-[3px] left-0 w-full h-full translate-y-full -translate-x-full border-[#C7C7C7] border-b-2 border-r-2 rounded-br-2xl`}
                  ></div>
                )}
              </div>
            ) : (
              <div className="w-full h-0.5 bg-[#C7C7C7]"></div>
            )}
          </div>
        )}
        <button
          ref={buttonRef}
          type="button"
          className={cn(
            "group inline-flex items-center relative leading-[100%] tracking-[0px] font-normal z-20 gap-2 rounded-lg px-6 border-[1.5px] py-[6px] text-base h-fit whitespace-nowrap",
            "transition-all duration-300 ease-in-out",
            styles,
            isExpanded ? "opacity-100" : "opacity-[0.32]",
            matchingIds.has(node.id) &&
              "ring-2 ring-yellow-400 ring-offset-1 opacity-100",
            !isExpanded &&
              hasMatchingDescendantsIds.has(node.id) &&
              "ring-2 ring-orange-500 ring-offset-2 opacity-100 animate-pulse shadow-lg shadow-orange-300/50",
            "hover:shadow-[0px_4px_9px_0px_rgba(0,0,0,0.1),0px_16px_16px_0px_rgba(0,0,0,0.09),0px_35px_21px_0px_rgba(0,0,0,0.05),0px_63px_25px_0px_rgba(0,0,0,0.01),0px_98px_28px_0px_rgba(0,0,0,0)] border-[1.5px] hover:border-[#09090B]",
          )}
          onClick={() => hasChildren && toggle(node.id)}
        >
          <span>
            {searchQuery ? (
              <HighlightedText text={node.name} query={searchQuery} />
            ) : (
              node.name
            )}
          </span>
          {hasChildren && (
            <span className="flex h-3 w-3 absolute items-center bottom-0.5 right-0.5 justify-center rounded-full bg-white text-[10px] leading-none">
              {isExpanded ? (
                <Minus className="w-3 h-3 text-[#79747E]" />
              ) : (
                <Plus className="w-3 h-3 text-[#79747E]" />
              )}
            </span>
          )}
          {/* Indicator badge for closed nodes containing search results */}
          {!isExpanded && hasMatchingDescendantsIds.has(node.id) && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-[10px] font-bold shadow-md">
              !
            </span>
          )}
        </button>

        {hasChildren && isExpanded && (
          <div
            className="h-full flex min-h-8 items-center justify-center w-full z-10"
            style={{ minWidth: `${connectorLineWidth}px` }}
          >
            <div className="bg-[#C7C7C7] h-0.5 w-full"></div>
          </div>
        )}
      </div>

      {/* //? children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <div
            className="flex absolute "
            style={{
              transform: `translateX(${parentWidth}px)`,
              top: `${(parentHeight + 32) * (index > 0 ? index - 1 : 0)}px`,
            }}
          >
            <motion.div
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col gap-8"
            >
              {node.children!.map((child, childIndex) => (
                <TreeNode
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  expanded={expanded}
                  toggle={toggle}
                  index={childIndex}
                  parentIndex={Math.min(index, 1)}
                  parentCount={node.children!.length}
                  motionVariants={childVariants}
                  searchQuery={searchQuery}
                  matchingIds={matchingIds}
                  hasMatchingDescendantsIds={hasMatchingDescendantsIds}
                  onWidthReport={handleChildWidthReport}
                  maxSiblingWidth={maxChildWidth}
                />
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </RootComponent>
  );
};

export default TreeNode;
