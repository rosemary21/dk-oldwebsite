import { Spinner as SpinnerBs } from "react-bootstrap";

type SpinnerProps = {
  animationType: "border" | "grow" | undefined;
};

export default function Spinner({ animationType }: SpinnerProps) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "999999999",
        backgroundColor: "transparent",
      }}
    >
      <SpinnerBs animation={animationType} variant="secondary" />
    </div>
  );
}