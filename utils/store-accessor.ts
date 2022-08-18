import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Auth from '@/store/auth'
import Comment from '@/store/comment'
import Modal from '@/store/modal'
import Tag from '@/store/tag'
import WorkFilter from '~/store/work_filter'
import WorkPost from '@/store/work_post'
import Confirmation from '@/store/confirmation'
import DownloadAsset from '@/store/download_asset'

let authStore: Auth
let commentStore: Comment
let modalStore: Modal
let tagStore: Tag
let workFilterStore: WorkFilter
let workPostStore: WorkPost
let confirmationStore: Confirmation
let downloadAssetStore: DownloadAsset

function initializeStores(store: Store<any>): void {
  authStore = getModule(Auth, store)
  commentStore = getModule(Comment, store)
  modalStore = getModule(Modal, store)
  tagStore = getModule(Tag, store)
  workFilterStore = getModule(WorkFilter, store)
  workPostStore = getModule(WorkPost, store)
  confirmationStore = getModule(Confirmation, store)
  downloadAssetStore = getModule(DownloadAsset, store)
}

export {
  initializeStores,
  authStore,
  commentStore,
  modalStore,
  tagStore,
  workFilterStore,
  workPostStore,
  confirmationStore,
  downloadAssetStore
}
