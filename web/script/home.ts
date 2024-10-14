let featuresSection = document.querySelector<HTMLElement>(
    'section.features-list'
)!

let extraFeatures = document.querySelectorAll<HTMLDivElement>(
    '.extra-feature#transform'
)

let perfectDateSection = document.querySelector<HTMLElement>(
    'section.perfect-date'
)!

let dateImgBg = document.querySelector<HTMLElement>('.date-img-bg')!
let dateImgs = document.querySelectorAll<HTMLElement>('.date-img')

window.onscroll = () => {
    let transform =
        Math.max(
            featuresSection.getBoundingClientRect().top -
                (innerWidth > 1024 ? 450 : 200),
            0
        ) / 2

    extraFeatures.forEach((elem, index) => {
        if (innerWidth > 1024) {
            if (index === 0) {
                elem.style.transform = `translateX(${transform}px)`
            }
            if (index === 1) {
                elem.style.transform = `translateY(${transform}px)`
            }
            if (index === 2) {
                elem.style.transform = `translateX(-${transform}px)`
            }
        } else {
            if (index === 0) {
                elem.style.transform = `translateX(${transform}px)`
            }
            if (index === 1) {
                elem.style.transform = `translateX(${-transform}px)`
            }
            if (index === 2) {
                elem.style.transform = `translateX(${transform}px)`
            }
        }
    })

    let imgsTop = Math.floor(
        Math.max(
            perfectDateSection.getBoundingClientRect().top - innerHeight / 3
        )
    )

    if (imgsTop >= 500 || imgsTop <= -1000) return

    dateImgs.forEach(
        elem => (elem.style.top = `${Math.max(0, Math.floor(imgsTop / 5))}%`)
    )

    dateImgBg.style.opacity = `${Math.min(
        100,
        Math.max(0, 100 - imgsTop / 3)
    )}%`
}

let reviewRows = document.querySelectorAll('.data-row')
let reviewRowActive = 0

const setReviewClass = (index: number) => {
    reviewRows.forEach((content, idx0) => {
        if (index === idx0) return (content.className = 'data-row active')
        if (index - 1 === idx0) return (content.className = 'data-row prev')
        return (content.className = 'data-row')
    })
}

document.addEventListener('DOMContentLoaded', () => {
    setReviewClass(0)
    setInterval(() => {
        if (reviewRowActive + 1 >= reviewRows.length) {
            reviewRowActive = 0
            setReviewClass(0)
            return
        }
        setReviewClass(reviewRowActive + 1)
        reviewRowActive += 1

        return
    }, 4000)
})

let faqSection = document.querySelector('section.faq') as HTMLElement

let faqRows = document.querySelectorAll('.faq-row')

document.addEventListener('DOMContentLoaded', () => {
    var observer = new IntersectionObserver(
        ([entry]) => {
            if (entry && entry.isIntersecting) {
                faqSection.className += ' active'
                observer.disconnect()
            }
        },
        {
            rootMargin: '-200px',
        }
    )

    observer.observe(faqSection)
})

document.addEventListener('DOMContentLoaded', () => {
    var observer = new IntersectionObserver(
        ([entry]) => {
            if (entry && entry.isIntersecting) {
                entry.target.className += ' active'
                // @ts-ignore
                let target: HTMLElement = entry.target
                target.style.height = `${target.scrollHeight + 10}px`

                observer.unobserve(entry.target)
            }
        },
        {
            rootMargin: '-200px',
        }
    )

    faqRows.forEach((elem: HTMLElement) => {
        const q = elem.querySelector<HTMLElement>('.faq-q')
        observer.observe(elem)

        elem.addEventListener('click', () => {
            if (elem.classList.contains('active')) {
                elem.className = 'faq-row'
                elem.style.height =
                    q.getBoundingClientRect().height * 1.5 + 'px'
                return
            }

            elem.style.height = `${elem.scrollHeight + 10}px`
            elem.className = 'faq-row active'
        })
    })
})

let contactTitleHover = document.querySelector(
    'span.text-hover#contact-hover'
) as HTMLElement

let contactSubtitleHover = document.querySelector(
    'span.text-hover#contact-sub-hover'
) as HTMLElement

document.onscroll = () => {
    let titleScrolled =
        contactTitleHover.getBoundingClientRect().top - innerHeight
    let subtitleScrolled =
        contactSubtitleHover.getBoundingClientRect().top - innerHeight

    if (titleScrolled - 100 <= 0) {
        contactTitleHover.style.width = `${Math.min(
            100,
            -titleScrolled * 0.2
        )}%`
    }
    if (subtitleScrolled - 100 <= 0) {
        contactSubtitleHover.style.width = `${Math.min(
            100,
            -subtitleScrolled * 0.2
        )}%`
    }
}

let downloadSection = document.querySelector('section.download') as HTMLElement
let downloadWrapper = document.querySelector('.download-wrapper') as HTMLElement

let downloadImgFirst = document.querySelector('#phone-img1') as HTMLElement
let downloadImgSec = document.querySelector('#phone-img2') as HTMLElement

document.addEventListener('DOMContentLoaded', () => {
    var observer = new IntersectionObserver(
        ([entry]) => {
            if (entry && entry.isIntersecting) {
                let intersectionRatioSquared =
                    entry.intersectionRatio * entry.intersectionRatio

                // Smooth shadow expansion with finer granularity
                downloadWrapper.style.boxShadow = `rgba(236, 15, 15, 0.5) 0px 7px ${Math.max(
                    10,
                    Math.min(Math.floor(intersectionRatioSquared * 75), 74)
                )}px 0px`

                // Smooth rotation and translate for the first image
                downloadImgFirst.style.transform = `
                    rotate(${Math.min(entry.intersectionRatio * 18, 13)}deg)
                    scale(${0.7 + entry.intersectionRatio * 0.2})
                    translateX(${Math.min(60, entry.intersectionRatio * 100)}%)
                `

                // Smooth rotation and translate for the second image (inverse rotation)
                downloadImgSec.style.transform = `
                    rotate(-${Math.min(entry.intersectionRatio * 18, 13)}deg)
                    scale(${0.7 + entry.intersectionRatio * 0.2})
                    translateX(-${Math.min(60, entry.intersectionRatio * 100)}%)
                `
            }
        },
        {
            threshold: Array.from({ length: 51 }, (_, i) => i / 50), // Finer thresholds for smoother transitions
        }
    )

    observer.observe(downloadSection)
})
