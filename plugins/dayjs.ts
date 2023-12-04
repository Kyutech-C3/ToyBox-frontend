import dayjs from 'dayjs'
import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

export default ({ app }: Context, inject: Inject) => {
  inject('dayjs', (string: string) => dayjs(string))
}
