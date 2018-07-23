import os
import requests
import datetime

from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)


# list of all channels
channel_list = ['general']
messages = []


@app.route("/")
def index():
    return render_template("index.html")

@socketio.on("submit message")
def chats(data):
    messages.append(data)
    emit("receive", data, broadcast=True)
# selection = data["selection"]
# emit("announce message", selection, broadcast=True)



# @app.route("/channel", methods=["POST"])
# def channels():

#     new = int(request.form.get("channel"))

#     for i in range(0, len(channel_list)):
#         channel_list.append(new)

#     # Return list of posts.
#     return jsonify(channel_list)
