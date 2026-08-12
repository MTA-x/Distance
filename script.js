/* =========================================================
   DOM ELEMENTS
========================================================= */

const progressBar =
    document.getElementById("progressBar");

const cursorDot =
    document.getElementById("cursorDot");

const startButton =
    document.getElementById("startButton");

const musicButton =
    document.getElementById("musicButton");

const backgroundMusic =
    document.getElementById("backgroundMusic");

const chatWindow =
    document.getElementById("chatWindow");

const heroStars =
    document.getElementById("heroStars");

const endingStars =
    document.getElementById("endingStars");

const letterModal =
    document.getElementById("letterModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");

const modalIcon =
    document.getElementById("modalIcon");

const modalTitle =
    document.getElementById("modalTitle");

const modalMessage =
    document.getElementById("modalMessage");

const photoModal =
    document.getElementById("photoModal");

const photoModalOverlay =
    document.getElementById("photoModalOverlay");

const photoModalClose =
    document.getElementById("photoModalClose");

const photoModalImage =
    document.getElementById("photoModalImage");

const photoModalCaption =
    document.getElementById("photoModalCaption");

const yesButton =
    document.getElementById("yesButton");

const maybeButton =
    document.getElementById("maybeButton");

const answerMessage =
    document.getElementById("answerMessage");

const heartContainer =
    document.getElementById("heartContainer");

const canvas =
    document.getElementById("starCanvas");

const ctx =
    canvas.getContext("2d");


/* =========================================================
   MUSIC SETTINGS
========================================================= */

const MUSIC_VOLUME = 0.20;

let musicPlaying = false;

let musicFadeInterval = null;


/* =========================================================
   START BUTTON
========================================================= */

startButton.addEventListener(
    "click",
    function () {

        document
            .getElementById("message")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =========================================================
   PROGRESS BAR
========================================================= */

window.addEventListener(
    "scroll",
    updateProgress
);


function updateProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    progressBar.style.width =
        `${progress}%`;

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

document.addEventListener(
    "mousemove",
    function (event) {

        cursorDot.style.left =
            `${event.clientX}px`;

        cursorDot.style.top =
            `${event.clientY}px`;

        cursorDot.style.opacity =
            "1";

    }
);


document.addEventListener(
    "mouseleave",
    function () {

        cursorDot.style.opacity =
            "0";

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("visible");

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   HERO / ENDING STARS
========================================================= */

function createStars(
    container,
    amount
) {

    if (!container) {
        return;
    }


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const star =
            document.createElement(
                "span"
            );


        star.classList.add(
            "star"
        );


        const x =
            Math.random() * 100;

        const y =
            Math.random() * 100;

        const size =
            Math.random() * 2 + 1;

        const duration =
            Math.random() * 4 + 2;

        const delay =
            Math.random() * 4;


        star.style.left =
            `${x}%`;

        star.style.top =
            `${y}%`;

        star.style.width =
            `${size}px`;

        star.style.height =
            `${size}px`;

        star.style.animationDuration =
            `${duration}s`;

        star.style.animationDelay =
            `${delay}s`;


        container.appendChild(
            star
        );

    }

}


createStars(
    heroStars,
    100
);


createStars(
    endingStars,
    80
);


/* =========================================================
   CHAT ANIMATION
========================================================= */

let chatPlayed =
    false;


const chatObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting &&
                        !chatPlayed
                    ) {

                        chatPlayed = true;

                        playChat();

                    }

                }
            );

        },

        {
            threshold: 0.35
        }

    );


if (chatWindow) {

    chatObserver.observe(
        chatWindow
    );

}


function playChat() {

    const chatItems =
        document.querySelectorAll(
            ".hidden-chat"
        );


    chatItems.forEach(
        function (item) {

            const delay =
                Number(
                    item.dataset.delay
                );


            setTimeout(
                function () {

                    item.classList.add(
                        "show-chat"
                    );

                },
                delay
            );

        }
    );


    const typing =
        document.querySelector(
            ".typing"
        );


    setTimeout(
        function () {

            if (!typing) {
                return;
            }


            typing.style.opacity =
                "0";

            typing.style.transform =
                "translateY(10px)";


            setTimeout(
                function () {

                    typing.style.display =
                        "none";

                },
                400
            );

        },
        9200
    );

}


/* =========================================================
   OPEN WHEN MODAL
========================================================= */

const letterCards =
    document.querySelectorAll(
        ".letter-card"
    );


letterCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const title =
                    card.dataset.title;

                const icon =
                    card.dataset.icon;

                const message =
                    card.dataset.message;


                modalTitle.textContent =
                    title;

                modalIcon.textContent =
                    icon;

                modalMessage.textContent =
                    message;


                letterModal
                    .classList
                    .add("active");


                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


function closeLetterModal() {

    letterModal
        .classList
        .remove("active");


    document.body.style.overflow =
        "";

}


modalClose.addEventListener(
    "click",
    closeLetterModal
);


modalOverlay.addEventListener(
    "click",
    closeLetterModal
);


/* =========================================================
   PHOTO MODAL
========================================================= */

const polaroids =
    document.querySelectorAll(
        ".polaroid"
    );


