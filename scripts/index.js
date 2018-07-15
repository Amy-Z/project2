function displayname() {
    localStorage.clear();
    let username=document.getElementById("username").value;
    // alert(username)
    localStorage.setItem('username', username);
}

function showname() {
    let showname=document.querySelector('#username').innerHTML = localStorage.getItem('username');
    // alert(showname)
    if (!localStorage.getItem('username'))
        document.getElementById("displaynm").innerHTML = "Type in your Display Name.";
    else
        document.getElementById("displaynm").innerHTML = "Welcome, " + showname
}
