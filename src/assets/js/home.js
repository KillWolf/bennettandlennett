// A new Erik pose on every page load.
(function () {
  var poses = [
    ["erik-idle.png", 272, 464],
    ["erik-walk.png", 272, 460],
    ["erik-talk.png", 272, 464],
    ["erik-reach-up.png", 348, 536],
    ["erik-reach.png", 396, 464]
  ];
  var pose = poses[Math.floor(Math.random() * poses.length)];
  var img = document.getElementById("erik");
  img.src = "/assets/erik/" + pose[0];
  img.width = pose[1];
  img.height = pose[2];
})();

// Click Erik for a game-style verb menu: Look at / Talk to.
(function () {
  var lines = JSON.parse(document.getElementById("erik-lines").textContent);
  var wrap = document.querySelector(".erik");
  var button = document.getElementById("erik-button");
  var menu = document.getElementById("erik-menu");
  var says = document.getElementById("erik-says");
  var items = Array.prototype.slice.call(menu.querySelectorAll("[role=menuitem]"));
  var lastLine = {};

  function pick(verb) {
    var options = lines[verb];
    var line;
    do {
      line = options[Math.floor(Math.random() * options.length)];
    } while (options.length > 1 && line === lastLine[verb]);
    lastLine[verb] = line;
    return line;
  }

  function open(x, y) {
    menu.hidden = false;
    // Keep the menu inside Erik's area.
    var maxX = wrap.clientWidth - menu.offsetWidth;
    var maxY = wrap.clientHeight - menu.offsetHeight;
    menu.style.left = Math.max(0, Math.min(x, maxX)) + "px";
    menu.style.top = Math.max(0, Math.min(y, maxY)) + "px";
    button.setAttribute("aria-expanded", "true");
    items[0].focus();
  }

  function close(refocus) {
    if (menu.hidden) return;
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    if (refocus) button.focus();
  }

  button.addEventListener("click", function (event) {
    if (!menu.hidden) return close(true);
    var box = wrap.getBoundingClientRect();
    // A mouse click opens the menu where you clicked; a keypress opens it on his chest.
    var fromPointer = event.detail > 0;
    open(
      fromPointer ? event.clientX - box.left : box.width * 0.3,
      fromPointer ? event.clientY - box.top : box.height * 0.35
    );
  });

  items.forEach(function (item, i) {
    item.addEventListener("click", function () {
      var verb = item.getAttribute("data-verb");
      var line = pick(verb);
      says.className = "dialogue" + (verb === "lookAt" ? " is-narration" : "");
      // Erik speaks Danish; the narration is English.
      says.lang = verb === "talkTo" ? "da" : "en";
      says.textContent = verb === "talkTo" ? "“" + line + "”" : line;
      close(true);
    });
    item.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        var step = event.key === "ArrowDown" ? 1 : -1;
        items[(i + step + items.length) % items.length].focus();
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") close(true);
  });
  document.addEventListener("click", function (event) {
    if (!wrap.contains(event.target)) close(false);
  });
})();
