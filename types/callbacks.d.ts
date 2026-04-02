declare global {
  type DownloadCallbacksType = {
    onInit: (id: string) => void
    onStart: (id: string, name: string) => void
    onComplete: (id: string, name: string, filePath: string) => void
    onError: (id: string, name: string, msg: string) => void
    onCancel: (id: string, name: string) => void
  }
}

export {}
