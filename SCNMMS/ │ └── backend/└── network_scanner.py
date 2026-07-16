# =====================================
# SCNMMS NETWORK SCANNER
# =====================================


import subprocess
import platform
import ipaddress





def ping_device(ip):

    """
    Check if device is reachable
    """

    system = platform.system()



    if system == "Windows":

        command = [
            "ping",
            "-n",
            "1",
            ip
        ]


    else:

        command = [
            "ping",
            "-c",
            "1",
            ip
        ]




    result = subprocess.run(

        command,

        stdout=subprocess.PIPE,

        stderr=subprocess.PIPE

    )



    if result.returncode == 0:

        return "Online"

    else:

        return "Offline"







def scan_network(network):


    devices=[]


    network = ipaddress.ip_network(

        network,

        strict=False

    )




    for ip in network.hosts():


        status = ping_device(

            str(ip)

        )



        device={

            "ip":
            str(ip),


            "status":
            status

        }



        devices.append(device)



        print(

        str(ip),

        status

        )




    return devices







if __name__=="__main__":



    print(
    "Starting Network Scan..."
    )



    result = scan_network(

        "192.168.1.0/24"

    )



    print("\nScan Completed")


    print(result)
