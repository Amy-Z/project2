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
# store messages here
messages = []
allchann = ['']
# allchann = {'general': None}


# single page application at index.html
@app.route("/")
def index():
    return render_template("index.html")


# with socket, append the sent messages to the list and store messages server side
@socketio.on("submit message")
def chats(data):
    allchann.append(data["text"])
    datetime.datetime
    emit("receive", data, broadcast=True)


# with socket, append the channel to the list of created channels
@socketio.on("existchann")
def exist(chann):
    channel_list.append(chann["group"])
    emit("here", chann, broadcast=True)
