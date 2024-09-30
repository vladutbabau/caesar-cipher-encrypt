
// Construim o functie care parcurge sirul de caractere din fisierul "mesaj.txt"
// Salvez intr-o variabila 'caracter' de tip let fiecare litera din string
// Apoi verifica daca este un caracter valid pentru a-l converti(decripta) = concateneaza la rezultat fiecare caracter convertit dupa cifrul lui CEZAR 
// Dupa cifrul lui Cezar cu cheia(KEY) 3 cu ajutorul codului ASCII:
// Codurile literelor MICI de la a-z se afla in intervalul 97(a) - 122(z) inclusiv
// Codurile literelor MARI de la A-Z se afla in intervalul 65(A) - 90(Z) inclusiv

const decripteazaMesaj = (mesaj) => {
    let rezultat = '';
    let cheia = 3;

    // Parcurgem string-ul
    for (let i = 0; i < mesaj.length; i++) {
        let caracter = mesaj[i];

        // Verificam daca caracterul este o litera din alfabet
        if (caracter.match(/[a-zA-Z]/)) {
            // Obtinem codul ASCII pentru caracterul curent
            let cod = mesaj.charCodeAt(i);

            // Verificam daca caracterul este litea mica
            if (cod >= 97 && cod <= 122) {
                if (cod < 100) {
                    caracter = String.fromCharCode(cod + 26 - cheia);
                } else {
                // Daca caracterul se afla in primele 3 litere din alfabet atunci 
                // Pentru a decripta trebuie sa ajunga la finalul alfabetului si sa scada cheia
                    caracter = String.fromCharCode(cod - cheia)
                }
            }
            // Verificam daca caracterul este litera mare
            else if (cod >= 65 && cod <= 90) {
                if (cod < 68) {
                    caracter = String.fromCharCode(cod + 26 - cheia);
                } else {
                    // Daca caracterul se afla in primele 3 litere din alfabet atunci
                    // Pentru a decripta trebuie sa ajunga la finalul alfabetului si sa scada cheia
                    caracter = String.fromCharCode(cod - cheia)
                }
            }
        }

        // Adaugam caracterul decriptat la rezultat
        rezultat += caracter;
    }

    return rezultat; // Returnam rezultatul decriptarii
};

const decriptareMesaj = () => {
    fetch('./mesaj.txt') // Specificam calea spre fisierul criptat
        .then(response => {
            if (!response.ok) {
                throw new Error('Raspunsul de la server nu a fost ok');
            }
            return response.text();
        })
        .then(data => {
            const mesajDecriptat = decripteazaMesaj(data); // Decriptăm mesajul
        
            // Cream un obiect Blob cu conținutul criptat
            const blob = new Blob([mesajDecriptat], { type: 'text/plain' });
            // Cream un obiect URL pentru Blob
            const url = URL.createObjectURL(blob);
            // Cream un link pentru descărcarea fișierului
            const link = document.createElement('a');
            link.href = url;
            link.download = 'mesajdecriptat.txt'; // Specificăm numele fișierului pentru descarcare
            // Adaugam link-ul în DOM si pornim descarcarea
            document.body.appendChild(link);
            link.click();
            // Ștergem obiectul URL după ce descărcarea este completă
            URL.revokeObjectURL(url);
        })
        
        .catch(error => {
            console.error('A fost o problema cu citirea din fisier: ', error);
        });
};

$(".btn-decriptare").on("click", decriptareMesaj);