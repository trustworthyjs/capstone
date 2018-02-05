/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

// disabling logging for soundManager (comes with react-sound and is overreporting info)
/* global soundManager:false */
import 'react-sound';
soundManager.setup({debugMode: false});

export {default as Main} from './main'
export {default as LandingPage} from './LandingPage'
export {default as UserHome} from './user-home'
export {default as DataAnalysis} from './DataAnalysis'
export {default as PersonalityRadarChart} from './PersonalityRadarChart'
export {default as Popup} from './Popup'
export {Login, Signup} from './auth-form'
export {default as StreaksGraph} from './StreaksGraph'
export {default as WordCloud} from './WordCloud'
export {default as Notebooks} from './Notebooks'
export {default as SingleNotebook} from './singleNotebook'
export {default as SingleEntry} from './singleEntry'
export {default as SubmitEntryPopup} from './SubmitEntryPopup'
export {default as ToneGraph} from './ToneGraph'
export {default as Footer} from './footer'
export {default as Audio} from './Audio'

