document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('doseForm');
    const resultContainer = document.querySelector('.result');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const dyspnea = parseInt(document.getElementById('dyspnea').value);
        const obstruction = parseInt(document.getElementById('obstruction').value);
        const smokingStatus = parseInt(document.getElementById('smoking_status').value);
        const exacerbations = parseInt(document.getElementById('exacerbations').value);

        const doseScore = dyspnea + obstruction + smokingStatus + exacerbations;

        let comment = '';
        if (doseScore <= 3) {
            comment = 'Düşük alevlenme riski';
        } else {
            comment = 'Yüksek alevlenme riski (hastane yatışı, solunum yetmezliği ve ölüm riskinin artmasıyla ilişkili) ';
        }

        resultContainer.innerHTML = `Sonuç: ${doseScore} <br><br> Yorum: ${comment}`;
    });

    resultContainer.innerHTML = '';
});
