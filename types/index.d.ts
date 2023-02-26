/* eslint-disable */
import type { ReadStream } from 'fs'

export type Asset = {
  asset_type: string
  id: string
  user: User
  extension: string
  url: string
  created_at: string
  updated_at: string
}

/** An enumeration. */
export type AssetType = 'zip' | 'image' | 'video' | 'music' | 'model'

export type BaseFavorite = {
  work: Work
  user: User
  created_at: string
}

export type BaseUrlInfo = {
  url: string
  url_type: string
}

export type Body_post_asset_api_v1_assets_post = {
  file: File | ReadStream
  asset_type: AssetType
}

export type DeleteStatus = {
  status: string
}

export type Favorite = {
  favorites: BaseFavorite[]
  is_favorite: boolean
  favorite_count: number
}

export type GetTag = {
  name: string
  color: string
  id: string
}

export type HTTPValidationError = {
  detail?: ValidationError[] | undefined
}

export type PostComment = {
  content: string
}

export type PostTag = {
  name: string
  color: string
}

export type PostWork = {
  title: string
  description: string
  visibility: string
  thumbnail_asset_id: string
  assets_id: string[]
  urls: BaseUrlInfo[]
  tags_id: string[]
}

export type PutTag = {
  name?: string | undefined
  color?: string | undefined
}

export type RefreshTokenExchangeRequest = {
  refresh_token: string
}

export type ResponseComment = {
  content: string
  id: string
  user?: User | undefined
  work_id: string
  visibility?: string | undefined
  reply_at?: string | undefined
  created_at: string
  updated_at: string
  number_of_reply: number
}

export type ResponseReplyComment = {
  content: string
  id: string
  user?: User | undefined
  work_id: string
  visibility?: string | undefined
  reply_at?: string | undefined
  created_at: string
  updated_at: string
}

export type TagResponsStatus = {
  status: string
}

export type TokenResponse = {
  expired_at: string
  refresh_token: string
  access_token: string
}

export type UrlInfo = {
  url: string
  url_type: string
  id: string
  user: User
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  name: string
  display_name: string
  avatar_url?: string | undefined
  profile?: string | undefined
  twitter_id?: string | undefined
  github_id?: string | undefined
  created_at: string
  updated_at: string
}

export type UserCreateRequest = {
  name: string
  email: string
  password: string
  display_name: string
  avatar_url?: string | undefined
}

export type UserInfoChangeRequest = {
  display_name?: string | undefined
  avatar_url?: string | undefined
  profile?: string | undefined
  twitter_id?: string | undefined
  github_id?: string | undefined
}

export type ValidationError = {
  loc: Partial<string & number>[]
  msg: string
  type: string
}

/** An enumeration. */
export type Visibility = 'public' | 'private' | 'draft'

export type Work = {
  id: string
  title: string
  description: string
  description_html: string
  user: User
  assets: Asset[]
  urls: UrlInfo[]
  visibility: string
  tags: GetTag[]
  thumbnail: Asset
  favorite_count?: number | undefined
  is_favorite?: boolean | undefined
  created_at: string
  updated_at: string
}

export type Works = {
  works: Work[]
  works_total_count: number
}
