const nota = Number(prompt("Introduce la primera nota"));
const nota1 = Number(prompt("Introduce la segunda nota"));
const nota2 = Number(prompt("Introduce la tercera nota"));

const media = (nota + nota1 + nota2) / 3;
console.log("Media: " + media, typeof media);

if(media < 5){
    console.log('Suspes');
} else if(media >= 5 && media <7){
    console.log('Aprovat');
} else if (media>=7 && media < 9){
    console.log('Notable');
} else if(media >= 9){
    console.log('Excelente');
}
