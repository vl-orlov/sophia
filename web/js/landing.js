(function () {
    var reduceMotionStagger = window.matchMedia("(prefers-reduced-motion: reduce)");
    var staggerSections = document.querySelectorAll(
        ".landing_content_max > section.landing_section"
    );
    if (staggerSections.length) {
        function headlineDirectChildren(headline) {
            if (!headline) return [];
            return Array.prototype.slice.call(
                headline.querySelectorAll(
                    ":scope > h1, :scope > h2, :scope > h3, :scope > p, :scope > a, :scope > button"
                )
            );
        }

        function itemsForSection(section) {
            var id = section.id;
            var items = [];

            if (id === "_1") {
                var robot = section.querySelector(".landing_visual_robot");
                if (robot) items.push(robot);
                section.querySelectorAll(".landing_pillar_item").forEach(function (el) {
                    items.push(el);
                });
                var floatCta = section.querySelector(".landing_float_cta");
                if (floatCta) items.push(floatCta);
                return items;
            }
            if (id === "_2") {
                headlineDirectChildren(
                    section.querySelector(".landing_headline")
                ).forEach(function (el) {
                    items.push(el);
                });
                var slidersWrap = section.querySelector(".landing_section_2_sliders");
                if (slidersWrap) items.push(slidersWrap);
                return items;
            }
            if (id === "_3") {
                headlineDirectChildren(
                    section.querySelector(".landing_panel .landing_headline")
                ).forEach(function (el) {
                    items.push(el);
                });
                var casePreviews = section.querySelector(".landing_case_previews");
                if (casePreviews) items.push(casePreviews);
                return items;
            }
            if (id === "_4") {
                headlineDirectChildren(
                    section.querySelector(".landing_process_wrap .landing_headline")
                ).forEach(function (el) {
                    items.push(el);
                });
                var actionStack = section.querySelector(".landing_action_stack");
                var processCta = section.querySelector(".landing_process_cta_col");
                if (actionStack) items.push(actionStack);
                if (processCta) items.push(processCta);
                return items;
            }
            if (id === "_5") {
                headlineDirectChildren(
                    section.querySelector(".landing_panel .landing_headline")
                ).forEach(function (el) {
                    items.push(el);
                });
                var idiPrev = section.querySelector(".landing_idi_previews");
                var idiStage = section.querySelector(".landing_idi_stage");
                if (idiPrev) items.push(idiPrev);
                if (idiStage) items.push(idiStage);
                return items;
            }
            if (id === "_6") {
                headlineDirectChildren(
                    section.querySelector(".landing_headline")
                ).forEach(function (el) {
                    items.push(el);
                });
                var tech = section.querySelector(".landing_tech_layout");
                if (tech) items.push(tech);
                return items;
            }
            if (id === "_7") {
                headlineDirectChildren(
                    section.querySelector(".landing_panel .landing_headline")
                ).forEach(function (el) {
                    items.push(el);
                });
                section.querySelectorAll(".landing_result_card").forEach(function (el) {
                    items.push(el);
                });
                return items;
            }
            if (id === "_8") {
                headlineDirectChildren(
                    section.querySelector(".landing_panel .landing_headline")
                ).forEach(function (el) {
                    items.push(el);
                });
                var whyWrap = section.querySelector(".landing_why_actions_wrap");
                if (whyWrap) items.push(whyWrap);
                return items;
            }
            if (id === "_9") {
                var ctaCopy = section.querySelector(".landing_cta_copy");
                if (ctaCopy) {
                    var logo = ctaCopy.querySelector(".landing_cta_logo");
                    var hl = ctaCopy.querySelector(".landing_headline");
                    var ctaActions = ctaCopy.querySelector(".landing_cta_actions");
                    if (logo) items.push(logo);
                    headlineDirectChildren(hl).forEach(function (el) {
                        items.push(el);
                    });
                    if (ctaActions) items.push(ctaActions);
                }
                var illustration = section.querySelector(".landing_cta_illustration");
                if (illustration) items.push(illustration);
                return items;
            }

            return items;
        }

        var staggerIo = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("landing_stagger_revealed");
                    staggerIo.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );

        staggerSections.forEach(function (section) {
            var items = itemsForSection(section);
            if (!items.length) return;

            items.forEach(function (el, i) {
                el.classList.add("landing_stagger_item");
                el.style.setProperty("--landing-stagger-step", String(i));
            });

            if (reduceMotionStagger.matches) {
                section.classList.add("landing_stagger_revealed");
                return;
            }

            staggerIo.observe(section);
        });
    }
})();

