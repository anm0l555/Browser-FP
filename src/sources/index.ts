import { IFingerprint } from '../types'
import getCanvasFingerprint from './canvas'



export const sources: IFingerprint = {
    canvas: getCanvasFingerprint
}