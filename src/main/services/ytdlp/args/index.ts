import { store } from '../../../store'
import { FFMPEG } from '../../binary-paths'
import { audioArgs } from './audio'
import { postProcessArgs } from './post-process'
import { formatSortArgs } from './sorting'
import { videoArgs } from './video'

export async function buildArgs(
  url: string,
  required: { outTemplate: string; cookiesFilePath?: string }
) {
  const args: string[] = []

  args.push('--ffmpeg-location', FFMPEG)
  args.push('--output', required.outTemplate)
  args.push('--print', 'before_dl:%(title)s')
  args.push('--print', 'after_move:filepath')
  args.push('--js-runtimes', 'node')
  args.push('--restrict-filenames')
  if (required.cookiesFilePath) args.push('--cookies', required.cookiesFilePath)

  console.info(`Default args: ${args.join(' ')}`)

  const { type, audio, video, postProcess, sortFormat } = store.store

  const typeArgs = type === 'audio' ? audioArgs(audio) : videoArgs(video)
  const sortArgs =
    type === 'video' && sortFormat ? formatSortArgs(video.custom.videoFormat.formatSort) : []
  const ppArgs =
    type === 'video' && postProcess ? await postProcessArgs(video.custom.postProcessing.ffmpeg) : []

  console.info(`Type args: ${typeArgs.join(' ')}`)
  console.info(`Sort args: ${sortArgs.join(' ')}`)
  console.info(`PP args: ${ppArgs.join(' ')}`)
  console.info(`URL: ${url}`)

  const finalArgs = [...args, ...typeArgs, ...sortArgs, ...ppArgs, url]

  return finalArgs
}
