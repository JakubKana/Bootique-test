type KEYS = 37 | 38 | 39 | 40;
export type ArrowKeys = "Up" | "Down" | "Left" | "Right" | "None";

const getUpdateMutation = (key: KEYS) => {
  const mutation = `${key}`;
  return mutation;
};

export const getUpdatePlanMutation = (arrowKeys: KEYS) => {
  switch (arrowKeys) {
    // Left
    case 37:
      console.log("Left");
      return getUpdateMutation(37);
    // Up
    case 38:
      console.log("Up");
      return getUpdateMutation(37);
    // Right
    case 39:
      console.log("Right");
      return getUpdateMutation(37);
    // Down
    case 40:
      console.log("Down");
      return getUpdateMutation(37);
    default:
      break;
  }
};

export const getArrowLabel = (keyCode: number): string => {
  switch (keyCode) {
    // Left
    case 37:
      console.log("Left");
      return "Left";
    // Up
    case 38:
      console.log("Up");
      return "Up";
    // Right
    case 39:
      console.log("Right");
      return "Right";
    // Down
    case 40:
      console.log("Down");
      return "Down";
    default:
      return "None";
  }
};
