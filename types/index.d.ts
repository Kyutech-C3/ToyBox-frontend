/* eslint-disable */
export type BaseCommunity = {
  name: string
  description: string
}

export type Community = {
  name: string
  description: string
  id: string
  description_html: string
  created_at: string
  updated_at: string
}

export type GetTag = {
  name: string
  color: string
  id: string
  community: Community
}

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
  thumbnail_asset_id: string
  assets_id: string[]
  urls: BaseURL[],
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

export type User = {
  id: string
  name: string
  email: string
  display_name: string
  avatar_url?: string
  profile?: string
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
  github_url?: string
  work_url?: string
  user: User
  community: Community
  private: boolean
  created_at: string
  updated_at: string
}

export type BaseURL = {
  url: string
  url_type: string
}
