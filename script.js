
const goals = [
    {
        title: "NO POVERTY",
        color: "#E5243B",
        tag: "END POVERTY",
        description: "End poverty in all its forms everywhere."
    },
    {
        title: "ZERO HUNGER",
        color: "#DDA63A",
        tag: "END HUNGER",
        description: "End hunger, achieve food security and improved nutrition, and promote sustainable agriculture."
    },
    {
        title: "GOOD HEALTH AND WELL-BEING",
        color: "#4C9F38",
        tag: "HEALTH FOR ALL",
        description: "Ensure healthy lives and promote well-being for everyone, at every age."
    },
    {
        title: "QUALITY EDUCATION",
        color: "#C5192D",
        tag: "EDUCATION FOR ALL",
        description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all."
    },
    {
        title: "GENDER EQUALITY",
        color: "#FF3A21",
        tag: "EQUAL RIGHTS",
        description: "Achieve gender equality and empower all women and girls."
    },
    {
        title: "CLEAN WATER AND SANITATION",
        color: "#26BDE2",
        tag: "WATER FOR EVERYONE",
        description: "Ensure availability and sustainable management of water and sanitation for all."
    },
    {
        title: "AFFORDABLE AND CLEAN ENERGY",
        color: "#FCC30B",
        tag: "CLEAN ENERGY",
        description: "Ensure access to affordable, reliable, sustainable and modern energy for all."
    },
    {
        title: "DECENT WORK AND ECONOMIC GROWTH",
        color: "#A21942",
        tag: "SUSTAINABLE ECONOMIES",
        description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment, and decent work for all."
    },
    {
        title: "INDUSTRY, INNOVATION AND INFRASTRUCTURE",
        color: "#FD6925",
        tag: "BUILD THE FUTURE",
        description: "Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation."
    },
    {
        title: "REDUCED INEQUALITIES",
        color: "#DD1367",
        tag: "EQUALITY FOR ALL",
        description: "Reduce inequality within and among countries."
    },
    {
        title: "SUSTAINABLE CITIES AND COMMUNITIES",
        color: "#FD9D24",
        tag: "BETTER COMMUNITIES",
        description: "Make cities and human settlements inclusive, safe, resilient and sustainable."
    },
    {
        title: "RESPONSIBLE CONSUMPTION AND PRODUCTION",
        color: "#BF8B2E",
        tag: "CONSUME RESPONSIBLY",
        description: "Ensure sustainable consumption and production patterns."
    },
    {
        title: "CLIMATE ACTION",
        color: "#3F7E44",
        tag: "PROTECT OUR PLANET",
        description: "Take urgent action to combat climate change and its impacts."
    },
    {
        title: "LIFE BELOW WATER",
        color: "#0A97D9",
        tag: "PROTECT OUR OCEANS",
        description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development."
    },
    {
        title: "LIFE ON LAND",
        color: "#56C02B",
        tag: "PROTECT NATURE",
        description: "Protect, restore and promote sustainable use of terrestrial ecosystems and halt biodiversity loss."
    },
    {
        title: "PEACE, JUSTICE AND STRONG INSTITUTIONS",
        color: "#00689D",
        tag: "PEACE AND JUSTICE",
        description: "Promote peaceful and inclusive societies, provide access to justice for all, and build effective institutions."
    },
    {
        title: "PARTNERSHIPS FOR THE GOALS",
        color: "#19486A",
        tag: "WORKING TOGETHER",
        description: "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development."
    }
];

// SETTINGS

const AUTO_PLAY_INTERVAL = 6500;

let currentGoal = 0;
let isPlaying = true;
let transitionLocked = false;
let autoplayTimer;

// ELEMENTS

const root = document.documentElement;
const goalContent = document.getElementById("goalContent");

const goalNumber = document.getElementById("goalNumber");
const goalNumberLarge = document.getElementById("goalNumberLarge");
const goalIndex = document.getElementById("goalIndex");
const goalTitle = document.getElementById("goalTitle");
const goalDescription = document.getElementById("goalDescription");
const goalTag = document.getElementById("goalTag");
const goalCounter = document.getElementById("goalCounter");

const progressText = document.getElementById("progressText");
const progressTrack = document.getElementById("progressTrack");

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const autoplayToggle = document.getElementById("autoplayToggle");
const autoplayLabel = document.getElementById("autoplayLabel");
const playIcon = document.getElementById("playIcon");

// HELPERS

function formatNumber(number) {
    return String(number).padStart(2, "0");
}

