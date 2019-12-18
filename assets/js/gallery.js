var text = '{ "gallery" : [' +
'{ "Title":"city" , "Category":"city", "Date":"Sat Dec 06 2019", "url":"assets/images/1.jpg" },' +
'{ "Title":"pet" , "Category":"city", "Date":"Sat Dec 06 2019", "url":"assets/images/2.jpg" },' +
'{ "Title":"nature" , "Category":"nature", "Date":"Sat Dec 16 2019", "url":"assets/images/3.jpg" },' +
'{ "Title":"city" , "Category":"city", "Date":"Sat Dec 12 2019", "url":"assets/images/4.jpg" },' +
'{ "Title":"religion" , "Category":"religion", "Date":"Sat Dec 12 2019", "url":"assets/images/5.jpg" },' +
'{ "Title":"nature" , "Category":"nature", "Date":"Sat Dec 13 2019", "url":"assets/images/6.jpg" },' +
'{ "Title":"nature" , "Category":"nature", "Date":"Sat Dec 12 2019", "url":"assets/images/7.jpg" },' +
'{ "Title":"trees" , "Category":"nature", "Date":"Sat Dec 12 2019", "url":"assets/images/8.jpg" },' +
'{ "Title":"water" , "Category":"nature", "Date":"Sat Dec 13 2019", "url":"assets/images/9.jpg" },' +
'{ "Title":"city" , "Category":"city", "Date":"Sat Dec 06 2019", "url":"assets/images/1.jpg" },' +
'{ "Title":"pet" , "Category":"city", "Date":"Sat Dec 06 2019", "url":"assets/images/2.jpg" },' +
'{ "Title":"nature" , "Category":"nature", "Date":"Sat Dec 16 2019", "url":"assets/images/3.jpg" },' +
'{ "Title":"city" , "Category":"city", "Date":"Sat Dec 12 2019", "url":"assets/images/4.jpg" },' +
'{ "Title":"religion" , "Category":"religion", "Date":"Sat Dec 12 2019", "url":"assets/images/5.jpg" },' +
'{ "Title":"nature" , "Category":"nature", "Date":"Sat Dec 13 2019", "url":"assets/images/6.jpg" },' +
'{ "Title":"nature" , "Category":"nature", "Date":"Sat Dec 12 2019", "url":"assets/images/7.jpg" },' +
'{ "Title":"trees" , "Category":"nature", "Date":"Sat Dec 12 2019", "url":"assets/images/8.jpg" },' +
'{ "Title":"water" , "Category":"nature", "Date":"Sat Dec 13 2019", "url":"assets/images/9.jpg" },' +
'{ "Title":"water" , "Category":"nature", "Date":"Sat Dec 06 2019", "url":"assets/images/9.jpg" } ]}';
var obj = JSON.parse(text);
var use_obj = JSON.parse(text);

function showImages(element) {
	let images = "";
	let index = 0;
	for(var i =0 ; i< element.length; i++){
		images = images.concat("<img lazy class='column' data-index="+index+" src="+element[i].url +" alt='"+index+"'onClick='openLightBox(event)'>")
		index=i+1
	}
	document.getElementById("images").innerHTML = images
}

showImages(obj.gallery);
function openLightBox(event) {
	document.getElementById("light_box").style.display = "block"
	document.getElementById("content").innerHTML = "<img lazy class='modal-image' data-index="+event.target.dataset.index+" src="+event.target.src +" alt='"+event.target.dataset.index+"'>"
}
function closeLightBox() {
	document.getElementById("light_box").style.display = "none"
}
function prevImage(argument) {
	let index = parseInt(document.getElementsByClassName('modal-image')[0].dataset.index) - 1
	document.getElementById("content").innerHTML = "<img lazy class='modal-image' data-index="+index+" src="+use_obj.gallery[index].url+" alt='"+index+"'>"
}
function nextImage(argument) {
	let index = parseInt(document.getElementsByClassName('modal-image')[0].dataset.index) + 1
	document.getElementById("content").innerHTML = "<img lazy class='modal-image' data-index="+index+" src="+use_obj.gallery[index].url+" alt='"+index+"'>"
}
function sortImages(target_value) {
	$target_value = target_value
	let elements = []
	if($target_value == "Show All"){
		elements = obj.gallery
	}
	else{
		elements = use_obj.gallery.sort(function(a, b){
			var titleA=a[$target_value].toLowerCase(), titleB=b[$target_value].toLowerCase()
			if(titleA < titleB) return -1;
	    if(titleA > titleB) return 1;
	    return 0;
		})
	}
	if($target_value == 'Date'){
		elements = elements.reverse()
	}
	showImages(elements)
}

function filterByCategory(target_value) {
	$target_value = target_value
	let elements = []
	if($target_value == "Show All"){
		elements = obj.gallery
	}
	else{
		elements = use_obj.gallery.filter(function(el){
			return el['Category'] == $target_value
		})
	}
	showImages(elements)
}
document.onkeydown = function(event) {
	if(document.getElementById('light_box').style.display == 'block'){
		switch (event.keyCode) {
		 case 37:
		      prevImage()
		    break;
		 case 39:
		      nextImage()
		    break;
		}
	}
}