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



# ==========================
# FLASK APP INITIALIZATION
# ==========================

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

        "system": "SCNMMS",

        "message": "Smart Campus Network Monitoring API",

        "status": "Running"

    })



# ==========================
# REGISTER API
# ==========================

@app.route("/register", methods=["POST"])
def register():

    data = request.json

    conn = get_connection()


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

            "success": False,

            "message": "Username already exists"

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

        "success": True,

        "message": "Account created successfully"

    })



# ==========================
# FORGOT PASSWORD API
# ==========================

@app.route("/forgot-password", methods=["PUT"])
def forgot_password():


    data = request.json


    username = data["username"]

    password = data["password"]


    conn = get_connection()


    user = conn.execute(

        """
        SELECT * FROM users
        WHERE username=?
        """,

        (username,)

    ).fetchone()



    if not user:

        conn.close()

        return jsonify({

            "success": False,

            "message": "User not found"

        })


    conn.execute(

        """
        UPDATE users

        SET password=?

        WHERE username=?

        """,

        (
            password,
            username
        )

    )


    conn.commit()

    conn.close()


    return jsonify({

        "success": True,

        "message": "Password updated successfully"

    })
