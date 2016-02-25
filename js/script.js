//Search Function
var token = "?access_token=0be2cadc97096f2d2a04bbb9efdf2502dc188653"

var inputEl = document.querySelector('#search')
inputEl.value = "Search GitHub"

var searchBaseUrl = "https://api.github.com/users/"



var doSearchProfileRequest = function(userName) {
	var fullUrl = searchBaseUrl + userName + token
	var userNamePromise = $.getJSON(fullUrl)  
	userNamePromise.then(showObj)
} 

var doSearchReposRequest = function(userName) {
	var fullUrl = searchBaseUrl + userName + "/repos"+ token
	var userReposPromise = $.getJSON(fullUrl)  
	userReposPromise.then(showData)
}


var inputToUrl = function(keyEvent) {	
  	var inputEl = keyEvent.target
  		if (keyEvent.keyCode === 13) {
      		var userName = inputEl.value
      		inputEl.value = ""
      		location.hash = userName
      		doSearchProfileRequest(userName)
      		doSearchReposRequest(userName)
  }
}

inputEl.addEventListener('keydown', inputToUrl)


//Left Column 

var leftCol = document.querySelector("#left")

var profileBaseUrl = "https://api.github.com/users/RedStarThrower"

var profileUrl = profileBaseUrl + token

var profilePromise = $.getJSON(profileUrl)


var showObj = function(jsonObj) {
	//console.log(jsonObj)
	var totalProfileString = ""
	totalProfileString += objToHTML(jsonObj)
	leftCol.innerHTML = totalProfileString
}

var objToHTML = function(jsonObj) {
	var profileString = ""
		profileString += '<img class="avatar" src="' + jsonObj.avatar_url + '">'
		profileString += '<div class="namesBox">' + '<div class="full-name">' + jsonObj.name + '</div>'
		profileString += '<div class="username">' + jsonObj.login + '</div>' + '</div>'
		profileString += '<ul class="details">' + '<li>' + jsonObj.location + '</li>' 
		profileString += '<li>'+ '<a href="mailto:nat.podo@gmail.com" target="_blank">nat.podo@gmail.com</a>' + '</li>' 
		profileString += '<li>'+ '<a href="https://medium.com/@RedStarThrower" target="_blank">Blog</a>' + '</li>' 
		profileString += '<li>' + '<time class="join-date" datetime="' + jsonObj.created_at + 'day="numeric" is="local-time" month="short" year="numeric" title="Feb 6, 2014, 11:21 PM CST">Joined on Feb 6, 2014</time>'
		+ '</ul>'
	return profileString
}



profilePromise.then(showObj)

// Right Column

var rightCol = document.querySelector("#right")

var reposBaseUrl = "https://api.github.com/users/RedStarThrower/repos"

var reposUrl = reposBaseUrl + token

var reposPromise = $.getJSON(reposUrl)

var showData = function(jsonArray) {
    //console.log(jsonArray)
    var htmlString = ""
    for (var i = 0; i < jsonArray.length; i++) {
        var repoObj = jsonArray[i]
        htmlString += arrToHTML(repoObj)
    }
    rightCol.innerHTML = htmlString
}


var arrToHTML = function(repoObj) {
	var repoString = '<div class="repo-container">'
		repoString += '<h3 class="repo-name">' + '<a href="' + repoObj.html_url + '" target="_blank">' + repoObj.name + '</a>' + '</h3>'
		repoString += '<p class="repo-description">' + repoObj.description + '</p>'	
		repoString += '<p class="repo-list-meta">Updated: <time datetime="'+ repoObj.updated_at +  'is="relative-time" title="Feb 16, 2016, 10:37 PM CST">8 days ago</time>' + '</p>'
	+ '</div' 
 	return repoString
}

reposPromise.then(showData)



