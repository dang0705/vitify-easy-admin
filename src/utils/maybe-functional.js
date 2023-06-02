import { helpers } from 'utils/helpers';
export default ({ data = null, params = [], customData = null }) =>
  helpers.isFunction(data) ? data.apply(this, params) : customData || data;
