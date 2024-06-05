import React from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import styles from "../styles/Flowchart.module.css";

const DiamondNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div
      className={styles["diamond-node"]}
      data-tooltip-id="tooltip"
      data-tooltip-content={String(data.label)}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ borderRadius: 0 }}
      />
      <div className={styles["diamond-content"]}>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

export default DiamondNode;
