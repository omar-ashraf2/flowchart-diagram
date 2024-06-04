import React from "react";
import { useDrag } from "react-dnd";
import styles from "./Flowchart.module.css";

const ItemTypes = {
  NODE: "node",
};

interface SidebarItemProps {
  type: string;
  label: string;
  className: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  type,
  label,
  className,
}) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.NODE,
    item: { type, label, className },
  }));

  return (
    <div ref={drag} className={`${styles.sidebarItem} ${className}`}>
      {label}
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <SidebarItem
        type="input"
        label="Start"
        className={styles["node-start"]}
      />
      <SidebarItem
        type="default"
        label="Step"
        className={styles["node-step"]}
      />
      <SidebarItem
        type="diamond"
        label="Decision"
        className={styles["node-decision"]}
      />
      <SidebarItem type="output" label="End" className={styles["node-end"]} />
    </div>
  );
};

export default Sidebar;
