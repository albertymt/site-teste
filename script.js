/**
 * MÓDULO DE DADOS
 * Em um cenário real Back-end, este array seria substituído por uma chamada de API (fetch).
 */
const gamesData = [
    { id: 'mario', title: 'Super Mario World', console: 'Nintendo', category: 'Plataforma', color: '#e0115f', short: 'MARIO', desc: 'Salve a Princesa Peach em uma das maiores aventuras de plataforma de todos os tempos.' },
    { id: 'sonic', title: 'Sonic The Hedgehog', console: 'SEGA', category: 'Ação', color: '#0000ff', short: 'SONIC', desc: 'Corra em loops alucinantes e derrote o Dr. Robotnik com o ouriço mais rápido do mundo.' },
    { id: 'pacman', title: 'Pac-Man', console: 'Arcade', category: 'Puzzle', color: '#ffd700', short: 'PACMAN', desc: 'Coma as pastilhas no labirinto e fuja dos fantasmas Blinky, Pinky, Inky e Clyde.' },
    { id: 'zelda', title: 'The Legend of Zelda', console: 'Nintendo', category: 'Aventura', color: '#2e8b57', short: 'ZELDA', desc: 'Desbrave o reino de Hyrule e encontre a Master Sword para derrotar o vilão Ganon.' },
    { id: 'sf2', title: 'Street Fighter II', console: 'Arcade', category: 'Luta', color: '#cc0000', short: 'SF II', desc: 'Escolha seu lutador mundial e use o Hadouken para vencer o torneio!' },
    { id: 'mk', title: 'Mortal Kombat', console: 'Arcade', category: 'Luta', color: '#333', short: 'MK', desc: 'Participe do torneio fatal e descubra os segredos dos movimentos Fatality.' },
    { id: 'dkc', title: 'Donkey Kong Country', console: 'Nintendo', category: 'Plataforma', color: '#8b4513', short: 'DKC', desc: 'Recupere o estoque de bananas roubado pelo Rei K. Rool nesta selva 16-bits.' },
    { id: 'megaman', title: 'Mega Man X', console: 'Nintendo', category: 'Ação', color: '#1e90ff', short: 'MEGA X', desc: 'Assuma o controle de X e derrote os Mavericks para absorver seus poderes especiais.' },
    { id: 'metroid', title: 'Super Metroid', console: 'Nintendo', category: 'Aventura', color: '#4b0082', short: 'SAMUS', desc: 'Explore o planeta Zebes e enfrente Mother Brain como a caçadora Samus Aran.' },
    { id: 'sor', title: 'Streets of Rage', console: 'SEGA', category: 'Ação', color: '#ff4500', short: 'RAGE', desc: 'Limpe as ruas da cidade enfrentando o sindicato do crime usando apenas seus punhos.' },
    { id: 'castlevania', title: 'Castlevania', console: 'Nintendo', category: 'Aventura', color: '#800000', short: 'BELMONT', desc: 'Use o chicote sagrado para invadir o castelo assombrado e derrotar o Conde Drácula.' },
    { id: 'tetris', title: 'Tetris', console: 'Arcade', category: 'Puzzle', color: '#00fa9a', short: 'TETRIS', desc: 'O quebra-cabeça clássico onde você deve encaixar blocos para limpar as linhas.' },
    { id: 'chrono', title: 'Chrono Trigger', console: 'Nintendo', category: 'Aventura', color: '#ff8c00', short: 'CHRONO', desc: 'Viaje através das eras para impedir que o parasita Lavos destrua o futuro.' },
    { id: 'golden', title: 'Golden Axe', console: 'SEGA', category: 'Ação', color: '#daa520', short: 'AXE', desc: 'Escolha seu guerreiro bárbaro e use magias para derrotar hordas de monstros.' },
    { id: 'doom', title: 'DOOM', console: 'Arcade', category: 'Ação', color: '#222', short: 'DOOM', desc: 'O FPS lendário onde você enfrenta hordas de demônios nas luas de Marte.' }
];

/**
 * MÓDULO DE RENDERIZAÇÃO
 */
function criarCardHtml(jogo) {
    return `
        <article class="game-card" onclick="window.location.href='detalhes.html?id=${jogo.id}'" title="${jogo.title}">
            <div class="game-cover" style="background-color: ${jogo.color};"><span>${jogo.short}</span></div>
            <h3 class="game-title">${jogo.title}</h3>
            <span class="game-category" style="font-size:8px; color: #888;">${jogo.console} • ${jogo.category}</span>
        </article>
    `;
}

function carregarJogosHome() {
    const grid = document.getElementById('main-grid');
    if (grid) {
        grid.innerHTML = gamesData.map(criarCardHtml).join('');
    }
}

function carregarDetalhes() {
    const params = new URLSearchParams(window.location.search);
    const idUrl = params.get('id');
    
    // Se não houver ID ou se o jogo não existir, encerra a função
    if (!idUrl) return;
    const jogo = gamesData.find(g => g.id === idUrl);
    if (!jogo) {
        document.getElementById('game-title').innerText = "Erro 404: Jogo não encontrado.";
        document.getElementById('game-desc').innerText = "Verifique os registros do sistema.";
        return;
    }

    // Injeta os dados do jogo principal
    document.title = `Nostalgic Retro - ${jogo.title}`;
    document.getElementById('game-title').innerText = jogo.title;
    document.getElementById('game-desc').innerText = jogo.desc;
    
    const cover = document.getElementById('game-cover');
    cover.style.backgroundColor = jogo.color;
    cover.innerText = jogo.short;

    // Processa a engine de recomendações
    const recGrid = document.getElementById('recommendations-grid');
    if(recGrid) {
        const sugeridos = gamesData
            .filter(g => g.category === jogo.category && g.id !== jogo.id)
            .slice(0, 4);

        if(sugeridos.length > 0) {
            recGrid.innerHTML = sugeridos.map(criarCardHtml).join('');
        } else {
            recGrid.innerHTML = "<p style='font-size:10px; color:#666;'>Sem dados relacionados no sistema.</p>";
        }
    }
}

/**
 * MÓDULO DE AUTENTICAÇÃO (LocalStorage)
 */
function salvarUsuario() {
    const input = document.getElementById("nomeUsuario");
    const res = document.getElementById("resultado");
    const nome = input.value.trim();

    if(nome) {
        localStorage.setItem('retroUser', nome); // Salva no cache do navegador
        exibirMensagemLogin(nome);
        input.value = ''; // Limpa o input
    } else {
        res.innerText = "> ERRO: IDENTIFICAÇÃO REQUERIDA!";
        res.style.color = "var(--neon-pink)";
    }
}

function exibirMensagemLogin(nome) {
    const res = document.getElementById("resultado");
    if(res) {
        res.innerText = `> ACESSO LIBERADO: P1 [${nome.toUpperCase()}]`;
        res.style.color = "var(--neon-green)";
    }
}

function verificarSessao() {
    const usuarioSalvo = localStorage.getItem('retroUser');
    if (usuarioSalvo) {
        exibirMensagemLogin(usuarioSalvo);
    }
}

/**
 * INICIALIZADOR DO SISTEMA
 */
window.onload = () => {
    verificarSessao();
    carregarJogosHome();
    carregarDetalhes();
};