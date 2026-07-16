# =====================================
# SCNMMS NETWORK MONITOR ENGINE
# =====================================


import time
from datetime import datetime

from database import get_connection

from network_scanner import ping_device





# Update Device Status

def update_device_status():

    conn = get_connection()

    devices = conn.execute(

        "SELECT * FROM devices"

    ).fetchall()



    for device in devices:


        status = ping_device(

            device["ip"]

        )



        old_status = device["status"]



        # Update database


        conn.execute(

        """

        UPDATE devices

        SET status=?

        WHERE id=?

        """,

        (

        status,

        device["id"]

        )

        )





        # Create Alert

        if (

            old_status == "Online"

            and

            status == "Offline"

        ):


            create_alert(

                device["name"]

            )




    conn.commit()

    conn.close()









# Create Alert


def create_alert(device):


    conn = get_connection()



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

    "Device disconnected from network",

    "Critical",

    datetime.now().strftime(
        "%Y-%m-%d %H:%M:%S"
    )

    )

    )



    conn.commit()

    conn.close()











# Monitoring Loop


def start_monitor():



    print(

    "SCNMMS Monitoring Started..."

    )



    while True:



        update_device_status()



        print(

        "Network checked:",

        datetime.now()

        )



        time.sleep(30)









if __name__=="__main__":


    start_monitor()
