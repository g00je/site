const goojeSvg = `<svg width="45" height="45" viewBox="0 0 126.99999 127.00005" version="1.1" id="svg1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
<g id="layer1-9" transform="matrix(0.45145861,0,0,0.45145861,16.086023,-4.0643947)" style="stroke-width:1.65301">
    <path style="fill:#e13a34;stroke:none;stroke-width:1.65301" d="m 63.369062,117.39147 c -5.651496,0.7442 -10.992885,1.87798 -16.139583,4.45134 -31.066272,15.53314 -35.028353,57.15849 -20.910255,85.39469 16.128118,32.25624 52.221974,45.73267 86.526926,41.46426 20.56502,-2.55882 41.21741,-11.41228 55.78215,-26.40668 23.2584,-23.94451 34.23451,-67.39034 6.39493,-92.53557 -10.13023,-9.1498 -23.51849,-13.3829 -37.04167,-12.45667 -11.59118,0.79391 -22.69688,4.49236 -34.39583,4.20578 -13.323364,-0.32636 -26.845181,-5.87796 -40.216668,-4.11715 M 185.0774,171.78333 h -0.26459 c -6.76922,-20.00809 -24.72136,-36.83806 -43.92083,-44.71458 1.43276,-0.60122 3.26427,-0.20528 4.7625,0 4.07947,0.55898 8.10793,1.51764 11.90625,3.1354 16.14982,6.87843 27.46764,23.81124 27.51667,41.57918 M 41.408646,135.53542 c -0.94886,3.31914 -2.557257,6.48489 -3.61312,9.78958 -2.101809,6.57835 -3.621613,13.49317 -4.27947,20.37292 -1.087466,11.37262 -0.522401,22.93051 1.862919,34.13125 1.225539,5.75475 3.388084,11.23355 4.706754,16.93333 h -0.264583 c -3.592853,-5.45432 -7.162903,-10.56079 -9.629726,-16.66875 -6.268658,-15.52147 -4.959145,-32.34027 1.267994,-47.625 2.195377,-5.38862 5.347365,-13.18674 9.949232,-16.93333 z" id="path32"></path>
    <g id="g32" transform="translate(0.05270814,0.01756976)" style="stroke-width:1.65301">
        <path style="opacity:1;fill:#12e647;fill-opacity:1;stroke:#7caa99;stroke-width:0;stroke-dasharray:none;paint-order:markers fill stroke" d="m 118.6553,100.3415 -2.3514,0.36176 -2.98447,0.31653 -3.52711,-0.58785 -2.71315,-0.949603 -2.75837,-1.673111 -1.71833,-1.673114 1.22092,-0.542628 1.85398,-0.768729 1.71833,-0.949603 1.80878,-1.085262 2.30618,-1.808771 2.21574,-1.899208 1.89921,-2.034866 1.76355,-2.125305 0.90438,-1.13048 1.4018,-2.260963 1.4018,-2.170522 1.67311,-3.391445 0.90438,-1.989646 0.94961,-2.396619 0.99482,-2.713157 0.76873,-2.713154 0.76873,-2.622716 0.36175,-2.080086 0.18088,-0.994822 0.54263,-0.768729 0.90438,-0.723505 1.1757,-0.226098 0.99483,0.09044 1.08526,0.723508 0.58785,0.723509 0.27131,0.633068 0.18088,0.633071 c 0,0 0.13566,0.587849 0.0452,0.904383 -0.0904,0.316537 -0.31654,1.35658 -0.31654,1.35658 l -0.36175,1.401797 -0.40697,0.859165 -0.40698,1.220917 c 0,0 -0.45219,0.678291 -0.54263,1.130483 -0.0904,0.452191 -0.63307,2.034865 -0.63307,2.034865 l -0.81394,2.39662 -1.80877,4.612365 -1.44702,3.934073 -1.89921,4.702802 -2.39662,5.697625 -2.80359,6.149816 z" id="path30"></path>
        <path style="opacity:1;fill:#12e647;fill-opacity:1;stroke:#7caa99;stroke-width:0;stroke-dasharray:none;paint-order:markers fill stroke" d="m 64.077569,92.727019 c 0,0 3.453281,10.999341 14.132874,18.097761 10.679597,7.09841 23.725327,6.90656 23.661377,6.90656 -0.064,0 8.76111,0.76739 23.59743,-5.05202 14.83632,-5.81942 25.64382,-25.196173 25.64382,-25.196173 0,0 6.39496,-10.423797 11.76674,-25.451969 5.37177,-15.028172 3.06958,-13.36548 4.02882,-14.516573 0.95925,-1.151097 -11.76673,30.631891 -29.54474,46.235608 -17.77801,15.603717 -33.12593,7.418167 -33.12593,7.418167 0,0 -16.603064,-6.388845 -18.864026,-37.680562 l -0.271317,-0.384363 -1.198309,5.720236 -0.203488,1.853988 -0.384363,2.667934 -0.339143,5.403702 0.203486,5.878502 1.605283,7.099421 c 0,0 4.999251,12.574672 12.86506,16.795352 C 79.659803,100.38198 58.647522,90.794291 64.077569,92.727019 Z" id="path31"></path>
    </g>
</g>
</svg>`

