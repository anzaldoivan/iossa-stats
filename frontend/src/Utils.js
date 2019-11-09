exports.getTournamentIcon = function(tournament) {
	if (tournament.includes("Liga D1")) {
		return "tournaments/ligad1.png"
	} else if (tournament.includes("Liga D2")) {
		return "tournaments/ligad2.png"
	} else if (tournament.includes("Copa Master")) {
		return "tournaments/copamaster.png"
	} else if (tournament.includes("Recopa Master")) {
		return "tournaments/recopamaster.png"
	} else if (tournament.includes("Copa Maradei")) {
		return "tournaments/copamaradei.png"
	} else if (tournament.includes("Copa America")) {
		return "tournaments/copaamerica.png"
	} else if (tournament.includes("Supercopa Master")) {
		return "tournaments/supercopamaster.png"
	} else if (tournament.includes("Copa del Sur")) {
		return "tournaments/copadelsur.png"
	} else if (tournament.includes("Copa Gubero")) {
		return "tournaments/cg.png"
	} else if (tournament.includes("Recopa Master T0")) {
		return "tournaments/recopamastert0.png"
	} else {
		return "tournaments/none.png"
	}
}

exports.plus = function(n) {
	if (n >= 0) {
		return "+" + n
	} else {
		return n
	}
}

exports.fecha = function(str) {
	var year = str.slice(0, 4)
    var month = str.slice(5, 7)
	var day = str.slice(8, 10)
	
	return (day + "/" + month + "/" + year)
}

exports.percentage = function(x,y){
	if (y === 0) {
		return (0)
	} else {
		return (Math.round((x/y)*100))
	}
}

exports.filterMethod = (filter, row) => {
	const id = filter.pivotId || filter.id;
	return row[id] !== undefined ? String(row[id].toLowerCase()).includes(filter.value.toLowerCase()) : true;
}
