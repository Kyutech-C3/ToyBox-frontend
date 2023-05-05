import { PostComment } from '@/types'

export type ReplyCommentType = {
  comment_id: string
  reply_comment_data: PostComment
}

export type VideoJSOptions = {
  autoplay: boolean
  controls: boolean
  loop: boolean
  muted: boolean
  playsinline: boolean
  preload: string
  poster: string
  sources: {
    src: string
    type: string
  }[]
}
