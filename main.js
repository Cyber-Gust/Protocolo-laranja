document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. HEADER & NAVEGAÇÃO
    // ==========================================
    const header = document.getElementById('header');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    // Efeito de scroll no Header (Muda de transparente para branco sólido com sombra)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md', 'bg-white/95');
            header.classList.remove('shadow-sm');
        } else {
            header.classList.remove('shadow-md', 'bg-white/95');
            header.classList.add('shadow-sm');
        }
    });

    // Abrir/Fechar Menu Mobile
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Alterna ícone entre barras e X
        const icon = mobileBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    });

    // Fechar menu mobile ao clicar em um link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // ==========================================
    // 2. SISTEMA DE FAQ (ACORDEÃO)
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('i');

        question.addEventListener('click', () => {
            // Fecha todos os outros antes de abrir o atual (opcional, mas recomendado)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.add('hidden');
                    otherItem.querySelector('i').classList.remove('rotate-180');
                }
            });

            // Alterna o atual
            answer.classList.toggle('hidden');
            
            // Animação da seta
            if (answer.classList.contains('hidden')) {
                icon.classList.remove('rotate-180');
            } else {
                icon.classList.add('rotate-180');
            }
        });
    });

    // ==========================================
    // 3. ANIMAÇÕES DE SCROLL (REVEAL)
    // ==========================================
    // Adiciona classes de transição aos elementos que queremos animar
    const animatedElements = document.querySelectorAll('h2, .bg-white.p-8, .group.relative, .faq-item');
    
    // Configura o estado inicial (invisível e levemente deslocado para baixo)
    animatedElements.forEach(el => {
        el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
    });

    // Observer para detectar quando o elemento entra na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove o estado invisível e traz para a posição original
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                // Para de observar depois que animou uma vez
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Dispara quando 10% do elemento estiver visível
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

});