(function () {
    const viewport = document.getElementById("landingCaseCarouselViewport");
    const track = document.getElementById("landingCaseCarouselTrack");
    const nextBtn = document.getElementById("landingCaseCarouselNext");
    const prevBtn = document.getElementById("landingCaseCarouselPrev");
    if (!viewport || !track || !nextBtn || !prevBtn) return;

    const realSlides = track.querySelectorAll(".landing_case_preview--solutions");
    if (realSlides.length < 2) return;

    const first = realSlides[0];
    const last = realSlides[realSlides.length - 1];
    const cloneLast = last.cloneNode(true);
    const cloneFirst = first.cloneNode(true);
    [cloneLast, cloneFirst].forEach(function (el) {
        el.setAttribute("aria-hidden", "true");
        el.setAttribute("inert", "");
    });
    track.insertBefore(cloneLast, first);
    track.appendChild(cloneFirst);

    const transition =
        "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let pos = 1;
    let locked = false;

    function setTransition(on) {
        if (reduceMotion.matches) {
            track.style.transition = "none";
            return;
        }
        track.style.transition = on ? transition : "none";
    }

    function slideHeight() {
        return viewport.clientHeight;
    }

    function applyTransform(animated) {
        setTransition(!!animated && !reduceMotion.matches);
        track.style.transform =
            "translateY(-" + pos * slideHeight() + "px)";
    }

    function syncBoundary() {
        var lastIndex = track.children.length - 1;
        var jumped = false;
        if (pos === lastIndex) {
            pos = 1;
            jumped = true;
        } else if (pos === 0) {
            pos = lastIndex - 1;
            jumped = true;
        }
        if (jumped) {
            setTransition(false);
            track.style.transform =
                "translateY(-" + pos * slideHeight() + "px)";
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    setTransition(true);
                });
            });
        }
    }

    function goNext() {
        if (locked) return;
        locked = true;
        pos += 1;
        applyTransform(true);
        if (reduceMotion.matches) {
            syncBoundary();
            locked = false;
        }
    }

    function goPrev() {
        if (locked) return;
        locked = true;
        pos -= 1;
        applyTransform(true);
        if (reduceMotion.matches) {
            syncBoundary();
            locked = false;
        }
    }

    track.addEventListener("transitionend", function (e) {
        if (e.propertyName !== "transform" || e.target !== track) return;
        syncBoundary();
        locked = false;
    });

    nextBtn.addEventListener("click", goNext);
    prevBtn.addEventListener("click", goPrev);

    window.addEventListener("resize", function () {
        setTransition(false);
        track.style.transform =
            "translateY(-" + pos * slideHeight() + "px)";
        requestAnimationFrame(function () {
            setTransition(true);
        });
    });

    setTransition(false);
    applyTransform(false);
    requestAnimationFrame(function () {
        setTransition(true);
    });
})();

const carouselTwoEl = document.getElementById("carouselTwoIndicators");
if (carouselTwoEl) {
    const carouseTwoIndicators = carouselTwoEl.children;
    const carouselTwoCurrent = 0;

    function carouselTwoSetActive(index) {}

    for (const indicator of carouseTwoIndicators) {
        console.log(indicator);
    }
}
