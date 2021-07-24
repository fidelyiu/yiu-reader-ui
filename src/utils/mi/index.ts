import MarkdownIt from 'markdown-it'
import { InlineCodeName } from '/@/utils/mi/plugin-inline-code-name'
import { ForInline } from '/@/utils/mi/plugin-for-inline'

const md = new MarkdownIt({
    highlight: function (str, lang, _attr) {
        return `<pre class="line-numbers" data-show-state="1">`
            + `<code class="language-${lang} `
            + `match-braces" `
            + `data-prismjs-copy="复制" `
            + `data-prismjs-copy-error="按Ctrl+C复制" `
            + `data-prismjs-copy-success="成功" `
            + `data-prismjs-copy-timeout="500">`
            + `${md.utils.escapeHtml(str)}</code></pre>`
    },
})
// 图片渲染
// md.renderer.rules.image

// 锚点添加
md.core.ruler.push('anchor', state => {
    const tokens = state.tokens
    for (const token of tokens) {
        if (token.type !== 'heading_open') {
            continue
        }
        console.log(token)
        // A permalink renderer could modify the `tokens` array so
        // make sure to get the up-to-date index on each iteration.
        const index = tokens.indexOf(token)

        // Aggregate the next token children text.
        const title = tokens[index + 1]
        console.log(title)
    }
})

// 重写行内代码渲染器
md.renderer.rules.code_inline = function (tokens, idx, _options, _env, slf) {
    const token = tokens[idx]
    const codeLang = token.codeLang || ''
    return `<span class="inline-code-div"><code class="inline-code language-${codeLang}" ${slf.renderAttrs(token)}>` +
        md.utils.escapeHtml(tokens[idx].content) +
        `</code><span class="inline-code-copy" data-clipboard-text="${tokens[idx].content}">c</span></span>`
}

// 链接加新窗口打开
md.use(ForInline, 'url_new_win', 'link_open', function (tokens, idx) {
    const aIndex = tokens[idx].attrIndex('target')
    if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank'])
    } else {
        tokens[idx].attrs[aIndex][1] = '_blank'
    }
})

// 行内代码加语言名
md.use(InlineCodeName)

export default md
