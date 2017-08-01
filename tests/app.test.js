/* eslint import/no-extraneous-dependencies: "off" */

import test from 'tape';
import { compose, flow } from 'lodash/fp';
import defineReducerFactory from '../src/defineReducerFactory.js';
import update from '../src/update.js';
import updateIn from '../src/updateIn.js';

const increment = x => x + 1;
const GOAL = 'GOAL';
const BEHIND = 'BEHIND';

const factory = defineReducerFactory({
  name: undefined,
  goals: 0,
  behinds: 0,
}, {
  scoreGoal: update({
    goals: increment,
  }),
  scoreBehind: updateIn('behinds', increment),
});

test('initial state', ({ deepEqual, end }) => {
  const reducer = factory({ name: 'Adelaide' }, { scoreGoal: GOAL, scoreBehind: BEHIND });

  deepEqual(reducer(), {
    name: 'Adelaide',
    goals: 0,
    behinds: 0,
  }, 'expected initial state');
  end();
});

test('create reducers', ({ deepEqual, end }) => {
  const reducer1 = factory({ name: 'Adelaide' }, { scoreGoal: GOAL, scoreBehind: BEHIND });
  const reducer2 = factory({ name: 'West Coast' }, { scoreGoal: GOAL, scoreBehind: BEHIND });

  deepEqual(reducer1(undefined, { type: GOAL }), {
    name: 'Adelaide',
    goals: 1,
    behinds: 0,
  }, 'goals should be 1');
  deepEqual(reducer2(undefined, { type: BEHIND }), {
    name: 'West Coast',
    goals: 0,
    behinds: 1,
  }, 'behinds should be 1');
  end();
});

test('accumulating state', ({ deepEqual, end }) => {
  const reducer = factory({ name: 'Adelaide' }, { scoreGoal: GOAL, scoreBehind: BEHIND });

  let state;

  const scoreGoal = prevState => reducer(prevState, { type: GOAL });
  const scoreBehind = prevState => reducer(prevState, { type: BEHIND });

  state = scoreGoal(state);
  state = scoreGoal(state);
  state = scoreGoal(state);
  state = scoreBehind(state);
  state = scoreBehind(state);

  deepEqual(state, {
    name: 'Adelaide',
    goals: 3,
    behinds: 2,
  }, 'state should accumulate');
  end();
});

test('accumulating state with flow', ({ deepEqual, end }) => {
  const reducer = factory({ name: 'Adelaide' }, { scoreGoal: GOAL, scoreBehind: BEHIND });
  const scoreGoal = prevState => reducer(prevState, { type: GOAL });
  const scoreBehind = prevState => reducer(prevState, { type: BEHIND });

  const state = flow(
    scoreGoal,
    scoreBehind,
    scoreGoal,
    scoreBehind,
    scoreGoal,
  )();

  deepEqual(state, {
    name: 'Adelaide',
    goals: 3,
    behinds: 2,
  }, 'state should accumulate');
  end();
});

test('accumulating state with compose', ({ deepEqual, end }) => {
  const reducer = factory({ name: 'Adelaide' }, { scoreGoal: GOAL, scoreBehind: BEHIND });
  const scoreGoal = prevState => reducer(prevState, { type: GOAL });
  const scoreBehind = prevState => reducer(prevState, { type: BEHIND });

  const state = compose(
    scoreGoal,
    scoreBehind,
    scoreGoal,
    scoreBehind,
    scoreGoal,
  )();

  deepEqual(state, {
    name: 'Adelaide',
    goals: 3,
    behinds: 2,
  }, 'state should accumulate');
  end();
});
