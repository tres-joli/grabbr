import { cancel, download } from '../services/ytdlp/download'

export function startDownload(
  url: string,
  directoryPath: string,
  callbacks: DownloadCallbacksType
) {
  download(url, directoryPath, callbacks)
}

export function cancelDownload(id: string) {
  cancel(id)
}
