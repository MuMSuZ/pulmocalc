document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('doseForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const dyspnea = parseInt(document.getElementById('dyspnea').value);
        const obstruction = parseInt(document.getElementById('obstruction').value);
        const smokingStatus = parseInt(document.getElementById('smoking_status').value);
        const exacerbations = parseInt(document.getElementById('exacerbations').value);

        const doseScore = dyspnea + obstruction + smokingStatus + exacerbations;

        const resultContainer = document.querySelector('.result');

        let comment = '';
        if (bodeScore <= 3) {
            comment = 'Hafif KOAH.';
        } else if (bodeScore <= 6) {
            comment = 'Orta dereceli KOAH.';
        } else if (bodeScore <= 9) {
            comment = 'Şiddetli KOAH.';
        } else {
            comment = 'Çok şiddetli KOAH.';
        }

        document.getElementById('result').innerHTML = `Sonuç: ${bodeScore} <br><br> Yorum: ${comment}`;
    });

    document.getElementById('result').innerHTML = '';
});