// import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
// import { usePreferences } from '../../providers/preferences'
// import { Slider } from '@renderer/components/ui/slider'
// import { useState } from 'react'
// import { HugeiconsIcon } from '@hugeicons/react'
// import { InformationCircleIcon } from '@hugeicons/core-free-icons'

// export function Crf() {
//   const { preferences, updatePreference } = usePreferences()
//   const [crf, setCrf] = useState(preferences.video.custom.postProcessing.postProcessorArgs.crf)

//   return (
//     <div className="space-y-2 max-w-7/12">
//       <div className="flex justify-between">
//         <div className="inline-flex items-center gap-1.5">
//           <span className="font-medium">Quality (CRF)</span>
//           <Tooltip>
//             <TooltipTrigger className="cursor-help">
//               <HugeiconsIcon icon={InformationCircleIcon} size={15} />
//             </TooltipTrigger>
//             <TooltipContent>
//               <p className="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
//                 Constant Rate Factor
//               </p>
//               <p>Lower CRF = Better quality, Larger file</p>
//               <p>Higher CRF = Lower quality, More compression</p>
//             </TooltipContent>
//           </Tooltip>
//         </div>
//         <span
//           className={crf > 5 ? 'text-destructive' : crf > 2 ? 'text-orange-400' : 'text-green-400'}
//         >
//           {crf === 23 && <span className="text-muted-foreground">(Default) </span>}
//           {crf}
//         </span>
//       </div>
//       <Slider
//         min={0}
//         max={51}
//         value={crf}
//         onValueChange={function (index) {
//           const i = index as number
//           setCrf(i)
//         }}
//         onValueCommitted={function (index) {
//           const i = index as number

//           if (preferences.video.custom.postProcessing.postProcessorArgs.crf !== i) {
//             updatePreference('video.custom.postProcessing.postProcessorArgs.crf', i)
//           }
//         }}
//       />
//     </div>
//   )
// }
