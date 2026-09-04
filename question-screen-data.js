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
      meta: "Vídeos + reflexão · 4 perguntas no final",
      titleUnlock: {
        title: "DETETIVE DA POSTURA",
        body: "Você já começou a enxergar o trabalho com um novo olhar.",
        icon: "🕵️"
      },
      screens: [
        {
          id: "m1-cover",
          type: "cover",
          title: "Módulo 1 — Fundamentos da Ergonomia",
          subtitle: "Como a ergonomia protege sua saúde no dia a dia da loja.",
          image: "assets/fotos/capa-modulo1.png",
          transcript: "Módulo 1: Fundamentos da Ergonomia."
        },
        {
          id: "m1-reflexao",
          type: "reflect",
          kicker: "💭 Reflexão",
          title: "Antes de começar",
          prompt: "Você já pensou na sua",
          promptAccent: "postura hoje?",
          answer: "O segredo está na postura correta. Ao longo deste módulo você vai entender como aplicá-la em cada função do chão de loja.",
          transcript: "Antes de começar: pense na sua postura de hoje."
        },
        {
          id: "m1-v-oque",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "O que é Ergonomia",
          duration: "0:45",
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=b082f8d3-96d7-472c-a2e0-b94f546cfac0",
          playerId: "panda-b082f8d3-96d7-472c-a2e0-b94f546cfac0",
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
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=8506ca2f-7b5d-4e72-a851-4e8da13ba198",
          playerId: "panda-8506ca2f-7b5d-4e72-a851-4e8da13ba198",
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
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=2563b3f0-7419-493d-92e4-90c419508d80",
          playerId: "panda-2563b3f0-7419-493d-92e4-90c419508d80",
          scene: "Cena a filmar no depósito da loja",
          brief: "Colaborador caminha pelo depósito passando por sinalização de segurança e extintor, com luvas. Mensagem: Segurança do Trabalho e ergonomia caminham juntas.",
          transcript: "Vídeo: ergonomia e segurança do trabalho."
        },
        {
          id: "m1-areas",
          type: "content",
          kicker: "📄 Texto",
          title: "As 3 áreas da Ergonomia",
          cards: [
            { icon: "💪", title: "Física", body: "Anatomia, fisiologia, biomecânica e antropometria. Envolve postura, movimentos repetitivos, manuseio de materiais e LER/DORT." },
            { icon: "🧩", title: "Organizacional", body: "Trabalho em grupo, tempo de trabalho, processos comunicativos, projetos participativos, gestão de qualidade." },
            { icon: "🧠", title: "Cognitiva", body: "Tomada de decisões, confiabilidade humana, estresse, carga mental, interação com a máquina." }
          ],
          quote: "O sistema de ossos, tendões, músculos e ligamentos permite movimentos amplos e coordenação motora fina, mas com resistência pequena — por isso grandes resistências (carga e peso) devem ser feitas por máquinas e carrinhos, não pelo corpo.",
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
          image: "assets/fotos/m1=p1.png",
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
          image: "assets/fotos/m1=p2.png",
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
          image: "assets/fotos/m1=p3.png",
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
          image: "assets/fotos/m1=p4.png",
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
      titleUnlock: {
        title: "GUARDIÃO DAS CARGAS",
        body: "Você sabe proteger a coluna ao levantar, transportar e guardar.",
        icon: "🛡️"
      },
      screens: [
        {
          id: "m2-cover",
          type: "cover",
          title: "Módulo 2 — Movimentação de Cargas",
          subtitle: "Levantar, transportar e guardar mercadorias sem prejudicar a coluna.",
          image: "assets/fotos/m2-p1.png",
          transcript: "Módulo 2: movimentação manual de cargas."
        },
        {
          id: "m2-v-levantamento",
          type: "video",
          kicker: "🎥 Vídeo principal",
          title: "Levantamento correto de cargas",
          duration: "até 1:30",
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=1d833ec5-6c59-4eb1-ac67-f9a8d22917ab",
          playerId: "panda-1d833ec5-6c59-4eb1-ac67-f9a8d22917ab",
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
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=65d4d6a6-e931-4cbc-8b62-f95848364aaa",
          playerId: "panda-65d4d6a6-e931-4cbc-8b62-f95848364aaa",
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
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=ba2b0046-7403-4f9a-98d2-6a9f9a06a719",
          playerId: "panda-ba2b0046-7403-4f9a-98d2-6a9f9a06a719",
          scene: "Cena a filmar no corredor de estoque",
          brief: "Colaborador empurra a paleteira: primeiro incorreto (tronco curvado, braços rígidos, olhando para baixo); depois correto (tronco ereto, cotovelos levemente flexionados, olhar à frente).",
          transcript: "Vídeo: transporte com paleteira manual."
        },
        {
          id: "m2-img-numeros",
          type: "content",
          title: "NR 17.5 — os 3 números para memorizar",
          image: "assets/fotos/nr175-pag16.png",
          imageAlt: "Ilustração: os 3 números da NR 17.5 no estoque — 60 cm, 25 kg e 2 horas",
          stats: [
            { num: "60 cm", label: "distância máxima de pega" },
            { num: "25 kg", label: "limite para transporte sozinho" },
            { num: "2 horas", label: "intervalo máximo sem pausa" }
          ],
          rules: [
            {
              text: "Não exigir nem admitir transporte manual cujo peso comprometa a saúde ou segurança; reduzir a carga para mulher e trabalhador menor."
            },
            {
              text: "Organizar pega e depósito para evitar flexões, extensões e rotações excessivas do tronco; cargas o mais próximo possível do corpo."
            },
            {
              text: "É vedado o levantamento quando a distância horizontal da pega for superior a 60 cm."
            }
          ],
          note: {
            label: "Importante",
            text: "Sozinho só até 25 kg. Acima disso: duas pessoas ou equipamento, com luvas."
          },
          transcript: "NR 17.5: 60 cm de pega, 25 kg sozinho e pausa a cada 2 horas."
        },
        {
          id: "m2-img-regras",
          type: "content",
          title: "NR 17.5 — demais regras",
          image: "assets/fotos/nr175-pag17.png",
          imageAlt: "Ilustração: demais regras da NR 17.5 no depósito — paleteira, pausa, orientação e só cargas",
          rules: [
            {
              text: "Impulsão/tração (vagonetes, carros de mão, paleteira) também deve observar carga, frequência, pega e distância."
            },
            {
              text: "Prevenção: meios técnicos facilitadores, peso e tamanho adequados, pausas não superiores a 2 horas."
            },
            {
              text: "Quem faz transporte manual não eventual deve receber orientação sobre os métodos corretos."
            },
            {
              text: "Este capítulo não se aplica a levantamento, transporte e movimentação de pessoas — só de cargas."
            }
          ],
          note: {
            label: "Lembrete",
            text: "Acima de 25 kg, use duas pessoas ou equipamento — e luvas."
          },
          transcript: "NR 17.5: impulsão e tração, pausas a cada 2 horas, orientação e só cargas — nunca pessoas."
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
          image: "assets/fotos/m2-p9.png",
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
          image: "assets/fotos/m2-p10.png",
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
          image: "assets/fotos/m2-p11.png",
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
          image: "assets/fotos/m2-p12.png",
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
      titleUnlock: {
        title: "LEITOR DO CORPO",
        body: "Você reconhece posturas de risco e os limites do movimento no dia a dia.",
        icon: "👁️"
      },
      screens: [
        {
          id: "m3-cover",
          type: "cover",
          title: "Módulo 3 — Posturas e Riscos",
          subtitle: "Limites do corpo e riscos biomecânicos da função.",
          image: "assets/fotos/m3-p1.png",
          transcript: "Módulo 3: posturas e riscos biomecânicos."
        },
        {
          id: "m3-v-pe",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Postura correta no posto em pé",
          duration: "1:20",
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=ebc6453b-0268-4da9-b0a8-73914881994d",
          playerId: "panda-ebc6453b-0268-4da9-b0a8-73914881994d",
          scene: "Cena a filmar na área de vendas",
          brief: "Colaborador reabastece prateleira na altura do peito sem curvar o tronco; estende o braço para prateleira mais alta; usa banco de apoio para prateleira baixa, em vez de agachar.",
          transcript: "Vídeo: postura correta no posto em pé."
        },
        {
          id: "m3-iso",
          type: "content",
          title: "O que diz a ISO 11226",
          image: "assets/fotos/p23.png",
          imageAlt: "Ilustração ISO 11226: postura estática de 4 segundos, variação a cada 2 horas e zonas de alcance na loja",
          stats: [
            { num: "4 s", label: "já é postura estática de trabalho" },
            { num: "2 h", label: "limite antes de variar a postura" }
          ],
          rules: [
            { text: "Posturas ajoelhada e agachada devem ser evitadas no abastecimento — usar sempre um suporte para sentar." },
            { text: "Em pé: tronco sem flexão rotineira; itens frequentes no alcance normal, ocasionais no alcance máximo." },
            { text: "Baixa estatura: pés apoiados, tronco próximo ao mobiliário, sem compressão do corpo." }
          ],
          transcript: "ISO 11226: 4 segundos e variação antes de 2 horas."
        },
        {
          id: "m3-reposicao",
          type: "compare",
          title: "Reposição baixa: certo × errado",
          open: true,
          compare: [
            {
              ok: true,
              label: "✓ Correto",
              image: "assets/fotos/p24.1.png",
              imageAlt: "Colaborador sentado no suporte diante da prateleira baixa",
              text: "Use o suporte para sentar — joelhos e coluna agradecem."
            },
            {
              ok: false,
              label: "✕ Evitar",
              image: "assets/fotos/p24.2.png",
              imageAlt: "Colaborador agachado diante da prateleira baixa",
              text: "Agachar por tempo prolongado sobrecarrega joelhos e coluna."
            }
          ],
          transcript: "Na prateleira baixa, use o suporte para sentar."
        },
        {
          id: "m3-v-riscos",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Riscos biomecânicos do dia a dia",
          duration: "1:00",
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=4efe0fe2-5882-4a65-8f8e-d185d6726bb7",
          playerId: "panda-4efe0fe2-5882-4a65-8f8e-d185d6726bb7",
          scene: "Cena a filmar em três setores da loja",
          brief: "Três riscos: movimento repetitivo (caixa), vibração (paleteira motorizada) e postura forçada (torcer o tronco por item mal posicionado).",
          transcript: "Vídeo: riscos biomecânicos — repetição, vibração e postura forçada."
        },
        {
          id: "m3-reflexao",
          type: "reflect",
          kicker: "💭 Reflexão",
          title: "Uma pausa para pensar",
          prompt: "E você, já reparou nisso na sua rotina?",
          answer: "Movimento repetitivo, vibração e postura forçada acontecem em pequenos momentos do dia a dia — muitas vezes sem percebermos. Preste atenção na próxima tarefa que você fizer e veja se algum desses riscos aparece.",
          transcript: "Reflexão: riscos na rotina."
        },
        {
          id: "m3-quiz-intro",
          type: "quiz-intro",
          title: "Modo Sprint — Módulo 3",
          count: 5,
          minCorrect: 4,
          icon: "🏃",
          body: "Responda <strong>5</strong> afirmações de verdadeiro ou falso. Acerte no mínimo <strong>4</strong> para avançar. Cada acerto vale até <strong>50 pontos</strong>.",
          transcript: "Desafio sprint do módulo 3: 5 verdadeiro ou falso."
        },
        {
          id: "m3-q1",
          type: "question",
          question: "Uma postura mantida por mais de 4 segundos já é considerada postura estática.",
          image: "assets/fotos/m3-p8.png",
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
          image: "assets/fotos/m3-p9.png",
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
          image: "assets/fotos/m3-p10.png",
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
          image: "assets/fotos/m3-p11.png",
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
      meta: "Vídeos + conteúdo · ordenar a rotina no final",
      titleUnlock: {
        title: "AJUSTADOR DO POSTO",
        body: "Pequenos ajustes no monitor e na rotina agora fazem parte do seu método.",
        icon: "⚙️"
      },
      screens: [
        {
          id: "m4-cover",
          type: "cover",
          title: "Módulo 4 — Áreas Administrativas",
          subtitle: "Ajustes simples no posto evitam horas de desconforto.",
          image: "assets/fotos/m4-p1.png",
          transcript: "Módulo 4: ergonomia em áreas administrativas."
        },
        {
          id: "m4-v-monitor",
          type: "video",
          kicker: "🎥 Vídeo 1 de 3",
          title: "Posicionamento do monitor",
          duration: "0:35",
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=92df051d-fe73-45f1-a8c9-395f690a41d2",
          playerId: "panda-92df051d-fe73-45f1-a8c9-395f690a41d2",
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
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=0d5766c7-bcdf-415c-980a-ab75b51342a3",
          playerId: "panda-0d5766c7-bcdf-415c-980a-ab75b51342a3",
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
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=824e4bd6-566b-461d-abf2-33b7c62f6dc5",
          playerId: "panda-824e4bd6-566b-461d-abf2-33b7c62f6dc5",
          scene: "Cena a filmar no posto administrativo",
          brief: "Faixa de conforto 18–25 °C. O ar-condicionado não deve incidir direto sobre o colaborador.",
          transcript: "Vídeo: temperatura do posto."
        },
        {
          id: "m4-reflexao",
          type: "reflect",
          kicker: "💭 Reflexão",
          title: "Uma pausa para pensar",
          prompt: "Quando foi a última vez que você ajustou a posição do seu monitor?",
          choices: [
            { text: "Hoje" },
            { text: "Essa semana" },
            { text: "Nem lembro" }
          ],
          answer: "Um ajuste de poucos segundos evita horas de desconforto no fim do dia.",
          transcript: "Reflexão: ajuste do monitor."
        },
        {
          id: "m4-dicas",
          type: "content",
          kicker: "📄 Texto",
          title: "Dicas rápidas do posto administrativo",
          items: [
            { icon: "🪟", text: "Elimine reflexos: janelas paralelas ao monitor, nunca à frente ou atrás." },
            { icon: "👁️", text: "Olhar muito tempo para a tela reduz o piscar e causa olhos secos — pisque com frequência." },
            { icon: "🌅", text: "Na pausa, evite o computador e olhe para o horizonte, a mais de 6 metros de distância." },
            { icon: "🌡️", text: "Temperatura de conforto: 18 a 25 °C — a saída do ar-condicionado não deve incidir direto sobre o colaborador." },
            { icon: "🔀", text: "Se não for possível redirecionar o ar, reposicione o posto de trabalho." }
          ],
          transcript: "Cinco dicas rápidas do posto administrativo."
        },
        {
          id: "m4-quiz-intro",
          type: "quiz-intro",
          title: "Ordene a Rotina — Módulo 4",
          count: 1,
          minCorrect: 1,
          icon: "🔢",
          body: "Toque nos <strong>3 cuidados</strong> do posto administrativo na ordem que faz mais sentido seguir no seu turno. Você tem <strong>22 segundos</strong>. Até <strong>50 pontos</strong> se acertar rápido.",
          transcript: "Desafio: ordenar a rotina do posto administrativo."
        },
        {
          id: "m4-order",
          type: "order",
          kicker: "🔢 Atividade",
          title: "Ordene a rotina",
          body: "Toque nos cuidados na ordem que você seguiria.",
          time: 22,
          items: [
            { key: "monitor", text: "Posicionar o monitor paralelo à janela", rank: 0 },
            { key: "olhos", text: "Piscar os olhos e olhar um ponto distante nas pausas", rank: 1 },
            { key: "temperatura", text: "Verificar se o ar-condicionado não bate direto em você", rank: 2 }
          ],
          transcript: "Ordene os 3 cuidados do posto administrativo."
        }
      ]
    },
    {
      id: 5,
      title: "Ginástica Laboral e Encerramento",
      meta: "Vídeos + conteúdo · jogo de associação no final",
      titleUnlock: {
        title: "CAMPEÃO DO ALONGAMENTO",
        body: "Você leva a ginástica laboral para o turno — e cuida do corpo todos os dias.",
        icon: "🧘"
      },
      screens: [
        {
          id: "m5-cover",
          type: "cover",
          title: "Módulo 5 — Ginástica Laboral",
          subtitle: "Alongamentos simples para antes, durante e depois do turno.",
          image: "assets/fotos/m5-p1.png",
          transcript: "Módulo 5: ginástica laboral."
        },
        {
          id: "m5-v-maos",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Alongamento: mãos, dedos e punhos",
          duration: "1:25",
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=bd575f56-1d7e-478e-8a88-dab1b17a8dcc",
          playerId: "panda-bd575f56-1d7e-478e-8a88-dab1b17a8dcc",
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
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=6bf787f2-779f-4bf6-88de-deb9f33a40e9",
          playerId: "panda-6bf787f2-779f-4bf6-88de-deb9f33a40e9",
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
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=dc6d5dc5-b789-4062-8d71-86e4b7282978",
          playerId: "panda-dc6d5dc5-b789-4062-8d71-86e4b7282978",
          scene: "Cena a filmar — ginástica laboral",
          brief: "Movimentos suaves de sim e não (sem jogar a cabeça para trás), inclinação lateral, elevação e giros de ombro, inclinação lateral do tronco.",
          transcript: "Vídeo: alongamento de pescoço, ombros e tronco."
        },
        {
          id: "m5-ficha",
          type: "content",
          kicker: "📄 Texto",
          title: "Ficha de consulta — sequência de alongamento",
          items: [
            { n: 1, title: "Mãos:", text: "fechar contra o pulso e abrir — 3×" },
            { n: 2, title: "Dedos:", text: "entrelaçar e ondular / girar polegares / estender alternado — 3× cada" },
            { n: 3, title: "Antebraço:", text: "puxar palma para fora — 20 s cada lado, 3×" },
            { n: 4, title: "Punhos:", text: "unir palmas no peito e afastar / girar nos dois sentidos" },
            { n: 5, title: "Braços:", text: "cotovelo atrás da cabeça — 20 s cada lado, 3×" },
            { n: 6, title: "Braços (atrás do corpo):", text: "dedos entrelaçados, afastar do corpo — 20 s, 3×" },
            { n: 7, title: "Braços (acima da cabeça):", text: "dedos entrelaçados, palmas para cima — 20 s" },
            { n: 8, title: "Cabeça/pescoço:", text: "sim/não e inclinação lateral — 20 s cada lado, 3× (evitar levar a cabeça para trás)" },
            { n: 9, title: "Ombros:", text: "elevar ao inspirar / girar frente-trás — 3× cada sentido" },
            { n: 10, title: "Tronco:", text: "braço sobre a cabeça, inclinação lateral — 20 s cada lado, 3×" }
          ],
          transcript: "Ficha de consulta dos alongamentos."
        },
        {
          id: "m5-v-final",
          type: "video",
          kicker: "🎥 Vídeo",
          title: "Efeitos da má postura e mensagem final",
          duration: "1:05",
          embed: "https://player-vz-d35edf2a-8e7.tv.pandavideo.com.br/embed/?v=2d6e8d25-b86c-4841-9930-4bb3c86292d4",
          playerId: "panda-2d6e8d25-b86c-4841-9930-4bb3c86292d4",
          scene: "Cena a filmar com o instrutor, encerrando o treinamento",
          brief: "Instrutor em corredor da loja transmite a mensagem final. Má postura gera dor e pode evoluir para LER/DORT. Pratique os alongamentos e mantenha a postura neutra.",
          transcript: "Vídeo final: efeitos da má postura."
        },
        {
          id: "m5-quiz-intro",
          type: "quiz-intro",
          title: "Desafio NR 17 — Módulo 5",
          count: 1,
          minCorrect: 1,
          icon: "🧩",
          body: "Associe cada <strong>exercício</strong> à <strong>região do corpo</strong> que ele alonga. São <strong>8 pares</strong> — clique em um exercício e depois na região correspondente. Até <strong>50 pontos</strong> conforme a rapidez.",
          transcript: "Desafio: associar exercícios às regiões do corpo."
        },
        {
          id: "m5-match",
          type: "match",
          kicker: "🕹️ Jogo de associação",
          title: "Associe o exercício à região",
          pairs: [
            { ex: "Fechar a mão firme contra o pulso e abrir os dedos", body: "Mãos e dedos" },
            { ex: "Entrelaçar os dedos e fazer movimento ondulatório", body: "Dedos" },
            { ex: "Braço esticado, palma para fora, puxando com a outra mão", body: "Antebraço" },
            { ex: "Unir as palmas no peito e girar os punhos", body: "Punhos" },
            { ex: "Cotovelo atrás da cabeça, em direção ao ombro oposto", body: "Braço" },
            { ex: "Braços atrás do corpo, dedos entrelaçados, afastando do corpo", body: "Ombros e peito" },
            { ex: "Movimento de \"sim\" e \"não\" com a cabeça", body: "Pescoço" },
            { ex: "Braço sobre a cabeça, inclinando lateralmente", body: "Tronco" }
          ],
          transcript: "Jogo: associe 8 exercícios às regiões do corpo."
        },
        {
          id: "m5-reflexao",
          type: "reflect",
          kicker: "💭 Reflexão",
          title: "Antes de encerrar",
          prompt: "Quando você vai praticar esses alongamentos?",
          choices: [
            { icon: "🌅", text: "Início do turno" },
            { icon: "☕", text: "Na pausa" },
            { icon: "🏠", text: "Antes de casa" }
          ],
          answer: "Não se esqueça de pensar neste assunto todos os dias. Cuidar da sua postura hoje é evitar dores e afastamentos amanhã — pequenos ajustes, repetidos todos os dias, fazem toda a diferença.",
          transcript: "Antes de encerrar: escolha quando praticar os alongamentos."
        },
        {
          id: "m5-done",
          type: "finale",
          kicker: "🏆 Conclusão",
          eyebrow: "Certificado de conclusão",
          title: "Parabéns",
          body: "Você concluiu o treinamento NR 17 — Ergonomia no Comércio e na Logística. Por mérito, dedicação e compromisso com a ergonomia, você percorreu os módulos disponíveis.",
          chips: ["NR 17", "Ergonomia", "Comércio e Logística"],
          image: "assets/fotos/capa.png",
          transcript: "Parabéns pela conclusão do treinamento."
        }
      ]
    }
  ]
};
