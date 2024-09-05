function performSearch() {
    const searchTerm = document.querySelector(".input").value;
    window.location.href =
      "https://www.google.com/search?q=" + encodeURIComponent(searchTerm);
  }