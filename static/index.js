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
    var channel_list = [];
    let channelname=document.getElementById("txtchannel").value;
    alert(channelname);
    // document.getElementById("lstchannel").value = channelname;
    var select = document.getElementById("lstchannel");
    var option = document.createElement('option');
    option.text = channelname;
    option.value = channelname;
    select.add(option);
    // channel_list.push(option.outerHTML);
    select.insertAdjacentHTML('beforeEND',select.join('\n'));
    stop();
    // channel_list.push(channelname);
    // document.getElementById("lstchannel").value = channel_list;
}
