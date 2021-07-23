export const InlineCodeName = function (md) {
    md.inline.ruler.before('backticks', 'backticks-lang', function (state, silent) {
        let token, matchStart, matchEnd, closerLength,
            pos = state.pos
        const ch = state.src.charCodeAt(pos)

        if (ch !== 0x60/* ` */) {
            return false
        }

        const start = pos
        pos++
        const max = state.posMax

        // scan marker length
        while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) {
            pos++
        }

        const marker = state.src.slice(start, pos)
        const openerLength = marker.length

        if (state.backticksScanned && (state.backticks[openerLength] || 0) <= start) {
            if (!silent) state.pending += marker
            state.pos += openerLength
            return true
        }

        matchStart = matchEnd = pos

        // Nothing found in the cache, scan until the end of the line (or until marker is found)
        while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
            matchEnd = matchStart + 1

            // scan marker length
            while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) {
                matchEnd++
            }
            closerLength = matchEnd - matchStart

            if (closerLength === openerLength) {
                // 这里插入我们自己的逻辑

                const bracketsIndexStart = matchEnd
                let bracketsIndexEnd = bracketsIndexStart + 1
                let hasEndBrackets = false
                if (matchEnd !== state.src.length) {
                    // 如果===说明`已经到结尾了，就不用处理
                    if (state.src.charCodeAt(matchEnd) === 40/* ( */) {
                        // `结尾的下一个字符是(，那么就找下一个)
                        while (bracketsIndexEnd !== state.src.length
                        && state.src.charCodeAt(bracketsIndexEnd) !== 32/*   */
                        && !hasEndBrackets) {
                            // 如果bracketsIndexEnd等于字符串长度了，说明在结尾，就不进来了，
                            // 如果存在空格，就不进来了
                            // 如果已经有结尾空格了，就不进来了
                            if (state.src.charCodeAt(bracketsIndexEnd) === 41/* ) */) {
                                hasEndBrackets = true
                            } else {
                                bracketsIndexEnd++
                            }
                        }
                    }
                }

                // Found matching closer length.
                if (!silent) {
                    token = state.push('code_inline', 'code', 0)
                    if (hasEndBrackets) {
                        token.codeLang = state.src.slice(bracketsIndexStart + 1, bracketsIndexEnd)
                    }
                    token.markup = marker
                    token.content = state.src.slice(pos, matchStart)
                                         .replace(/\n/g, ' ')
                                         .replace(/^ (.+) $/, '$1')
                }
                if (hasEndBrackets) {
                    state.pos = bracketsIndexEnd + 1
                } else {
                    state.pos = matchEnd
                }
                return true
            }

            // Some different length found, put it in cache as upper limit of where closer can be found
            state.backticks[closerLength] = matchStart
        }

        // 扫描到最后，没发现任何东西，到这里之后的openerLength已经是1了，这样是为了把这个违规字符去掉，让后面不再检查
        // Scanned through the end, didn't find anything
        state.backticksScanned = true

        if (!silent) state.pending += marker
        state.pos += openerLength

        return true
    })
}
