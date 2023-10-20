function dateDePub(dateDeCreation){

    let annee = dateDeCreation.getFullYear()
    let mois = dateDeCreation.getMonth() // 0-11
    let date = dateDeCreation.getDate()

    const nomsDesMois = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
   
       
    return `${date} ${nomsDesMois[mois]} ${annee}`
    
   
}

module.exports = {dateDePub}