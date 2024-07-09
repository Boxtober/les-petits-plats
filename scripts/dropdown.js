document.getElementById('menuButton').addEventListener('click', function () {
    document.getElementById('menuItems').classList.toggle('hidden');
});

document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const items = document.querySelectorAll('#menuItems a, #menuItems');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
});

document.addEventListener('click', function (event) {
    const isClickInside = document.querySelector('.relative.inline-block.text-left').contains(event.target);
    if (!isClickInside) {
        document.getElementById('menuItems').classList.add('hidden');
    }
});