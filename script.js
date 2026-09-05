
// variasveis pagina principal
const voltarMES = document.querySelector("#voltarMes")
const meSatual = document.querySelector("#MESatual")
const avancarMES = document.querySelector("#adiantarMEs")
const conteudoCAlendario = document.querySelector(".conteudo-calendario")
const conteiner_calendario = document.querySelector(".calendario")

avancarMES.addEventListener("click",avancar_mes)
voltarMES.addEventListener("click",voltar_mes)

// conteiner registrar entrega
const conteudo_registrarENTREGA = document.querySelector(".registrar-entregas")
const conteiner_RG_entregas = document.querySelector(".conteiner-registrarEntregas")
const pagina_RGentregas_PRpG_inicial = document.querySelector("#voltar-pgRG_ENTREGA")


pagina_RGentregas_PRpG_inicial.addEventListener("click",voltar_PGRG_entrega)


// conteiner calcular entregas
const butao_do_calculo = document.querySelector("#calcularentregas")


butao_do_calculo.addEventListener("click",calcularEntregas)

// conteiner mostrar entregas
const conteiner_mostrarEntergas = document.querySelector(".conteiner-entregas-do-dia")
const conteudo_mostrarENtregas = document.querySelector("#corpoTabela")
const diaENTREga = document.querySelector("#dia-da-entrega")
const voltarDEmostrarENTREga_PRincipal = document.querySelector("#voltar-pagina-mostrarEntrega")
const finalizar_dia = document.querySelector("#finalizar-dia")
const conteiner_mostratTOtal = document.querySelector(".total")

voltarDEmostrarENTREga_PRincipal.addEventListener("click",voltardemostrartarefa)
finalizar_dia.addEventListener("click",finalizarorganizarClasse)


const hoje = new Date()

const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
]

const localidades = [
    {nome: "Maiobão", taxa: 10},{nome: "Paraná", taxa: 7},{nome: "Manaíra", taxa: 8},{nome: "Vila São José", taxa: 8},{nome: "Vila Nazaré", taxa: 10},{nome: "Tambaú", taxa: 10},{nome: "Armindo Reis", taxa: 4},{nome: "Jerusalém", taxa: 4},{nome: "Todos os Santos", taxa: 3},{nome: "Cidade Verde I", taxa: 3},{nome: "Cidade Verde II", taxa: 4},{nome: "Zumbi", taxa: 3},{nome: "Habitar", taxa: 3},{nome: "Cafeteira", taxa: 4},{nome: "Abdalla I", taxa: 3},{nome: "Abdalla II", taxa: 4},{nome: "Loteamento Silvana", taxa: 3},{nome: "Parque Horizonte", taxa: 4},{nome: "Nova Vida", taxa: 4},{nome: "Novo Horizonte", taxa: 3},{nome: "Nova Esperança", taxa: 4},{nome: "Pôr do Sol", taxa: 4},{nome: "Luiz Fernando", taxa: 7},{nome: "carlos Augusto", taxa: 8},{nome: "Jaguarema", taxa: 8},{nome: "Vila Manaíra", taxa: 7},{nome: "sitio Natureza", taxa: 8},{nome: "Pão açú", taxa: 10},{nome: "tracoa", taxa: 10},{nome: "Nova Jerusalém", taxa: 4},{nome: "Village dos Pássaros", taxa: 12},{nome: "Portal do Paço", taxa: 10},{nome: "Novo Paço", taxa: 10},{nome: "Condomínio Tracoa", taxa: 10},{nome: "Nova Canã", taxa: 8},{nome: "Alto do Laranjal", taxa: 10},{nome: "Vila do Povo", taxa: 8}
]

let MESatual = hoje.getMonth()
let anoatual = hoje.getFullYear()

meSatual.textContent = `${meses[MESatual]} ${anoatual}`

let diasDoMes = 0

window.addEventListener("load",criardiasDOMes)

function avancar_mes(){
    conteudoCAlendario.innerHTML = ""
    if(MESatual !== 11){
        voltarMES.style.visibility = "visible"
        MESatual++
        criardiasDOMes()
        meSatual.textContent = `${meses[MESatual]} ${anoatual}`
    }if(MESatual == 11){
        avancarMES.style.visibility = "hidden"
        return
    }
    
}

