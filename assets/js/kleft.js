fetch("/assets/json/kleft.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const searchResult = $(".search-result");
    data.forEach((item) => {
      const card = $$("div", "card");
      const title = $$("div", "title", "", item.title);
      const link = $$("a", "link");
      link.href = item.link;
      link.append(title);
      card.append(link);
      searchResult.append(card);
    });
  });

const searchInput = $(".search-input");
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  document.querySelectorAll(".card").forEach((card) => {
    const title = card.querySelector(".title").innerText.toLowerCase();
    if (title.includes(keyword)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
