from database.setup import setup_database
from database.company import setup_company
from hierarchy.create_hierarchy import create_hierarchy_in_db
from hierarchy.fetch_hierarchy import fetch_hierarchy_from_db
from hierarchy.print_hierarchy import print_all_packs
from hierarchy.generate_qr import generate_qrs_for_hierarchy
import subprocess

def main():
    setup_database()
    setup_company()
    
    num_packs = int(input("Enter the number of packs: "))
    create_hierarchy_in_db(num_packs)
    
    packs = fetch_hierarchy_from_db()
    generate_qrs_for_hierarchy(packs)
    
    print_all_packs(packs)
    
    # Start the web service
    subprocess.Popen(["python", "web/app.py"])

if __name__ == "__main__":
    main()


