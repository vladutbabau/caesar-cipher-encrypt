

// Construim o functie care parcurge sirul de caractere din fisierul "mesaj.txt"
// Salvez intr-o variabila 'caracter' de tip let fiecare litera din string
// Apoi verifica daca este un caracter valid pentru a-l converti(cripta) = concateneaza la rezultat fiecare caracter convertit dupa cifrul lui CEZAR 
// Dupa cifrul lui Cezar cu cheia(KEY) 3 cu ajutorul codului ASCII:
// Codurile literelor MICI de la a-z se afla in intervalul 97(a) - 122(z) inclusiv
// Codurile literelor MARI de la A-Z se afla in intervalul 65(A) - 90(Z) inclusiv

const cripteazaMesaj = (mesaj) => {
    let rezultat = '';
    let cheia = 4;

    // Parcurgem string-ul
    for (let i = 0; i < mesaj.length; i++) {
        let caracter = mesaj[i];

        // Verificam daca caracterul este o litera din alfabet
        if (caracter.match(/[a-zA-Z]/)) {
            // Obtinem codul ASCII pentru caracterul curent
            let cod = mesaj.charCodeAt(i);

            // Verificam daca caracterul este litera mica
            if (cod >= 97 && cod <= 122) {
                if (cod < 120) {
                    caracter = String.fromCharCode(cod + cheia);
                } else {
                    // Daca litera se afla in ultimele 3 litere din alfabet
                    // se intoarce inapoi la prima
                    caracter = String.fromCharCode(cod - 26 + cheia)
                }
            }
            // Verificam daca caracterul este litera mare
            else if (cod >= 65 && cod <= 90) {
                //Verificam daca litera NU se afla la finalul alfabetului
                if (cod < 88) {
                    caracter = String.fromCharCode(cod + cheia);
                } else {
                    // Daca litera se afla in ultimele 3 litere din alfabet
                    // se intoarce inapoi la prima
                    caracter = String.fromCharCode(cod - 26 + cheia)
                }
            }
        }

        // Adaugam caracterul criptat la rezultat
        rezultat += caracter;
    };
    return rezultat;
}


const criptareMesaj = () => {
    
    fetch('./mesaj.txt')
    .then(response => {
        // Verificăm dacă răspunsul este OK (codul 200)
        if (!response.ok) {
            throw new Error('Raspunsul de la server nu a fost ok');
        }
        // Returnăm conținutul răspunsului sub formă de text
        return response.text();
    })
    .then(data => {
        const mesajCriptat = cripteazaMesaj(data); // Retinem rezultatul functiei intr-o constanta
        // Cream un obiect Blob cu continutul criptat
        const blob = new Blob([mesajCriptat], { type: 'text/plain' });
        // Cream un obiect URL pentru Blob
        const url = URL.createObjectURL(blob);
        // Cream un link pentru descărcarea fisierului
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mesajcriptat.txt'; // Specificam numele fisierului pentru descarcare
        // Adaugam link-ul în DOM si declansam descarcarea
        document.body.appendChild(link);
        link.click();
        // Stergem obiectul URL dupa ce se termina descarcarea fisierului
        URL.revokeObjectURL(url);
    })
    .catch(error => {
        // Tratam eventualele erori
        console.error('A fost o problema cu citirea din fisier: ', error);
    });
}

$(".btn-criptare").on("click", criptareMesaj);