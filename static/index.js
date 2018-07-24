var channel_list = [];

// when a user enters a display name, the name is stored in local storage
function display_name()
{
    // localStorage.clear();
    let username=document.getElementById("username").value;
    // alert(username)
    localStorage.setItem('username', username);
}
// if there is not a display name in local storage, prompt the user to enter one
// if there is already a name stored, then display a welcome message
function show_name()
{
    let showname = localStorage.getItem('username');
    if (!localStorage.getItem('username'))
        document.getElementById("displaynm").innerHTML = "Type in Your Display Name.";
    else
        document.getElementById("displaynm").innerHTML = "Welcome, " + showname;

}

function uploadchannmasg()
{
    var x = document.getElementById("lstchannel").value;
    document.getElementById("channmsg").innerHTML = "You selected: " + x;
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
               var currchan = document.querySelector('#lstchannel').value;
            //   document.getElementById("msgbox").innerHTML = d.toString();
               alert("New Message: " + sentmsg + " - " + showname);
               socket.emit('submit message', {"text" : sentmsg, "date" : d.toString(), "user" : showname, "lstchannel" : currchan});
            };
        });
        document.querySelectorAll('#createchannel').forEach(button => {
            button.onclick = () => {
                // alert(channel_list);
                var existchannels = channel_list;
                var channelname=document.getElementById("txtchannel").value;
                var select = document.getElementById("lstchannel");
                var option = document.createElement("option");
                for (var i=0; i<channel_list.length; i++)
                {
                    if (channelname==channel_list[i])
                    {
                        return(alert("This channel already exists. Please input a new name."));
                    }
                }
                // alert(channelname);
                channel_list.push(channelname);
                option.text = channelname;
                option.value = channelname;
                // alert(channelname);
                select.add(option);
                // select.insertAdjacentHTML('beforeEND',select.join('\n'));
                alert(select.value);
                socket.emit('existchann', {"lstchannel" : select});
            };
        });
    });

    socket.on('receive', data => {
        allchann = []
        alert(allchann);
        for (i = 0; i < 1; i++) {
            if (allchann.length < 3) {
                const li = document.createElement('li');
                document.querySelector('#msgbox').append(li);
                data["date"];
                li.innerHTML = `${data["user"]} : ${data["text"]} - ${data["date"]} - ${data["lstchannel"]}`;
                li.appendChild(allchann);
                document.getElementById("msgbox").appendChild(li);
            }
            else {
                allchann.pop();
                alert(allchann);
            }
        }
    });

    socket.on('here', chann => {
        alert("socketio works here");
        const lichann = document.createElement('lichann');
        document.querySelector('#lstchannel').append(lichann);
    });
});




// document.addEventListener('DOMContentLoaded', () =>
// {
//     var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
//     socket.on('connect', () => {
//         document.querySelectorAll('#createchannel').forEach(button => {
//             button.onclick = () => {
//                 alert(channel_list);
//                 var existchannels = channel_list;
//                 var channelname=document.getElementById("txtchannel").value;
//                 var select = document.getElementById("lstchannel");
//                 var option = document.createElement("option");
//                 for (var i=0; i<channel_list.length; i++)
//                 {
//                     if (channelname==channel_list[i])
//                     {
//                         return(alert("This channel already exists. Please input a new name."));
//                     }
//                 }
//                 alert(channelname);
//                 channel_list.push(channelname);
//                 option.text = channelname;
//                 option.value = channelname;
//                 select.add(option);
//                 select.insertAdjacentHTML('beforeEND',select.join('\n'));
//                 socket.emit('existchann', {"lstchannel" : currchan});

//             };
//         });
//     });
//     socket.on('here', chann => {
//         alert("socketio works here");
//         const lichann = document.createElement('lichann');
//         document.querySelector('#lstchannel').append(lichann);
//     });
// });