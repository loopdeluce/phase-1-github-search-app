let searchType = 'Username';

document.addEventListener("DOMContentLoaded", () => {
  addSearchEvent();
  addSearchDropdownEvent();
});

function addSearchEvent() {
  const searchForm = document.getElementById('github-form');
  searchForm.addEventListener('submit', () => {
    if(searchType === 'Username'){
      event.preventDefault();
      getUsers(event);
    }
    else if (searchType === 'Repo'){
      event.preventDefault();
      getRepos(event);
    }
  }
  )
};

function addSearchDropdownEvent() {
  const searchDropdown = document.getElementById('dropdown');
  searchDropdown.addEventListener('change', setSearchType)
}

function setSearchType(event) {
  event.preventDefault();
  searchType = event.target.value;
}


function getUsers(event){
  event.preventDefault();
  const user = event.target.search.value;
  fetch(`https://api.github.com/search/users?q=${user}`)
  .then(resp => resp.json())
  .then(data => {
    removeUsers()
    data.items.forEach((user) => loadUser(user))
  })
}

function loadUser(user) {
  //console.log('loading...')
  const username = user.login;
  const image = user.avatar_url;
  const profile = user.html_url;

  const ul = document.getElementById('user-list');
  const li = document.createElement('li');
  const img = document.createElement('img');
  const h2 = document.createElement('h2');
  const a = document.createElement('a');
  const btn = document.createElement('button');
  const br = document.createElement('br');
  const br2 = document.createElement('br');
  const br3 = document.createElement('br');
  const br4 = document.createElement('br');

  img.src = image;
  img.alt = `User ${username} profile picture`;
  img.className = 'userAvatar'
  h2.textContent = username;
  a.href = `${profile}`;
  a.textContent = profile;
  btn.type = 'button';
  btn.textContent = 'Click to see user repos!';

  btn.addEventListener('click', getUserRepos)

  li.append(h2, a, br3, br4, btn, br, br2, img);
  ul.append(li);
}

function getUserRepos(event) {
  const li = event.target.parentNode;
  const h2 = li.querySelector('h2');
  const username = h2.textContent;

  fetch(`https://api.github.com/users/${username}/repos`)
  .then(resp => resp.json())
  .then(data => data.forEach(repo => displayRepo(repo)))
}

function displayRepo (repo) {
  const ul = document.getElementById('repos-list');
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.href = repo['html_url'];
  a.textContent = repo.name;

  li.append(a);
  ul.append(li);
}

function removeUsers() {
  const ul = document.getElementById('user-list');
  const rl = document.getElementById('repos-list');

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  while (rl.firstChild) {
    rl.removeChild(rl.firstChild);
  }
}

function getRepos(event) {
  event.preventDefault();
  const repoKeyword = event.target.search.value;

  fetch(`https://api.github.com/search/repositories?q=${repoKeyword}`)
  .then(resp => resp.json())
  .then(data => {
    removeUsers()
    console.log(data)
    data.items.forEach(repo => displayRepo(repo))
  })
}

