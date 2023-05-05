import axios from 'axios'
import type { Method } from 'axios'
import { authStore } from '@/store'

export class AxiosClient {
  constructor() {}

  private static async request(
    method: Method,
    url: string,
    auth: boolean,
    data?: object,
    content_type?: string
  ) {
    if (data) {
      return await axios.request({
        method,
        url,
        data,
        headers: auth
          ? {
              'content-type': content_type,
              Authorization: `Bearer ${authStore.getAccessToken}`
            }
          : {}
      })
    } else {
      return await axios.request({
        method,
        url,
        headers: auth
          ? { Authorization: `Bearer ${authStore.getAccessToken}` }
          : {}
      })
    }
  }

  public static async client(
    method: Method = 'GET',
    url: string,
    auth: boolean = true,
    data?: object,
    content_type?: string
  ) {
    try {
      if (data) {
        return await this.request(method, url, auth, data, content_type)
      } else {
        return await this.request(method, url, auth)
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.status === 403) {
        try {
          // アクセストークンが間違っている可能性がある
          // トークンをリフレッシュする
          await authStore.authAgain(false)
          // 再リクエスト
          if (data) {
            return await this.request(method, url, auth, data, content_type)
          } else {
            return await this.request(method, url, auth)
          }
        } catch (e: unknown) {
          console.error('再ログインが必要')
          window.location.href = `${process.env.BASE_URL}login`
        }
      }
      throw e
    }
  }
}
