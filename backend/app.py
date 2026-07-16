# =========================================
# SCNMMS COMPLETE REST API
# Smart Campus Network Monitoring System
# =========================================


from flask import Flask, jsonify, request

from flask_cors import CORS

from datetime import datetime


from database import (
    create_tables,
    get_connection
)


from network_scanner import (
    scan_network
)



app = Flask(__name__)

CORS(app)



# Create database tables

create_tables()





# ==========================
# HOME API
# ==========================


@app.route("/")
def home():

    return jsonify({

        "system":
        "SCNMMS",

        "message":
        "Smart Campus Network Monitoring API",

        "status":
        "Running"

    })







# ==========================
# LOGIN API
# ==========================


@app.route("/login", methods=["POST"])

def login():


    data=request.json


    username=data["username"]

    password=data["password"]



    conn=get_connection()



    user=conn.execute(

    """

    SELECT * FROM users

    WHERE username=?

    AND password=?

    """,

    (

    username,

    password

    )

    ).fetchone()



    conn.close()



    if user:


        return jsonify({

            "success":True,

            "user":dict(user)

        })



    return jsonify({

        "success":False,

        "message":
        "Invalid login"

    })
@app.route("/register", methods=["POST"])

def register():


    data=request.json


    conn=get_connection()



    existing = conn.execute(

    """

    SELECT * FROM users

    WHERE username=?

    """,

    (data["username"],)

    ).fetchone()



    if existing:


        conn.close()


        return jsonify({

            "success":False,

            "message":
            "Username already exists"

        })





    conn.execute(

    """

    INSERT INTO users

    (

    username,

    password,

    role

    )

    VALUES(?,?,?)

    """,

    (

    data["username"],

    data["password"],

    data["role"]

    )

    )



    conn.commit()

    conn.close()



    return jsonify({

        "success":True,

        "message":
        "Account created successfully"

    })







# ==========================
# GET ALL DEVICES
# ==========================


@app.route("/devices")

def get_devices():


    conn=get_connection()



    devices=conn.execute(

    "SELECT * FROM devices"

    ).fetchall()



    conn.close()



    return jsonify(

        [dict(d) for d in devices]

    )









# ==========================
# ADD DEVICE
# ==========================


@app.route(
"/devices",
methods=["POST"]
)

def add_device():


    data=request.json



    conn=get_connection()



    conn.execute(

    """

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

    )

    )



    conn.commit()

    conn.close()



    return jsonify({

        "message":
        "Device added successfully"

    })









# ==========================
# DELETE DEVICE
# ==========================


@app.route(
"/devices/<int:id>",
methods=["DELETE"]
)

def delete_device(id):


    conn=get_connection()



    conn.execute(

    "DELETE FROM devices WHERE id=?",

    (id,)

    )



    conn.commit()

    conn.close()



    return jsonify({

        "message":
        "Device deleted"

    })









# ==========================
# UPDATE STATUS
# ==========================


@app.route(
"/devices/<int:id>",
methods=["PUT"]
)

def update_device(id):


    data=request.json



    conn=get_connection()



    conn.execute(

    """

    UPDATE devices

    SET status=?

    WHERE id=?

    """,

    (

    data["status"],

    id

    )

    )



    conn.commit()

    conn.close()



    return jsonify({

        "message":
        "Status updated"

    })









# ==========================
# ALERTS API
# ==========================


@app.route("/alerts")

def alerts():


    conn=get_connection()



    alerts=conn.execute(

    "SELECT * FROM alerts ORDER BY id DESC"

    ).fetchall()



    conn.close()



    return jsonify(

        [dict(a) for a in alerts]

    )










# DELETE ALL ALERTS


@app.route(
"/alerts",
methods=["DELETE"]
)

def clear_alerts():


    conn=get_connection()



    conn.execute(

    "DELETE FROM alerts"

    )



    conn.commit()

    conn.close()



    return jsonify({

        "message":
        "Alerts cleared"

    })









# ==========================
# NETWORK SCAN API
# ==========================


@app.route(
"/scan"
)

def scan():


    result = scan_network(

        "192.168.1.0/24"

    )


    return jsonify(result)









# ==========================
# REPORT API
# ==========================


@app.route("/report")

def report():


    conn=get_connection()



    total=conn.execute(

    "SELECT COUNT(*) FROM devices"

    ).fetchone()[0]




    online=conn.execute(

    """

    SELECT COUNT(*)

    FROM devices

    WHERE status='Online'

    """

    ).fetchone()[0]




    alerts=conn.execute(

    "SELECT COUNT(*) FROM alerts"

    ).fetchone()[0]



    conn.close()



    uptime=0


    if total>0:

        uptime=round(

        (online/total)*100

        )




    return jsonify({

        "total_devices":
        total,


        "online_devices":
        online,


        "network_uptime":
        str(uptime)+"%",


        "alerts":
        alerts,


        "generated":
        datetime.now().strftime(
        "%Y-%m-%d %H:%M:%S"
        )

    })










if __name__=="__main__":


    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )
