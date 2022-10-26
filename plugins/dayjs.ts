import dayjs from 'dayjs'

export default ({ app }: any, inject: any) => {
  inject('dayjs', (string: string) => dayjs(string))
}
