import React, { useCallback, useState } from "react";
import ReactFlow, {
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "react-flow-renderer";
import { Tooltip } from "react-tooltip";
import DefaultNode from "./DefaultNode";
import DiamondNode from "./DiamondNode";
import Sidebar from "./Sidebar";
import { useDrop } from "react-dnd";
import styles from "../styles/Flowchart.module.css";

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
    type: "default",
    data: { label: "Step 1" },
    position: { x: 200, y: 100 },
    className: `${styles.node} ${styles["node-step"]}`,
  },
  {
    id: "3",
    type: "default",
    data: { label: "Step 2" },
    position: { x: 350, y: 100 },
    className: `${styles.node} ${styles["node-step"]}`,
  },
  {
    id: "4",
    type: "diamond",
    data: { label: "Decision" },
    position: { x: 350, y: 250 },
    className: `${styles.node} ${styles["node-decision"]}`,
  },
  {
    id: "5",
    type: "default",
    data: { label: "Step 3" },
    position: { x: 550, y: 250 },
    className: `${styles.node} ${styles["node-step"]}`,
  },
  {
    id: "6",
    type: "default",
    data: { label: "Step 4" },
    position: { x: 350, y: 450 },
    className: `${styles.node} ${styles["node-step"]}`,
  },
  {
    id: "7",
    type: "default",
    data: { label: "Step 5" },
    position: { x: 350, y: 550 },
    className: `${styles.node} ${styles["node-step"]}`,
  },
  {
    id: "8",
    type: "output",
    data: { label: "End 1" },
    position: { x: 50, y: 550 },
    className: `${styles.node} ${styles["node-end"]}`,
  },
  {
    id: "9",
    type: "default",
    data: { label: "Step 6" },
    position: { x: 600, y: 450 },
    className: `${styles.node} ${styles["node-step"]}`,
  },
  {
    id: "10",
    type: "output",
    data: { label: "End 2" },
    position: { x: 600, y: 600 },
    className: `${styles.node} ${styles["node-end"]}`,
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    style: { strokeWidth: 3 },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "smoothstep",
    style: { strokeWidth: 3 },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "smoothstep",
    style: { strokeWidth: 3 },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    type: "smoothstep",
    style: { strokeWidth: 3 },
  },
  {
    id: "e4-6",
    source: "4",
    target: "6",
    type: "smoothstep",
    style: { strokeWidth: 3 },
  },
  {
    id: "e5-9",
    source: "5",
    target: "9",
    type: "smoothstep",
    style: { strokeWidth: 3 },
  },
  {
    id: "e9-10",
    source: "9",
    target: "10",
    type: "smoothstep",
    style: { strokeWidth: 3 },
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    type: "smoothstep",
    style: { strokeWidth: 3 },
  },
  {
    id: "e7-8",
    source: "7",
    target: "8",
    type: "smoothstep",
    style: { strokeWidth: 3 },
  },
];

const nodeTypes = { diamond: DiamondNode, default: DefaultNode };

const Flowchart: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const getNextLabel = (type: string) => {
    const count = nodes.filter((node) => node.type === type).length + 1;
    switch (type) {
      case "input":
        return "Start";
      case "default":
        return `Step ${count}`;
      case "diamond":
        return "Decision";
      case "output":
        return `End`;
      default:
        return "Node";
    }
  };

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => addEdge({ ...params, style: { strokeWidth: 3 } }, eds)),
    []
  );
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation();
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  }, []);

  const [, drop] = useDrop({
    accept: "node",
    drop: (
      item: { type: string; label: string; className: string },
      monitor
    ) => {
      const offset = monitor.getSourceClientOffset();
      if (offset) {
        const position = {
          x: offset.x - 250,
          y: offset.y,
        };
        const newNode: Node = {
          id: `${+new Date()}`,
          type: item.type,
          position,
          data: { label: getNextLabel(item.type) },
          className: item.className,
        };
        setNodes((nds) => nds.concat(newNode));
      }
    },
  });

  return (
    <ReactFlowProvider>
      <div className={styles.container} style={{ height: "96vh" }}>
        <Sidebar />
        <div ref={drop} className={styles.flowchart}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgeClick={onEdgeClick}
          >
            <MiniMap />
            <Controls />
            <Tooltip id="tooltip" />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default Flowchart;
