import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Auth from '@/store/auth'
import Comment from '@/store/comment'
import Modal from '@/store/modal'
import Tag from '@/store/tag'
import WorkFilter from '~/store/work_filter'
import WorkPost from '@/store/work_post'
import ConfirmModal from '@/store/confirm_modal'
import DownloadAsset from '@/store/download_asset'
import Preview from '~/store/preview'
import WorkShare from '~/store/work_share'
import TagSelector from '~/store/tag_selector'
import BlogPost from '~/store/blog_post'

let authStore: Auth
let commentStore: Comment
let modalStore: Modal
let tagStore: Tag
let workFilterStore: WorkFilter
let workPostStore: WorkPost
let confirmModalStore: ConfirmModal
let downloadAssetStore: DownloadAsset
let previewStore: Preview
let workShareStore: WorkShare
let tagSelectorStore: TagSelector

let blogPostStore: BlogPost

function initializeStores(store: Store<any>): void {
  authStore = getModule(Auth, store)
  commentStore = getModule(Comment, store)
  modalStore = getModule(Modal, store)
  tagStore = getModule(Tag, store)
  workFilterStore = getModule(WorkFilter, store)
  workPostStore = getModule(WorkPost, store)
  confirmModalStore = getModule(ConfirmModal, store)
  downloadAssetStore = getModule(DownloadAsset, store)
  previewStore = getModule(Preview, store)
  workShareStore = getModule(WorkShare, store)
  tagSelectorStore = getModule(TagSelector, store)
  blogPostStore = getModule(BlogPost, store)
}

export {
  initializeStores,
  authStore,
  commentStore,
  modalStore,
  tagStore,
  workFilterStore,
  workPostStore,
  confirmModalStore,
  downloadAssetStore,
  previewStore,
  workShareStore,
  tagSelectorStore,
  blogPostStore
}
