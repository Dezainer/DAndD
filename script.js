function calculateProbabilities() {
	let exp = document.getElementsByName('exp')[0].value,
		enemy = document.getElementsByName('enemy')[0].value

	showResults(calculateOdds(exp, enemy))
}

function showResults(odds) {
	let plays = odds.plays,
		effective = odds.effectivePlays,
		percentage = odds.killPercentage,
		resultsEl = document.getElementById('results'),
		chanceEl = document.getElementById('chance'),
		playsEl = document.getElementById('plays'),
		effectiveEl = document.getElementById('effective')

	chanceEl.textContent = percentage+' %'

	effective.map(function (ef) {
		let li = document.createElement('li')
		li.textContent = ef.dices+' = '+ef.total

		effectiveEl.appendChild(li)
	})

	plays.map(function (play) {
		let li = document.createElement('li')
		li.textContent = play.dices+' = '+play.total

		playsEl.appendChild(li)
	})

	resultsEl.style.display = 'block'
}