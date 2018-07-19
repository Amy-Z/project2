import os
import requests

from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

# list of all channels
channel_list = ['general']

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/channel", methods=["POST"])
def channels():

    new = int(request.form.get("channel"))

    for i in range(0, len(channel_list)):
        channel_list.append(new)

    # Return list of posts.
    return jsonify(channel_list)
