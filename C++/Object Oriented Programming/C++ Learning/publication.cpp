





#include <iostream>
#include <string>

using namespace std;

enum DiskType{CD, DVD};

class Publication {
    protected:
        string title;
        float price;
    public:
        void getdata(){
            cout<<"Enter the title: ";
            getline(cin, title);
            cout<<"Enter the price: ";
            cin>>price;
        }

        void putdata(){
            cout<<"Title: "<<title<<endl;
            cout<<"Price: "<<price<<endl;
        }
};

class Sales {
    protected:
        float sales[3];
    public:
        void getdata(){
            for(int i = 0; i < 3; i++){
                cout<<"Dollar sale "<<i+1<<endl;
                cout<<"Enter sale: ";
                cin>>sales[i];
            }
        }
        void putdata(){
            for(int i = 0; i < 3; i++){
                cout<<"Dollar Sale "<<i+1<<": "<<sales[i]<<endl;
            }
        }
};

class Date {
    private:
        int month, day, year;
    public:
        void getdata(){
            char slash;
            cout<<"Enter date (mm/dd/yyy): ";
            cin>>month>>slash>>day>>slash>>year;
        }

        void putdata(){
            cout<<"Date: "<<month<<"/"<<day<<"/"<<year<<endl;
        }
};

class Publication2: public Publication {
    protected:
        Date date;
    public:
        void getdata(){
            Publication::getdata();
            date.getdata();
        }

        void putdata(){
            Publication::putdata();
            date.putdata();
        }
};

class Book: public Publication2, public Sales {
    private:
        int page_count;
    public:
        void getdata(){
            Publication2::getdata();
            cout<<"Enter the page count: ";
            cin>>page_count;
            Sales::getdata();
        }

        void putdata(){
            Publication2::putdata();
            cout<<"Page Count: "<<page_count<<endl;
            Sales::putdata();
        }
};

class Tape: public Publication2, public Sales {
    private:
        float playing_time;
    public:
        void getdata(){
            Publication2::getdata();
            cout<<"Enter playing time (in minutes): ";
            cin>>playing_time;
            Sales::getdata();
        }

        void putdata(){
            Publication2::putdata();
            cout<<"Playing time (in minutes): "<<playing_time<<endl;
            Sales::putdata();
        }
};

class Dist: public Publication2, public Sales {
    private:
        DiskType disk_type;
    public:
        void getdata(){
            string type;
            Publication2::getdata();
            cout<<"Enter disk type (c for CD, d for DVD): ";
            getline(cin, type);
            if(type == "c" || type == "C"){
                disk_type = CD;
            }
            else if (type == "d" || type == "D"){
                disk_type = DVD;
            }
            Sales::getdata();
        }

        void putdata(){
            Publication2::putdata();
            cout<<"Disk type: ";
            if(disk_type == CD){
                cout<<"CD"<<endl;
            }
            else if (disk_type == DVD){
                cout<<"DVD"<<endl;
            }
            Sales::putdata();
        }
};








