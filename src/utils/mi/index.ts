import MarkdownIt from 'markdown-it'
import { InlineCodeName } from '/@/utils/mi/plugin-inline-code-name'

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
md.renderer.rules.code_inline = function (tokens, idx, _options, _env, slf) {
    const token = tokens[idx]
    const codeLang = token.codeLang || ''
    return `<div class="inline-code-div"><code class="inline-code language-${codeLang}" ${slf.renderAttrs(token)}>` +
        md.utils.escapeHtml(tokens[idx].content) +
        `</code><span class="inline-code-copy" data-clipboard-text="${tokens[idx].content}">c</span></div>`
}
md.use(InlineCodeName)

export default md
