/* eslint-disable */
import type { ReadStream } from 'fs'

export type Asset = {
  asset_type: string
  id: string
  user: User
  created_at: string
  updated_at: string
}

export type BaseCommunity = {
  name: string
  description: string
}

export type BaseUrlInfo = {
  url: string
  url_type: string
}

export type Body_post_asset_api_v1_assets_post = {
  file: File | ReadStream
  asset_type: string
}

export type Community = {
  name: string
  description: string
  id: string
  description_html: string
  created_at: string
  updated_at: string
}

export type DeleteStatus = {
  status: string
}

export type Tag = {
  name: string
  color: string
  id: string
  community: Community
}

export type GetTag = Tag

export type HTTPValidationError = {
  detail: ValidationError[]
}

export type PostTag = {
  name: string
  color: string
  community_id: string
}

export type PostWork = {
  title: string
  description: string
  community_id: string
  visibility: string
  thumbnail_asset_id?: string
  assets_id: string[]
  urls: BaseUrlInfo[]
  tags_id: string[]
}

export type PutTag = {
  name: string
  color: string
  community_id: string
}

export type RefreshTokenExchangeRequest = {
  refresh_token: string
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
  email: string
  display_name: string
  avatar_url?: string
  profile?: string
  twitter_id?: string
  github_id?: string
  created_at: string
  updated_at: string
}

export type UserCreateRequest = {
  name: string
  email: string
  password: string
  display_name: string
  avatar_url?: string
}

export type UserInfoChangeRequest = {
  display_name: string
  avatar_url: string
  profile: string
  twitter_id: string
  github_id: string
}

export type ValidationError = {
  loc: string[]
  msg: string
  type: string
}

export type Work = {
  id: string
  title: string
  description: string
  description_html: string
  user: User
  community: Community
  assets: Asset[]
  urls: UrlInfo[]
  visibility: string
  tags: GetTag[]
  thumbnail?: Asset[]
  created_at: string
  updated_at: string
}
