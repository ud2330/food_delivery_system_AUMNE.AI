import sqlite3
import os

db_path = 'food_delivery.db'

def seed_database():
    if os.path.exists(db_path):
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        try:
            cursor.execute("SELECT COUNT(*) FROM restaurants")
            count = cursor.fetchone()[0]
        except sqlite3.OperationalError:
            print("Tables don't exist yet or are incorrectly formatted.")
            conn.close()
            return
            
        if count == 0:
            with open('seed_data.sql', 'r') as f:
                sql_script = f.read()
            for stmt in sql_script.split(';'):
                stmt = stmt.strip()
                if stmt and not stmt.startswith('--'):
                    try:
                        cursor.execute(stmt)
                    except Exception as e:
                        print(f"Error executing statement: {e}")
            conn.commit()
            print("Seed data successfully inserted.")
        else:
            print("Database already has data, skipping seed.")
            
        conn.close()
    else:
        print("Database not found. Make sure alembic migrations have run.")

if __name__ == '__main__':
    seed_database()
