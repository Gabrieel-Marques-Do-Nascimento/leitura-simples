
---

# Projeto: Site de Foco e Concentração

Desenvolvi este site usando meus conhecimentos básicos de HTML, CSS, JavaScript e python. A ideia surgiu da minha própria dificuldade em manter a atenção e o foco durante a leitura. 

A plataforma foi criada para minimizar distrações e ajudar na concentração. Se, além de mim, ela também ajudar outras pessoas com o mesmo desafio, então todo o esforço já terá valido a pena!

--- 

#  [Link Direto](https://gabrieel-marques-do-nascimento.github.io/leitura-simples/)



# **script.js** `modulo principal`



## 1. Importação e Inicialização de Elementos
A importação de várias funções e variáveis de módulos como utils.js, files.js, config.js e events.js permite o uso de funcionalidades como manipulação de botões, configurações de rolagem e criação de eventos. Isso ajuda a organizar o código.
Diversos elementos DOM são recuperados usando document.getElementById, e variáveis como highlight, bookmarkColor, e paragrafo são inicializadas para uso posterior.
## 2. Funções de Rolagem e Marcador
scrollarParagrafo permite a rolagem do parágrafo com animação suave, e alterarTop ajusta a posição do marcador de texto (highlight) conforme os parâmetros passados.
scrollNumberline define a rolagem em linhas, calculando a altura de cada linha com base no font_size e adicionando ou subtraindo esta altura do valor de top do marcador.
## 3. Controle de Eventos
Funções associadas a eventos (startBTN.addEventListener, resetBTN.addEventListener, etc.) definem o comportamento de botões como iniciar, limpar e redefinir o conteúdo. Ao clicar ou pressionar teclas, elas ativam mudanças na rolagem do parágrafo e na exibição do marcador.
## 4. Armazenamento e Carregamento de Configurações
Funções como saveText, loadText, saveText_json, e loadText_json lidam com o armazenamento e recuperação de preferências do usuário, como fonte, cor do marcador e tema.
activatedate é chamada ao carregar a página para definir as preferências salvas no localStorage.
## 5. Exibição de Estilos e Layouts Dinâmicos
A manipulação de highlight e a aplicação de estilos para corresponder ao tamanho e posição do parágrafo (paragrafo_style) ajustam a aparência dinâmica de componentes como o marcador de texto.
O código inclui cálculos baseados nas dimensões da tela (window_width e window.innerHeight), permitindo que os elementos se ajustem responsivamente.
## 6. Atualização do UI e Ajuste de Comportamento
A função highlight_status monitora a posição do marcador (marcador) e desativa ou ativa botões e eventos de mouse conforme necessário.
Funções associadas aos eventos click e keydown (e.g., setapb.addEventListener, document.addEventListener("keydown")) permitem que o usuário controle a rolagem e outras funções interativas com teclas e botões.
## 7. Funções Auxiliares e Cálculos de Layout
Variáveis como margin, padding, e border derivadas dos estilos computados de paragrafo são usadas para ajustar o layout e determinar as margens de rolagem.
tela, que é calculada a partir de paragraph_height, usa margens, bordas e preenchimento para definir a altura exibida.


