// document.addEventListener('DOMContentLoaded', () => {
//     const blogs = document.querySelector<HTMLElement>('.simurgh--blogs')
//     const articles = blogs.querySelectorAll('article')

//     articles.forEach(article => {
//         const img = article.querySelector<HTMLImageElement>('img')

//         if (img) {
//             const wrapper = document.createElement('div')
//             wrapper.className = 'img-wrapper'

//             const semiCircle = document.createElement('div')
//             semiCircle.className = 'semi-circle'

//             // Move the img inside the wrapper
//             wrapper.appendChild(img)
//             wrapper.appendChild(semiCircle)

//             // Append the wrapper back to the article
//             article.insertBefore(wrapper, article.firstChild)
//         }
//     })
// })
