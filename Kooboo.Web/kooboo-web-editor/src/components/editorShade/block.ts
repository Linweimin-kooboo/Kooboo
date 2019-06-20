import { EDITOR_SHADE_COLOR, STANDARD_Z_INDEX } from "@/common/constants";
import { Position, updatePositon } from "@/common/Position";

export const createBlock = () => {
  const el = document.createElement("div");
  applyStyle(el.style);
  el.onclick = e => e.stopPropagation();
  const update = (position: Position) => updatePositon(position, el);
  return { el, update };
};

const applyStyle = (css: CSSStyleDeclaration) => {
  css.position = "absolute";
  css.display = "block";
  css.backgroundColor = EDITOR_SHADE_COLOR;
  css.zIndex = STANDARD_Z_INDEX + "";
  css.cursor = "not-allowed";
};
