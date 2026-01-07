package es.cide.programacion;

import java.util.Scanner;

import javax.sound.midi.Soundbank;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String frase[] = new String[10];
        boolean verdad = true;
        int i, cuenta;
        i = 0;
        cuenta = 0;

        System.out.println("Pon una palabra para ver cuantas veces aparece en el array");
        String frase2 = sc.next();

        while(i < 10){
            System.out.println("Pon una frase para el array");
            frase[i] = sc.nextLine();
            while (true) {
                 
                if (frase.length() == frase2) {
                    cuenta++;
                }
            }

        }


        sc.close();
    }
}