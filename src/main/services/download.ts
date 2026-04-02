import { spawn } from 'child_process'
import fs from 'fs'
import { isValidUrl } from '../../shared/utils'
import { store } from '../store'
import { YT_DLP } from '../lib/binary-paths'
import { activeDownloadProcesses, cancelledDownloads } from '../lib/procs'
import { buildArgs } from '../lib/args'

export function startDownload(url: string, callbacks: DownloadCallbacksType) {
  // Generate an unique ID for download
  const id = crypto.randomUUID()

  // Validate URL
  if (!isValidUrl(url)) {
    callbacks.onError(id, 'Invalid URL', url)
    return
  }

  // Validate cookies file
  const cookiesFilePath = store.get('base.filesystem.cookies')
  if (cookiesFilePath && !fs.existsSync(cookiesFilePath)) {
    callbacks.onError(id, 'Cookies file not found', url)
    return
  }

  // Initialize
  callbacks.onInit(id)

  // Build Args
  const args = buildArgs(url)

  // Spawn yt-dlp
  const proc = spawn(YT_DLP, args, { windowsHide: true })

  // Add this process to active download processes
  activeDownloadProcesses.set(id, proc)

  const cleanup = function (): void {
    activeDownloadProcesses.delete(id)
    cancelledDownloads.delete(id)
  }

  let filePath = ''
  let name = ''

  // Start download
  let nameReceived = false
  proc.stdout.on('data', function (chunk: Buffer) {
    const line = chunk.toString().split('\n', 1)[0].trim()
    if (!line) return

    console.debug(`ytdlp stdout: ${line}`)

    if (!nameReceived) {
      nameReceived = true
      name = line
      callbacks.onStart(id, name)
    } else {
      filePath = line
    }
  })

  // Error in download
  proc.stderr.on('data', function (chunk: Buffer) {
    console.error(`ytdlp stderr: ${chunk.toString()}`)
  })

  // Download completed (with or without error) or cancelled
  proc.on('close', function (code) {
    if (cancelledDownloads.has(id)) {
      console.info(`Download Cancelled: ${name}`)

      cleanup()
      callbacks.onCancel(id, name)
      return
    }

    if (code === 0) {
      console.info(`Download completed: ${name}`)

      cleanup()
      callbacks.onComplete(id, name, filePath)
    } else {
      console.error(`yt-dlp exited with code: ${code}`)

      cleanup()
      callbacks.onError(id, name, 'Something went wrong')
    }

    if (cookiesFilePath && fs.existsSync(cookiesFilePath)) {
      fs.rmSync(cookiesFilePath, { force: true })
    }
  })

  // Error in yt-dlp
  proc.on('error', function (error) {
    console.error(`yt-dlp process error: ${error.message}`)

    cleanup()
    callbacks.onError(id, name, error.message)
  })
}

export function cancelDownload(id: string) {
  const proc = activeDownloadProcesses.get(id)
  if (!proc) return

  cancelledDownloads.add(id)

  try {
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', proc.pid!.toString(), '/T', '/F'])
    } else {
      proc.kill()
    }
  } catch (error) {
    console.error(`Error killing ytdlp process: ${error}`)
  }
}
