import { GetTag } from '@/types'

export class Query {
  private query: string

  constructor() {
    this.query = ''
  }

  private addQuestionOrAnd() {
    this.query += this.query ? '&' : '?'
  }

  public create(
    tags?: GetTag[],
    visibility?: string,
    newest_work_id?: string,
    oldest_work_id?: string,
    newest_comment_id?: string,
    oldest_comment_id?: string,
    limit?: number,
    smallest_tag_id?: string,
    biggest_tag_id?: string,
    w?: string
  ) {
    if (tags && tags.length > 0) {
      this.addQuestionOrAnd()
      this.query += 'tag_ids='
      tags.map((tag) => {
        this.query += `${tag.id},`
      })
      this.query = this.query.slice(0, -1)
    }
    if (visibility) {
      this.addQuestionOrAnd()
      this.query += `visibility=${visibility}`
    }
    if (newest_work_id) {
      this.addQuestionOrAnd()
      this.query += `newest_work_id=${newest_work_id}`
    }
    if (oldest_work_id) {
      this.addQuestionOrAnd()
      this.query += `oldest_work_id=${oldest_work_id}`
    }
    if (newest_comment_id) {
      this.addQuestionOrAnd()
      this.query += `newest_comment_id=${newest_comment_id}`
    }
    if (oldest_comment_id) {
      this.addQuestionOrAnd()
      this.query += `oldest_comment_id=${oldest_comment_id}`
    }
    if (limit) {
      this.addQuestionOrAnd()
      this.query += `limit=${limit}`
    }
    if (smallest_tag_id) {
      this.addQuestionOrAnd()
      this.query += `smallest_tag_id=${smallest_tag_id}`
    }
    if (biggest_tag_id) {
      this.addQuestionOrAnd()
      this.query += `biggest_tag_id=${biggest_tag_id}`
    }
    if (w) {
      this.addQuestionOrAnd()
      this.query += `w=${w}`
    }
  }

  public init() {
    this.query = ''
  }

  public getQuery() {
    return this.query
  }
}
