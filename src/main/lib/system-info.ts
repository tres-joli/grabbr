import { app } from 'electron'
import { store } from '../store'
import { FFmpegEncoderEnum } from '../../shared/constants/ffmpeg'

const VENDOR_MAP: Record<number, FFmpegEncoderEnum> = {
  0x10de: FFmpegEncoderEnum.NVIDIA,
  0x1002: FFmpegEncoderEnum.AMD,
  0x8086: FFmpegEncoderEnum.INTEL
}

export async function ensureSupportedEncoders() {
  const supportedEncoders = store.get('supportedEncoders')
  if (supportedEncoders.length > 1) return

  const info = await app.getGPUInfo('basic')
  const devices = (info as any).gpuDevice as { vendorId: number }[]

  const vendors = devices
    .map((d) => VENDOR_MAP[d.vendorId] ?? null)
    .filter((v, i, arr) => v !== null && arr.indexOf(v) === i)

  store.set('supportedEncoders', [FFmpegEncoderEnum.CPU, ...vendors])
}
