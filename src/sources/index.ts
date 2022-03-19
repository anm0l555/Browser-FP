import { IFingerprint } from '../types'
import getAudioFingerprint from './audio'
import getCanvasFingerprint from './canvas'
import { loadSources, SourcesToComponents } from '../utils/entropy_source'


export const sources = {
    canvas: getCanvasFingerprint,
    audio: getAudioFingerprint()
}

/**
 * List of components from the built-in entropy sources.
 *
 * Warning! This type is out of Semantic Versioning, i.e. may have incompatible changes within a major version. If you
 * want to avoid breaking changes, use `UnknownComponents` instead that is more generic but guarantees backward
 * compatibility within a major version. This is because browsers change constantly and therefore entropy sources have
 * to change too.
 */
export type BuiltinComponents = SourcesToComponents<typeof sources>

export interface BuiltinSourceOptions {
    debug?: boolean
}

/**
 * Loads the built-in entropy sources.
 * Returns a function that collects the entropy components to make the visitor identifier.
 */
export default function loadBuiltinSources(options: BuiltinSourceOptions): () => Promise<BuiltinComponents> {
    return loadSources(sources, options, [])
}
