export function ForInline(md, ruleName, tokenType, iterator) {
    function scan(state) {
        let i, blkIdx, inlineTokens
        for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {
            if (state.tokens[blkIdx].type !== 'inline') {
                continue
            }

            inlineTokens = state.tokens[blkIdx].children

            for (i = inlineTokens.length - 1; i >= 0; i--) {
                if (inlineTokens[i].type !== tokenType) {
                    continue
                }

                iterator(inlineTokens, i)
            }
        }
    }

    md.core.ruler.push(ruleName, scan)
}
