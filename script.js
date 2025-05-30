document.addEventListener('DOMContentLoaded', function () {
    // Elementos DOM
    const faqContainer = document.getElementById('faq-list');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const tabButtons = document.querySelectorAll('.tab-button');
    const animatedBackground = document.getElementById('animated-background');
    const stickySearch = document.querySelector('.sticky-search');

    let currentCategory = 'all';

    // Criar blocos animados para o background
    createAnimatedBlocks();

    // Dados das perguntas e respostas (incorporados diretamente para evitar problemas com fetch local)
    const faqData = {
        "NUTRICIONAL": [
            {
                "pergunta": "Pode transferir as calorias da ceia para aumentar a janta?",
                "resposta": "Sim, pode aumentar 80g de arroz ou 40g de arroz e 40g de feijão, se quiser aumentar somente a proteína adicione 80g."
            },
            {
                "pergunta": "O que é SOP?",
                "resposta": "É a Síndrome dos Ovários Policísticos, que afeta somente as mulheres. Geralmente está atrelada ao aumento de acne, resistência à insulina e hirsutismo (aumento de pelos em regiões não convencionais nas mulheres). Inclusive, tem o e-book completo sobre esse tema na plataforma."
            },
            {
                "pergunta": "É normal sentir dor de cabeça depois que começa a dieta? O que fazer para melhorar?",
                "resposta": "Não é normal, mas acontece. Isso ocorre principalmente por conta da redução no consumo de carboidratos e calorias em relação à alimentação antes de começar a dieta. Não tem o que fazer, é uma fase de adaptação que pode durar de 1 a duas semanas."
            },
            {
                "pergunta": "Qual a quantidade de sardinha assada?",
                "resposta": "Em molho de tomate, não usar em óleo, 120g na substituição de 100g de frango."
            },
            {
                "pergunta": "Pode tomar Yakult?",
                "resposta": "Não é uma opção tão interessante para usar no dia a dia, a melhor opção é o iogurte natural desnatado, ele vai ter baixíssima calorias e vai fazer muito bem para a microbiota intestinal. Mas eventualmente, pode usar 1 unidade (pequena) de yakult na substituição das opções onde tem 1 copo de iogurte."
            },
            {
                "pergunta": "O anticoncepcional atrapalha no emagrecimento?",
                "resposta": "Não atrapalha. Esse é um mito que não procede."
            },
            {
                "pergunta": "Pode tomar suplemento cafeína?",
                "resposta": "Se você não sofre com ansiedade, tem boas noites de sono e treina na parte da manhã pode utilizar, caso queira, até 200mg de cafeína por dia, não vai alterar em nada no emagrecimento, mas pode ser que você treine um pouco melhor, nesses casos recomendo geralmente o kimera e evorapw."
            },
            {
                "pergunta": "Pode substituir o café da manhã por suco detox?",
                "resposta": "Não recomendo, a proteína ficaria muito abaixo. O que você pode fazer nesse caso, é comer somente a fruta de manhã e transferir pelo menos a proteína do café da manhã para outro horário (ex: aumentar mais um ovo ou 50g de carne no almoço)."
            },
            {
                "pergunta": "Pode colocar os carboidratos do café da manhã no almoço?",
                "resposta": "Pode, o importante é comer o que está prescrito não importando a ordem."
            },
            {
                "pergunta": "Pode usar mel?",
                "resposta": "Não recomendo no dia a dia, pois a quantidade de calorias é praticamente idêntica ao açúcar de mesa."
            },
            {
                "pergunta": "Preciso contabilizar a canela?",
                "resposta": "Não, é livre."
            },
            {
                "pergunta": "Pode usar rap 10?",
                "resposta": "Pode, possui opções no cardápio com Rap 10. Da uma olhada lá."
            },
            {
                "pergunta": "Quais alimentos usar para substituir o feijão?",
                "resposta": "Tem as opções no cardápio."
            },
            {
                "pergunta": "Pode comer feijão branco ao invés do vermelho ou do preto?",
                "resposta": "Pode sim, mesma quantidade."
            },
            {
                "pergunta": "A mostarda pode ser usada para temperar?",
                "resposta": "Sim, até 30g por dia."
            },
            {
                "pergunta": "Quantos ovos posso comer por dia?",
                "resposta": "Evite passar de 4 ovos por dia comendo apenas nas opções que contêm ovos, nas quantidades que estão prescritas na opção escolhida."
            },
            {
                "pergunta": "O macarrão e o arroz precisam ser integral?",
                "resposta": "Não, a não ser que você prefira o sabor, não há benefício adicional nenhum. Acredite!"
            },
            {
                "pergunta": "Creatina eu posso tomar em qualquer hora do dia?",
                "resposta": "Sim, tem que tomar até no final de semana."
            },
            {
                "pergunta": "Ovos em grande quantidade aumentam o colesterol ruim?",
                "resposta": "Não, isso é um mito, mas em grande quantidade pode exceder as calorias e prejudicar o emagrecimento."
            },
            {
                "pergunta": "Qual a diferença do whey isolado?",
                "resposta": "O isolado é indicado para pessoas com intolerância à lactose."
            },
            {
                "pergunta": "Quais outras partes do frango pode comer e suas quantidades?",
                "resposta": "No dia a dia peito de frango, mas uma refeição na semana para variar deve ser coxa ou sobrecoxa sem pele e sem gordura."
            },
            {
                "pergunta": "Se eu comer menos do cardápio indicado ou pular lanche interfere na dieta?",
                "resposta": "A percepção de fome vai aumentar muito e o risco de você exagerar na refeição seguinte vai ser grande, evite pular refeições."
            },
            {
                "pergunta": "Pode comer mingau de aveia na ceia?",
                "resposta": "A quantidade vai ser muito pequena, mas poderia. Seriam 18g de aveia em flocos + 200mL de leite desnatado + canela e adoçante líquido."
            },
            {
                "pergunta": "A ceia é obrigatória?",
                "resposta": "A ceia é a única refeição que você pode pular."
            },
            {
                "pergunta": "Produtos em conserva podem ser usados? (ex: picles)",
                "resposta": "Todos os legumes em conserva podem ser usados, é só lavar antes de comer."
            },
            {
                "pergunta": "Pode substituir o arroz por polenta? Qual a quantidade?",
                "resposta": "Pode, a mesma quantidade."
            },
            {
                "pergunta": "Quanto de gordura posso usar para fritar ovos?",
                "resposta": "O mínimo do mínimo possível. Preferencialmente azeite ou óleo de soja, mas se tiver uma frigideira anti-aderente não use nada."
            },
            {
                "pergunta": "Pode tomar chá à vontade?",
                "resposta": "O chá é liberado sem açúcar. Café é liberado apenas para as pessoas que não sofrem com ansiedade e distúrbios gástricos e que dormem bem."
            },
            {
                "pergunta": "Qual é a quantidade de calorias que está nesse desafio?",
                "resposta": "Média de 1350 a 1450 calorias."
            },
            {
                "pergunta": "A torrada tem que ser integral?",
                "resposta": "Sim, de preferência sim."
            },

            {
                "pergunta": "Qual marca de suplementos o nutri indica?",
                "resposta": "Growth suplementos, integral médica e dux nutrition."
            },
            {
                "pergunta": "Qual o melhor app para contar calorias?",
                "resposta": "Dieta Calculada."
            },
            {
                "pergunta": "Qual marca de geléia de frutas eu posso usar?",
                "resposta": "Qualquer marca de geléia de frutas zero açúcar, mas use apenas nas opções do cardápio que tem geléia."
            },
            {
                "pergunta": "Qual a melhor marca de torrada?",
                "resposta": "Bauducco e wickbold."
            },
            {
                "pergunta": "Qual marca de pão integral você indica?",
                "resposta": "Wickbold, visconti e lekker. Mas o principal ponto é se certificar que duas fatias vão ficar entre 50 e 55g, o que passar disso deve ser retirado."
            },
            {
                "pergunta": "Qual é a creatina indicada?",
                "resposta": "Qualquer marca monohidratada."
            },
            {
                "pergunta": "Qual a marca de molho de tomate que o nutri indica?",
                "resposta": "Fugini, o melhor."
            },
            {
                "pergunta": "Posso usar pasta de amendoim na dieta? Qual a melhor?",
                "resposta": "Usar apenas na substituição do chocolate da ceia 15g. Marca Vita Power."
            },
            {
                "pergunta": "Qual a melhor marca de iogurte natural?",
                "resposta": "Qualquer uma que tenha apenas 2 ingredientes."
            },

            {
                "pergunta": "Posso comer a mesma coisa todos os dias no café da manhã?",
                "resposta": "Pode."
            },
            {
                "pergunta": "Devo pesar a comida antes ou depois de pronta?",
                "resposta": "Tudo depois de pronto, só a parte comestível."
            },
            {
                "pergunta": "Pode consumir água com gás?",
                "resposta": "Pode, está liberado."
            },
            {
                "pergunta": "Pode por whey no mingau?",
                "resposta": "Teria que ser assim: uma porção de fruta + 18g de aveia + 20g de whey protein + 200ml de leite desnatado."
            },
            {
                "pergunta": "Pode cuscuz no café da manhã e qual a quantidade?",
                "resposta": "Sim, tem nas opções do cardápio."
            },
            {
                "pergunta": "A quantidade de batata doce pode ser igual para a noite?",
                "resposta": "160g de batata doce na substituição do carboidrato da janta."
            },
            {
                "pergunta": "Os diabéticos podem seguir a dieta?",
                "resposta": "Diabéticos tipo 2 sim, normalmente, mas precisam ter total disciplina nos treinos."
            },
            {
                "pergunta": "Tomo café só uma vez por dia. Posso colocar açúcar?",
                "resposta": "Se for até 5g no MÁXIMO!"
            },
            {
                "pergunta": "Posso consumir mais de um carboidrato (exemplo: arroz e macarrão) na mesma refeição?",
                "resposta": "Eventualmente sim, 50g de macarrão na substituição de 50g de feijão."
            },
            {
                "pergunta": "Quanto de batata inglesa assada na airfryer eu posso consumir?",
                "resposta": "Metade da quantidade que está na cozida."
            },
            {
                "pergunta": "Posso tomar chimarrão?",
                "resposta": "Pode, à vontade."
            },
            {
                "pergunta": "Posso comer linguiça?",
                "resposta": "Não recomendo no dia a dia nenhum tipo de linguiça, deixa para usar na refeição livre."
            },
            {
                "pergunta": "Posso usar milho, ervilha e grão-de-bico enlatados?",
                "resposta": "Sim, só lavar para tirar o excesso da salmoura."
            },
            {
                "pergunta": "Quanto de queijo minas posso consumir?",
                "resposta": "Tem opções com queijo minas no cardápio e as quantidades certas."
            },
            {
                "pergunta": "Se eu não quiser comer arroz/feijão posso consumir mais legumes?",
                "resposta": "Pode dobrar os legumes."
            },
            {
                "pergunta": "Quanto de ketchup e mostarda posso consumir?",
                "resposta": "20g de cada por dia no máximo."
            },
            {
                "pergunta": "Posso almoçar e jantar com muito volume todos os dias?",
                "resposta": "Pode."
            },
            {
                "pergunta": "Posso comer carne de porco?",
                "resposta": "No máximo uma refeição na semana, 100g lombo ou pernil ou carré retirando toda a gordura."
            },
            {
                "pergunta": "Quantas refeições livres eu posso fazer?",
                "resposta": "Eu explico isso detalhadamente no pdf de refeições livres."
            },
            {
                "pergunta": "Posso comer batata congelada feita na airfryer?",
                "resposta": "Se for a de pacote, recomendo apenas na refeição livre."
            },
            {
                "pergunta": "Tem opções mais práticas para café da manhã e lanche da tarde?",
                "resposta": "Você deu uma olhadinha nas observações do café da manhã e do lanche da tarde? Lá tem opções com whey + iogurte + fruta OU de yopro + frutas, pode usar essas opções sempre que quiser, são equivalentes em calorias as opções principais. Além disso, pode fazer diferentes combinações usando a lista de substituição como pão e patê para fazer sanduíche natural e deixar pronto para a semana, aí lembra de consumir a fruta também."
            },
            {
                "pergunta": "Eu prefiro lanches no jantar. O que fazer?",
                "resposta": "Na lista de substituição do arroz, tem opção de pão, rap 10, tapioca, cuscuz.... Você deu uma olhadinha? Pode usar a lista de substituição para fazer diferentes combinações e montar lanches para o jantar. Só lembrando que recomendo o consumo de glúten apenas 2x ao dia, então se você prefere usar o pão no jantar, usa o pão apenas no café da manhã OU lanche da tarde e seleciona alguma dessas refeições para usar opções sem glúten como tapioca, cuscuz, aveia, banana da terra cozida…"
            },
            {
                "pergunta": "Quantas calorias tem a minha dieta?",
                "resposta": "Peça a aluna o e-mail que ela usou no cadastro. Quando ela responder, copie o e-mail e pesquise no Webdiet, em seguida, clique no nome da aluna e depois e clique em plano alimentar e irá aparecer a quantidade de calorias do plano e é só passar essa informação para a aluna."
            },
            {
                "pergunta": "Tenho SOP, lipedema, dislipidemia, colesterol, diabetes, hipotireoidismo, hashimoto, esteatose hepática… o médico pediu para ajustar minha dieta. Pode ajustar para mim?",
                "resposta": "O seu plano alimentar já está ajustado para te ajudar nessas questões e já não contém os alimentos que prejudicam nesse caso, como embutidos, defumados e gorduras. Além disso, é fundamental o consumo adequado de vegetais conforme a quantidade no almoço e no jantar e também de frutas nas porções do plano, pelo menos 3 por dia! Lembrando que exercício físico também é indispensável!"
            },
            {
                "pergunta": "Sou diabética / pré-diabética, posso seguir o plano alimentar?",
                "resposta": "Se você tem pré-diabetes, pode sim seguir o plano alimentar normalmente. É essencial, no entanto, que você sempre faça as refeições completas, conforme o plano orienta, para ajudar no controle da glicemia e evitar picos de insulina. Isso significa que em cada refeição você deve combinar: Carboidratos: como pão, arroz, feijão, batata, etc. Proteínas e gorduras: como carnes, ovos, queijos, castanhas, etc. Fibras: presentes nas frutas e vegetais. Essa combinação é fundamental para garantir equilíbrio na resposta glicêmica. Além disso, a prática regular de exercícios físicos é extremamente importante para auxiliar no controle da glicemia e na sua saúde como um todo."
            },


        ],
        "COMERCIAL": [
            {
                "pergunta": "O que é o Você Magra?",
                "resposta": "O Você Magra é um plano no qual a aluna não tem acesso ao plano individualizado. Nesse formato, ela recebe mensalmente cardápios padronizados, disponibilizados dentro da Plataforma Life In Fit. O suporte nutricional para as alunas desse plano é realizado exclusivamente através da comunidade no Telegram, onde podem tirar dúvidas, receber orientações gerais e interagir com a equipe e outras alunas."
            },
            {
                "pergunta": "O que é o Seca Pochete?",
                "resposta": "O Seca Pochete é um desafio de 21 dias, onde a aluna segue um cardápio com restrição calórica, em média 1250 kcal por dia. Esse cardápio é padrão, não personalizado, e tem como foco acelerar os resultados iniciais. Após finalizar os 21 dias, a aluna deve passar a utilizar o plano individualizado. Importante: As alunas do Seca Pochete não têm acesso à comunidade no Telegram. Por isso, todas as dúvidas nutricionais devem ser respondidas exclusivamente pelo suporte individualizado."
            },
            {
                "pergunta": "O cardápio é o mesmo para todo mundo?",
                "resposta": "Sim, o cardápio do desafio é padronizado (1350 a 1450 calorias por dia). Isso porque ao longo dos anos estudando e trabalhando com emagrecimento feminino eu percebi que o valor calórico sempre ficava dentro dessa margem. Mulheres que comem menos de 1300 calorias sentem muita fome, beliscam demais e acabam comendo muito mais no final de semana devido a fome aumentada. Com isso não prosperam no emagrecimento, geralmente."
            },

        ],
        "TÉCNICA": [

            {
                "pergunta": "O que é zap do nutri?",
                "resposta": "O zap do nutri, é um acompanhamento individualizado, onde o nutri João Muzzy e toda sua equipe, irá desenvolver um plano alimentar 100% individualizado para o seu caso, com todos os alimentos que você mais gosta de comer no dia a dia. Além de dietas personalizadas, no zap do nutri também entregamos treinos personalizados para você fazer em casa ou até mesmo na academia. O zap do nutri traz praticidade, te entregando tudo o que você precisa para emagrecer definitivamente em tempo recorde e comendo tudo o que você mais ama no dia a dia. Todo o protocolo de dieta e treinos, serão disponibilizados através de nossos aplicativos parceiros, web diet e mfit, assim como, podemos entregar também através do whatsapp. Aqui não tem dietas malucas, e essas coisas que te fazem comer menos que um passarinho. Você pode emagrecer comendo comida de verdade.Pão, arroz, feijão e até chocolate todos os dias em sua dieta. Zero restrições."
            },
            {
                "pergunta": "Quanto custa o zap do nutri?",
                "resposta": "Atualmente, o nosso plano mais querido pelas alunas é o zap do nutri anual, onde você paga por 10 meses e ganha dois de presente, totalizando um ano de acesso. Mas, também contamos com outros planos, sendo eles:"
            },
            {
                "pergunta": "Como acessar o telegram?",
                "resposta": "Você precisa instalar o aplicativo Telegram no seu celular. Depois disso, é só clicar no link da Ju abaixo, enviar seu e-mail na conversa e aguardar  ela vai liberar os grupos disponíveis de acordo com o seu plano. Link da Ju: https://t.me/LifeInFitBot  OBS: A Comunidade das Musas é um espaço exclusivo para alunas dos programas Você Magra e Seca Pochete. Caso a aluna não consiga acessar pelo link mesmo tendo o app do telegram, peça para ela digitar nas buscas do telegram: @lifeinfitbot que ela vai conseguir localizar o chat da Ju e seguir os passos"
            },
            {
                "pergunta": "Como responder o questionario do Zap Nutri?",
                "resposta": " Para responder o questionário, envie o e-mail cadastrado na assinatura no Zap do Nutri. Após isso, é só seguir todas as recomendações que serão enviadas por lá. Link:  bit.ly/zapdonutrii OBS: Em casos de dificuldade ou dúvidas por parte do assinante, sempre peça um print da tela para que possamos visualizar melhor o possível problema e oferecer a ajuda adequada."
            },
            {
                "pergunta": "Como funciona as regras de reembolso?",
                "resposta": "Nos planos Você Magra e Seca Pochete, oferecemos uma garantia de 7 dias, contados a partir da data de assinatura, para desistência. Já nos planos individuais, a garantia é de 14 dias: sendo 7 dias após a assinatura e mais 7 dias após o recebimento da dieta. Após esses prazos, não é possível solicitar reembolso, conforme os termos acordados no momento da contratação."
            },
            {
                "pergunta": "Como funciona as regras de cancelamento?",
                "respostas": "Para solicitar o cancelamento, o assinante deve ser encaminhado ao suporte correspondente ao seu plano:Você Magra / Seca Pochete → Suporte via chat da plataforma Planos Individuais → Suporte individual via WhatsApp Assim garantimos que o atendimento seja feito de forma correta e personalizada."
            },
            {
                "pergunta": "Como acessar os canais de suporte de treinos?",
                "resposta": "Treino Masculino: Suporte via chat da plataforma"
            },
            {
                "pergunta": "Como acessar os canais de suporte de dieta individualizada?",
                "resposta": "Dieta Individualizada: Suporte via WhatsApp  Dieta Individualizada - +55  27 99271-0891"
            },
            {
                "pergunta": "Como acessar os canais de suporte do você magra?",
                "resposta": "Dieta Coletiva: Dieta  Você Magra / Seca Pochete"
            },

        ],

        "PRODUTO": [
            {
                "pergunta": "O que é zap do nutri?",
                "resposta": "O zap do nutri, é um acompanhamento individualizado, onde o nutri João Muzzy e toda sua equipe, irá desenvolver um plano alimentar 100% individualizado para o seu caso, com todos os alimentos que você mais gosta de comer no dia a dia. Além de dietas personalizadas, no zap do nutri também entregamos treinos personalizados para você fazer em casa ou até mesmo na academia. O zap do nutri traz praticidade, te entregando tudo o que você precisa para emagrecer definitivamente em tempo recorde e comendo tudo o que você mais ama no dia a dia. Todo o protocolo de dieta e treinos, serão disponibilizados através de nossos aplicativos parceiros, web diet e mfit, assim como, podemos entregar também através do whatsapp. Aqui não tem dietas malucas, e essas coisas que te fazem comer menos que um passarinho. Você pode emagrecer comendo comida de verdade.Pão, arroz, feijão e até chocolate todos os dias em sua dieta. Zero restrições."

            },

            {
                "pergunta": "Quanto custa o zap do nutri?",
                "resposta": "Atualmente, o nosso plano mais querido pelas alunas é o zap do nutri anual, onde você paga por 10 meses e ganha dois de presente, totalizando um ano de acesso. Mas, também contamos com outros planos, sendo eles:"

            },

            {
                "pergunta": "Como acessar o telegram?",
                "resposta": "Você precisa instalar o aplicativo Telegram no seu celular. Depois disso, é só clicar no link da Ju abaixo, enviar seu e-mail na conversa e aguardar  ela vai liberar os grupos disponíveis de acordo com o seu plano. Link da Ju: https://t.me/LifeInFitBot  OBS: A Comunidade das Musas é um espaço exclusivo para alunas dos programas Você Magra e Seca Pochete. Caso a aluna não consiga acessar pelo link mesmo tendo o app do telegram, peça para ela digitar nas buscas do telegram: @lifeinfitbot que ela vai conseguir localizar o chat da Ju e seguir os passos"

            },

            {
                "pergunta": "Como responder o questionario do Zap Nutri?",
                "resposta": " Para responder o questionário, envie o e-mail cadastrado na assinatura no Zap do Nutri. Após isso, é só seguir todas as recomendações que serão enviadas por lá. Link:  bit.ly/zapdonutrii OBS: Em casos de dificuldade ou dúvidas por parte do assinante, sempre peça um print da tela para que possamos visualizar melhor o possível problema e oferecer a ajuda adequada."

            },

            {

                "pergunta": "Como funciona as regras de reembolso?",
                "resposta": "Nos planos Você Magra e Seca Pochete, oferecemos uma garantia de 7 dias, contados a partir da data de assinatura, para desistência. Já nos planos individuais, a garantia é de 14 dias: sendo 7 dias após a assinatura e mais 7 dias após o recebimento da dieta. Após esses prazos, não é possível solicitar reembolso, conforme os termos acordados no momento da contratação."

            },

            {
                "pergunta": "Como funciona as regras de cancelamento?",
                "resposta": "Para solicitar o cancelamento, o assinante deve ser encaminhado ao suporte correspondente ao seu plano:Você Magra / Seca Pochete → Suporte via chat da plataforma Planos Individuais → Suporte individual via WhatsApp Assim garantimos que o atendimento seja feito de forma correta e personalizada."
            },

            {

                "pergunta": "Como acessar os canais de suporte de treinos?",
                "resposta": 'Treino Masculino: Suporte via chat da plataforma',
            },

            {

                "pergunta": "Como acessar os canais de suporte de dieta individualizada?",
                "resposta": "Dieta Individualizada: Suporte via WhatsApp" + " Dieta Individualizada - +55  27 99271-0891",

            },

            {



                "pergunta": "Como acessar os canais de suporte do você magra?",
                "resposta": "Dieta Coletiva: Dieta  Você Magra / Seca Pochete",
            }

        ],

    }

    // Renderizar FAQs iniciais
    renderFAQs(currentCategory);

    // Função para criar blocos animados no background
    function createAnimatedBlocks() {
        // Limpar blocos existentes
        animatedBackground.innerHTML = '';

        // Criar blocos que se movem da esquerda para a direita
        for (let i = 0; i < 15; i++) {
            createBlock('left-to-right', i);
        }

        // Criar blocos que se movem da direita para a esquerda
        for (let i = 0; i < 15; i++) {
            createBlock('right-to-left', i + 15);
        }
    }

    // Função para criar um único bloco animado
    function createBlock(direction, index) {
        const block = document.createElement('div');
        block.className = `moving-block ${direction}`;

        // Tamanho aleatório
        const size = Math.floor(Math.random() * 100) + 50; // Entre 50px e 150px
        block.style.width = `${size}px`;
        block.style.height = `${size}px`;

        // Posição vertical aleatória
        const top = Math.floor(Math.random() * 100);
        block.style.top = `${top}%`;

        // Atraso na animação para distribuir os blocos
        block.style.animationDelay = `${index * 1.5}s`;

        // Opacidade aleatória (sutil)
        const opacity = Math.random() * 0.1 + 0.05; // Entre 0.05 e 0.15

        // Alternar entre blocos amarelos e brancos
        if (index % 2 === 0) {
            block.style.backgroundColor = `rgba(255, 215, 0, ${opacity})`;
        } else {
            block.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
        }

        // Adicionar formas diferentes
        const shapes = ['50%', '0%', '25%'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        block.style.borderRadius = shape;

        // Adicionar ao background
        animatedBackground.appendChild(block);
    }

    // Função para renderizar as FAQs com base na categoria
    function renderFAQs(category) {
        faqContainer.innerHTML = '';

        if (category === 'all') {
            // Renderizar todas as categorias
            Object.keys(faqData).forEach(cat => {
                const categorySection = createCategorySection(cat);
                faqContainer.appendChild(categorySection);
            });
        } else {
            // Renderizar apenas a categoria selecionada
            if (faqData[category] && faqData[category].length > 0) {
                const categorySection = createCategorySection(category);
                faqContainer.appendChild(categorySection);
            } else {
                faqContainer.innerHTML = '<div class="no-results">Nenhuma pergunta encontrada nesta categoria.</div>';
            }
        }

        // Adicionar eventos de clique para as perguntas
        addQuestionClickEvents();
    }

    // Criar seção de categoria com suas perguntas
    function createCategorySection(category) {
        const categorySection = document.createElement('div');
        categorySection.className = 'faq-category';

        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category;
        categorySection.appendChild(categoryTitle);

        const items = faqData[category];
        if (items && items.length > 0) {
            items.forEach(item => {
                const faqItem = createFAQItem(item.pergunta, item.resposta);
                categorySection.appendChild(faqItem);
            });
        } else {
            const noItems = document.createElement('p');
            noItems.textContent = 'Nenhuma pergunta disponível nesta categoria.';
            categorySection.appendChild(noItems);
        }

        return categorySection;
    }

    // Criar item de FAQ (pergunta e resposta)
    function createFAQItem(question, answer) {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';

        const questionDiv = document.createElement('div');
        questionDiv.className = 'faq-question';
        questionDiv.innerHTML = `
            <span>${question}</span>
            <i class="fas fa-chevron-down"></i>
        `;

        const answerDiv = document.createElement('div');
        answerDiv.className = 'faq-answer';
        answerDiv.innerHTML = `<p>${answer}</p>`;

        faqItem.appendChild(questionDiv);
        faqItem.appendChild(answerDiv);

        return faqItem;
    }

    // Adicionar eventos de clique para expandir/recolher perguntas
    function addQuestionClickEvents() {
        const questions = document.querySelectorAll('.faq-question');

        questions.forEach(question => {
            question.addEventListener('click', function () {
                // Toggle active class para a pergunta
                this.classList.toggle('active');

                // Toggle active class para a resposta
                const answer = this.nextElementSibling;
                answer.classList.toggle('active');
            });
        });
    }

    // Função de pesquisa
    function searchFAQs(searchTerm) {
        if (!searchTerm.trim()) {
            renderFAQs(currentCategory);
            return;
        }

        searchTerm = searchTerm.toLowerCase();
        faqContainer.innerHTML = '';
        let resultsFound = false;

        // Criar um container para os resultados
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';

        // Procurar em todas as categorias
        Object.keys(faqData).forEach(category => {
            const categoryItems = faqData[category];

            // Filtrar itens que correspondem ao termo de pesquisa
            const matchingItems = categoryItems.filter(item =>
                item.pergunta.toLowerCase().includes(searchTerm) ||
                item.resposta.toLowerCase().includes(searchTerm)
            );

            if (matchingItems.length > 0) {
                resultsFound = true;

                // Criar seção para esta categoria
                const categorySection = document.createElement('div');
                categorySection.className = 'faq-category';

                const categoryTitle = document.createElement('h2');
                categoryTitle.className = 'category-title';
                categoryTitle.textContent = category;
                categorySection.appendChild(categoryTitle);

                // Adicionar itens correspondentes
                matchingItems.forEach(item => {
                    const faqItem = createFAQItem(
                        highlightText(item.pergunta, searchTerm),
                        highlightText(item.resposta, searchTerm)
                    );
                    categorySection.appendChild(faqItem);
                });

                resultsContainer.appendChild(categorySection);
            }
        });

        if (resultsFound) {
            faqContainer.appendChild(resultsContainer);
            addQuestionClickEvents();
        } else {
            faqContainer.innerHTML = '<div class="no-results">Nenhum resultado encontrado para sua pesquisa.</div>';
        }
    }

    // Destacar o texto pesquisado
    function highlightText(text, searchTerm) {
        if (!searchTerm.trim()) return text;

        const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    // Escapar caracteres especiais para uso em regex
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Event listeners
    searchButton.addEventListener('click', function () {
        searchFAQs(searchInput.value);
    });

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchFAQs(searchInput.value);
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remover classe active de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Adicionar classe active ao botão clicado
            this.classList.add('active');

            // Atualizar categoria atual e renderizar
            currentCategory = this.getAttribute('data-category');

            // Se houver um termo de pesquisa, limpar
            if (searchInput.value.trim()) {
                searchInput.value = '';
            }

            renderFAQs(currentCategory);
        });
    });

    // Recriar blocos animados quando a janela for redimensionada
    window.addEventListener('resize', function () {
        createAnimatedBlocks();
    });
});