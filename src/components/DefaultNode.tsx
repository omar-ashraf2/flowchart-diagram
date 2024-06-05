import React from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import styles from "../styles/Flowchart.module.css";

interface DefaultNodeProps extends NodeProps {
  className?: string;
}

const DefaultNode: React.FC<DefaultNodeProps> = ({ data, className }) => {
  return (
    <div
      className={`${styles.node} ${className}`}
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
