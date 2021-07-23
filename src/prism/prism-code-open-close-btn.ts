Prism.plugins.toolbar.registerButton('showOrClose', function (env) {
    let dataShowState = env.element.parentNode.getAttribute('data-show-state')
    if (dataShowState == null) {
        dataShowState = '1'
    }
    const button = document.createElement('button')
    if (parseInt(dataShowState)) {
        button.innerHTML = '关闭'
    } else {
        button.innerHTML = '展开'
        env.element.parentNode.style.maxHeight = '38.19px'
        env.element.parentNode.style.overflow = 'hidden'
    }
    button.addEventListener('click', function (e: any) {
        const tempDataShowState = env.element.parentNode.getAttribute('data-show-state')
        if (parseInt(tempDataShowState)) {
            e.target.innerHTML = '展开'
            env.element.parentNode.setAttribute('data-show-state', 0)
            env.element.parentNode.style.maxHeight = '38.19px'
            env.element.parentNode.style.overflow = 'hidden'
        } else {
            e.target.innerHTML = '关闭'
            env.element.parentNode.setAttribute('data-show-state', 1)
            env.element.parentNode.style.maxHeight = 'max-content'
            env.element.parentNode.style.overflow = 'hidden'
        }
    })
    return button
})
