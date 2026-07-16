from database import create_tables

from models import add_device



create_tables()



add_device(

"Campus Router",

"192.168.1.1",

"AA:BB:CC:11",

"Router",

"Server Room"

)


print("Device saved")
