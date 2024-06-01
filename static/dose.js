document.getElementById('doseForm').addEventListener('submit', function calculateDose(event) {
    event.preventDefault();
    
    const dyspnea = parseInt(document.querySelector('[name="dyspnea"]').value);
    const obstruction = parseInt(document.querySelector('[name="obstruction"]').value);
    const smokingStatus = parseInt(document.querySelector('[name="smoking_status"]').value);
    const exacerbations = parseInt(document.querySelector('[name="exacerbations"]').value);

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dyspnea: dyspnea,
            obstruction: obstruction,
            smoking_status: smokingStatus,
            exacerbations: exacerbations
        })
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<p>Hesaplanan DOSE İndeksi: ${data.score}</p>`;
    });
});