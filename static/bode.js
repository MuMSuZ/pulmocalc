document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bodeForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const bmi = parseFloat(document.getElementById('bmi').value);
        const fev1Percent = parseFloat(document.getElementById('fev1_percent').value);
        const mrcDyspnea = parseInt(document.getElementById('mrc_dyspnea').value);
        const walkDistance = parseFloat(document.getElementById('walk_distance').value);

        let bmiScore = bmi < 21 ? 1 : 0;
        let fev1Score = fev1Percent >= 65 ? 0 : (fev1Percent >= 50 ? 1 : (fev1Percent >= 36 ? 2 : 3));
        let mrcScore = mrcDyspnea <= 1 ? 0 : (mrcDyspnea == 2 ? 1 : (mrcDyspnea == 3 ? 2 : 3));
        let walkScore = walkDistance >= 350 ? 0 : (walkDistance >= 250 ? 1 : (walkDistance >= 150 ? 2 : 3));

        let bodeScore = bmiScore + fev1Score + mrcScore + walkScore;

        let comment = '';
        if (bodeScore <= 3) {
            comment = 'Durumu iyi, belirtiler hafif.';
        } else if (bodeScore <= 6) {
            comment = 'Durumu orta, belirtiler orta derecede.';
        } else if (bodeScore <= 9) {
            comment = 'Durumu kötü, belirtiler ciddi.';
        } else {
            comment = 'Durumu çok kötü, belirtiler çok ciddi.';
        }

        document.getElementById('result').innerHTML = `Sonuç: ${bodeScore} <br><br> Yorum: ${comment}`;
    });

    document.getElementById('result').innerHTML = '';
});