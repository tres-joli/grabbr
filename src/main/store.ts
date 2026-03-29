import Store from 'electron-store'

export const store = new Store<Preferences>({
  defaults: {
    type: 'audio',
    downloadMode: 'ask',
    downloadDirectory: '',
    cookiesFilePath: '',
    postProcess: false,
    sortFormat: true,
    audio: {
      preset: 'best',
      custom: {
        postProcessing: {
          extractAudio: true,
          audioFormat: 'wav',
          audioQuality: '0',
          embedThumbnail: true,
          embedMetadata: true,
          embedChapters: true,
          postOverwrites: true
        },
        videoSelection: { noPlaylist: true },
        filesystem: {
          noOverwrites: true,
          noPart: true
        }
      }
    },
    video: {
      preset: 'best',
      custom: {
        videoFormat: {
          format: 'bv+ba/best',
          mergeOutputFormat: 'mp4',
          formatSort: { vcodec: 'h264' }
        },
        postProcessing: {
          embedThumbnail: true,
          embedMetadata: true,
          embedChapters: true,
          postOverwrites: true,
          ffmpeg: {
            target: 'ffmpeg:',
            encoder: 'cpu',
            preset: 'ultrafast',
            videoCodec: 'libx264',
            audioCodec: 'aac',
            crf: 23
          }
        },
        videoSelection: { noPlaylist: true },
        filesystem: {
          noOverwrites: true,
          noPart: true
        }
      }
    }
  }
})
