let _uid: number = 0
export const uid = () => _uid++

export const hasWindow = () => typeof window !== 'undefined'
export const isServer = () => typeof window === 'undefined'
export const isOnline = () => navigator.onLine

// export const now = () => new Date()
// export const timestamp = () => +new Date()

export * from './emitter'
export * from './operations'
