import MarkdownIt from 'markdown-it'
import { InlineCodeName } from '/@/utils/mi/plugin-inline-code-name'
import { ForInline } from '/@/utils/mi/plugin-for-inline'
import { MarkdownItemInfo } from '/@/vo/note/markdown-item-info'
import { Ref } from 'vue'

const slugify = (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-'))

function uniqueSlug(slug, slugs) {
    let uniq = slug
    let i = 1
    if (!Object.prototype.hasOwnProperty.call(slugs, uniq)) {
        while (Object.prototype.hasOwnProperty.call(slugs, uniq)) {
            uniq = `${slug}-${i}`
            i += 1
        }
    }
    slugs[uniq] = true
    return uniq
}

const outChildTree = (sourceChild: Array<MarkdownItemInfo>) => {
    const childList: Array<MarkdownItemInfo> = []
    let minChildGrade = -1

    sourceChild.forEach((item, index) => {
        if (index === 0) {
            minChildGrade = item.hGrade
        }
        if (item.hGrade < minChildGrade) {
            minChildGrade = item.hGrade
        }
    })

    let childItem: MarkdownItemInfo = {
        title: '',
        href: '',
        hGrade: minChildGrade,
        orderNum: [],
        isNode: false,
        child: [],
    }

    sourceChild.forEach((item, index) => {
        if (item.hGrade > minChildGrade) {
            childItem.child.push(item)
        }
        if (item.hGrade === minChildGrade) {
            if (childItem.child.length || childItem.isNode) {
                childList.push(childItem)
            }
            childItem = {
                title: item.title,
                href: item.href,
                hGrade: item.hGrade,
                orderNum: [],
                isNode: true,
                child: [],
            }
        }
        if (index === sourceChild.length - 1) {
            childList.push(childItem)
        }
    })
    if (childList.length) {
        childList.forEach(item => {
            if (item.child && item.child.length) {
                item.child = outChildTree(item.child)
            }
        })
    }
    return childList
}

const setTreeItemOrder = (sourceItem: MarkdownItemInfo) => {
    if (!sourceItem.orderNum.length) {
        return
    }
    if (!sourceItem.child.length) {
        return
    }
    sourceItem.child.forEach((item, index) => {
        item.orderNum.push(...sourceItem.orderNum)
        item.orderNum.push(index + 1)
        if (item.child.length) {
            setTreeItemOrder(item)
        }
    })
}

const setListItemOrder = (list: Array<MarkdownItemInfo>, tree: Array<MarkdownItemInfo>) => {
    let setIndex = 0
    if (!list.length) {
        return
    }
    const _setListItemOrder = (list: Array<MarkdownItemInfo>, tree: Array<MarkdownItemInfo>) => {
        tree.forEach(item => {
            if (setIndex < list.length) {
                if (item.isNode) {
                    list[setIndex].orderNum = item.orderNum
                    setIndex++
                }
                if (item.child.length) {
                    _setListItemOrder(list, item.child)
                }
            }
        })
    }
    _setListItemOrder(list, tree)
}

export const genMd = (markdownTree: Ref<Array<MarkdownItemInfo>>) => {

    const markdownItemArr: Array<MarkdownItemInfo> = []

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
    md.core.ruler.push('yiu_anchor', state => {
        const slugs = {}
        const tokens = state.tokens
        for (const token of tokens) {
            const markdownItem: MarkdownItemInfo = {
                title: '',
                href: '',
                hGrade: -1,
                orderNum: [],
                isNode: true,
                child: [],
            }

            if (token.type !== 'heading_open') {
                continue
            }
            const index = tokens.indexOf(token)

            const hGrade = Number(token.tag.substr(1))

            markdownItem.hGrade = hGrade

            tokens[index + 1].children?.unshift(
                Object.assign(new state.Token('yiu_anchor_open', 'span', 1), {
                    attrs: [
                        // italic mr-2
                        ['class', 'yiu-anchor-order'],
                    ],
                }),
                Object.assign(new state.Token('text', '', 0), {
                    content: hGrade,
                }),
                new state.Token('yiu_anchor_close', 'span', -1),
            )

            let inYiuAnchor = false
            const title = tokens[index + 1]
                .children
                .filter(token => {
                    if (token.type === 'yiu_anchor_open') {
                        inYiuAnchor = true
                    }
                    if (token.type === 'yiu_anchor_close') {
                        inYiuAnchor = false
                    }
                    if (inYiuAnchor) {
                        return false
                    }
                    return token.type === 'text' || token.type === 'code_inline'
                })
                .filter(token => token.type !== 'yiu_anchor')
                .reduce((acc, t) => acc + t.content, '')

            if (title) {
                markdownItem.title = title
            }

            let slug = token.attrGet('id')
            if (slug == null) {
                slug = uniqueSlug(slugify(title), slugs)
            } else {
                slug = uniqueSlug(slug, slugs)
            }
            token.attrSet('id', slug)
            markdownItem.href = slug
            markdownItemArr.push(markdownItem)
        }
    })

    md.core.ruler.push('yiu_anchor_rendering', state => {
        const markdownItemTree: Array<MarkdownItemInfo> = outChildTree(markdownItemArr)
        markdownItemTree.forEach((item, index) => {
            item.orderNum.push(index + 1)
        })
        markdownItemTree.forEach(item => setTreeItemOrder(item))

        setListItemOrder(markdownItemArr, markdownItemTree)

        const tokens = state.tokens

        let setIndex = 0
        for (const token of tokens) {
            if (token.type !== 'heading_open') {
                continue
            }
            const index = tokens.indexOf(token)
            const titleBlock = tokens[index + 1]
            if (titleBlock.children && titleBlock.children.length) {
                titleBlock.children.forEach((item, childIndex) => {
                    if (item.type === 'yiu_anchor_open') {
                        titleBlock.children[childIndex + 1].content = markdownItemArr[setIndex].orderNum.reduce((acc, t) => acc + t + '.', '')
                        setIndex++
                    }
                })
            }
        }

        markdownTree.value = markdownItemTree
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
    return md
}
