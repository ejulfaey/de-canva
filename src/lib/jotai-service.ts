import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { ShapeType } from ".";
import { MutableRefObject } from "react";

export const selectedShape = atom<string | null>(null);
export const ShapeAtom = atomWithStorage<ShapeType[]>("shapes", []);
export const containerRefAtom = atom<MutableRefObject<HTMLDivElement | null>>({ current: null });
export const containerSizeAtom = atom<{ width: number; height: number }>({
  width: 0,
  height: 0,
});
