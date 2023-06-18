import initRouter from 'vue-router-tools/init-router';
import routes from './routes';
import beforeEach from './before-each';

// UsePinia is used to add routing hooks to the async queue and prioritize loading pinia
export default initRouter({ routes, beforeEach, lazyHooks: true });
