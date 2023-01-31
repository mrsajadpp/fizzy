function hideLoader() {
    setTimeout(() => {
        let loader = document.getElementById('loader');
        loader.style.display = 'none';
    }, 3000);
}

window.onload = hideLoader