polaroids.forEach(
    function (polaroid) {

        polaroid.addEventListener(
            "click",
            function () {

                const image =
                    polaroid.querySelector(
                        "img"
                    );


                const caption =
                    polaroid.dataset.caption;


                photoModalImage.src =
                    image.src;


                photoModalCaption.textContent =
                    caption;


                photoModal
                    .classList
                    .add("active");


                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


function closePhotoModal() {

    photoModal
        .classList
        .remove("active");


    document.body.style.overflow =
        "";

}


photoModalClose.addEventListener(
    "click",
    closePhotoModal
);


photoModalOverlay.addEventListener(
    "click",
    closePhotoModal
);


/* =========================================================
   ESC CLOSE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeLetterModal();

            closePhotoModal();

        }

    }
);


/* =========================================================
   YES / MAYBE
========================================================= */

yesButton.addEventListener(
    "click",
    function () {

        answerMessage.textContent =
            "Then it was worth making every single line of it. ♡";


        createHeartExplosion(
            35
        );

    }
);


const maybeMessages = [

    "Okay... then I clearly need to try harder. :)",

    "Maybe is still better than no. I'll take it.",

    "Hmm... I think I can earn at least one little smile.",

    "Challenge accepted. ♡"

];


maybeButton.addEventListener(
    "click",
    function () {

        const randomIndex =
            Math.floor(
                Math.random() *
                maybeMessages.length
            );


        answerMessage.textContent =
            maybeMessages[randomIndex];

    }
);


/* =========================================================
   HEART EXPLOSION
========================================================= */

function createHeartExplosion(
    amount
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(
            function () {

                createFloatingHeart();

            },
            i * 70
        );

    }

}


function createFloatingHeart() {

    const heart =
        document.createElement(
            "div"
        );


    heart.classList.add(
        "floating-heart"
    );


    heart.textContent =
        Math.random() > 0.5
            ? "♡"
            : "♥";


    const left =
        Math.random() * 100;


    const size =
        Math.random() * 22 + 13;


    const duration =
        Math.random() * 3 + 3;


    heart.style.left =
        `${left}%`;


    heart.style.fontSize =
        `${size}px`;


    heart.style.animationDuration =
        `${duration}s`;


    heartContainer.appendChild(
        heart
    );


    setTimeout(
        function () {

            heart.remove();

        },
        duration * 1000
    );

}


/* =========================================================
   STAR CANVAS
========================================================= */

let canvasStars =
    [];


function resizeCanvas() {

    if (
        !canvas ||
        !ctx
    ) {
        return;
    }


    const rect =
        canvas.getBoundingClientRect();


    const pixelRatio =
        window.devicePixelRatio || 1;


    canvas.width =
        rect.width *
        pixelRatio;


    canvas.height =
        rect.height *
        pixelRatio;


    ctx.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );


    createCanvasStars();

}


function createCanvasStars() {

    canvasStars = [];


    const rect =
        canvas.getBoundingClientRect();


    const amount =
        window.innerWidth < 700
            ? 90
            : 180;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        canvasStars.push({

            x:
                Math.random() *
                rect.width,

            y:
                Math.random() *
                rect.height,

            radius:
                Math.random() *
                1.5 +
                0.2,

            alpha:
                Math.random() *
                0.8 +
                0.1,

            speed:
                Math.random() *
                0.01 +
                0.003,

            phase:
                Math.random() *
                Math.PI *
                2

        });

    }

}


function animateCanvasStars(
    time
) {

    if (
        !canvas ||
        !ctx
    ) {
        return;
    }


    const rect =
        canvas.getBoundingClientRect();


    ctx.clearRect(
        0,
        0,
        rect.width,
        rect.height
    );


    canvasStars.forEach(
        function (star) {

            const alpha =
                Math.max(
                    0.08,
                    star.alpha +
                    Math.sin(
                        time *
                        star.speed +
                        star.phase
                    ) *
                    0.25
                );


            ctx.beginPath();


            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(255,255,255,${alpha})`;


            ctx.fill();

        }
    );


    requestAnimationFrame(
        animateCanvasStars
    );

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


requestAnimationFrame(
    animateCanvasStars
);


/* =========================================================
   MUSIC
========================================================= */

/*
    Müzik dosyası:

    music/song.mp3

    HTML içerisinde zaten tanımlı.
*/


backgroundMusic.volume =
    0;


/* =========================================================
   MUSIC FADE IN
========================================================= */

function fadeMusicIn() {

    clearInterval(
        musicFadeInterval
    );


    backgroundMusic.volume =
        0;


    musicFadeInterval =
        setInterval(
            function () {

                let newVolume =
                    backgroundMusic.volume +
                    0.01;


                if (
                    newVolume >=
                    MUSIC_VOLUME
                ) {

                    newVolume =
                        MUSIC_VOLUME;


                    clearInterval(
                        musicFadeInterval
                    );

                }


                backgroundMusic.volume =
                    Math.min(
                        newVolume,
                        1
                    );

            },
            120
        );

}


/* =========================================================
   MUSIC FADE OUT
========================================================= */

function fadeMusicOut() {

    clearInterval(
        musicFadeInterval
    );


    musicFadeInterval =
        setInterval(
            function () {

                let newVolume =
                    backgroundMusic.volume -
                    0.02;


                if (
                    newVolume <= 0
                ) {

                    backgroundMusic.volume =
                        0;


                    backgroundMusic.pause();


                    clearInterval(
                        musicFadeInterval
                    );


                    return;

                }


                backgroundMusic.volume =
                    newVolume;

            },
            80
        );

}


/* =========================================================
   MUSIC BUTTON
========================================================= */

musicButton.addEventListener(
    "click",
    async function () {

        const source =
            backgroundMusic.querySelector(
                "source"
            );


        if (
            !source ||
            !source.getAttribute("src")
        ) {

            console.log(
                "Music file was not found."
            );

            return;

        }


        if (
            !musicPlaying
        ) {

            try {

                await backgroundMusic.play();


                musicPlaying =
                    true;


                fadeMusicIn();


                musicButton.textContent =
                    "❚❚";


                musicButton.title =
                    "Pause music";


                musicButton
                    .setAttribute(
                        "aria-label",
                        "Pause music"
                    );


                musicButton
                    .classList
                    .add(
                        "playing"
                    );

            }

            catch (error) {

                console.log(
                    "Music could not start:",
                    error
                );

            }

        }

        else {

            musicPlaying =
                false;


            fadeMusicOut();


            musicButton.textContent =
                "♫";


            musicButton.title =
                "Play music";


            musicButton
                .setAttribute(
                    "aria-label",
                    "Play music"
                );


            musicButton
                .classList
                .remove(
                    "playing"
                );

        }

    }
);


/* =========================================================
   IF SONG ENDS
========================================================= */

backgroundMusic.addEventListener(
    "pause",
    function () {

        if (
            backgroundMusic.currentTime ===
            backgroundMusic.duration
        ) {

            musicPlaying =
                false;

        }

    }
);


/* =========================================================
   HERO PARALLAX
========================================================= */

const hero =
    document.querySelector(
        ".hero"
    );


window.addEventListener(
    "scroll",
    function () {

        const scroll =
            window.scrollY;


        if (
            scroll <
            window.innerHeight
        ) {

            hero.style.backgroundPosition =
                `center ${scroll * 0.15}px`;

        }

    }
);


/* =========================================================
   POLAROID EFFECT
========================================================= */

polaroids.forEach(
    function (card) {

        card.addEventListener(
            "mousemove",
            function (event) {

                if (
                    window.innerWidth <
                    700
                ) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width /
                    2;


                const centerY =
                    rect.height /
                    2;


                const rotateX =
                    (y - centerY) /
                    30;


                const rotateY =
                    (centerX - x) /
                    30;


                card.style.transform =
                    `
                    perspective(700px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   AUTO START MUSIC
========================================================= */

async function startBackgroundMusic() {

    if (musicPlaying) {
        return true;
    }

    try {

        backgroundMusic.volume = 0;

        await backgroundMusic.play();

        musicPlaying = true;

        fadeMusicIn();

        musicButton.textContent = "❚❚";
        musicButton.title = "Pause music";
        musicButton.setAttribute("aria-label", "Pause music");
        musicButton.classList.add("playing");

        return true;

    }
    catch (error) {

        console.log(
            "Browser blocked audible autoplay. Music will start on the first user interaction.",
            error
        );

        return false;
    }
}


function enableMusicOnFirstInteraction() {

    const eventNames = [
        "pointerdown",
        "touchstart",
        "keydown",
        "click"
    ];


    const startOnInteraction = async function (event) {

        /*
            Müzik butonuna basılmışsa mevcut buton kodu yönetsin.
            Böylece aynı tıklama müziği açıp hemen kapatmaz.
        */
        if (
            event.target &&
            event.target.closest &&
            event.target.closest("#musicButton")
        ) {
            return;
        }


        const started =
            await startBackgroundMusic();


        if (started) {

            eventNames.forEach(
                function (eventName) {

                    document.removeEventListener(
                        eventName,
                        startOnInteraction,
                        true
                    );

                }
            );
        }
    };


    eventNames.forEach(
        function (eventName) {

            document.addEventListener(
                eventName,
                startOnInteraction,
                true
            );

        }
    );
}


/* =========================================================
   INITIAL LOAD
========================================================= */

window.addEventListener(
    "load",
    async function () {

        updateProgress();


        /*
            Önce sayfa açılır açılmaz müziği başlatmayı dener.
            Tarayıcı sesli autoplay'i engellerse ilk kullanıcı
            etkileşiminde otomatik olarak başlatır.
        */

        const started =
            await startBackgroundMusic();


        if (!started) {
            enableMusicOnFirstInteraction();
        }


        setTimeout(
            function () {

                document
                    .querySelectorAll(
                        ".hero .reveal"
                    )
                    .forEach(
                        function (
                            element,
                            index
                        ) {

                            setTimeout(
                                function () {

                                    element
                                        .classList
                                        .add(
                                            "visible"
                                        );

                                },
                                index * 170
                            );

                        }
                    );

            },
            200
        );

    }
);
