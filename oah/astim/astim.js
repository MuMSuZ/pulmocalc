    // Normal Panel
var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
                
                var arrow = this.querySelector(".arrow");
                if (arrow.style.transform === "rotate(90deg)") {
                    arrow.style.transform = "rotate(0deg)";
                } else {
                    arrow.style.transform = "rotate(90deg)";
                }
            
            });
        }

            // Ana ve Alt Panel
    document.addEventListener('DOMContentLoaded', function () {
        const buttons = document.querySelectorAll('.toggle-button');
                
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const targetId = this.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);
            
                if (targetPanel.style.display === 'none' || targetPanel.style.display === '') {
                    targetPanel.style.display = 'block';
                } else {
                    targetPanel.style.display = 'none';
                }
            });
        });
    });

            // Açılır Pencere 
        var modal = document.getElementById("myModal");
        var btn = document.getElementById("openModal");
        var span = document.getElementsByClassName("close")[0];

        btn.onclick = function() {
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }