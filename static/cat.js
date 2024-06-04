document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('catForm');
    form.addEventListener('submit', function(event) {
    event.preventDefault();

    const q1 = parseInt(document.getElementById('q1').value);
    const q2 = parseInt(document.getElementById('q2').value);
    const q3 = parseInt(document.getElementById('q3').value);
    const q4 = parseInt(document.getElementById('q4').value);
    const q5 = parseInt(document.getElementById('q5').value);
    const q6 = parseInt(document.getElementById('q6').value);
    const q7 = parseInt(document.getElementById('q7').value);
    const q8 = parseInt(document.getElementById('q8').value);

    const score = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8;

    document.getElementById('result').innerHTML = `CAT Skoru: ${score}`;
});

document.getElementById('result').innerHTML = '';
});