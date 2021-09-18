import {
  withControlDownPolicy,
  withoutModifierPolicy,
  withShiftDownPolicy
} from './selectionPolicies';

it('without modifier policy unselects all except clicked', () => {
  const selectionState = [true, false, false];

  const newState = withoutModifierPolicy(selectionState, 2, 0);

  expect(newState).toStrictEqual([false, false, true]);
});

it('with shift down policy selects range from last clicked to clicked', () => {
  const selectionState = [true, false, true, false];

  const newState = withShiftDownPolicy(selectionState, 1, 3);

  expect(newState).toStrictEqual([false, true, true, true]);
});

it('with control down policy toggles selection by clicked id', () => {
  const selectionState = [true, false];

  let newState = withControlDownPolicy(selectionState, 0, 0);
  newState = withControlDownPolicy(newState, 1, 0);

  expect(newState).toStrictEqual([false, true]);
});
