/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as Home} from './Home'
export {default as DataAnalysis} from './DataAnalysis'
export {Login, Signup} from './auth-form'
