import React from "react";

interface HBoxProps {
  children: React.ReactNode;
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  gap?: number;
}

const HBox: React.FC<HBoxProps> = ({ children, justify = "flex-start", align = "center", gap = 10 }) => {
  return (
    <div className="hbox" style={{ justifyContent: justify, alignItems: align, gap: `${gap}px` }}>
      {children}
    </div>
  );
};

export default HBox;