function voltar_mes(){
    conteudoCAlendario.innerHTML = ""
    if(MESatual > 0){
        avancarMES.style.visibility = "visible"
        MESatual--
        criardiasDOMes()
        meSatual.textContent = `${meses[MESatual]} ${anoatual}`
    }if(MESatual == 0){
        voltarMES.style.visibility = "hidden"
        return
    }

}

let entregas = []
const armazem_entregas = []
let dia = ""
let diaclicado = ""
let primeiroDIAdoMEs = ""

let verificarARmazenamento = localStorage.getItem("armazem")
if(verificarARmazenamento !== null){
    armazem_entregas.push(...JSON.parse(localStorage.getItem("armazem")))
}


function criardiasDOMes(){
    primeiroDIAdoMEs = new Date(anoatual,MESatual,1).getDay()
    diasDoMes = new Date(anoatual,MESatual + 1,0).getDate()
    
    if (primeiroDIAdoMEs === 0) {
        primeiroDIAdoMEs = 6
    } else {
        primeiroDIAdoMEs = primeiroDIAdoMEs - 1
        }

    for(let i = 0; i < primeiroDIAdoMEs; i++){
        const vazio = document.createElement("button")
        vazio.classList.add("vazio")
        conteudoCAlendario.appendChild(vazio)
    }

    for(let i = 1; i <= diasDoMes; i++){
        const dias = document.createElement("button")
        dias.textContent = i

        if(MESatual < hoje.getMonth()){
            dias.classList.add("dias-passados")
        
        }
        if(MESatual === hoje.getMonth() && i < hoje.getDate()){
            dias.classList.add("dias-passados")
        }
        
        dias.addEventListener("click",(event) =>{
            dia = Number(event.currentTarget.textContent)
            diaclicado = event.currentTarget
        })
        

        if(MESatual === hoje.getMonth() && i === hoje.getDate()){
            dias.addEventListener("click",registrarEntregas)
            dias.classList.add("dia-atual")
        }
        
        const diaExiste = armazem_entregas.find(item => item.dia === i && item.mes === MESatual + 1)
        if(diaExiste){
            dias.classList.remove("dia-atual")
            dias.classList.add("dia-ENtrega")
        }

        dias.addEventListener("click", (event) =>{
            if(event.currentTarget.classList.contains("dia-ENtrega")){
                dia_finalizado()
            }
        })

        conteudoCAlendario.appendChild(dias)
    }
}

function registrarEntregas(){
    conteiner_calendario.style.display = "none"
    conteiner_RG_entregas.style.display = "flex"

    localidades.sort((nome1,nome2) => nome1.nome.localeCompare(nome2.nome))
    localidades.forEach(local => {
        const opcao = document.createElement("section")
        
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.classList.add("checkbox")
        
        const id = local.nome.toLowerCase()
        checkbox.id = id
        
        const label = document.createElement("label")
        label.htmlFor = id
        label.textContent = `${local.nome} - R$ ${local.taxa}`
        
        const quantidade = document.createElement("input")
        quantidade.type = "number"
        quantidade.name = "quantidade"
        quantidade.min = 1
        quantidade.classList.add("quantidade")
        quantidade.value = 1
        
        opcao.append(checkbox,label,quantidade)
        opcao.dataset.nome = local.nome
        opcao.dataset.taxa = local.taxa
        checkbox.addEventListener("change",local_selecionado)
        conteudo_registrarENTREGA.appendChild(opcao)
    })
}

function voltar_PGRG_entrega(){
    conteudo_registrarENTREGA.innerHTML = ""
    conteiner_calendario.style.display = "grid"
    conteiner_RG_entregas.style.display = "none"
}

let localselecionado = []

function local_selecionado(event){
    const checkbox = event.currentTarget
    
    const section = event.currentTarget.parentElement
    
    if(checkbox.checked){
        section.classList.add("selecionado")
        localselecionado.push({nome:section.dataset.nome, taxa:Number(section.dataset.taxa),quantidade:Number(section.querySelector("input[name='quantidade']").value)})
    }else{
        section.classList.remove("selecionado")
        const indice = localselecionado.findIndex(local => local.nome === section.dataset.nome)
        localselecionado.splice(indice,1)
    }
}

function mostrarREusltado(){
    conteiner_calendario.style.display = "none"
    conteiner_RG_entregas.style.display = "none"
}

