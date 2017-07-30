/* eslint import/no-extraneous-dependencies: "off" */

import test from 'tape';
import { compose, flow } from 'lodash/fp';
import defineReducerFactory from '../src/defineReducerFactory.js';
import update from '../src/update.js';
import updateIn from '../src/updateIn.js';

const increment = x => x + 1;

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

test('__getState', ({ deepEqual, end }) => {
  const reducer1 = factory({ name: 'Adelaide' });

  deepEqual(reducer1.__getState(), { // eslint-disable-line no-underscore-dangle
    name: 'Adelaide',
    goals: 0,
    behinds: 0,
  }, 'expected initial state');
  end();
});

test('create reducers', ({ deepEqual, end }) => {
  const reducer1 = factory({ name: 'Adelaide' });
  const reducer2 = factory({ name: 'West Coast' });

  deepEqual(reducer1.scoreGoal(), {
    name: 'Adelaide',
    goals: 1,
    behinds: 0,
  }, 'goals should be 1');
  deepEqual(reducer2.scoreBehind(), {
    name: 'West Coast',
    goals: 0,
    behinds: 1,
  }, 'behinds should be 1');
  end();
});

test('accumulating state', ({ deepEqual, end }) => {
  const reducer = factory({ name: 'Adelaide' });

  let state;

  state = reducer.scoreGoal(state);
  state = reducer.scoreGoal(state);
  state = reducer.scoreGoal(state);
  state = reducer.scoreBehind(state);
  state = reducer.scoreBehind(state);

  deepEqual(state, {
    name: 'Adelaide',
    goals: 3,
    behinds: 2,
  }, 'state should accumulate');
  end();
});

test('accumulating state with flow', ({ deepEqual, end }) => {
  const { scoreGoal, scoreBehind } = factory({ name: 'Adelaide' });

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
  const { scoreGoal, scoreBehind } = factory({ name: 'Adelaide' });

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
