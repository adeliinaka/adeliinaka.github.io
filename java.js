var visi_cilveki = [
		{ name: 'Gatis', img: 'galvas/galva_1.png', id: 'galva_1' },
		{ name: 'Daukijs', img: 'galvas/galva_2.png', id: 'galva_2' },
		{ name: 'Toms', img: 'galvas/galva_3.png', id: 'galva_3' },
		{ name: 'Ade', img: 'galvas/galva_4.png', id: 'galva_4' },
		{ name: 'Jana', img: 'galvas/galva_5.png', id: 'galva_5' },
		{ name: 'Paula', img: 'galvas/galva_6.png', id: 'galva_6' },
		{ name: 'Elza', img: 'galvas/galva_7.png', id: 'galva_7' },
		{ name: 'Evelina', img: 'galvas/galva_8.png', id: 'galva_8' },
		{ name: 'Evija', img: 'galvas/galva_9.png', id: 'galva_9' },
		{ name: 'Matiss', img: 'galvas/galva_10.png', id: 'galva_10' },
		{ name: 'Viesturs', img: 'galvas/galva_11.png', id: 'galva_11' },
		{ name: 'Ricards', img: 'galvas/galva_12.png', id: 'galva_12' },
		{ name: 'Reivija', img: 'galvas/galva_13.png', id: 'galva_13' },
	{ name: 'Babincevs', img: 'galvas/galva_14.png', id: 'galva_14' },
	];
	
	var kritosie = []
	
	var torni = [
		{ name: 'slidenis', img: 'score/slidenis.png', members: [], sortable_after_caught: true},
		{ name: 'kraukla_nags', img: 'score/kraukla_nags.png', members: [], sortable_after_caught: true},
		{ name: 'grifindors', img: 'score/grifindors.png', members: [], sortable_after_caught: true},
		{ name: 'elsputis', img: 'score/elsputis.png', members: [], sortable_after_caught: true},
		{ name: 'nave', img: 'score/nave.png', members: [], sortable_after_caught: false}
	] 
	
var oneStepCepurei = 50;
var pauzeStarpKritieniem = 3000;
var cikArtiKritGalvas = 500;
var intervalsGalvasPievienosana;
var spiestIntervals;

function leftArrowPressed() {
	cepure = document.getElementById("cepure");
	if (cepure.getBoundingClientRect().left > oneStepCepurei) {
		cepure.style.left = parseInt(cepure.style.left) - oneStepCepurei + 'px';
	}
}

function navesIndeks(){
	filtered = torni.filter(x => x.sortable_after_caught == false);
	return torni.indexOf(filtered[0])
	}

function randomTornisIndex(){
		filtered = torni.filter(x => x.sortable_after_caught == true);
		return torni.indexOf(filtered[Math.floor(Math.random() * filtered.length)])
		}

function rightArrowPressed() {
	cepure = document.getElementById("cepure");
	if ((cepure.getBoundingClientRect().right + oneStepCepurei) < window.innerWidth) {
		cepure.style.left = parseInt(cepure.style.left) + oneStepCepurei + 'px';
	}
}

function moveSelection(evt) {
	switch (evt.keyCode) {
	case 37:
		leftArrowPressed();
		break;
	case 39:
		rightArrowPressed();
		break;
	}
}


function spiestPoguKreisi() {
	spiestIntervals = setInterval( leftArrowPressed ,100 );
}

function nespiestPoguKreisi() {
	clearInterval(spiestIntervals);
}

function spiestPoguLabi() {
	spiestIntervals = setInterval( rightArrowPressed ,100 );
}

function nespiestPoguLabi() {
	clearInterval(spiestIntervals);
}

function start(){
	document.addEventListener('keydown', moveSelection);
	cepure = document.getElementById("cepure");
 	window_width = window.innerWidth;
	window_height = window.innerHeight;
	cepure.style.top = window_height - 270 + 'px';
	intervalsGalvasPievienosana = setInterval(function(){ pievienotGalvu(); }, pauzeStarpKritieniem);
	setInterval(function(){ galvasKrit(); }, cikArtiKritGalvas);
	atraditRezultatu();
	
}
 
