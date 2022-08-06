export function useSlots(slots) {
  return Object.keys(slots)
    .filter((ele) => !ele.startsWith("_"))
    .map((ele) => {
      return {
        name: ele,
      };
    });
}
