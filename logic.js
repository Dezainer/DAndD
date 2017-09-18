function calculateOdds(exp, enemy) {
	let	inf = getData(exp),
		possibilities = getAllProbs(inf.x, inf.y),
		effective = getEffectivePlays(possibilities, enemy),
		percentage = calculatePercentage(effective, possibilities)
	
	return {
		plays: possibilities,
		effectivePlays: effective,
		killPercentage: percentage
	}
}

function getData(spell) {
	let init = spell.split('d'),
		times = init[0],
		linit = init[1].split('+'),
		damage = linit[0],
		extra = linit[1]

	return {
		x: parseInt(times),
		y: parseInt(damage),
		z: parseInt(extra)
	}
}

function getAllProbs(dices, damage) {
	let damages = [],
		plays = [],
		playCounter = 0,
		counter = 1,
		current = 1

	for (var i = dices; i > 0; i--) {

		let turns = []

		for (var k = Math.pow(damage, i); k > 0; k--) {
			for (var j = 1; j <= Math.pow(damage, counter - 1); j++) {
				turns.push(current)

				if(i == dices) {
					plays.push(current)
				} else {
					plays[playCounter] += ' + '+current
					playCounter++
				}
			}

			if(current == damage) {
				current = 1
			} else {
				current++
			}
		}

		counter++
		playCounter = 0

		if(damages.length == 0) {
			damages = turns
		} else {
			damages = sumArrays(damages, turns)
		}
	}
	
	return mergeInf(damages, plays)
}

function sumArrays(arr1, arr2) {
	let result = []

	for (var i = 0; i < arr1.length; i++) {
		result.push(arr1[i] + arr2[i])
	}

	return result
}

function mergeInf(damages, plays) {
	let probs = []

	for (var i = 0; i < damages.length; i++) {
		probs.push({
			dices: plays[i],
			total: damages[i]
		})
	}

	return probs
}

function getEffectivePlays(plays, enemy) {
	return plays.filter(function (play) {
		return play.total >= enemy
	})
}

function calculatePercentage(effective, plays) {
	return (effective.length * 100) / plays.length
}