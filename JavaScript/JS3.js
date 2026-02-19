let primer = ["Lenguajes", "Sistemas", "Programación"];
let segon = ["Sistemas de gestion", "Interficies", "Programacion Multimedia"];

let DAM = [primer, segon];

for(var i = 0; i < primer.length; i++){
    console.log(primer[i]);
}
for(var i = 0; i < segon.length; i++){
    console.log(segon[i]);
}
for(var i = 0; i < primer.length; i++){
    for(var i = 0; i < segon.length; i++){
        console.log(DAM[i]);
    }
}

function afegirAsig(){
    let nueva = prompt('Introduce una nueva asignatura');
    primer.push(nueva);
    console.log(nueva);
}

function eliminarAsig(){
    let del = prompt('Introduce una asignatura para eliminar');
    del = del.toLowerCase();
    for(var i = 0; i < primer.length; i++){
        if(del == primer[i].toLowerCase()){
            primer.splice(i, 1);
            alert('Asignatura eliminada');
        }
        else {
            alert('Asignatura no encontrada');
        }
    }
    for(var i = 0; i < primer.length; i++){
        if(del == segon[i].toLowerCase()){
            primer.splice(i, 1);
            alert('Asignatura eliminada');
        }
        else {
            alert('Asignatura no encontrada');
        }
    }
    console.log(del);

}

function cercarAsig(){
    let search = prompt('Introduce una asignatuta para buscar');
    search = search.toLowerCase();
    for(var i = 0; i < primer.length; i++){
        if(search == primer[i].toLowerCase()){
            alert('Esta clase se encuentra en las de primer año')
        } else {
            alert('Esta clase no esta en las de primer año')
        }
    }
    for(var i = 0; i < segon.length; i++){
        if(search == segon[i]){
            alert('Esta clase se encuentra en las de segundo año')
        } else {
            alert('Esta clase no esta en las de segundo año')
        }
    }    
    console.log(search);
}

function mostrarAsig(){
    for(var i = 0; i < primer.length; i++){
        for(var i = 0; i < segon.length; i++){
            console.log(DAM[i]);
        }
    }
}