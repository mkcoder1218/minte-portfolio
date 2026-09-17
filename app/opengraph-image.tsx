import { ImageResponse } from "next/og";

export const alt = "Mintesnot Saleamlak — Video Editor & Visual Storyteller";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f6f3ed",
        color: "#111111",
        padding: "70px 80px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span>MINTESNOT.</span>
        <span>VIDEO EDITOR · 2026</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 110,
          lineHeight: 0.9,
          letterSpacing: "-6px",
          fontWeight: 700,
        }}
      >
        <span>VISUAL</span>
        <span>STORIES.</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
        <span>EDIT · CREATE · REPEAT</span>
        <span>ETHIOPIA → WORLDWIDE</span>
      </div>
    </div>,
    size,
  );
}
