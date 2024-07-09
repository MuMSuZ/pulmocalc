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
            comment = 'Düşük alevlenme riski';
        } else if (doseScore > 3) {
            comment= "Yüksek alevlenme riski"
        }

        const resultContainer = document.querySelector('.result');
        resultContainer.innerHTML = `Sonuç: ${doseScore} <br><br> Yorum: ${comment}`;
    });
    document.getElementById('result').innerHTML = '';
});
