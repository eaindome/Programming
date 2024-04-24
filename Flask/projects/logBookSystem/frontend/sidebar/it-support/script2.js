window.onload = function(){
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
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
            if (subMenu) {
                subMenu.classList.toggle("show");
            }
        });
    });
}