const blogMain = document.querySelector<HTMLElement>('.simurgh--blog-fnd')
const blogImg = blogMain.querySelector<HTMLImageElement>(
    '.simurgh--blog-thumbnail'
)
const blogTitle = blogMain.querySelector<HTMLElement>('header')
let titleSpan = blogTitle.querySelector('span')

blogImg.className = 'blog-thumbnail'
blogTitle.className = 'blog-title'

const blogIntro = document.createElement('div')
blogIntro.className = 'blog-intro'
blogIntro.append(blogTitle)

blogMain.insertBefore(blogIntro, blogMain.firstChild)

// thumbnail add
const thumbnailContainer = document.createElement('div')
thumbnailContainer.appendChild(blogImg)
thumbnailContainer.className = 'blog-thumbnail-container'
// thumbnail add end

blogIntro.insertBefore(thumbnailContainer, blogIntro.firstChild)

// created by gooje logo
const cbg = document.createElement('div')
cbg.className = 'title_small cbg'

const span1 = document.createElement('span')
span1.innerHTML = `<span>تهیه شده توسط</span>`

const span2 = document.createElement('span')
span2.innerHTML = `${goojeSvg}
                    <span>گوجه</span>`

cbg.appendChild(span1)
cbg.appendChild(span2)

// add cbg to after blogTitle elem
if (blogTitle) {
    blogTitle.insertAdjacentElement('afterend', cbg)
}
// created by gooje logo end

// add scene
const scene = document.createElement('div')
scene.className = 'scene'
blogMain.insertBefore(scene, blogMain.firstChild)
// add scene end

let addonSvg1 = document.createElement('div')
addonSvg1.className = 'addon-svg'
addonSvg1.id = 'first'
addonSvg1.innerHTML = `${goojeSvg}`

let addonSvg2 = document.createElement('div')
addonSvg2.className = 'addon-svg'
addonSvg2.id = 'sec'
addonSvg2.innerHTML = `${goojeSvg}`

blogMain.insertAdjacentElement('afterend', addonSvg1)
blogMain.insertAdjacentElement('afterend', addonSvg2)

const MaxPerspective = 1001
document.onscroll = e => {
    const rect = scene.getBoundingClientRect()

    let percentage = 100 - (rect.bottom / rect.height) * 100

    percentage *= 0.6

    console.log(Math.max(0, percentage))

    thumbnailContainer.style.animation = 'none'
    thumbnailContainer.style.transform = `translate3d(0, -${Math.min(MaxPerspective, percentage * 4)}px,${Math.min(MaxPerspective, percentage * 25)}px) `

    blogTitle.style.animation = 'none'
    blogTitle.style.transform = 'none'
    titleSpan.style.transform = `translate3d(0, ${Math.min(MaxPerspective, percentage * 2)}px,${Math.min(MaxPerspective, percentage * 25)}px) `

    cbg.style.opacity = `${1 - Math.min(1, Math.max(0, percentage / 10))}`

    if (percentage >= 40) {
        addonSvg1.style.opacity = `1`
        addonSvg2.style.opacity = `1`
    } else {
        addonSvg1.style.opacity = `0`
        addonSvg2.style.opacity = `0`
    }
}

// tools
function getScrollPercent(element: HTMLElement) {
    const scrollTop = element.scrollTop
    const scrollHeight = element.scrollHeight - element.clientHeight
    const scrollPercent = (scrollTop / scrollHeight) * 100
    return scrollPercent
}

document.addEventListener('click', () => {
    if (scrollY <= 10) {
        scrollTo({ behavior: 'smooth', top: 1000 })
    }
})
