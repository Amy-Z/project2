
function displayname() {


  // Set display name
  if (!localStorage.getItem('username'))
      localStorage.setItem('username', "");

  // Load current value of username
  document.addEventListener('DOMContentLoaded', () => {
      document.querySelector('#username').innerHTML = localStorage.getItem('username');
      localStorage.setItem('username', username);
  });

}









// <html>
//     document.addEventListener('DOMContentLoaded', () => {
//         document.querySelector('#name').innerHTML = localStorage.getItem('name');
//         localStorage.setItem('display_name', display_name);

//     function displayname() {
//     var person = prompt("Please enter your name", "Amy Zhou");
//     if (person != null) {
//         document.getElementById("name").innerHTML =
//         "Your display name is " + person;
//     if(typeof(localStorage.getItem("name"))=='undefined'){
//         alert('no');
//     };
//     }
//     }
// </html>

