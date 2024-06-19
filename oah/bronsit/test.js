function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    if (panel.style.display === 'block') {
        panel.style.display = 'none';
    } else {
        panel.style.display = 'block';
    }
}
            

window.onload = function() {
    // Tüm panellerin gizli olmasını sağla
    const panels = document.querySelectorAll('.panel, .alt-panel');
    panels.forEach(panel => {
        panel.style.display = 'none';
    });
};

