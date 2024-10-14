function getValues() {
    const { inputMontant, inputTaux, inputAnnee } = window;
    let montant = Math.abs(inputMontant.valueAsNumber) || 0,
        annee = Math.abs(inputAnnee.valueAsNumber) || 0,
        mois = annee * 12 || 1,
        taux = Math.abs(inputTaux.valueAsNumber) || 0,
        tauxMensuel = taux / 100 / 12
    return { montant, annee, mois, taux, tauxMensuel }
}

let calculMensualite = function (montant, tauxMensuel, mois) {
    let remboursementMensuel;
    if (tauxMensuel) {
        remboursementMensuel = montant * tauxMensuel /
            (1 - (Math.pow(1 / (1 + tauxMensuel), mois)));
    }
    else {
        remboursementMensuel = montant / mois;
    }
    return remboursementMensuel;
}

function updateTable(montant, tauxMensuel, mois, mensualite) {
    let tableBody = document.getElementById('inputMensualite').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; 
    let capitalRestant = montant;
    for (let i = 1; i <= mois; i++) {
        let interet = capitalRestant * tauxMensuel;
        let capitalAmorti = mensualite - interet;
        capitalRestant -= capitalAmorti;

        let row = tableBody.insertRow();
        row.insertCell(0).innerText = i;
        row.insertCell(1).innerText = capitalAmorti.toFixed(2);
        row.insertCell(2).innerText = interet.toFixed(2);
        row.insertCell(3).innerText = capitalRestant.toFixed(2);
        row.insertCell(4).innerText = mensualite.toFixed(2);

        if (capitalRestant + mensualite + interet > montant) {
            row.id = 'perte';
        }
    }
}

Array.from(document.querySelectorAll('input'), input => {
    input.addEventListener("input", function (event) {
        let { montant, tauxMensuel, mois } = getValues();
        let mensualite = calculMensualite(montant, tauxMensuel, mois);
        updateTable(montant, tauxMensuel, mois, mensualite);
    }, false);
});