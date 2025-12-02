// Teacher Sussa - Landing Page Script

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Teacher Sussa - Landing Page carregada!');
    
    // ===== VARIÁVEIS GLOBAIS =====
    const spotsLeft = 27;
    let spotsRemaining = spotsLeft;
    
    // ===== MENU MOBILE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // ===== CONTADOR REGRESSIVO =====
    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
        
        // Define o tempo alvo (24 horas a partir de agora)
        const now = new Date();
        const target = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        
        function update() {
            const currentTime = new Date();
            const diff = target - currentTime;
            
            if (diff > 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                
                countdownElement.textContent = 
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                countdownElement.textContent = "00:00:00";
                countdownElement.style.background = "#f56565";
            }
        }
        
        update();
        setInterval(update, 1000);
    }
    
    updateCountdown();
    
    // ===== HEADER SCROLL EFFECT =====
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===== FORMULÁRIO DE MENTORIA =====
    const mentoriaForm = document.getElementById('mentoriaForm');
    if (mentoriaForm) {
        mentoriaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(this);
            const data = {
                nome: formData.get('nome') || this.querySelector('input[type="text"]').value,
                email: formData.get('email') || this.querySelector('input[type="email"]').value,
                telefone: formData.get('telefone') || this.querySelector('input[type="tel"]').value,
                nivel: this.querySelector('select').value,
                desafio: this.querySelector('textarea').value
            };
            
            // Simular envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSANDO...';
            submitBtn.disabled = true;
            
            // Simular delay de envio
            setTimeout(() => {
                // Atualizar vagas restantes
                if (spotsRemaining > 0) {
                    spotsRemaining--;
                    document.getElementById('spots-left').textContent = spotsRemaining;
                    
                    // Mostrar mensagem de sucesso
                    showNotification('success', 
                        `🎉 Parabéns, ${data.nome}!<br>
                        Sua vaga na mentoria gratuita foi reservada!<br>
                        Enviamos os detalhes para: ${data.email}`);
                } else {
                    showNotification('error', 
                        '😔 Vagas esgotadas!<br>
                        Mas você ainda pode se inscrever na lista de espera.');
                }
                
                // Resetar formulário
                mentoriaForm.reset();
                
                // Restaurar botão
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Scroll para topo
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
            }, 2000);
        });
    }
    
    // ===== FAQ ACCORDION =====
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
            
            // Fechar outros itens
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // ===== ANIMAÇÃO DE STATS =====
    function animateStats() {
        const stats = document.querySelectorAll('.stat h3');
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            if (!isNaN(target)) {
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = formatNumber(Math.round(current)) + 
                        (stat.textContent.includes('%') ? '%' : '+');
                }, 30);
            }
        });
    }
    
    // Observar quando a seção stats estiver visível
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // ===== BOTÃO DE AÇÃO FINAL =====
    const finalCta = document.getElementById('finalCta');
    if (finalCta) {
        finalCta.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simular processo de checkout
            showNotification('info', 
                `💳 Redirecionando para checkout...<br>
                <strong>Oferta:</strong> Curso Completo + Mentoria<br>
                <strong>Valor:</strong> R$ 697 (12x R$ 69,90)<br>
                <strong>Garantia:</strong> 30 dias`);
            
            // Em um site real, aqui seria window.location.href = 'checkout.html'
        });
    }
    
    // ===== VIDEO PLACEHOLDER =====
    document.querySelectorAll('.video-placeholder').forEach(video => {
        video.addEventListener('click', function() {
            showNotification('info', 
                '🎬 Em um site real, este seria um vídeo de apresentação do Teacher Sussa!');
        });
    });
    
    // ===== FUNÇÕES AUXILIARES =====
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
    
    function showNotification(type, message) {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                                  type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <div>${message}</div>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : 
                        type === 'error' ? '#f56565' : '#4299e1'};
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 9999;
            max-width: 400px;
            animation: slideIn 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 15px;
        `;
        
        // Estilos do conteúdo
        notification.querySelector('.notification-content').style.cssText = `
            flex: 1;
            display: flex;
            gap: 15px;
            align-items: flex-start;
        `;
        
        notification.querySelector('.notification-content i').style.cssText = `
            font-size: 1.5rem;
            margin-top: 2px;
        `;
        
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            padding: 0;
        `;
        
        // Adicionar ao documento
        document.body.appendChild(notification);
        
        // Botão de fechar
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        // Adicionar animações CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== ANIMAÇÃO DE DIGITAÇÃO NO TÍTULO =====
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        const originalText = element.textContent;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        setTimeout(type, 1000);
    }
    
    // Aplicar efeito no título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 30);
        }, 500);
    }
    
    // ===== VALIDAÇÃO EM TEMPO REAL DOS FORMULÁRIOS =====
    document.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#f56565';
            } else {
                this.style.borderColor = '#48bb78';
            }
        });
        
        input.addEventListener('input', function() {
            this.style.borderColor = '#667eea';
        });
    });
    
    // ===== SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== DETECTAR AMBIENTE RENDER =====
    if (window.location.hostname.includes('onrender.com')) {
        console.log('🌐 Site rodando no Render!');
        const footerNote = document.querySelector('.footer-note');
        if (footerNote) {
            footerNote.innerHTML = `Este site é um exemplo educacional. Hospedado gratuitamente no <strong>Render</strong> - URL: ${window.location.href}`;
        }
    }
});