// BUILD PROGRESS INDICATORS

goals.forEach((goal, index) => {
    const dot = document.createElement("button");

    dot.className = "progress-dot";
    dot.setAttribute("aria-label", `Go to goal ${index + 1}`);
    dot.setAttribute("title", `Goal ${index + 1}: ${goal.title}`);

    dot.addEventListener("click", () => {
        showGoal(index, index > currentGoal ? "next" : "previous");
        restartAutoplay();
    });

    progressTrack.appendChild(dot);
});

// RENDER GOAL

function renderGoal(index) {
    const goal = goals[index];
    const number = formatNumber(index + 1);

    root.style.setProperty("--goal-color", goal.color);

    goalNumber.textContent = number;
    goalNumberLarge.textContent = number;
    goalIndex.textContent = number;

    goalTitle.textContent = goal.title;
    goalDescription.textContent = goal.description;
    goalTag.textContent = goal.tag;

    goalNumber.textContent = number;
    goalNumber.setAttribute("aria-hidden", "true");

    goalNumberLarge.textContent = number;

    goalNumber.textContent = number;
    goalNumberSmallUpdate(number);

    goalCounter.textContent = `${number} — 17`;
    progressText.textContent = `${index + 1} OF 17`;

    document.querySelector('meta[name="theme-color"]')
        .setAttribute("content", goal.color);

    document.querySelectorAll(".progress-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
        dot.setAttribute("aria-current", i === index ? "step" : "false");
    });
}

function goalNumberSmallUpdate(number) {
    goalNumber.textContent = number;
    document.getElementById("goalNumber").textContent = `${number} / 17`;
}

// TRANSITIONS

function showGoal(index, direction = "next") {
    if (transitionLocked || index === currentGoal) return;

    transitionLocked = true;

    const oldIndex = currentGoal;
    currentGoal = (index + goals.length) % goals.length;

    goalContent.classList.remove(
        "leaving-next",
        "leaving-previous",
        "entering"
    );

    goalContent.classList.add(
        direction === "next" ? "leaving-next" : "leaving-previous"
    );

    setTimeout(() => {
        renderGoal(currentGoal);

        goalContent.classList.remove(
            "leaving-next",
            "leaving-previous"
        );

        goalContent.classList.add("entering");

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                goalContent.classList.remove("entering");
            });
        });

        setTimeout(() => {
            transitionLocked = false;
        }, 750);

    }, 380);
}

// NAVIGATION

function nextGoal() {
    showGoal((currentGoal + 1) % goals.length, "next");
}

function previousGoal() {
    showGoal((currentGoal - 1 + goals.length) % goals.length, "previous");
}

nextBtn.addEventListener("click", () => {
    nextGoal();
    restartAutoplay();
});

previousBtn.addEventListener("click", () => {
    previousGoal();
    restartAutoplay();
});

// AUTOPLAY

function startAutoplay() {
    clearInterval(autoplayTimer);

    if (!isPlaying) return;

    autoplayTimer = setInterval(() => {
        if (!document.hidden) {
            nextGoal();
        }
    }, AUTO_PLAY_INTERVAL);
}

function stopAutoplay() {
    clearInterval(autoplayTimer);
}

function restartAutoplay() {
    if (isPlaying) startAutoplay();
}

function updateAutoplayButton() {
    if (isPlaying) {
        autoplayLabel.textContent = "PAUSE";

        playIcon.innerHTML = `
            <path d="M8 5V19M16 5V19"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"/>
        `;

        autoplayToggle.setAttribute("aria-label", "Pause slideshow");
    } else {
        autoplayLabel.textContent = "PLAY";

        playIcon.innerHTML = `
            <path d="M8 5L19 12L8 19V5Z"
                  fill="currentColor"/>
        `;

        autoplayToggle.setAttribute("aria-label", "Resume slideshow");
    }
}

autoplayToggle.addEventListener("click", () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
        startAutoplay();
    } else {
        stopAutoplay();
    }

    updateAutoplayButton();
});

// KEYBOARD CONTROLS

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        nextGoal();
        restartAutoplay();
    }

    if (event.key === "ArrowLeft") {
        previousGoal();
        restartAutoplay();
    }

    if (event.code === "Space" && event.target.tagName !== "BUTTON") {
        event.preventDefault();
        autoplayToggle.click();
    }
});

// INITIALIZE

renderGoal(currentGoal);
updateAutoplayButton();
startAutoplay();
