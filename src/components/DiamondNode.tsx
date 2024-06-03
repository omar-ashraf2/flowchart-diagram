import { FC } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import styles from "./Flowchart.module.css";

const DiamondNode: FC<NodeProps> = ({ data }) => {
  return (
    <div
      className={styles["diamond-node"]}
      style={{ background: data.background || "#f39c12" }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ borderRadius: 0 }}
      />
      <div style={{ transform: "rotate(-45deg)" }}>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ borderRadius: 0 }}
      />
    </div>
  );
};

export default DiamondNode;
