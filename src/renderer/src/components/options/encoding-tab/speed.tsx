// import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
// import { usePreferences } from '../../providers/preferences'
// import { Slider } from '@renderer/components/ui/slider'
// import { useState } from 'react'
// import { HugeiconsIcon } from '@hugeicons/react'
// import { InformationCircleIcon } from '@hugeicons/core-free-icons'
// import { FFmpegPresetEnum } from '../../../../../shared/constants/ffmpeg'

// const SPEEDS: {
//   value: VideoPreferences['custom']['postProcessing']['postProcessorArgs']['preset']
//   name: string
// }[] = [
//   {
//     value: FFmpegPresetEnum.ULTRAFAST,
//     name: 'Ultra Fast'
//   },
//   {
//     value: FFmpegPresetEnum.SUPERFAST,
//     name: 'Super Fast'
//   },
//   {
//     value: FFmpegPresetEnum.VERYFAST,
//     name: 'Very Fast'
//   },
//   {
//     value: FFmpegPresetEnum.FASTER,
//     name: 'Faster'
//   },
//   {
//     value: FFmpegPresetEnum.FAST,
//     name: 'Fast'
//   },
//   {
//     value: FFmpegPresetEnum.MEDIUM,
//     name: 'Medium'
//   },
//   {
//     value: FFmpegPresetEnum.SLOW,
//     name: 'Slow'
//   },
//   {
//     value: FFmpegPresetEnum.SLOWER,
//     name: 'Slower'
//   },
//   {
//     value: FFmpegPresetEnum.VERYSLOW,
//     name: 'Very Slow'
//   }
// ]

// export function Speed() {
//   const { preferences, updatePreference } = usePreferences()
//   const [currSpeedIdx, setCurrSpeedIdx] = useState(
//     SPEEDS.findIndex(
//       (speed) => speed.value === preferences.video.custom.postProcessing.postProcessorArgs.preset
//     )
//   )

//   return (
//     <div className="space-y-2 max-w-7/12">
//       <div className="flex justify-between">
//         <div className="inline-flex items-center gap-1.5">
//           <span className="font-medium">Speed</span>
//           <Tooltip>
//             <TooltipTrigger className="cursor-help">
//               <HugeiconsIcon icon={InformationCircleIcon} size={15} />
//             </TooltipTrigger>
//             <TooltipContent>
//               <p>Faster encoding = Less compression, Larger file</p>
//               <p>Slower encoding = More compression, Smaller file</p>
//             </TooltipContent>
//           </Tooltip>
//         </div>
//         <span
//           className={
//             currSpeedIdx > 5
//               ? 'text-destructive'
//               : currSpeedIdx > 2
//                 ? 'text-orange-400'
//                 : 'text-green-400'
//           }
//         >
//           {currSpeedIdx === 0 && <span className="text-muted-foreground">(Default) </span>}
//           {SPEEDS[currSpeedIdx].name}
//         </span>
//       </div>
//       <Slider
//         max={SPEEDS.length - 1}
//         value={currSpeedIdx}
//         onValueChange={function (index) {
//           const i = index as number
//           setCurrSpeedIdx(i)
//         }}
//         onValueCommitted={function (index) {
//           const i = index as number
//           const speed = SPEEDS[i].value

//           if (preferences.video.custom.postProcessing.postProcessorArgs.preset !== speed) {
//             updatePreference('video.custom.postProcessing.postProcessorArgs.preset', speed)
//           }
//         }}
//       />
//     </div>
//   )
// }
