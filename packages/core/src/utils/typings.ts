import { Ref } from '@vue/composition-api'

export type RefElement = Element | Ref<Element | undefined | null>

export type MaybeRef<T> = T | Ref<T>
