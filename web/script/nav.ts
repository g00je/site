let stickyButton = document.querySelector('.nav-open') as HTMLElement
let stickyButtonInner = document.querySelector('.icons-wrapper') as HTMLElement

let navbarElem = document.querySelector('nav.nav-container') as HTMLElement

let pageMain = document.querySelector('main') as HTMLElement

let navCloseBg = document.querySelector('.nav-close-bg') as HTMLElement

let navLinks = document.querySelectorAll('a.nav-link')

let CircleWrapper = document.querySelector(
    '.addon-layer-wrapper'
) as HTMLElement

let navbarActive = false

stickyButtonInner.addEventListener('mousemove', () => {})
stickyButton.addEventListener('mousemove', e => {
    // stickyButton.className += ' active'
    stickyButton.style.transition =
        'scale 0.2s cubic-bezier(0.45, 0.02, 0.09, 0.98)'
    stickyButtonInner.style.transition =
        'scale 0.2s cubic-bezier(0.45, 0.02, 0.09, 0.98)'

    const pos = stickyButton.getBoundingClientRect()
    const mx = e.clientX - pos.left - pos.width / 2
    const my = e.clientY - pos.top - pos.height / 2

    stickyButton.style.transform = `
        translate(${mx * 0.1}px ,${my * 0.2}px)
    `

    stickyButtonInner.style.transform = `
        translate(${mx * 0.08}px ,${my * 0.15}px)
    `
})
stickyButton.addEventListener('mouseleave', () => {
    stickyButton.style.transition =
        'all 0.2s cubic-bezier(0.45, 0.02, 0.09, 0.98)'

    stickyButtonInner.style.transition =
        'all 0.2s cubic-bezier(0.45, 0.02, 0.09, 0.98)'

    stickyButton.style.transform = 'none'
    stickyButtonInner.style.transform = 'none'
})

stickyButton.onclick = () => {
    navbarActive = !navbarActive

    navStuff()
}

navCloseBg.onclick = () => {
    navbarActive = false

    navStuff()
}

navLinks.forEach(e => {
    e.addEventListener('click', () => {
        navbarActive = false

        navStuff()
    })
})

function navStuff() {
    if (navbarActive) {
        stickyButton.className += ' active'
        navbarElem.className += ' active'
        navCloseBg.className += ' active'

        CircleWrapper.style.animation =
            '1s addon-on-open cubic-bezier(0.83, 0.11, 0.25, 0.95) forwards'

        // pageMain.style.filter = 'blur(15px)'
        // pageMain.style.pointerEvents = 'none'
    } else {
        stickyButton.className = 'nav-open'
        navbarElem.className = 'nav-container'

        CircleWrapper.style.animation =
            '1s addon-on-close cubic-bezier(0.83, 0.11, 0.25, 0.95) forwards'

        navCloseBg.className = 'nav-close-bg'
        // pageMain.style.filter = 'blur(0)'
        // pageMain.style.pointerEvents = 'all'
    }
}
