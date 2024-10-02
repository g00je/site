document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.scrollTop = 0
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/static/public/sw.js')
    }
})
