document.addEventListener('DOMContentLoaded', function() {
    const geriButonu = document.getElementById('geriButonu');
    
    geriButonu.addEventListener('click', function() {
        window.history.back();
    });
});