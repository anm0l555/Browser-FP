import { IFingerprint } from '../types'
import getAudioFingerprint from './audio'
import getCanvasFingerprint from './canvas'



export const sources: IFingerprint = {
    canvas: getCanvasFingerprint,
    audio : getAudioFingerprint()
}