function atraditRezultatu(){
	 rezultats = document.getElementById("rezultats")
	rezultats.innerHTML = '<table><tr>'+ tornuBildes()+'</tr><tr>'+tornuRezultati()+'</tr></table>'
}
function tornuRezultati(){
	rezultati = []
	for (i = 0; i < torni.length; i++) {
		rezultati.push('<td>'+torni[i].members.length+'</td>')
	}
	return rezultati.join('')
}
function tornuBildes(){
	bildes = []
	for (i = 0; i < torni.length; i++) {
		bildes.push('<th><img src="'+torni[i].img+'"></th>')
	}
	return bildes.join('')
}

function generetEkranu(){
	return '<button class="poga" onClick="window.location.reload();">Play again</button><table class="tabula"><tr>'+ tornuBildes()+'</tr><tr>'+lielieRezultati()+'</tr></table>'
}

function lielieRezultati(){
	vardi = []
	for (i = 0; i < torni.length; i++){
		vardi.push('<td><table>'+sejuBildes(torni[i].members)+'</table></td>')
	}
	return vardi.join('')
}

function sejuBildes(members){
	if (members.length > 0){
		sejas = []
		for (z = 0; z < members.length; z++){
			sejas.push('<tr><th><img class="sejas" src="'+members[z].img+'"></th><th class="vards">'+members[z].name+'</th></tr>')
		}
		return sejas.join('')
	}
	else {
		return '<tr><th></th></tr>'
	}
}

function pievienotGalvu(){
	if (visi_cilveki.length > 0){
	speles_laukums = document.getElementById("spele")
	speles_laukums.innerHTML = speles_laukums.innerHTML + galvasRandom()
	}
}

function izlozeGalvu(){
	izveletais_elementa_numurs = Math.floor(Math.random() * visi_cilveki.length)
	izlozeta_galva = visi_cilveki.splice(izveletais_elementa_numurs, 1)[0]
	kritosie.push(izlozeta_galva)

	return izlozeta_galva
}

function galvasRandom() {
	randomGalva = izlozeGalvu()
	return '<img src="'+randomGalva.img+'" id="'+randomGalva.id+'" class="galvas" style="top: 0px; left: '+randomPozicija()+'">';
}

function randomPozicija(){
	return Math.floor(Math.random() * (window.innerWidth - 300))+100+ 'px'
}

function galvasKrit(){
	var elements = document.getElementsByClassName("galvas");
	var cepure = document.getElementById("cepure");
	var i;
	for (i = 0; i < elements.length; i++) { galvasAnalizet(elements[i], cepure) }
}

function galvasAnalizet(galva, cepure){
	galvaPosition = galva.getBoundingClientRect()
	cepurePosition = cepure.getBoundingClientRect()
	
	if ( galvaPosition.bottom > cepurePosition.top ){
		if (galvaPosition.left >= cepurePosition.left && galvaPosition.right <= cepurePosition.right){
			ieliktTorni(galva)
		} else {
			
			ieliktNave(galva)
		}
		galva.remove()
	} else {
		galva.style.top = parseInt(galva.style.top) + 50 + 'px';
	}
	if ((visi_cilveki.length+kritosie.length) == 0){
		clearInterval(intervalsGalvasPievienosana);
		paraditRezultatuEkranu() 
	}
}

function paraditRezultatuEkranu() {
	rezultatuEkrans	= document.getElementById("score_table")
	rezultatuEkrans.style.display = "block"
	rezultatuEkrans.innerHTML = generetEkranu()
}


function ieliktNave(galva){
	aizkritusi_galva = kritosie.filter(x => x.id == galva.getAttribute("id"))[0]
	torni[navesIndeks()].members.push(aizkritusi_galva)
	kritosie.splice(kritosie.indexOf(aizkritusi_galva), 1)
	atraditRezultatu()
}

function ieliktTorni(galva){
	iekritusi_galva = kritosie.filter(x => x.id == galva.getAttribute("id"))[0]
	torni[randomTornisIndex()].members.push(iekritusi_galva)
	kritosie.splice(kritosie.indexOf(iekritusi_galva), 1)
	atraditRezultatu()
}

