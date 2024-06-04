import React from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import styles from "./Flowchart.module.css";

const DefaultNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div
      className={styles.node}
      data-tooltip-id="tooltip"
      data-tooltip-content={String(data.label)}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ borderRadius: 0 }}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

export default DefaultNode;