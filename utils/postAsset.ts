import { AxiosClient } from '@/utils/axios'

type baseAssetExtensionType = {
  image: string[]
  video: string[]
  music: string[]
  zip: string[]
  model: string[]
}

export class PostAssetClient {
  constructor(extensions: Array<string>) {
    extensions.forEach((extension) => {
      this.assetExtension.push(extension)
    })
    console.log(this.assetExtension)
  }

  private assetExtension: Array<string> = []

  private baseAssetExtension: baseAssetExtensionType = {
    image: ['png', 'jpg', 'jpeg', 'bmp', 'gif'],
    video: ['mp4', 'mov'],
    music: ['mp3', 'wav', 'm4a'],
    zip: ['zip'],
    model: ['gltf', 'fbx']
  }

  private getAssetType(assetName: string) {
    let index: number = 0
    let response: string = ''
    const assetTypeList: string[][] = Object.values(this.baseAssetExtension)
    assetTypeList.forEach((assetType) => {
      for (let i = 0; i < assetType.length; i++) {
        if (assetType[i] === assetName.split('.').pop()?.toLowerCase()) {
          // eslint-disable-next-line no-console
          // console.log(Object.keys(baseAssetExtension)[index])
          response = Object.keys(this.baseAssetExtension)[index]
        }
      }
      index++
    })
    return response
  }
  public async postAsset(files: Array<File>) {
    for (let i = 0; i < files.length; i++) {
      // 本番環境では何らかのサービスに画像を保存する
      const params = new FormData()
      params.append('file', files[i])
      const assetType = this.getAssetType(files[i].name as string)
      if (this.assetExtension.includes(assetType)) {
        params.append('asset_type', assetType)
        try {
          const result = await AxiosClient.client(
            'POST',
            '/assets',
            true,
            params,
            'multipart/form-data'
          )
          return result.data
        } catch {
          ;(error: Error) => {
            throw error
          }
        }
      } else {
        return null
      }
    }
  }
}
