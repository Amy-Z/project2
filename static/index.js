var channel_list = [];
var messagesent = ["hello"];

function display_name()
{
    // localStorage.clear();
    let username=document.getElementById("username").value;
    // alert(username)
    localStorage.setItem('username', username);
}

function show_name()
{
    document.getElementById("btnsendmsg").addEventListener("click", function(){
        document.getElementById("msgbox").innerHTML = document.getElementById("txtmessage").value;
    });
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
        alert("Entering the for loop for the " + i);
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

function msgchat()
{
    document.addEventListener('DOMContentLoaded', () => {
        // Connect to websocket
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

        // When connected, configure buttons
        socket.on('connect', () => {

            // Each button should emit a "submit message" event
            document.querySelectorAll('btnsendmsg').forEach(btnsendmsg => {
                btnsendmsg.onclick = () => {
                    const selection = btnsendmsg.dataset.vote;
                    socket.emit('submit message', selection);

                };
            });
        });

        // When a new vote is announced, add to the unordered list
        socket.on('announce message', data => {
            // const li = document.getElementById("vote").ELEMENT_NODE.add('li');
            // li.innerHTML = `Vote recorded: ${data.selection}`;
            const li = document.createElement('li');
            li.innerHTML = `${data.selection}`;
            document.querySelector('#votes').append(li);


            var ul = document.getElementById("msglist");
            // var li = document.createElement("li");
            var children = ul.children.length + 1;
            li.setAttribute("id", "element"+children);
            li.appendChild(document.createTextNode("Element "+children));
            ul.appendChild(li);
            // document.querySelector('#votes').append(li);
        });
    });
}

// document.addEventListener('DOMContentLoaded', () => {
//     var messagestr=document.getElementById("txtmessage").value;
//         // Connect to websocket
//     alert(messagestr);
//     var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
//     // When connected, configure buttons
//     socket.on('connect', () => {
//         // Each button should emit a "submit message" event
//         document.querySelectorAll('button').forEach(button => {
//             button.onclick = () => {
//                 const selection = button.dataset.message;
//                 socket.emit('submit message', {'selection': selection});
//             };
//         });
//     });
//     // When a new message is announced, add to the unordered list
//     socket.on('announce message', data => {
//         const li = document.createElement('li');
//         li.innerHTML = messagestr;
//         document.querySelector('#messages').append(li);
//     });
// });



