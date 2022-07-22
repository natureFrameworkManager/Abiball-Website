async function getMemberData() {
    const daten = await getData("https://intern.abiball-evaschulze.de/api.php?table=members");

    var grid = document.querySelector("#member-grid");
    daten.anw.forEach(element => {
        grid.innerHTML += '<div class="">Anwesendheit<br>' + element.split("-")[1] + '.' + element.split("-")[2] + '</div>';
    });
    grid.style.gridTemplateColumns = "repeat(" + (4 + daten.anw.length) + ", max-content)";
    for (const iterator in daten) {
        if (iterator != "anw") {

            grid.innerHTML += '<div>' + iterator + '</div>'+ 
            '<div><a href="mailto:' + daten[iterator].email + '">' + daten[iterator].email + '</a></div>' +
            '<div>' + (daten[iterator].tel == null ? '' : '<a href="tel:' + daten[iterator].telComp + '">' + daten[iterator].tel + '</a>') + '</div>' +
            '<div></div>';
            daten.anw.forEach(element => {
                grid.innerHTML += '<div><input class="check" type="checkbox" disabled  ' + (daten[iterator].anw[element] ? 'checked' : '') + '></div>';
            });
            console.log(daten[iterator]);
        }
    }
    console.log(daten);
}

async function getFinanceData() {
    const daten = await getData("https://intern.abiball-evaschulze.de/api.php?table=finance");

    var gridEarn = document.querySelector("#earnings-grid");
    var gridSpend = document.querySelector("#spending-grid");

    var earn = 0;
    var spend = 0;

    for (const iterator in daten.earnings) {
        gridEarn.innerHTML += '<div>' + daten.earnings[iterator].title + '</div>'+ 
        '<div>' + daten.earnings[iterator].info + '</div>' +
        '<div>' + moneyPrinter.format(daten.earnings[iterator].wert) + '</div>' +
        '<div></div>';

        earn += daten.earnings[iterator].wert;
    }
    
    for (const iterator in daten.spending) {
        gridSpend.innerHTML += '<div>' + daten.spending[iterator].title + '</div>'+ 
        '<div>' + daten.spending[iterator].info + '</div>' +
        '<div>' + moneyPrinter.format(daten.spending[iterator].wert) + '</div>' +
        '<div></div>';

        spend += daten.spending[iterator].wert;
    }

    document.querySelector("#earnings-full").innerText = moneyPrinter.format(earn);
    document.querySelector("#spending-full").innerText = moneyPrinter.format(spend);
    document.querySelector("#balance-full").innerText = moneyPrinter.format(earn - spend);
    console.log(daten)
}

!!document.querySelector("#overview-finance-grid") ? getFinanceData() : "";

!!document.querySelector("#member-grid") ? getMemberData() : "";

async function getData(url = '') {
    const response = await fetch(url);
    return response.json();
};

var moneyPrinter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });