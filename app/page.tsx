"use client";

import { Fragment, useMemo, useState } from "react";

type Operator = "add" | "subtract" | "multiply" | "divide";

const attackers = [
  "Wind",
  "Earth",
  "Water",
  "Fire",
  "Neutral",
  "Holy",
  "Shadow",
  "Ghost",
  "Undead",
  "Poison",
];

const defenders = [...attackers];

const baseTable = [
  [0.25, 0.5, 2, 1, 1, 0.75, 1, 1, 1, 0.75],
  [2, 0.25, 1, 0.5, 1, 0.75, 1, 1, 1, 0.75],
  [0.5, 1, 0.25, 2, 1, 0.75, 1, 1, 1.5, 0.75],
  [1, 2, 0.5, 0.25, 1, 0.75, 1, 1, 2, 0.75],
  [1, 1, 1, 1, 1, 1, 1, 0.25, 1, 1],
  [1, 1, 1, 1, 1, 0.25, 2, 1, 2, 1.25],
  [1, 1, 1, 1, 1, 2, 0.25, 1, 0.25, 0.25],
  [1, 1, 1, 1, 0.25, 0.75, 0.75, 2, 1.75, 0.75],
  [0.5, 0.5, 0.5, 0.5, 1, 1.75, 0.25, 1, 0.25, 0.25],
  [1.25, 1.25, 1, 1.25, 1, 0.5, 0.25, 0.5, 0.25, 0.25],
];

function formatValue(value: number) {
  const rounded = Math.round(value * 1000) / 1000;
  return Number.isInteger(rounded) ? `${rounded}` : `${rounded}`;
}

function calculateLevelCoefficient(
  coefficient: number,
  srcAtkLevel: number,
  tarDefLevel: number
) {
  let elementRate = coefficient;

  if (tarDefLevel >= 3) {
    elementRate =
      elementRate + (srcAtkLevel - 1) * 0.25 - 0.25 - (tarDefLevel - 2) * 0.125;
  } else if (tarDefLevel === 2) {
    elementRate = elementRate + (srcAtkLevel - 1) * 0.25 - 0.25;
  } else {
    elementRate = elementRate + (srcAtkLevel - 1) * 0.25;
  }

  return Math.max(0, elementRate);
}

function calculateCoefficient(
  coefficient: number,
  selectedOperator: Operator,
  globalModifier: number
) {
  switch (selectedOperator) {
    case "add":
      return coefficient + globalModifier;
    case "subtract":
      return globalModifier - coefficient;
    case "multiply":
      return coefficient * globalModifier;
    case "divide":
      return globalModifier === 0 ? coefficient : coefficient / globalModifier;
  }
}

export default function Home() {
  const [selectedOperator, setSelectedOperator] = useState<Operator>("add");
  const [globalModifier, setGlobalModifier] = useState(0);
  const [attackerLevel, setAttackerLevel] = useState(1);
  const [defenderLevel, setDefenderLevel] = useState(1);

  const finalTable = useMemo(
    () =>
      baseTable.map((row) =>
        row.map((coefficient) =>
          calculateCoefficient(
            calculateLevelCoefficient(coefficient, attackerLevel, defenderLevel),
            selectedOperator,
            globalModifier
          )
        )
      ),
    [attackerLevel, defenderLevel, globalModifier, selectedOperator]
  );

  return (
    <main className="min-h-screen px-4 py-8 text-[#ceccff]">
      <section className="mx-auto flex w-full max-w-[1400px] flex-col gap-6">
        <div className="flex flex-col gap-4 border border-[#ceccff]/40 p-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="table-content font-semibold tracking-tight">
              Element Damage Table
            </h1>
            <p className="table-content mt-1 text-[#ceccff]/80">
              Adjust the formula and the table updates from the coefficient.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap">
            <label className="table-content flex flex-col gap-2">
              <span className="font-medium">Attacker level</span>
              <select
                value={attackerLevel}
                onChange={(e) => setAttackerLevel(Number(e.target.value))}
                className="w-full min-w-0 border border-[#ceccff] bg-transparent px-3 py-2 text-[#ceccff] outline-none lg:min-w-[160px]"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </label>

            <label className="table-content flex flex-col gap-2">
              <span className="font-medium">Defender level</span>
              <select
                value={defenderLevel}
                onChange={(e) => setDefenderLevel(Number(e.target.value))}
                className="w-full min-w-0 border border-[#ceccff] bg-transparent px-3 py-2 text-[#ceccff] outline-none lg:min-w-[160px]"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </label>

            <label className="table-content flex flex-col gap-2">
              <span className="font-medium">Operator</span>
              <select
                value={selectedOperator}
                onChange={(e) =>
                  setSelectedOperator(e.target.value as Operator)
                }
                className="w-full min-w-0 border border-[#ceccff] bg-transparent px-3 py-2 text-[#ceccff] outline-none lg:min-w-[160px]"
              >
                <option value="add">Addition</option>
                <option value="subtract">Subtraction</option>
                <option value="multiply">Multiplication</option>
                <option value="divide">Division</option>
              </select>
            </label>

            <label className="table-content flex flex-col gap-2">
              <span className="font-medium">globalModifier</span>
              <input
                type="number"
                step="1"
                value={globalModifier}
                onChange={(e) => setGlobalModifier(Number(e.target.value))}
                className="w-full min-w-0 border border-[#ceccff] bg-transparent px-3 py-2 text-[#ceccff] outline-none lg:min-w-[160px]"
              />
            </label>
          </div>
        </div>

        <div className="border border-[#ceccff]/40">
          <div
            className="grid text-[#ceccff]"
            style={{
              gridTemplateColumns: `110px repeat(${defenders.length}, minmax(0, 1fr))`,
            }}
          >
            <div className="border border-[#ceccff]/40 px-3 py-3" />
            {defenders.map((defender) => (
              <div
                key={defender}
                className="table-content border border-[#ceccff]/40 px-3 py-3 text-left font-medium"
              >
                {defender}
              </div>
            ))}

            {attackers.map((attacker, rowIndex) => (
              <Fragment key={attacker}>
                <div className="table-content border border-[#ceccff]/40 px-3 py-3 text-left font-medium">
                  {attacker}
                </div>

                {baseTable[rowIndex].map((coefficient, colIndex) => (
                  <div
                    key={`${attacker}-${defenders[colIndex]}`}
                    className="table-content border border-[#ceccff]/40 px-3 py-3 text-left"
                  >
                    {formatValue(finalTable[rowIndex][colIndex])}
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
