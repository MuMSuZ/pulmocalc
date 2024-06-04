document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('doseForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const dyspnea = parseInt(document.getElementById('dyspnea').value);
        const obstruction = parseInt(document.getElementById('obstruction').value);
        const smokingStatus = parseInt(document.getElementById('smoking_status').value);
        const exacerbations = parseInt(document.getElementById('exacerbations').value);

        const doseScore = dyspnea + obstruction + smokingStatus + exacerbations;

        let comment = '';
        if (doseScore <= 3) {
            comment = 'Durum iyi, belirtiler hafif.';
        } else if (doseScore <= 6) {
            comment = 'Durum orta, belirtiler orta derecede.';
        } else if (doseScore <= 8) {
            comment = 'Durum kötü, belirtiler ciddi.';
        } else {
            comment = 'Durum çok kötü, belirtiler çok ciddi.';
        }

        const resultContainer = document.querySelector('.result');
        resultContainer.innerHTML = `Sonuç: ${bodeScore} <br><br> Yorum: ${comment}`;
    });
    document.getElementById('result').innerHTML = '';
});
