import { helpers } from 'utils/helpers';
export default (value) =>
  value !== '' ? (helpers.isNumber(+value) ? +value : value) : '';
