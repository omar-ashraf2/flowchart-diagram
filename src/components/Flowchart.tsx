import React, { useMemo } from "react";
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  Node,
  Edge,
} from "react-flow-renderer";
import DiamondNode from "./DiamondNode";
import styles from "./Flowchart.module.css";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 50, y: 100 },
    className: `${styles.node} ${styles["node-start"]}`,
  },
  {
    id: "2",
    data: { label: "Step 1" },
    position: { x: 250, y: 100 },
    className: `${styles.node} ${styles["node-step"]}`,
  },
  {
    id: "3",
    data: { label: "Step 2" },
    position: { x: 450, y: 100 },
    className: `${styles.node} ${styles["node-step"]}`,
  },
  {
    id: "4",
    type: "diamond",
    data: { label: "Decision" },
    position: { x: 650, y: 100 },
    className: `${styles.node} ${styles["node-decision"]}`,
  },
  {
    id: "5",
    data: { label: "Step 3" },
    position: { x: 850, y: 50 },
    className: `${styles.node} ${styles["node-step"]}`,
  },
  {
    id: "6",
    data: { label: "Step 4" },
    position: { x: 650, y: 200 },
    className: `${styles.node} ${styles["node-step"]}`,
  },
  {
    id: "7",
    type: "output",
    data: { label: "End" },
    position: { x: 850, y: 200 },
    className: `${styles.node} ${styles["node-end"]}`,
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
  { id: "e2-3", source: "2", target: "3", type: "smoothstep" },
  { id: "e3-4", source: "3", target: "4", type: "smoothstep" },
  { id: "e4-5", source: "4", target: "5", type: "smoothstep" },
  { id: "e4-6", source: "4", target: "6", type: "smoothstep" },
  { id: "e6-7", source: "6", target: "7", type: "smoothstep" },
];

const nodeTypes = { diamond: DiamondNode };

const Flowchart: React.FC = () => {
  const nodes = useMemo(() => initialNodes, []);
  const edges = useMemo(() => initialEdges, []);

  return (
    <ReactFlowProvider>
      <div style={{ height: 600 }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default Flowchart;
