// https://patorjk.com/software/taag/#p=display&f=Fire%20Font-k&t=Arman%20Hakobyan
// https://www.asciiart.eu/art-and-design/pentacles

var pastInput = document.getElementById("pastInput");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var commands = [];

setTimeout(function() {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }

  if (e.keyCode == 13) {
    commands.push(command.innerHTML);
    git = commands.length;
    addLine("guest@arman-hkb-porfolio:~$ " + command.innerHTML, "no-animation", 0);
    commander(command.innerHTML.toLowerCase());
    command.innerHTML = "";
    textarea.value = "";
  }
  if (e.keyCode == 38 && git != 0) {
    git -= 1;
    textarea.value = commands[git];
    command.innerHTML = textarea.value;
  }
  if (e.keyCode == 40 && git != commands.length) {
    git += 1;
    if (commands[git] === undefined) {
      textarea.value = "";
    } else {
      textarea.value = commands[git];
    }
    command.innerHTML = textarea.value;
  }
}

function commander(cmd) {
  switch (cmd.toLowerCase()) {
    case "help":
      loopLines(help, "", 80);
      break;
    case "about":
      loopLines(about, "", 80);
      break;
    case "projects":
      loopLines(projects, "", 80);
      break;
    case "resume":
      addLine('Chargement de mon CV...<br><br>', "", 80);
      newTab(resume);
      break;
    case "email":
      addLine('Chargement mailto:<a href="'+email+'">arman.hakobyan.pro@gmail.com</a>...<br><br>', "", 80);
      newTab(email);
      break;
    case "tel":
        addLine('Chargement tel:<a href="'+tel+'">06 24 18 71 35</a>...<br><br>', "", 80);
        newTab(tel);
        break;
    case "clear" || "cls":
      setTimeout(function() {
        terminal.innerHTML = '<a id="pastInput"></a>';
        pastInput = document.getElementById("pastInput");
      }, 1);
      break;
    case "linkedin":
      addLine("Ouverture de LinkedIn...<br><br>", "", 0);
      newTab(linkedin);
      break;
    case "github":
      addLine("Ouverture de GitHub...<br><br>", "", 0);
      newTab(github);
      break;
    default:
      addLine("<span class=\"inherit\">Commande invalide. Pour obtenir une liste de commandes, tapez <span class=\"command\">'help'</span>.</span><br><br>", "error", 100);
      break;
  }
}

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    pastInput.parentNode.insertBefore(next, pastInput);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}
