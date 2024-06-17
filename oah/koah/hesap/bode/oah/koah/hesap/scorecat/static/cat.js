document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('catForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const q1 = parseInt(document.querySelector('input[name="q1"]:checked')?.value || 0);
        const q2 = parseInt(document.querySelector('input[name="q2"]:checked')?.value || 0);
        const q3 = parseInt(document.querySelector('input[name="q3"]:checked')?.value || 0);
        const q4 = parseInt(document.querySelector('input[name="q4"]:checked')?.value || 0);
        const q5 = parseInt(document.querySelector('input[name="q5"]:checked')?.value || 0);
        const q6 = parseInt(document.querySelector('input[name="q6"]:checked')?.value || 0);
        const q7 = parseInt(document.querySelector('input[name="q7"]:checked')?.value || 0);
        const q8 = parseInt(document.querySelector('input[name="q8"]:checked')?.value || 0);

        const score = q1 + q2 + q3 + q4 + q5 + q6 + q7 + q8;

        let comment = '';
        if (score <= 10) {
            comment = 'Durumu iyi, belirtiler hafif.';
        } else if (score <= 20) {
            comment = 'Durumu orta, belirtiler orta derecede.';
        } else if (score <= 30) {
            comment = 'Durumu kötü, belirtiler ciddi.';
        } else {
            comment = 'Durumu çok kötü, belirtiler çok ciddi.';
        }

        document.getElementById('result').innerHTML = `Sonuç: ${score} <br><br> Yorum: ${comment}`;
    });

    document.getElementById('result').innerHTML = '';
});
