/**
 * Conteúdo da Sessão Aprender — NR 17
 * Tipos: cover | content | video | image | quiz-intro | question
 * Atividades (question) só no FINAL de cada módulo — precedidas por quiz-intro.
 *
 * video: use `video` (mp4) ou `youtube` quando o arquivo existir;
 *        senão aparece o placeholder "Vídeo a gravar".
 */
window.QUESTION_SCREEN_SESSION = {
  meta: {
    title: "NR 17 — Ergonomia",
    brand: "TecnoCursos",
    musicSrc: "musica/musica_foco.mp3"
  },
  modules: [
    {
      id: 1,
      title: "Fundamentos da Ergonomia",
      meta: "Vídeos + conteúdo · 4 perguntas no final",
      screens: [
        {
          id: "m1-cover",
          type: "cover",
          title: "Módulo 1 — Fundamentos da Ergonomia",
          subtitle: "Como a ergonomia protege sua saúde no dia a dia da loja.",
          image: "assets/fotos/question-screen/cover.png",
          transcript: "Módulo 1: Fundamentos da Ergonomia."
        },
        {
          id: "m1-reflexao",
          type: "content",
          kicker: "Reflexão",
          title: "Antes de começar",
          body: "Você já pensou na sua postura hoje? O segredo está na postura correta. Ao longo deste módulo você vai entender como aplicá-la em cada função do chão de loja.",
          image: "assets/fotos/question-screen/postura.png",
          transcript: "Antes de começar: pense na sua postura de hoje."
        },
        {
          id: "m1-v-oque",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "O que é Ergonomia",
          duration: "0:45",
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=70ee22ea-3cc2-4c94-a771-6e39ac9fa549",
          playerId: "panda-70ee22ea-3cc2-4c94-a771-6e39ac9fa549",
          scene: "Cena a filmar na área de vendas da loja",
          brief: "Colaborador uniformizado caminha pausadamente por um corredor da área de vendas, observando as prateleiras. Estica o braço com naturalidade para alcançar um item em altura confortável. Cena silenciosa, narração em off.",
          body: "Do grego ergon (trabalho) e nomos (lei/regra) — a ciência que adapta o trabalho às pessoas.",
          transcript: "Vídeo: o que é ergonomia."
        },
        {
          id: "m1-v-porque",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Por que a Ergonomia importa",
          duration: "1:20",
          scene: "Cena a filmar em diferentes setores da loja",
          brief: "Sequência real: reposição de prateleira, operadora de caixa, colaborador com paleteira. Close no desconforto nas costas e na correção da postura. Narração explica o risco de LER/DORT.",
          transcript: "Vídeo: por que a ergonomia importa — risco de LER/DORT."
        },
        {
          id: "m1-v-seg",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Ergonomia e Segurança do Trabalho",
          duration: "0:35",
          scene: "Cena a filmar no depósito da loja",
          brief: "Colaborador caminha pelo depósito passando por sinalização de segurança e extintor, com luvas. Mensagem: Segurança do Trabalho e ergonomia caminham juntas.",
          transcript: "Vídeo: ergonomia e segurança do trabalho."
        },
        {
          id: "m1-areas",
          type: "content",
          kicker: "Três áreas",
          title: "As 3 áreas da Ergonomia",
          body: "O corpo tem boa precisão motora, mas baixa resistência a grandes cargas. Pesos altos devem ir para máquinas e carrinhos.",
          bullets: [
            "Física — postura, anatomia, repetição, LER/DORT",
            "Organizacional — tempo, equipes, comunicação, qualidade",
            "Cognitiva — decisões, estresse, carga mental"
          ],
          image: "assets/fotos/question-screen/cover.png",
          transcript: "Três áreas: física, organizacional e cognitiva."
        },
        {
          id: "m1-quiz-intro",
          type: "quiz-intro",
          title: "Desafio NR 17 — Módulo 1",
          count: 4,
          minCorrect: 3,
          icon: "🎮",
          transcript: "Desafio final do módulo 1: 4 perguntas."
        },
        {
          id: "m1-q1",
          type: "question",
          question: "Qual é a origem da palavra \"Ergonomia\"?",
          image: "assets/fotos/question-screen/cover.png",
          alternatives: [
            { id: "a", text: "Latim, \"força e lei\"", correct: false },
            { id: "b", text: "Grego, \"ergon\" (trabalho) e \"nomos\" (lei, regra)", correct: true },
            { id: "c", text: "Inglês, \"energy norms\"", correct: false },
            { id: "d", text: "Não tem origem definida", correct: false }
          ],
          explanation: "Ergonomia vem do grego: ergon (trabalho) + nomos (lei/regra).",
          transcript: "Atividade final do módulo 1 — pergunta 1."
        },
        {
          id: "m1-q2",
          type: "question",
          question: "Qual das opções NÃO é uma das três áreas da ergonomia?",
          image: "assets/fotos/question-screen/cover.png",
          alternatives: [
            { id: "a", text: "Física", correct: false },
            { id: "b", text: "Organizacional", correct: false },
            { id: "c", text: "Cognitiva", correct: false },
            { id: "d", text: "Financeira", correct: true }
          ],
          explanation: "As três áreas são física, organizacional e cognitiva.",
          transcript: "Pergunta 2 do módulo 1."
        },
        {
          id: "m1-q3",
          type: "question",
          question: "Grandes resistências (carga e peso) devem ser realizadas por quê?",
          image: "assets/fotos/question-screen/carga.png",
          alternatives: [
            { id: "a", text: "Somente pela força do trabalhador", correct: false },
            { id: "b", text: "Por máquinas e carrinhos", correct: true },
            { id: "c", text: "Por qualquer colaborador disponível", correct: false },
            { id: "d", text: "Não há recomendação", correct: false }
          ],
          explanation: "Use máquinas e carrinhos — o corpo não é feito para grandes cargas contínuas.",
          transcript: "Pergunta 3 do módulo 1."
        },
        {
          id: "m1-q4",
          type: "question",
          question: "O que é Segurança do Trabalho, segundo o treinamento?",
          image: "assets/fotos/question-screen/cover.png",
          alternatives: [
            { id: "a", text: "Cuida da proteção e da integridade da vida do trabalhador", correct: true },
            { id: "b", text: "Um departamento que só existe em fábricas", correct: false },
            { id: "c", text: "Sinônimo exato de ergonomia, sem diferença", correct: false },
            { id: "d", text: "Uma norma que não se aplica ao comércio", correct: false }
          ],
          explanation: "Segurança do Trabalho protege a vida e a integridade do trabalhador.",
          transcript: "Pergunta 4 — fim do módulo 1."
        }
      ]
    },
    {
      id: 2,
      title: "Movimentação Manual de Cargas",
      meta: "Vídeos + imagens · 4 cenários no final",
      screens: [
        {
          id: "m2-cover",
          type: "cover",
          title: "Módulo 2 — Movimentação de Cargas",
          subtitle: "Levantar, transportar e guardar mercadorias sem prejudicar a coluna.",
          image: "assets/fotos/question-screen/carga.png",
          transcript: "Módulo 2: movimentação manual de cargas."
        },
        {
          id: "m2-v-levantamento",
          type: "video",
          kicker: "🎥 Vídeo principal",
          title: "Levantamento correto de cargas",
          duration: "até 1:30",
          scene: "Cena a filmar no depósito da loja",
          brief: "Comparação errado × certo: tronco curvado e pernas esticadas (errado); depois joelhos flexionados, carga perto do corpo, força nas pernas e giro com os pés (certo). Cena final: dois colaboradores erguendo caixa maior com luvas.",
          transcript: "Vídeo: levantamento correto de cargas."
        },
        {
          id: "m2-v-biomecanica",
          type: "video",
          kicker: "🎥 Vídeo · animação",
          title: "O que acontece no corpo",
          duration: "0:45",
          scene: "Animação estilo Pixar (aqui se justifica)",
          brief: "Personagem curva o tronco para levantar; zoom na coluna e nos discos comprimindo até o risco de hérnia. Depois mostra o levantamento correto com coluna alinhada — biomecânica ocupacional.",
          transcript: "Animação: o que acontece no corpo ao levantar errado."
        },
        {
          id: "m2-v-paleteira",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Transporte com paleteira manual",
          duration: "1:00",
          scene: "Cena a filmar no corredor de estoque",
          brief: "Colaborador empurra a paleteira: primeiro incorreto (tronco curvado, braços rígidos, olhando para baixo); depois correto (tronco ereto, cotovelos levemente flexionados, olhar à frente).",
          transcript: "Vídeo: transporte com paleteira manual."
        },
        {
          id: "m2-img-numeros",
          type: "image",
          kicker: "📄 Texto normativo · 1/2",
          title: "NR 17.5 — os 3 números para memorizar",
          body: "Guarde estes limites — eles voltam na atividade final.",
          image: "assets/fotos/nr175-pag16.png",
          imageAlt: "Ilustração: 60 cm, 25 kg e 2 horas",
          imageFit: "contain",
          bullets: [
            "60 cm — distância máxima de pega",
            "25 kg — limite para transporte sozinho",
            "2 horas — pausa na movimentação contínua"
          ],
          transcript: "Imagem: 60 cm, 25 kg e pausa a cada 2 horas."
        },
        {
          id: "m2-img-regras",
          type: "image",
          kicker: "📄 Texto normativo · 2/2",
          title: "NR 17.5 — demais regras",
          body: "Empurrar e puxar também são regulados. Quem movimenta carga com frequência precisa de treinamento.",
          image: "assets/fotos/nr175-pag17.png",
          imageAlt: "Ilustração: demais regras da NR 17.5",
          imageFit: "contain",
          bullets: [
            "Sem cargas que comprometam a saúde",
            "Sem flexão/torção excessiva do tronco",
            "Facilitadores e pausas a cada 2 h",
            "Não se aplica a transporte de pessoas"
          ],
          transcript: "Imagem: demais regras da NR 17.5."
        },
        {
          id: "m2-img-equip",
          type: "image",
          kicker: "📷 Foto",
          title: "Equipamentos de apoio da loja",
          body: "Paleteira manual e carrinhos de carga. Acima de 25 kg: duas pessoas ou equipamento, com luvas.",
          image: "assets/fotos/pag18.png",
          imageAlt: "Paleteira e carrinhos de carga na loja",
          imageFit: "contain",
          transcript: "Foto: equipamentos de apoio da loja."
        },
        {
          id: "m2-quiz-intro",
          type: "quiz-intro",
          title: "Desafio NR 17 — Módulo 2",
          count: 4,
          minCorrect: 3,
          icon: "🎮",
          transcript: "Desafio final do módulo 2: 4 cenários."
        },
        {
          id: "m2-q1",
          type: "question",
          question: "Colaborador levanta sozinho 18 kg, com a pega próxima ao corpo. Liberar?",
          image: "assets/fotos/question-screen/carga.png",
          alternatives: [
            { id: "a", text: "Liberar", correct: true },
            { id: "b", text: "Não liberar", correct: false }
          ],
          explanation: "18 kg está abaixo de 25 kg e a pega está correta — pode liberar.",
          transcript: "Cenário 1 do módulo 2."
        },
        {
          id: "m2-q2",
          type: "question",
          question: "Caixa de 30 kg do estoque ao checkout. Liberar transporte sozinho?",
          image: "assets/fotos/question-screen/carga.png",
          alternatives: [
            { id: "a", text: "Liberar", correct: false },
            { id: "b", text: "Não liberar", correct: true }
          ],
          explanation: "Acima de 25 kg exige duas pessoas ou equipamento.",
          transcript: "Cenário 2 do módulo 2."
        },
        {
          id: "m2-q3",
          type: "question",
          question: "A pega está a 70 cm do corpo. Liberar o levantamento nessa posição?",
          image: "assets/fotos/question-screen/carga.png",
          alternatives: [
            { id: "a", text: "Liberar", correct: false },
            { id: "b", text: "Não liberar", correct: true }
          ],
          explanation: "É vedado acima de 60 cm — reorganize o local de pega.",
          transcript: "Cenário 3 do módulo 2."
        },
        {
          id: "m2-q4",
          type: "question",
          question: "Transporte contínuo de caixas por 3 horas sem pausa. Liberar a rotina?",
          image: "assets/fotos/question-screen/carga.png",
          alternatives: [
            { id: "a", text: "Liberar", correct: false },
            { id: "b", text: "Não liberar", correct: true }
          ],
          explanation: "O limite é pausa a cada 2 horas de movimentação contínua.",
          transcript: "Cenário 4 — fim do módulo 2."
        }
      ]
    },
    {
      id: 3,
      title: "Posturas e Riscos Biomecânicos",
      meta: "Vídeos + conteúdo · 5 V/F no final",
      screens: [
        {
          id: "m3-cover",
          type: "cover",
          title: "Módulo 3 — Posturas e Riscos",
          subtitle: "Limites do corpo e riscos biomecânicos da função.",
          image: "assets/fotos/question-screen/postura.png",
          transcript: "Módulo 3: posturas e riscos biomecânicos."
        },
        {
          id: "m3-v-pe",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Postura correta no posto em pé",
          duration: "1:20",
          scene: "Cena a filmar na área de vendas",
          brief: "Colaborador reabastece prateleira na altura do peito sem curvar o tronco; estende o braço para prateleira mais alta; usa banco de apoio para prateleira baixa, em vez de agachar.",
          transcript: "Vídeo: postura correta no posto em pé."
        },
        {
          id: "m3-iso",
          type: "content",
          kicker: "📄 ISO 11226",
          title: "O que diz a ISO 11226",
          body: "Uma postura mantida por mais de 4 segundos já é considerada estática. Varie a postura antes de completar 2 horas.",
          bullets: [
            "Mais de 4 s = postura estática",
            "Variar antes de 2 h na mesma postura",
            "Evitar ajoelhar/agachar prolongado — use assento",
            "Baixa estatura: pés apoiados, sem compressão do mobiliário"
          ],
          image: "assets/fotos/question-screen/postura.png",
          transcript: "ISO 11226: 4 segundos e variação antes de 2 horas."
        },
        {
          id: "m3-reposicao",
          type: "content",
          kicker: "Compare",
          title: "Reposição baixa: certo × errado",
          body: "Certo: sentar no suporte. Errado: agachar por tempo prolongado — sobrecarrega joelhos e coluna.",
          image: "assets/fotos/question-screen/postura.png",
          transcript: "Na prateleira baixa, use o suporte para sentar."
        },
        {
          id: "m3-v-riscos",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Riscos biomecânicos do dia a dia",
          duration: "1:00",
          scene: "Cena a filmar em três setores da loja",
          brief: "Três riscos: movimento repetitivo (caixa), vibração (paleteira motorizada) e postura forçada (torcer o tronco por item mal posicionado).",
          transcript: "Vídeo: riscos biomecânicos — repetição, vibração e postura forçada."
        },
        {
          id: "m3-quiz-intro",
          type: "quiz-intro",
          title: "Desafio NR 17 — Módulo 3",
          count: 5,
          minCorrect: 4,
          icon: "🎮",
          transcript: "Desafio final do módulo 3: 5 perguntas."
        },
        {
          id: "m3-q1",
          type: "question",
          question: "Uma postura mantida por mais de 4 segundos já é considerada postura estática.",
          image: "assets/fotos/question-screen/postura.png",
          alternatives: [
            { id: "a", text: "Verdadeiro", correct: true },
            { id: "b", text: "Falso", correct: false }
          ],
          explanation: "Sim — a partir de cerca de 4 segundos a postura é estática.",
          transcript: "V/F 1 do módulo 3."
        },
        {
          id: "m3-q2",
          type: "question",
          question: "Ajoelhar ou agachar por longos períodos não é problema se a pessoa se sentir confortável.",
          image: "assets/fotos/question-screen/postura.png",
          alternatives: [
            { id: "a", text: "Verdadeiro", correct: false },
            { id: "b", text: "Falso", correct: true }
          ],
          explanation: "Falso — use assento/suporte.",
          transcript: "V/F 2 do módulo 3."
        },
        {
          id: "m3-q3",
          type: "question",
          question: "Para pessoas de baixa estatura, os pés devem estar apoiados e sem compressão pelo mobiliário.",
          image: "assets/fotos/question-screen/postura.png",
          alternatives: [
            { id: "a", text: "Verdadeiro", correct: true },
            { id: "b", text: "Falso", correct: false }
          ],
          explanation: "Verdadeiro — pés apoiados e sem compressão.",
          transcript: "V/F 3 do módulo 3."
        },
        {
          id: "m3-q4",
          type: "question",
          question: "A variação postural contínua deve acontecer antes de completar 2 horas na mesma postura.",
          image: "assets/fotos/question-screen/postura.png",
          alternatives: [
            { id: "a", text: "Verdadeiro", correct: true },
            { id: "b", text: "Falso", correct: false }
          ],
          explanation: "Verdadeiro — varie antes de 2 horas contínuas.",
          transcript: "V/F 4 do módulo 3."
        },
        {
          id: "m3-q5",
          type: "question",
          question: "O movimento repetitivo não é considerado um risco biomecânico relevante no comércio e na logística.",
          image: "assets/fotos/question-screen/postura.png",
          alternatives: [
            { id: "a", text: "Verdadeiro", correct: false },
            { id: "b", text: "Falso", correct: true }
          ],
          explanation: "Falso — é um dos três grandes riscos biomecânicos.",
          transcript: "V/F 5 — fim do módulo 3."
        }
      ]
    },
    {
      id: 4,
      title: "Ergonomia em Áreas Administrativas",
      meta: "Vídeos + conteúdo · 3 perguntas no final",
      screens: [
        {
          id: "m4-cover",
          type: "cover",
          title: "Módulo 4 — Áreas Administrativas",
          subtitle: "Ajustes simples no posto evitam horas de desconforto.",
          image: "assets/fotos/question-screen/cover.png",
          transcript: "Módulo 4: ergonomia em áreas administrativas."
        },
        {
          id: "m4-v-monitor",
          type: "video",
          kicker: "🎥 Vídeo 1 de 3",
          title: "Posicionamento do monitor",
          duration: "0:35",
          scene: "Cena a filmar na retaguarda administrativa",
          brief: "Demonstrar o monitor paralelo à janela lateral — nunca de frente nem de costas — para evitar reflexo e ofuscamento.",
          transcript: "Vídeo: posicionamento do monitor."
        },
        {
          id: "m4-v-olhos",
          type: "video",
          kicker: "🎥 Vídeo 2 de 3",
          title: "Cuidado com os olhos e pausas visuais",
          duration: "0:35",
          scene: "Cena a filmar na retaguarda administrativa",
          brief: "Uso prolongado da tela resseca os olhos. Piscar com frequência e, nas pausas, olhar para um ponto a mais de 6 metros.",
          transcript: "Vídeo: pausas visuais."
        },
        {
          id: "m4-v-temp",
          type: "video",
          kicker: "🎥 Vídeo 3 de 3",
          title: "Temperatura ideal do posto",
          duration: "0:25",
          scene: "Cena a filmar no posto administrativo",
          brief: "Faixa de conforto 18–25 °C. O ar-condicionado não deve incidir direto sobre o colaborador.",
          transcript: "Vídeo: temperatura do posto."
        },
        {
          id: "m4-dicas",
          type: "content",
          kicker: "Resumo",
          title: "Dicas rápidas do posto administrativo",
          bullets: [
            "Monitor paralelo à janela lateral",
            "Piscar e olhar para o horizonte (> 6 m)",
            "Temperatura 18–25 °C",
            "Área sem vento direto do ar-condicionado"
          ],
          image: "assets/fotos/question-screen/cover.png",
          transcript: "Cinco dicas rápidas do posto administrativo."
        },
        {
          id: "m4-quiz-intro",
          type: "quiz-intro",
          title: "Desafio NR 17 — Módulo 4",
          count: 3,
          minCorrect: 2,
          icon: "🎮",
          transcript: "Desafio final do módulo 4: 3 perguntas."
        },
        {
          id: "m4-q1",
          type: "question",
          question: "Como o monitor deve ficar em relação à janela?",
          image: "assets/fotos/question-screen/cover.png",
          alternatives: [
            { id: "a", text: "De frente para a janela", correct: false },
            { id: "b", text: "De costas para a janela", correct: false },
            { id: "c", text: "Paralelo à janela lateral", correct: true },
            { id: "d", text: "Tanto faz", correct: false }
          ],
          explanation: "Paralelo à janela lateral reduz reflexo e ofuscamento.",
          transcript: "Pergunta 1 do módulo 4."
        },
        {
          id: "m4-q2",
          type: "question",
          question: "Nas pausas visuais, para onde o colaborador deve olhar?",
          image: "assets/fotos/question-screen/cover.png",
          alternatives: [
            { id: "a", text: "Para o celular", correct: false },
            { id: "b", text: "Para um ponto a mais de 6 metros", correct: true },
            { id: "c", text: "Para o teto", correct: false },
            { id: "d", text: "Para a própria tela", correct: false }
          ],
          explanation: "Olhar para um ponto distante (mais de 6 m) descansa a visão.",
          transcript: "Pergunta 2 do módulo 4."
        },
        {
          id: "m4-q3",
          type: "question",
          question: "Qual é a faixa de temperatura de conforto recomendada?",
          image: "assets/fotos/question-screen/cover.png",
          alternatives: [
            { id: "a", text: "10 °C a 15 °C", correct: false },
            { id: "b", text: "18 °C a 25 °C", correct: true },
            { id: "c", text: "26 °C a 30 °C", correct: false },
            { id: "d", text: "Não há recomendação", correct: false }
          ],
          explanation: "A faixa de conforto é 18–25 °C.",
          transcript: "Pergunta 3 — fim do módulo 4."
        }
      ]
    },
    {
      id: 5,
      title: "Ginástica Laboral e Encerramento",
      meta: "Vídeos + conteúdo · 4 perguntas no final",
      screens: [
        {
          id: "m5-cover",
          type: "cover",
          title: "Módulo 5 — Ginástica Laboral",
          subtitle: "Alongamentos simples para antes, durante e depois do turno.",
          image: "assets/fotos/question-screen/postura.png",
          transcript: "Módulo 5: ginástica laboral."
        },
        {
          id: "m5-v-maos",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Alongamento: mãos, dedos e punhos",
          duration: "1:25",
          scene: "Cena a filmar — ginástica laboral",
          brief: "Fechar a mão firme contra o pulso e abrir os dedos; entrelaçar os dedos e ondular; girar polegares e punhos.",
          transcript: "Vídeo: alongamento de mãos, dedos e punhos."
        },
        {
          id: "m5-v-bracos",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Alongamento: antebraços e braços",
          duration: "1:25",
          scene: "Cena a filmar — ginástica laboral",
          brief: "Braço esticado, palma para fora, puxando com a outra mão (~20 s cada lado). Cotovelo atrás da cabeça e braços entrelaçados atrás do corpo.",
          transcript: "Vídeo: alongamento de antebraços e braços."
        },
        {
          id: "m5-v-pescoco",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Cabeça, pescoço, ombros e tronco",
          duration: "1:15",
          scene: "Cena a filmar — ginástica laboral",
          brief: "Movimentos suaves de sim e não (sem jogar a cabeça para trás), inclinação lateral, elevação e giros de ombro, inclinação lateral do tronco.",
          transcript: "Vídeo: alongamento de pescoço, ombros e tronco."
        },
        {
          id: "m5-ficha",
          type: "content",
          kicker: "📄 Ficha",
          title: "Ficha de consulta — sequência",
          bullets: [
            "1 Mãos: fechar contra o pulso e abrir — 3×",
            "2 Dedos: entrelaçar e ondular / polegares — 3×",
            "3 Antebraço: puxar palma para fora — 20 s cada lado",
            "4 Punhos: unir palmas e girar",
            "5–7 Braços: cotovelo atrás da cabeça / atrás do corpo / acima",
            "8 Pescoço: sim/não e inclinação lateral",
            "9 Ombros: elevar e girar",
            "10 Tronco: braço sobre a cabeça, inclinação lateral"
          ],
          image: "assets/fotos/question-screen/postura.png",
          transcript: "Ficha de consulta dos alongamentos."
        },
        {
          id: "m5-v-final",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Efeitos da má postura e mensagem final",
          duration: "1:05",
          scene: "Cena a filmar com o instrutor, encerrando o treinamento",
          brief: "Instrutor em corredor da loja transmite a mensagem final. Má postura gera dor e pode evoluir para LER/DORT. Pratique os alongamentos e mantenha a postura neutra.",
          transcript: "Vídeo final: efeitos da má postura."
        },
        {
          id: "m5-quiz-intro",
          type: "quiz-intro",
          title: "Desafio NR 17 — Módulo 5",
          count: 4,
          minCorrect: 3,
          icon: "🎮",
          transcript: "Desafio final do módulo 5: 4 perguntas."
        },
        {
          id: "m5-q1",
          type: "question",
          question: "Qual exercício alonga principalmente mãos e dedos?",
          image: "assets/fotos/question-screen/postura.png",
          alternatives: [
            { id: "a", text: "Fechar a mão firme contra o pulso e abrir os dedos", correct: true },
            { id: "b", text: "Girar os ombros para frente e para trás", correct: false },
            { id: "c", text: "Inclinar lateralmente a cabeça", correct: false },
            { id: "d", text: "Braço sobre a cabeça, inclinando o tronco", correct: false }
          ],
          explanation: "Fechar a mão contra o pulso e abrir os dedos alonga mãos e dedos.",
          transcript: "Pergunta 1 do módulo 5."
        },
        {
          id: "m5-q2",
          type: "question",
          question: "Qual exercício alonga principalmente o antebraço?",
          image: "assets/fotos/question-screen/postura.png",
          alternatives: [
            { id: "a", text: "Movimento de \"sim\" e \"não\" com a cabeça", correct: false },
            { id: "b", text: "Braço esticado, palma para fora, puxando com a outra mão", correct: true },
            { id: "c", text: "Unir as palmas no peito e girar os punhos", correct: false },
            { id: "d", text: "Elevar os ombros ao inspirar", correct: false }
          ],
          explanation: "Puxar a palma para fora alonga o antebraço.",
          transcript: "Pergunta 2 do módulo 5."
        },
        {
          id: "m5-q3",
          type: "question",
          question: "Qual exercício alonga principalmente o pescoço?",
          image: "assets/fotos/question-screen/postura.png",
          alternatives: [
            { id: "a", text: "Cotovelo atrás da cabeça", correct: false },
            { id: "b", text: "Entrelaçar os dedos e ondular", correct: false },
            { id: "c", text: "Movimento de \"sim\" e \"não\" com a cabeça", correct: true },
            { id: "d", text: "Braços atrás do corpo", correct: false }
          ],
          explanation: "Sim e não com a cabeça alongam o pescoço.",
          transcript: "Pergunta 3 do módulo 5."
        },
        {
          id: "m5-q4",
          type: "question",
          question: "Qual exercício alonga principalmente o tronco?",
          image: "assets/fotos/question-screen/postura.png",
          alternatives: [
            { id: "a", text: "Braço sobre a cabeça, inclinando lateralmente o tronco", correct: true },
            { id: "b", text: "Fechar a mão contra o pulso", correct: false },
            { id: "c", text: "Girar os polegares", correct: false },
            { id: "d", text: "Unir as palmas no peito", correct: false }
          ],
          explanation: "Inclinar o tronco com o braço sobre a cabeça alonga o tronco.",
          transcript: "Pergunta 4 do módulo 5."
        },
        {
          id: "m5-done",
          type: "cover",
          title: "Treinamento concluído",
          subtitle: "Parabéns! Você concluiu a NR 17 — Ergonomia no Comércio e na Logística.",
          image: "assets/fotos/final.png",
          transcript: "Parabéns pela conclusão do treinamento."
        }
      ]
    }
  ]
};