function calcularEntregas(){
    console.log(localselecionado)
    localselecionado.forEach(calcular =>{
        let resultado = calcular.taxa * calcular.quantidade
        entregas.push({nome:calcular.nome,taxa:calcular.taxa,quantidade:calcular.quantidade,sub_total:resultado})
    })

    // dia_registro_ENtrega = `0${hoje.getDate()}/0${hoje.getMonth()+1}/${hoje.getFullYear()}`
    mostrarTOtalEntergas()
}

function mostrarTOtalEntergas(){
    finalizar_dia.style.visibility = "visible"
    conteiner_RG_entregas.style.display = "none"
    conteiner_mostrarEntergas.style.display = "flex"
    diaENTREga.textContent = `dia: 0${hoje.getDate()}/0${hoje.getMonth()+1}/${hoje.getFullYear()}`
            
            let total = 0
            
            entregas.forEach(local =>{
                const linha = document.createElement("tr")
                const nome = document.createElement("td")
                const taxa = document.createElement("td")
                const quantidade = document.createElement("td")
                const subtotal = document.createElement("td")
                
                nome.textContent = local.nome
                taxa.textContent = `taxa: ${local.taxa}`
                quantidade.textContent = `Quantidade:${local.quantidade}`
                subtotal.textContent = `subTotal: ${local.sub_total}`
                linha.append(nome)
                linha.append(taxa)
                linha.append(quantidade)
                linha.append(subtotal)
                conteudo_mostrarENtregas.appendChild(linha)

                total += local.sub_total
                
            })
            const totalENTrega = document.createElement("td")
            totalENTrega.classList.add("totalentrega")
            totalENTrega.textContent = `total de entregas: ${total}`
            conteiner_mostratTOtal.appendChild(totalENTrega)
}

function voltardemostrartarefa(){
    conteiner_mostrarEntergas.style.display = "none"
    conteiner_calendario.style.display = "grid"
    conteiner_mostratTOtal.innerHTML = ""
    conteudo_mostrarENtregas.innerHTML = ""
    entregas = []
}

function dia_finalizado(){
    conteiner_calendario.style.display = "none"
    conteiner_mostratTOtal.innerHTML = ""
    finalizar_dia.style.visibility = "hidden"
    conteudo_mostrarENtregas.innerHTML = ""
    const entregadia = armazem_entregas.find(diaENcontrado =>{
        return diaENcontrado.dia === dia
    })
    
    if(entregadia){
        
        conteiner_RG_entregas.style.display = "none"
        conteiner_mostrarEntergas.style.display = "flex"
        
        entregadia.entregas.forEach(local => {
                const linha = document.createElement("tr")
                const nome = document.createElement("td")
                const taxa = document.createElement("td")
                const quantidade = document.createElement("td")
                const subtotal = document.createElement("td")
                
                nome.textContent = local.nome
                taxa.textContent = `taxa: ${local.taxa}`
                quantidade.textContent = `Quantidade:${local.quantidade}`
                subtotal.textContent = `subTotal: ${local.sub_total}`
                linha.append(nome)
                linha.append(taxa)
                linha.append(quantidade)
                linha.append(subtotal)
                conteudo_mostrarENtregas.appendChild(linha)
                
        })

        const totalENTrega = document.createElement("td")
        totalENTrega.classList.add("totalentrega")
        totalENTrega.textContent = `total de entregas: ${entregadia.total}`
        conteiner_mostratTOtal.appendChild(totalENTrega)

    }
    
}

function finalizarorganizarClasse(){
    console.log("salvando", {
    dia: hoje.getDate(),
    mes: hoje.getMonth() + 1
    })
    conteiner_mostrarEntergas.style.display = "none"
    conteiner_calendario.style.display = "grid"
    
    let totalCAlculo = 0
    entregas.forEach(total =>{
        totalCAlculo += total.sub_total
    })
    armazem_entregas.push(({mes:hoje.getMonth() + 1,dia:Number(hoje.getDate()),total:totalCAlculo,entregas:entregas}))
    localStorage.setItem("armazem",JSON.stringify(armazem_entregas))
    
    entregas = []
    localselecionado = []
    
    diaclicado.classList.remove("dia-atual")
    diaclicado.classList.add("dia-ENtrega")
}
