import React from "react"
import Cz from "./gates/Cz"
import I from "./gates/I"
import Pvz from "./gates/Pvz"
import Vz from "./gates/Vz"
import YGate from "./gates/YGate"
import OtherGate from "./OtherGate"
export default function Y({ gate }) {
  // console.log(gate, 55)
  return (
    <g>
      {gate &&
        gate.qubit?.map((item, index) => (
          <g key={index} transform={`translate(0,${item * 40 + 24})`}>
            {(() => {
              switch (gate.name) {
                case "cz":
                  return <Cz />
                case "i":
                  return <I />
                case "pvz":
                  return <Pvz />
                case "vz":
                  return <Vz />
                case "y":
                  return <YGate />

                default:
                  return <OtherGate name={gate?.name} />
              }
            })()}
          </g>
        ))}
      {gate.qubit?.length > 1 && (
        <line
          strokeWidth="2"
          stroke="rgb(126, 164, 248)"
          x1={16}
          x2={16}
          y1={gate.qubit[0] * 40 + 40}
          y2={gate.qubit[1] * 40 + 40}
        ></line>
      )}
    </g>
  )
}
