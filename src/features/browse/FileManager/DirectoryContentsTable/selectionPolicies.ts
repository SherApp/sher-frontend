type SelectionPolicy = (
  selectionState: boolean[],
  clickedId: number,
  lastClickedId: number
) => boolean[];

export const withoutModifierPolicy: SelectionPolicy = (
  selectionState,
  clickedId
) => selectionState.map((_, i) => clickedId === i);

export const withShiftDownPolicy: SelectionPolicy = (
  selectionState,
  clickedId,
  lastClickedId
) => {
  const newState = [...selectionState];

  const selectFrom = Math.min(lastClickedId, clickedId);
  const selectTo = Math.max(lastClickedId, clickedId);

  for (let i = 0; i < selectionState.length; i++) {
    newState[i] = i >= selectFrom && i <= selectTo;
  }

  return newState;
};

export const withControlDownPolicy: SelectionPolicy = (
  selectionState,
  clickedId
) => selectionState.map((value, i) => (i === clickedId ? !value : value));
