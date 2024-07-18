from database.setup import setup_database
from hierarchy.create_hierarchy import create_hierarchy_in_db
from hierarchy.fetch_hierarchy import fetch_hierarchy_from_db
from hierarchy.print_hierarchy import print_all_packs

def main():
    setup_database()
    
    num_packs = int(input("Enter the number of packs: "))
    create_hierarchy_in_db(num_packs)
    
    packs = fetch_hierarchy_from_db()
    print_all_packs(packs)

if __name__ == "__main__":
    main()
