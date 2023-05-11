import React, { useState, useRef, useEffect } from "react"
import X from "./X"
import { Button, message } from "antd"
import downloadSvg from "svg-crowbar"
import { decompose_gates } from "./decmp"
import Line from "./Line"
export default function Composer() {
  const initCircuit = [
    [
      { name: "cz", qubit: [3, 4] },
      { name: "cz", qubit: [5, 6] },
      { name: "i", qubit: [7] },
      { name: "pvz", qubit: [0] },
    ],
    [
      { name: "cz", qubit: [0, 1] },
      { name: "cz", qubit: [2, 3] },
      { name: "i", qubit: [4] },
      { name: "i", qubit: [5] },
      { name: "cz", qubit: [6, 7] },
      { name: "cz", qubit: [8, 15] },
      { name: "cz", qubit: [16, 17] },
      { name: "cz", qubit: [9, 14] },
      { name: "cz", qubit: [10, 11] },
      { name: "cz", qubit: [12, 13] },
    ],
    [
      { name: "cz", qubit: [3, 4] },
      { name: "y", qubit: [7] },
    ],
    [
      { name: "cz", qubit: [3, 4] },
      { name: "pvz", qubit: [7] },
    ],
    [{ name: "pvz", qubit: [1] }],
    [{ name: "pvz", qubit: [2] }],
    [{ name: "pvz", qubit: [3] }],
    [{ name: "pvz", qubit: [4] }],
    [{ name: "pvz", qubit: [5] }],
    [{ name: "pvz", qubit: [6] }],
    [{ name: "pvz", qubit: [7] }],
    [{ name: "pvz", qubit: [8] }],
  ]
  const inputRef = useRef()
  const [circuit, setcircuit] = useState(initCircuit)
  const circuitArray = circuit.map((gates) => [...gates])
  let delCircuit = []
  for (let i = 0; i < circuit.length; i++) {
    delCircuit.push(decompose_gates(circuit[i]))
  }
  let delCurcuitLenght = []
  for (let index = 0; index < delCircuit.length; index++) {
    delCurcuitLenght.push(delCircuit[index].length)
  }
  let delCircuit1 = []
  for (let k = 0; k < delCircuit.length; k++) {
    if (delCircuit[k].length >= 1) {
      for (let j = 0; j < delCircuit[k].length; j++) {
        delCircuit1.push(delCircuit[k][j])
      }
    }
  }
  function findMaxQubit(circuit) {
    return circuit.reduce((max, gates) => {
      const maxQubit = gates.reduce(
        (gatesMax, gate) => Math.max(gatesMax, ...(gate.qubit || [])),
        0
      )
      return Math.max(maxQubit, max)
    }, 0)
  }
  const maxqubit = findMaxQubit(circuitArray)

  let qubitLineArry = []
  for (let index = 0; index <= maxqubit; index++) {
    qubitLineArry.push(index)
  }
  const width =
    circuit.length * 150 + 300 > 1000 ? circuit.length * 150 + 300 : 1000
  // eslint-disable-next-line no-unused-expressions
  circuit.length * 150 + 300 > 1000 ? circuit.length * 150 + 300 : 1000
  // eslint-disable-next-line no-unused-expressions
  circuit.length * 150 + 300 > 1000 ? circuit.length * 150 + 300 : 1000
  const svgHeight =
    qubitLineArry.length * 40 + 300 > 600
      ? qubitLineArry.length * 40 + 300
      : 600
  // 导入数据
  const [jsonData, setJsonData] = useState(null)
  const onClick = () => {
    inputRef.current.click()
  }
  const handleFileUpload = (event) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const result = JSON.parse(reader.result)
        setJsonData(result)

        // 将解析得到的 JSON 对象存入状态中
      } catch (error) {
        message.error(error)
      }
    }
    reader.readAsText(event.target.files[0])
  }
  useEffect(() => {
    if (jsonData?.length) {
      setcircuit(jsonData)
    }
  }, [jsonData])
  const exportSvg = () => {
    downloadSvg(document.getElementById("circuit"))
  }

  return (
    <div
      style={{ background: "#fff", overflowX: "scroll", overflowY: "scroll" }}
    >
      <div
        style={{
          marginTop: 20,
          marginLeft: 20,
        }}
        className="uploding"
      >
        <input
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
          type="file"
          accept=".json"
        ></input>
        <Button
          onClick={onClick}
          style={{
            marginTop: 20,
          }}
        >
          导入数据(json)
        </Button>

        <Button
          onClick={exportSvg}
          style={{
            marginTop: 20,
            marginLeft: 10,
          }}
        >
          导出图片
        </Button>
      </div>
      <div
        style={{
          background: "#fff",
          width: width,
          height: svgHeight,
          marginTop: 50,
        }}
        className="svgConten"
      >
        <svg
          style={{
            backgroundColor: "#fff",
          }}
          id="circuit"
          width={width}
          height={svgHeight}
        >
          {qubitLineArry.map((qubit, index) => (
            <g
              key={index}
              transform={`translate(60,${20 + index * 40 ? index * 40 : 0})`}
            >
              <g transform="translate(-14,4)">
                <text
                  x="38.4"
                  y="36"
                  dy=".3em"
                  fill="rgb(111, 111, 111)"
                  fontWeight="400"
                  textAnchor="end"
                  fontSize="14px"
                >
                  <tspan>q[{index}]</tspan>
                </text>
              </g>
              <line
                className="qubit"
                strokeWidth="2"
                x1="30"
                y1="40"
                x2={width - 80}
                y2="40"
                data-dis="0"
                stroke="black"
              ></line>
            </g>
          ))}
          {delCircuit1.map((item, index) => (
            <X
              qubitLineArry={qubitLineArry}
              key={index}
              x={index}
              item={item}
            />
          ))}
          {delCurcuitLenght.map((item, index) => (
            <Line
              key={index}
              item={item}
              index={index}
              qubitLineArry={qubitLineArry}
              delCurcuitLenght={delCurcuitLenght}
            />
          ))}
          <g></g>
        </svg>
      </div>
    </div>
  )
}
