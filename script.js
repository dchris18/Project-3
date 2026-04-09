const screens = [...document.querySelectorAll(".screen")];
const navButtons = [...document.querySelectorAll(".nav-button")];
const screenButtons = [...document.querySelectorAll("[data-target-screen]")];

let activeScreen = "1";
const navFlow = {
  search: ["2", "6", "7", "8", "11"],
  filter: ["1", "9", "10"],
  chat: ["12"]
};
const navIndex = { search: 0, filter: 0, chat: 0 };

function showScreen(screenId) {
  const exists = screens.some((screen) => screen.dataset.screen === screenId);
  if (!exists) return;

  screens.forEach((screen) => {
    const isActive = screen.dataset.screen === screenId;
    screen.classList.toggle("active", isActive);
    screen.setAttribute("aria-hidden", String(!isActive));
  });

  activeScreen = screenId;
}

function setActiveNav(navName) {
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.nav === navName);
  });
}

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const navName = button.dataset.nav;
    const flow = navFlow[navName];
    if (!flow) return;

    navIndex[navName] = (navIndex[navName] + 1) % flow.length;
    showScreen(flow[navIndex[navName]]);
    setActiveNav(navName);
  });
});

screenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.targetScreen;
    if (!target) return;
    showScreen(target);
  });
});

showScreen(activeScreen);
setActiveNav("filter");
