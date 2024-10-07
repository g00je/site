document.addEventListener('DOMContentLoaded', () => {
    const blogs = document.querySelector<HTMLElement>('.simurgh--blogs')
    const articles = blogs.querySelectorAll('article')

    articles.forEach(article => {
        const img = article.querySelector<HTMLImageElement>('img')
        const title = article.querySelector<HTMLElement>('h2')
        const desc = article.querySelector<HTMLElement>('p')
        const link = article.querySelector<HTMLElement>('a')

        const svgNS = 'http://www.w3.org/2000/svg' // SVG namespace
        const svg = document.createElementNS(svgNS, 'svg')

        // Set SVG attributes to match the path size
        svg.setAttribute('width', '118.25')
        svg.setAttribute('height', '76.38')
        svg.setAttribute('viewBox', '48.34 40.86 118.25 76.38') // Set the exact bounding box of the path

        // Create the path element
        const path = document.createElementNS(svgNS, 'path')

        // Set the path attributes
        path.setAttribute(
            'style',
            'opacity:1;fill:#12e647;fill-opacity:1;stroke:#7caa99;stroke-width:0;stroke-dasharray:none;paint-order:markers fill stroke'
        )
        path.setAttribute(
            'd',
            'm 64.077569,92.727019 c 0,0 3.453281,10.999341 14.132874,18.097761 10.679597,7.09841 23.725327,6.90656 23.661377,6.90656 -0.064,0 8.76111,0.76739 23.59743,-5.05202 14.83632,-5.81942 25.64382,-25.196173 25.64382,-25.196173 0,0 6.39496,-10.423797 11.76674,-25.451969 5.37177,-15.028172 3.06958,-13.36548 4.02882,-14.516573 0.95925,-1.151097 -11.76673,30.631891 -29.54474,46.235608 -17.77801,15.603717 -33.12593,7.418167 -33.12593,7.418167 0,0 -16.603064,-6.388845 -18.864026,-37.680562 l -0.271317,-0.384363 -1.198309,5.720236 -0.203488,1.853988 -0.384363,2.667934 -0.339143,5.403702 0.203486,5.878502 1.605283,7.099421 c 0,0 4.999251,12.574672 12.86506,16.795352 C 79.659803,100.38198 58.647522,90.794291 64.077569,92.727019 Z'
        )
        path.setAttribute('id', 'path31')

        svg.appendChild(path)

        if (img) {
            const wrapper = document.createElement('div')
            wrapper.className = 'img-wrapper'

            wrapper.appendChild(img)

            article.insertBefore(wrapper, article.firstChild)
        }

        const dataWrapper = document.createElement('div')
        dataWrapper.className = 'data-wrapper'

        dataWrapper.append(title)
        dataWrapper.append(desc)
        dataWrapper.append(link)

        article.append(dataWrapper)
        article.insertBefore(svg, article.firstChild)
    })
})

const headIconsWrapper = document.querySelector<HTMLElement>('.bg-icons')
const headIcons = headIconsWrapper.querySelectorAll('.bg-icon')

document.addEventListener('scroll', e => {
    let value = scrollY

    headIcons.forEach((icon: HTMLElement) => {
        const imgElem = icon.querySelector<HTMLElement>('img')

        imgElem.style.transform = `translateY(${Math.min(400, value)}px)`
    })
})
