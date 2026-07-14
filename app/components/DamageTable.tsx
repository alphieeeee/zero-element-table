"use client";

import { Fragment } from "react";

export type Operator = "add" | "subtract" | "multiply" | "divide";

type DamageTableProps = {
  attackerLevel: number;
  defenderLevel: number;
  selectedOperator: Operator;
  globalModifier: number | null;
};

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
  globalModifier: number | null
) {
  if (globalModifier === null || Number.isNaN(globalModifier)) {
    return null;
  }

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

export default function DamageTable({
  attackerLevel,
  defenderLevel,
  selectedOperator,
  globalModifier,
}: DamageTableProps) {
  const modifierIsValid = Number.isFinite(globalModifier);

  return (
    <div className="border-[0.5px] border-[#ceccff]">
      <div
        className="grid text-[#ceccff]"
        style={{
          gridTemplateColumns: `1fr repeat(${defenders.length}, minmax(0, 1fr))`,
        }}
      >
        <div className="border-[0.5px] border-[#ceccff] p-1 lg:p-3" />
        {defenders.map((defender) => (
          <div
            key={defender}
            className="table-content border-[0.5px] border-[#ceccff] p-1 lg:p-3 text-center"
          >
            {defender}
          </div>
        ))}

        {attackers.map((attacker, rowIndex) => (
          <Fragment key={attacker}>
            <div className="table-content border-[0.5px] border-[#ceccff] p-1 lg:p-3 text-center">
              {attacker}
            </div>

            {baseTable[rowIndex].map((coefficient, colIndex) => {
              const levelCoefficient = calculateLevelCoefficient(
                coefficient,
                attackerLevel,
                defenderLevel
              );
              const finalCoefficient = modifierIsValid
                ? calculateCoefficient(
                    levelCoefficient,
                    selectedOperator,
                    globalModifier
                  )
                : null;

              return (
                <div
                  key={`${attacker}-${defenders[colIndex]}`}
                  className="table-content border-[0.5px] border-[#ceccff] p-1 lg:p-3 text-center"
                >
                  {finalCoefficient === null ? "-" : formatValue(finalCoefficient)}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
