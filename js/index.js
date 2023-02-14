const formEntrar = document.getElementById('formIndex')
const listaCadastros = buscarLocalStorage('cadastros')

formEntrar.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const inputEmail = document.getElementById('inputEmail')
    const inputSenha = document.getElementById('inputPassword')
    const usuarioEncontrado = listaCadastros.find((valor) => valor.email === inputEmail.value && valor.senha === inputSenha.value)
    if(usuarioEncontrado){
        guardarLocalStorage('usuarioLogado', usuarioEncontrado)
        window.location.href = './recados.html'
    } else {
        showFeedback(false, 'E-mail ou senha incorretos. Tente novamente!')
        return
    }
})

function guardarLocalStorage(chave, valor){
    const valorJSON = JSON.stringify(valor)

    localStorage.setItem(chave, valorJSON)
}


function buscarLocalStorage(chave){
    const dadosJSON = localStorage.getItem(chave)

    if(dadosJSON){
        const dadosConvertidos = JSON.parse(dadosJSON)
        return dadosConvertidos
    } else {
        return []
    }
}

function showFeedback(success, mensagem){  
    const feedback = document.getElementById('feedback')  
    if(!success){
        feedback.classList.add('text-bg-danger')
        feedback.children[0].children[0].innerHTML = mensagem
    }

    const toastFeedback = new bootstrap.Toast(feedback);
    toastFeedback.show();
}