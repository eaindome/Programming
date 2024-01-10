window.onload = function(){
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    const chevronsDown = document.querySelectorAll(".bx-chevron-down");
    const iconLinks = document.querySelectorAll(".icon-links");

    closeBtn.addEventListener("click",function(){
        sidebar.classList.toggle("open")
    });

    iconLinks.forEach(function(iconLink) {
        iconLink.addEventListener("click", function(event){
            event.preventDefault(); // Prevent the default action
            console.log('Table clicked');
            // Find the sub-menu within the clicked icon link
            const subMenu = iconLink.querySelector(".sub-menu");
            subMenu.classList.toggle("show");
        });
    });

    chevronsDown.forEach(function(chevronDown) {
        chevronDown.addEventListener("click", function() {
            console.log('Chevron down clicked');
            // Find the sub-menu that's a sibling of the clicked chevron
            const siblingSubMenu = chevronDown.nextElementSibling.querySelector(".sub-menu");
            siblingSubMenu.classList.toggle("show");
        });
    });
}