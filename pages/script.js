document.addEventListener("DOMContentLoaded", function () {
  function setActiveNavLink() {
    // Dapatkan nama file dari URL saat ini
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    // Dapatkan semua link di navbar
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileLinks = document.querySelectorAll(".drawer-side a");

    // Periksa setiap link di desktop navbar
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");

        // Jika link berada dalam dropdown, buka dropdown-nya
        const parentDetails = link.closest("details");
        if (parentDetails) {
          parentDetails.setAttribute("open", "");
        }
      }
    });

    // Periksa setiap link di mobile navbar
    mobileLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");

        // Jika link berada dalam dropdown, buka dropdown-nya
        const parentDetails = link.closest("details");
        if (parentDetails) {
          parentDetails.setAttribute("open", "");
        }
      }
    });
  }

  // Jika navbar di-load dinamis, tunggu navbar selesai dimuat
  const navbarPlaceholder = document.getElementById("navbar-placeholder");
  if (navbarPlaceholder) {
    fetch("/components/navbar.html")
      .then((res) => res.text())
      .then((html) => {
        navbarPlaceholder.innerHTML = html;
        setActiveNavLink();

        // Setelah navbar, load footer jika ada
        const footerPlaceholder = document.getElementById("footer");
        if (footerPlaceholder) {
          fetch("/components/footer.html")
            .then((res) => res.text())
            .then((footerHtml) => {
              footerPlaceholder.innerHTML = footerHtml;
            });
        }
      });
  } else {
    setActiveNavLink();

    // Jika navbar tidak dinamis, tetap load footer jika ada
    const footerPlaceholder = document.getElementById("footer");
    if (footerPlaceholder) {
      fetch("/components/footer.html")
        .then((res) => res.text())
        .then((footerHtml) => {
          footerPlaceholder.innerHTML = footerHtml;
        });
    }
  }
});
