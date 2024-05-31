function calculateBode(event) {
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

    document.getElementById('result').innerText = `BODE İndeksi: ${bodeScore}`;
}