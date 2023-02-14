const formCadastro = document.getElementById('form-cadastro');
const listaCadastros = buscarLocalStorage('cadastros')

formCadastro.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const novoCadastro = {
        email: '',
        senha: '',
        recado: [],
    }

    const inputEmail = document.getElementById('inputEmail')
    const existe = listaCadastros.some((valor) => valor.email === inputEmail.value)
    if(existe){
        showFeedback(false, 'E-mail já cadastrado')
        return
    } else {
        novoCadastro.email = inputEmail.value        
    }

    const inputSenha1 = document.getElementById('inputPassword1')
    const inputSenha2 = document.getElementById('inputPassword2')
    if(!inputSenha1.value || !inputSenha2.value){
        showFeedback(false, 'Digite uma senha')
        return
    } else if(inputSenha1.value !== inputSenha2.value){
        showFeedback(false, 'As senhas devem ser idênticas')
        return
    } else {
        novoCadastro.senha = inputSenha1.value
    }

    listaCadastros.push(novoCadastro)
    guardarLocalStorage('cadastros', listaCadastros)
    formCadastro.reset()
    window.location.href = './index.html'
})

function showFeedback(success, mensagem){  
    const feedback = document.getElementById('feedback')  
    if(!success){
        feedback.classList.add('text-bg-danger')
        feedback.children[0].children[0].innerHTML = mensagem
    }

    const toastFeedback = new bootstrap.Toast(feedback);
    toastFeedback.show();
}

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

