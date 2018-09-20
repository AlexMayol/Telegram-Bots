const Baits = {};
const sentences = [
    "Qué te crees que haces, crack",
    "Me parece que no",
    ":(",
    "Otro que va de listo",
    "Eres un poco pesado...",
]

Baits.pickBait = function(){
    return sentences[Math.floor(Math.random() * sentences.length)]
}


module.exports = Baits;