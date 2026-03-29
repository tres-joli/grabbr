import { getGpuVendor } from '../../system-info'

export async function postProcessArgs(preferences: FFmpegAPI) {
  const args: string[] = []
  const { target, encoder, videoCodec, preset, audioCodec, crf } = preferences

  const gpuVendor = await getGpuVendor()
  const isH264 = videoCodec === 'libx264'

  let resolvedCodec = videoCodec
  if (encoder === 'gpu' && gpuVendor !== 'unknown') {
    switch (gpuVendor) {
      case 'nvidia':
        resolvedCodec = isH264 ? 'h264_nvenc' : 'hevc_nvenc'
        break
      case 'amd':
        resolvedCodec = isH264 ? 'h264_amf' : 'hevc_amf'
        break
      case 'intel':
        resolvedCodec = isH264 ? 'h264_qsv' : 'hevc_qsv'
        break
    }
  }

  const ffmpegArgs = ['-c:v', resolvedCodec]
  if (encoder === 'gpu' && gpuVendor !== 'unknown') {
    ffmpegArgs.push('-pix_fmt', 'yuv420p')
    if (crf !== 23) ffmpegArgs.push('-cq', crf.toString())
    if (preset) ffmpegArgs.push('-preset', 'p1')
  } else {
    if (crf !== 23) ffmpegArgs.push('-crf', crf.toString())
    if (preset) ffmpegArgs.push('-preset', preset)
  }
  if (audioCodec) ffmpegArgs.push('-c:a', audioCodec)

  const targetPrefix = target
  args.push('--postprocessor-args', `${targetPrefix}${ffmpegArgs.join(' ')}`)

  return args
}
