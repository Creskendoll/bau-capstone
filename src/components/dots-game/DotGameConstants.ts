import Color from "../../misc/Color";

const HIGHLIGHT_COLOR: Color = {
  red: 255,
  green: 255,
  blue: 20,
  alpha: 1
};
enum SequenceState {
  NOT_RAN,
  RUNNING,
  RAN
}
const CORRECT_COLOR: Color = {
  red: 20,
  green: 255,
  blue: 20,
  alpha: 1
};
const WRONG_COLOR: Color = {
  red: 255,
  green: 20,
  blue: 20,
  alpha: 1
};
const DOT_COLOR: Color = {
  red: 50,
  green: 150,
  blue: 220,
  alpha: 1
};
const SCREEN_RATIO = {
  W: 0.95,
  H: 0.8
};
const DOT_SIZE = 0.04;

export {
  HIGHLIGHT_COLOR,
  SequenceState,
  CORRECT_COLOR,
  WRONG_COLOR,
  DOT_COLOR,
  SCREEN_RATIO,
  DOT_SIZE
};
