"use client";

type DamageFooterProps = {
  caption: string;
};

export default function DamageFooter({ caption }: DamageFooterProps) {
  return (
    <footer className="border-[0.5px] border-[#ceccff] p-3 text-center">
      <p className="header-content">{caption}</p>
    </footer>
  );
}
