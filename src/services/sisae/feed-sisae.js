let currentSlide = 0;

// Função para buscar os dados da API
async function fetchImages() {
    try {
        const response = await fetch('http://127.0.0.1:8080/api/sisae/listAll');
        const data = await response.json();
        displayCarouselItems(data);
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Função para exibir os itens no carrossel
function displayCarouselItems(items) {
    const carousel = document.querySelector('.carousel');
    carousel.innerHTML = '';  // Limpar carrossel existente

    items.forEach(item => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');

        // Verificar se a imagem não está em base64 e converte-la
        let imageSrc = item.imagem;
        if (!imageSrc.startsWith('data:image')) {
            imageSrc = `data:image/jpeg;base64,${imageSrc}`;
        }

        // Adicionar imagem, título e mensagem
        carouselItem.innerHTML = `
            <img src="${imageSrc}" alt="${item.titulo}">
            <h2>${item.titulo}</h2>
            <p>${item.mensagem}</p>
        `;
        carousel.appendChild(carouselItem);
    });
}

// Função para mudar o slide
function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-item');
    currentSlide = (currentSlide + step + slides.length) % slides.length;
    document.querySelector('.carousel').style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Carregar dados ao iniciar a página
fetchImages();
