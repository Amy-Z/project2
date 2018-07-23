var channel_list = [];

function display_name()
{
    // localStorage.clear();
    let username=document.getElementById("username").value;
    // alert(username)
    localStorage.setItem('username', username);
}

function show_name()
{
    // document.getElementById("btnsendmsg").addEventListener("click", function(){
    //     document.getElementById("msgbox").innerHTML = document.getElementById("txtmessage").value;
    // });
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

    var channelname=document.getElementById("txtchannel").value;
    var select = document.getElementById("lstchannel");
    var option = document.createElement('option');
    for (var i=0; i<channel_list.length; i++)
    {
        // alert("Entering the for loop for the " + i);
        if (channelname==channel_list[i])
        {
            return(alert("This channel already exists. Please input a new name."));
        }
    }
    alert(channelname);
    // document.getElementById("lstchannel").value = channelname;
    // var select = document.getElementById("lstchannel");
    // var option = document.createElement('option');
    channel_list.push(channelname);
    option.text = channelname;
    option.value = channelname;
    select.add(option);
    // channel_list.push(option.outerHTML);
    select.insertAdjacentHTML('beforeEND',select.join('\n'));
    // channel_list.push(channelname);
    // document.getElementById("lstchannel").value = channel_list;
}

document.addEventListener('DOMContentLoaded', () =>
{
   var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
   socket.on('connect', () => {
       document.querySelectorAll('#btnsendmsg').forEach(button => {
           button.onclick = () => {
               var d = new Date();
               var showname = localStorage.getItem('username');
               var sentmsg = document.querySelector('#txtmessage').value;
            //   document.getElementById("msgbox").innerHTML = d.toString();
               alert("New Message: " + sentmsg + " - " + showname);
               socket.emit('submit message', {"text" : sentmsg, "date" : d.toString(), "user" : showname});
           };
       });
   });
   socket.on('receive', data => {
       const li = document.createElement('li');
       data["date"]
       li.innerHTML = `${data["user"]} : ${data["text"]} - ${data["date"]}`;
       document.querySelector('#msgbox').append(li);
   });
});


