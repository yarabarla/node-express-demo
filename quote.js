module.exports = {
	printQuote: printQuote
}

function printQuote(name, quote) {
	var html = `<html><body><h1>${name}</h1>${quote}</html>`
	return html
}
