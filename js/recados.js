const usuarioLogado = buscarLocalStorage('usuarioLogado')
if(!usuarioLogado.email) {
    window.location.href = './index.html'
}

document.addEventListener('DOMContentLoaded', preencherRecados())

const modal = new bootstrap.Modal('#modal-editar')

const formularioRecados = document.getElementById('form-recados')
formularioRecados.addEventListener('submit', (ev) => {
    ev.preventDefault()
    
    const inputTitulo = document.getElementById('titulo')
    const inputDescricao = document.getElementById('descricao')

    const recadosUsuario = {
        titulo: inputTitulo.value,
        descricao: inputDescricao.value
    }

    usuarioLogado.recado.push(recadosUsuario)
    guardarLocalStorage('usuarioLogado', usuarioLogado)

    formularioRecados.reset()

    preencherRecados()
})

function preencherRecados(){
    const tbody = document.getElementById('tbody')
    tbody.innerHTML = ''

    usuarioLogado.recado.forEach((valor, index) => {
        tbody.innerHTML += `
        <tr class="row w-100 text-center">
        <td class="col-2">
            <div class="container">
                <div class="row w-100 justify-content-between">
                    <div class="col-1">
                        <button id="btnEditar" type="button" onclick="prepararEdicao(${index})" class="btn" data-bs-toggle="modal" data-bs-target="#modal-editar">
                            <i class="bi bi-pencil-square"></i>                      
                        </button>
                    </div>
                    <div class="col-1">
                        <button onclick="apagarRecado(${index})" class="btn" id='btnApagar'>
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </div>
            </div>
        </td>
        <td class="col-4">${valor.titulo}</td>
        <td class="col-6">${valor.descricao}</td>
    </tr>`
    })
    
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
        return {}
    }
}

function salvarRecados(){
    const listaUsuario = buscarLocalStorage('cadastros')

    const indiceUsuario = listaUsuario.findIndex((valor) => valor.email === usuarioLogado.email)
 
    listaUsuario[indiceUsuario].recado = usuarioLogado.recado
 
    guardarLocalStorage('cadastros', listaUsuario)
}

function prepararEdicao(index){
    const inputEditarTitulo = document.getElementById('editarTitulo')
    const inputEditarDescricao = document.getElementById('editarDescricao')

    inputEditarTitulo.value = usuarioLogado.recado[index].titulo
    inputEditarDescricao.value = usuarioLogado.recado[index].descricao

    const formularioEditar = document.getElementById('form-recados-editar')
    formularioEditar.addEventListener('submit', (ev) =>{
        ev.preventDefault()

        usuarioLogado.recado[index].titulo = inputEditarTitulo.value
        usuarioLogado.recado[index].descricao = inputEditarDescricao.value
        
        guardarLocalStorage('usuarioLogado', usuarioLogado)
        preencherRecados()
        
        modal.hide()
    })
}

function apagarRecado(index){
    const novosRecados = usuarioLogado.recado.filter((valor, indice) => {
        return indice !== index
    })

    usuarioLogado.recado = novosRecados

    guardarLocalStorage('usuarioLogado', usuarioLogado)
    preencherRecados() 
}

function sair(){
    salvarRecados()
    localStorage.removeItem('usuarioLogado')
    window.location.href = './index.html'
}