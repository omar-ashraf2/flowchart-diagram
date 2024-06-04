import React, { useCallback, useState } from "react";
import ReactFlow, {
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeChange,
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  EdgeChange,
} from "react-flow-renderer";
import { Tooltip } from "react-tooltip";
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
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    label: "Step 1",
    style: { strokeWidth: 3 },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "smoothstep",
    label: "Step 2",
    style: { strokeWidth: 3 },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "smoothstep",
    label: "Decision",
    style: { strokeWidth: 3 },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    type: "smoothstep",
    label: "Step 3",
    style: { strokeWidth: 3 },
  },
  {
    id: "e4-6",
    source: "4",
    target: "6",
    type: "smoothstep",
    label: "Step 4",
    style: { strokeWidth: 3 },
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    type: "smoothstep",
    label: "End",
    style: { strokeWidth: 3 },
  },
];

const nodeTypes = { diamond: DiamondNode };

const Flowchart: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
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

  return (
    <ReactFlowProvider>
      <div style={{ height: "95vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
        >
          {nodes.map((node) => (
            <div
              key={node.id}
              data-tooltip-id="tooltip"
              data-tooltip-content={String(node.data.label)}
            />
          ))}
          {edges.map((edge) => (
            <div
              key={edge.id}
              data-tooltip-id="tooltip"
              data-tooltip-content={String(edge.label)}
            />
          ))}
          <MiniMap />
          <Controls />
          <Tooltip id="tooltip" />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default Flowchart;
