# =====================================
# SCNMMS DATABASE MODELS
# =====================================


from database import get_connection





# =========================
# USER MODEL
# =========================


def create_user(
    username,
    password,
    role
):


    conn = get_connection()


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

    username,

    password,

    role

    )

    )


    conn.commit()

    conn.close()







# =========================
# DEVICE MODEL
# =========================



def add_device(

name,

ip,

mac,

device_type,

location

):


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

    name,

    ip,

    mac,

    device_type,

    location,

    "Online"

    )

    )


    conn.commit()

    conn.close()







# =========================
# ALERT MODEL
# =========================



def create_alert(

device,

message,

severity,

time

):


    conn=get_connection()



    conn.execute(

    """

    INSERT INTO alerts

    (

    device,

    message,

    severity,

    time

    )

    VALUES(?,?,?,?)

    """,

    (

    device,

    message,

    severity,

    time

    )

    )


    conn.commit()

    conn.close()









# =========================
# GET DEVICES
# =========================



def get_devices():


    conn=get_connection()


    data=conn.execute(

    "SELECT * FROM devices"

    ).fetchall()


    conn.close()


    return data








# =========================
# GET ALERTS
# =========================



def get_alerts():


    conn=get_connection()


    data=conn.execute(

    "SELECT * FROM alerts"

    ).fetchall()


    conn.close()


    return data
