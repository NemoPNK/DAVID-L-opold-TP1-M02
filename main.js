const API_URL = "http://localhost:8080/api/agora";

async function getSalles() {
    const response = await fetch(`${API_URL}/salles`, {
        method: "GET"
    });

    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data;
}

async function afficherSalles() {
    const catalogue = document.querySelector(".salle-container");
    const titreSalles = document.querySelector(".titre-salles");

    try {
        const data = await getSalles();

        catalogue.querySelectorAll("article").forEach(article => article.remove());

        titreSalles.textContent = `${data.total} salles`;

        data.contenu.forEach((salle) => {
            const article = document.createElement("article");

            const span = document.createElement("span");
            const img = document.createElement("img");
            img.src = "public/icones/batiment.svg";
            img.alt = "Icône d'un bâtiment";
            span.appendChild(img);

            const cardContent = document.createElement("div");
            cardContent.classList.add("card-content");

            const h2Titre = document.createElement("h2");
            h2Titre.textContent = salle.nom;

            const infoSalle = document.createElement("div");
            infoSalle.classList.add("info-salle");

            const pQuartier = document.createElement("p");
            pQuartier.textContent = salle.quartier;

            const pCapacite = document.createElement("p");
            pCapacite.textContent = `${salle.capacite} personnes`;

            infoSalle.append(pQuartier, pCapacite);

            const salleEquipement = document.createElement("div");
            salleEquipement.classList.add("salle-equipement");

            (salle.equipements || []).forEach((equipement) => {
                const label = document.createElement("label");
                label.textContent = typeof equipement === "string"
                    ? equipement
                    : equipement.libelle;
                salleEquipement.appendChild(label);
            });

            const prixContainer = document.createElement("div");
            prixContainer.classList.add("prix-container");

            const prixMontvert = document.createElement("p");
            prixMontvert.classList.add("prix-salle-montvert");
            prixMontvert.textContent = "Gratuit pour les associations de Montvert";

            const prixHors = document.createElement("p");
            prixHors.classList.add("prix-salle-hors");
            prixHors.textContent = "30€/h hors Montvert";

            prixContainer.append(prixMontvert, prixHors);

            const aFiche = document.createElement("a");
            aFiche.textContent = "Voir la salle";
            aFiche.href = `salle.html?id=${salle.id}`;

            cardContent.append(h2Titre, infoSalle, salleEquipement, prixContainer, aFiche);

            article.append(span, cardContent);

            const btnAfficherPlus = catalogue.querySelector(".afficher-plus");
            catalogue.insertBefore(article, btnAfficherPlus);
        });

    } catch (error) {
        console.error("Erreur lors du chargement des salles :", error);
    }
}

afficherSalles();
