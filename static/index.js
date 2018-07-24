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


// keep listening for action from user, such as pressing a button
document.addEventListener('DOMContentLoaded', () =>
{
   var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
   // when the Send button is clicked, implement the following section of code
   socket.on('connect', () => {
       document.querySelectorAll('#btnsendmsg').forEach(button => {
            button.onclick = () => {
               // define variables for the datetime, display name, message, and current channel name
               var d = new Date();
               var showname = localStorage.getItem('username');
               var sentmsg = document.querySelector('#txtmessage').value;
               var currchan = document.querySelector('#lstchannel').value;
               // socket emit the message, datetime, username, and channel name
               socket.emit('submit message', {"text" : sentmsg, "date" : d.toString(), "user" : showname, "lstchannel" : currchan});
            };
        });
        // when the Create channel button is clicked, implement the following code
        document.querySelectorAll('#createchannel').forEach(button => {
            button.onclick = () => {
                var channelname = document.getElementById("txtchannel").value;
                var select = document.getElementById("lstchannel");
                var option = document.createElement("option");
                // iterate through the list of channels
                for (var i = 0; i < channel_list.length; i++)
                {
                    // if the input channel name already exists in the list, prompt the user to try again and input a new name
                    if (channelname == channel_list[i])
                    {
                        return(alert("This channel already exists. Please input a new name."));
                    }
                }
                // add push the new channel name to the list of channels
                channel_list.push(channelname);
                option.text = channelname;
                option.value = channelname;
                select.add(option);
                // select.insertAdjacentHTML('beforeEND',select.join('\n'));
                // socket emit, reference server side in application.py for a list of channels
                socket.emit('existchann', {"lstchannel" : select});
            };
        });
    });

    // socket receive the messages in the dictionary and display the message on the screen
    socket.on('receive', data => {
        // initialize the empty allchann array
        allchann = []
        // if the number of items in the allchann array does not exceed 100, append to the array the message and corresponding credentials
        for (i = 0; i < 1; i++) {
            if (allchann.length < 2) {
                const li = document.createElement('li');
                document.querySelector('#msgbox').append(li);
                data["date"];
                // in a list, display from the data dictionary the name of the user who sent the message, the text message, the datetime sent, and the current channel
                li.innerHTML = `${data["user"]} : ${data["text"]} - ${data["date"]} - ${data["lstchannel"]}`;
                li.appendChild(allchann);
                document.getElementById("msgbox").appendChild(li);
            }
            // if the length of the array is greater than 100, pop the earliest message
            else {
                allchann.pop();
                alert(allchann);
            }
        }
    });
    // socket server side application.py
    socket.on('here', chann => {
        // append the input channel names to the list in the dropdown menu
        const lichann = document.createElement('lichann');
        document.querySelector('#lstchannel').append(lichann);
    });
});

