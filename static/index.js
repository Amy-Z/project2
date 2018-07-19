function display_name()
{
    // localStorage.clear();
    let username=document.getElementById("username").value;
    // alert(username)
    localStorage.setItem('username', username);
}

function show_name()
{
    // =document.querySelector('#username').innerHTML
    let showname = localStorage.getItem('username');
    // alert(showname)
    if (!localStorage.getItem('username'))
        document.getElementById("displaynm").innerHTML = "Type in Your Display Name.";
    else
        document.getElementById("displaynm").innerHTML = "Welcome, " + showname;
}

function addchannel()
{
    alert(channelname);
    let channelname=document.getElementById("txtchannel").value;
    document.getElementById("lstchannel").value = channelname;

}

function channel()
{
    alert(channel_list);
}