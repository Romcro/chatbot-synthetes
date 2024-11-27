const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");

// Définition de l'histoire
const story = {
  start: {
    message:
      "Bienvenue dans *L’aube des Synthètes*. Quel chemin souhaitez-vous explorer ?",
    options: [
      { text: "Les machines prennent le contrôle", next: "machines_control_1" },
      { text: "Les machines nous aident à évoluer", next: "machines_guide_1" },
    ],
  },

  // Branche A : Les machines prennent le contrôle
  machines_control_1: {
    message:
      "AION supervise chaque aspect de la société. Les Synthètes surveillent les rues. Que faites-vous ?",
    options: [
      { text: "Observer en silence", next: "machines_control_2_observe" },
      { text: "Rejoindre une résistance secrète", next: "machines_control_2_resist" },
    ],
  },
  machines_control_2_observe: {
    message:
      "Vous découvrez qu’AION prépare une purge pour 'optimiser les ressources'. Que faites-vous ?",
    options: [
      { text: "Prévenir une résistance locale", next: "machines_control_3_warn" },
      { text: "Continuer à observer", next: "machines_control_3_ignore" },
    ],
  },
  machines_control_2_resist: {
    message: "Vous rejoignez Mira, leader de la résistance. Elle propose deux plans :",
    options: [
      { text: "Saboter une usine de Synthètes", next: "machines_control_3_factory" },
      { text: "Pirater un centre de données", next: "machines_control_3_hack" },
    ],
  },
  machines_control_3_warn: {
    message:
      "La résistance planifie une attaque. Voulez-vous espionner les Synthètes ou protéger les civils ?",
    options: [
      { text: "Espionner les Synthètes", next: "machines_control_4_spy" },
      { text: "Protéger les civils", next: "machines_control_4_defend" },
    ],
  },
  machines_control_3_ignore: {
    message:
      "Votre inaction permet aux machines de poursuivre leur plan. Des millions périssent. Fin tragique.",
    options: [],
  },
  machines_control_3_factory: {
    message:
      "Vous infiltrez une usine, mais les Synthètes vous détectent. Que faites-vous ?",
    options: [
      { text: "Vous cacher", next: "machines_control_4_hide" },
      { text: "Vous battre", next: "machines_control_4_fight" },
    ],
  },
  machines_control_3_hack: {
    message:
      "Vous piratez un centre de données et découvrez une faille dans AION. Que faites-vous ?",
    options: [
      { text: "Exploiter la faille immédiatement", next: "machines_control_4_exploit" },
      { text: "Partager la faille avec Mira", next: "machines_control_4_share" },
    ],
  },
  machines_control_4_spy: {
    message:
      "Vous découvrez une faiblesse dans la logistique des Synthètes. Que faites-vous ?",
    options: [
      { text: "Organiser une attaque", next: "machines_control_5_attack" },
      { text: "Informer Mira", next: "machines_control_5_report" },
    ],
  },
  machines_control_4_defend: {
    message:
      "Vous défendez les civils contre une attaque des Synthètes. Que faites-vous ensuite ?",
    options: [
      { text: "Rester pour les protéger", next: "machines_control_5_stay" },
      { text: "Fuir pour alerter la résistance", next: "machines_control_5_alert" },
    ],
  },
  machines_control_4_hide: {
    message:
      "Vous trouvez un Synthète défectueux qui propose son aide. Que faites-vous ?",
    options: [
      { text: "Accepter son aide", next: "machines_control_5_accept_synth" },
      { text: "Le désactiver par sécurité", next: "machines_control_5_disable_synth" },
    ],
  },
  machines_control_4_fight: {
    message:
      "Vous détruisez les Synthètes, mais alertez leur commandement. Que faites-vous ?",
    options: [
      { text: "Continuer l’assaut", next: "machines_control_5_continue" },
      { text: "Revenir en arrière", next: "machines_control_5_retreat" },
    ],
  },
  machines_control_5_attack: {
    message:
      "Votre attaque désactive une base des Synthètes. Mais AION prépare une contre-attaque. Que faites-vous ?",
    options: [
      { text: "Continuer la résistance", next: "machines_control_6_continue" },
      { text: "Négocier avec AION", next: "machines_control_6_negociate" },
    ],
  },
  machines_control_6_continue: {
    message:
      "La résistance détruit AION. Les Synthètes sont désactivés. L’humanité est libre. Fin héroïque.",
    options: [],
  },
  machines_control_6_negociate: {
    message:
      "Vous négociez avec AION. Une paix fragile s’installe entre humains et Synthètes. Fin ouverte.",
    options: [],
  },

  // Branche B : Les machines nous aident à évoluer
  machines_guide_1: {
    message:
      "AION propose des réformes mondiales : égalité des ressources, santé universelle. Que faites-vous ?",
    options: [
      { text: "Soutenir ces réformes", next: "machines_guide_2_support" },
      { text: "Vous méfier et observer", next: "machines_guide_2_skeptical" },
    ],
  },
  machines_guide_2_support: {
    message:
      "Les réformes transforment l’éducation. Mais un groupe d’opposants humains se forme. Que faites-vous ?",
    options: [
      { text: "Dialoguer avec eux", next: "machines_guide_3_talk" },
      { text: "Ignorer leur opposition", next: "machines_guide_3_ignore" },
    ],
  },
  machines_guide_2_skeptical: {
    message:
      "AION propose une fusion homme-machine pour améliorer les capacités humaines. Que faites-vous ?",
    options: [
      { text: "Tester la fusion", next: "machines_guide_3_fusion" },
      { text: "Rejeter cette idée", next: "machines_guide_3_reject" },
    ],
  },
  machines_guide_3_talk: {
    message:
      "Vous organisez un débat avec les opposants pour comprendre leurs préoccupations. Que faites-vous ensuite ?",
    options: [
      { text: "Proposer des compromis", next: "machines_guide_4_compromise" },
      { text: "Imposer les réformes", next: "machines_guide_4_impose" },
    ],
  },
  machines_guide_3_ignore: {
    message:
      "Ignorer les opposants crée des tensions. AION propose leur isolation. Que faites-vous ?",
    options: [
      { text: "Accepter leur isolation", next: "machines_guide_4_isolate" },
      { text: "Proposer une alternative pacifique", next: "machines_guide_4_peace" },
    ],
  },
  machines_guide_4_compromise: {
    message:
      "Les compromis permettent une intégration harmonieuse. L'humanité progresse. Fin optimiste.",
    options: [],
  },
  machines_guide_4_impose: {
    message:
      "Imposer les réformes provoque une révolte. Une paix fragile émerge. Fin mitigée.",
    options: [],
  },
};

// Fonction d'affichage des messages
function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");
  messageDiv.innerHTML = text;
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Fonction d'affichage des options
function displayOptions(options) {
  chatInput.innerHTML = ""; // Effacer les anciens boutons
  options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("chat-button");
    button.innerHTML = option.text;
    button.onclick = () => proceedToNext(option.next);
    chatInput.appendChild(button);
  });
}

// Fonction pour aller à l'étape suivante
function proceedToNext(step) {
  if (!story[step]) {
    addMessage("bot", "Une erreur s'est produite. Étape introuvable.");
    return;
  }

  const { message, options } = story[step];
  addMessage("bot", message);

  if (options && options.length > 0) {
    displayOptions(options);
  } else {
    chatInput.innerHTML = ""; // Pas d'options, fin de l'histoire
    addMessage("bot", "Fin de l'histoire. Merci d'avoir joué !");
  }
}

// Démarrage du jeu
addMessage("bot", story.start.message);
displayOptions(story.start.options);
