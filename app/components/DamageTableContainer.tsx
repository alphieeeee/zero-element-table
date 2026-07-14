"use client";

import { useState } from "react";
import DamageTable, { type Operator } from "./DamageTable";

type DamageTableContainerProps = {
  title?: string;
  description?: string;
};

export default function DamageTableContainer({
  title = "Element Damage Table",
  description = "Adjust the formula and the table updates from the coefficient.",
}: DamageTableContainerProps) {
  const [selectedOperator, setSelectedOperator] = useState<Operator>("add");
  const [globalModifier, setGlobalModifier] = useState<number | null>(0);
  const [attackerLevel, setAttackerLevel] = useState(1);
  const [defenderLevel, setDefenderLevel] = useState(1);

  return (
    <section className="mx-auto flex w-full max-w-[1400px] flex-col gap-4">
      <div className="flex flex-col gap-1 border-[0.5px] border-[#ceccff] p-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:p-4">
        <div>
          <h1 className="font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-[#ceccff]">{description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap">
          <label className="header-content flex flex-col gap-2">
            <span>Attacker level</span>
            <select
              value={attackerLevel}
              onChange={(e) => setAttackerLevel(Number(e.target.value))}
              className="w-full min-w-0 border-[0.5px] border-[#ceccff] bg-transparent px-3 py-2 text-[#ceccff] outline-none lg:min-w-[80px]"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </label>

          <label className="header-content flex flex-col gap-2">
            <span>Defender level</span>
            <select
              value={defenderLevel}
              onChange={(e) => setDefenderLevel(Number(e.target.value))}
              className="w-full min-w-0 border-[0.5px] border-[#ceccff] bg-transparent px-3 py-2 text-[#ceccff] outline-none lg:min-w-[80px]"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </label>

          <label className="header-content flex flex-col gap-2">
            <span>Operator</span>
            <select
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e.target.value as Operator)}
              className="w-full min-w-0 border-[0.5px] border-[#ceccff] bg-transparent px-3 py-2 text-[#ceccff] outline-none lg:min-w-[80px]"
            >
              <option value="add">Addition</option>
              <option value="subtract">Subtraction</option>
              <option value="multiply">Multiplication</option>
              <option value="divide">Division</option>
            </select>
          </label>

          <label className="header-content flex flex-col gap-2">
            <span>Skill modifier</span>
            <input
              type="number"
              step="1"
              value={globalModifier ?? ""}
              onChange={(e) => {
                const nextValue = e.target.value;
                setGlobalModifier(nextValue === "" ? null : Number(nextValue));
              }}
              className="w-full min-w-0 border-[0.5px] border-[#ceccff] bg-transparent px-3 py-2 text-[#ceccff] outline-none lg:min-w-[80px]"
            />
          </label>
        </div>
      </div>

      <DamageTable
        attackerLevel={attackerLevel}
        defenderLevel={defenderLevel}
        selectedOperator={selectedOperator}
        globalModifier={globalModifier}
      />
    </section>
  );
}
