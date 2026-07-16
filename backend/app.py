from flask import Flask, jsonify, request

from flask_cors import CORS

from database import (
    create_tables,
    get_connection
)



app = Flask(__name__)

CORS(app)



create_tables()





@app.route("/")
def home():

    return jsonify({

        "system":
        "SCNMMS",

        "status":
        "running"

    })







# GET DEVICES

@app.route("/devices")
def devices():


    conn=get_connection()

    data=conn.execute(

        "SELECT * FROM devices"

    ).fetchall()


    conn.close()



    return jsonify(

        [dict(row) for row in data]

    )








# ADD DEVICE

@app.route("/devices",
methods=["POST"])
def add_device():


    data=request.json


    conn=get_connection()


    conn.execute("""

    INSERT INTO devices

    (
    name,
    ip,
    mac,
    device_type,
    location,
    status
    )

    VALUES(?,?,?,?,?,?)

    """,

    (

    data["name"],
    data["ip"],
    data["mac"],
    data["device_type"],
    data["location"],
    "Online"

    ))



    conn.commit()

    conn.close()



    return jsonify({

        "message":
        "Device added"

    })







if __name__=="__main__":


    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )
