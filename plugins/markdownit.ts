import MarkdownIt from 'markdown-it'
import 'katex/dist/katex.min.css'
import katex from 'katex'
// @ts-ignore
import tm from 'markdown-it-texmath'
import { Context } from '@nuxt/types'
import { Inject } from '@nuxt/types/app'

export default ({ app }: Context, inject: Inject) => {
  const md = new MarkdownIt('default', {
    // Your Basic Settings
    linkify: true,
    html: true,
    breaks: true,
    typographer: true
  })

  const defaultRender =
    md.renderer.rules.image ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(['loading', 'lazy'])
    return defaultRender(tokens, idx, options, env, self)
  }

  md.use(tm, {
    engine: katex,
    delimiters: 'dollars',
    katexOptions: { macros: { '\\RR': '\\mathbb{R}' } }
  })

  inject('md', md)
}
