import sqlite3


DATABASE = "network.db"



def get_connection():

    conn = sqlite3.connect(
        DATABASE
    )

    conn.row_factory = sqlite3.Row

    return conn





def create_tables():

    conn = get_connection()

    cursor = conn.cursor()



    cursor.execute("""
    
    CREATE TABLE IF NOT EXISTS devices(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT,

        ip TEXT,

        mac TEXT,

        device_type TEXT,

        location TEXT,

        status TEXT

    )

    """)



    cursor.execute("""
    
    CREATE TABLE IF NOT EXISTS alerts(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        device TEXT,

        message TEXT,

        severity TEXT,

        time TEXT

    )

    """)



    conn.commit()

    conn.close()




if __name__=="__main__":

    create_tables()

    print(
    "Database created successfully"
    )
