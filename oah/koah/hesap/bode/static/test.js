document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bodeForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const bmi = parseFloat(document.getElementById('bmi').value);
        const fev1Percent = parseFloat(document.getElementById('fev1_percent').value);
        const mrcDyspnea = parseInt(document.getElementById('mrc_dyspnea').value);
        const walkDistance = parseFloat(document.getElementById('walk_distance').value);

        const score = bodeIndex(bmi, fev1Percent, mrcDyspnea, walkDistance);
        const comment = getBodeComment(score);

        resultDiv.innerHTML = `Sonuç: ${score} <br><br> Yorum: ${comment}`;
    });

    function bodeIndex(bmi, fev1Percent, mrcDyspnea, walkDistance) {
        let bmiScore = (bmi < 21) ? 1 : 0;

        let fev1Score;
        if (fev1Percent >= 65) {
            fev1Score = 0;
        } else if (fev1Percent >= 50) {
            fev1Score = 1;
        } else if (fev1Percent >= 36) {
            fev1Score = 2;
        } else {
            fev1Score = 3;
        }

        let mrcScore;
        if (mrcDyspnea === 0 || mrcDyspnea === 1) {
            mrcScore = 0;
        } else if (mrcDyspnea === 2) {
            mrcScore = 1;
        } else if (mrcDyspnea === 3) {
            mrcScore = 2;
        } else {
            mrcScore = 3;
        }

        let walkScore;
        if (walkDistance >= 350) {
            walkScore = 0;
        } else if (walkDistance >= 250) {
            walkScore = 1;
        } else if (walkDistance >= 150) {
            walkScore = 2;
        } else {
            walkScore = 3;
        }

        return bmiScore + fev1Score + mrcScore + walkScore;
    }

    function getBodeComment(score) {
        if (score <= 3) {
            return 'Hafif KOAH.';
        } else if (score <= 6) {
            return 'Orta dereceli KOAH.';
        } else if (score <= 9) {
            return 'Şiddetli KOAH.';
        } else {
            return 'Çok şiddetli KOAH.';
        }
    }

    resultDiv.innerHTML = '';
});
