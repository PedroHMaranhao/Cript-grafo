// Mapeamento das letras a serem substituídas
let substituicoes = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

// Mapeamento reverso para desfazer as substituições
let substituicoesReversas = {};
for (let chave in substituicoes) {
        substituicoesReversas[substituicoes[chave]] = chave;
}

function selecionarBotao(botaoSelecionado) {
    inputButtonC.classList.remove("selectedButton");
    inputButtonD.classList.remove("selectedButton");
    copyButton.classList.remove("copied");
    botaoSelecionado.classList.add("selectedButton");
}

function validarTexto(callback, botaoSelecionado) {

    selecionarBotao(botaoSelecionado);

    // Pega o valor do campo de texto
    let texto = document.getElementById('userInput').value;
    // Expressão regular para validar o texto
    let regexMinusculas = /^[a-z\s]+$/;

    // Verifica se o texto contém apenas letras minúsculas e sem caracteres especiais ou acentuação
    if (!regexMinusculas.test(texto)) {
        document.getElementById('notFound').innerText = '';
        document.getElementById('error').innerText = 'Erro: O texto deve conter apenas letras minúsculas sem caracteres especiais ou acentuação, e no mínimo um caractere.';
        return;
    }

    // Limpa a mensagens
    document.getElementById('error').innerText = '';
    document.getElementById('notFound').innerText = '';
    document.getElementById('notFoundSubText').innerText = '';
    outputImage.classList.add("invisible");
    copyButton.classList.remove("invisible");
    // Executa a função de substituição ou desfazer
    callback();
}



function criptografar() {
    // Pega o valor do campo de texto
    let texto = document.getElementById('userInput').value;
    
    // Inicia o texto modificado como uma string vazia
    let textoModificado = '';

    // Percorre cada caractere do texto original
    for (let i = 0; i < texto.length; i++) {
        let caractereAtual = texto[i];
        // Se o caractere estiver no mapeamento, substitui, caso contrário, mantém o original
        if (substituicoes[caractereAtual]) {
            textoModificado += substituicoes[caractereAtual];
        } else {
            textoModificado += caractereAtual;
        }
    }

    // Exibe o texto modificado
    document.getElementById('userOutput').innerText = textoModificado;
}

function descriptografar() {
    // Pega o valor do texto modificado ou original
    let textoCriptografado = document.getElementById('userInput').value;
    let textoDescriptografado = textoCriptografado;

    // Percorre as substituições reversas
    for (let palavra in substituicoesReversas) {
        // Substitui as palavras pelo caractere original
        textoDescriptografado = textoDescriptografado.split(palavra).join(substituicoesReversas[palavra]);
    }

    // Exibe o texto, seja ele modificado ou original
    document.getElementById('userOutput').innerText = textoDescriptografado;
}

function copiarTexto() {
    // Seleciona o texto de saída
    var textoParaCopiar = document.getElementById('userOutput').innerText;
    copyButton.classList.add("copied");

    // Copia o texto para a área de transferência
    navigator.clipboard.writeText(textoParaCopiar).then(function() {
        //alert('Texto copiado para a área de transferência!');
    }, function(err) {
        alert('Falha ao copiar o texto: ', err);
    });
}
