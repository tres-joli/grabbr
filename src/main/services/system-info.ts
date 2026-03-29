import { app } from 'electron'

export async function getGpuVendor() {
  const gpuInfo = (await app.getGPUInfo('basic')) as any
  const devices = gpuInfo.gpuDevice ?? []

  const active = devices.find((d: any) => d.active) ?? devices[0]

  if (!active) return 'unknown'
  if (active.vendorId === 0x10de) return 'nvidia'
  if (active.vendorId === 0x1002) return 'amd'
  if (active.vendorId === 0x8086) return 'intel'

  return 'unknown'
}
