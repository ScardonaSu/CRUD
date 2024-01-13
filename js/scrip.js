
const url = "https://memin.io/public/api/v2/users"

const contenedor = document.querySelector('tbody')

let resultados = ""

const modalArticulo = new bootstrap.Modal(document.querySelector('#modalArticulo'))
const formArticulo = document.querySelector('form')
const btnCrear = document.querySelector('#btnCrear')



const id = document.querySelector('#id')
const nombre = document.querySelector('#nombre')
const email = document.querySelector('#email')
const password = document.querySelector('#password')

let opcion = ''


btnCrear.addEventListener('click', ()=> {

    id.value = ''
    nombre.value = ''
    email.value = ''
    password.value = ''

    modalArticulo.show()
    opcion = 'crear'


})

const mostrar = (data)=> {

    data.data.forEach(elements => {

        resultados += `
    
                <tr>
                    <td> ${elements.id} </td>
                    <td> ${elements.name} </td>
                    <td> ${elements.email} </td>
                    <td> ${elements.password} </td>
                    <td class="text-center" > <a class="btnEditar btn btn-primary">Editar </a> <a class="btnBorrar btn btn-danger">Borrar </a> </td>
                    
                </tr>
        `
    })

    contenedor.innerHTML = resultados

}


//Mostrar el registro
fetch(url)

    .then(resp => resp.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))


const on = (element, evento, selector, handble)=> {


    element.addEventListener(evento, e => {

        if (e.target.closest(selector)) {
            handble(e)
        }

    })
}


//!DELETE
on(document, 'click', '.btnBorrar', e => {
    
    const fila = e.target.parentNode.parentNode

    //Forma de capturar un id
    const id = fila.firstElementChild.innerHTML


    alertify.confirm("¿Esta seguro de eliminar al usuario?",
        function(){
            // alertify.success('Ok');
            fetch(`${url}/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(()=> location.reload())
        },
        function(){
            alertify.error('Cancel');
    })

})

//!EDITAR
let idForm = 0

on(document, 'click', '.btnEditar', e => {
    
    const fila = e.target.parentNode.parentNode

    //Forma de capturar un Id
    idForm = fila.children[0].innerHTML
    const nombreId = fila.children[1].innerHTML
    const emailId = fila.children[2].innerHTML
    const passwordId = fila.children[3].innerHTML


    id.value = idForm
    nombre.value = nombreId
    email.value = emailId
    password.value = passwordId

    opcion = 'editar'
    modalArticulo.show()



})

//!Procedimiento para Crear y Editar

formArticulo.addEventListener('submit', (e)=> {
    //Para no recargar la pagina

    e.preventDefault()
    if (opcion == 'crear') {

        const nombre = document.querySelector('#nombre')
        const email = document.querySelector('#email')
        const password = document.querySelector('#password')

        console.log('Opcion crear');
          let nuevosDatos = {
            name: nombre.value,
            password: password.value,
            email: email.value
    }
        fetch(`${url}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevosDatos)

        })
        .then( response => response.json())
        .catch(error => console.log(error))
    }


    if (opcion == 'editar') {

        const id = document.querySelector('#id')
        const nombre = document.querySelector('#nombre')
        const email = document.querySelector('#email')
        const password = document.querySelector('#password')

          let datosActualizados = {

            name: nombre.value,
            password: password.value,
            email: email.value
        }
        // console.log('Opcion editar');

        fetch(`${url}/${idForm}`,{

            
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosActualizados)
        })
        .then(response => response.json())
        .then(response => location.reload())
    }

    modalArticulo.hide()



})



