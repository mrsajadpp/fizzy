function hideLoader() {
    setTimeout(() => {
        let loader = document.getElementById('loader');
        loader.style.display = 'none';
    }, 3000);
}
document.addEventListener('contextmenu', event => event.preventDefault());
window.onload = hideLoader