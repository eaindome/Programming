#include <iostream>
#include <string>

using namespace std;


class Publication {
    protected:
        string title;
        float price;
    public:
        void getdata(){
            cout<<"Enter title: ";
            getline(cin, title);
            cout<<"Enter price: ";
            cin>>price;
            cin.ignore();
        }

        void putdata(){
            cout<<"Title: "<<title<<endl;
            cout<<"Price: "<<price<<endl;
        }
};

class Book: public Publication {
    private:
        int count;
    public:
        void getdata(){
            Publication::getdata();
            cout<<"Enter page count: ";
            cin>>count;
            cin.ignore();
        }

        void putdata(){
            Publication::putdata();
            cout<<"Page count: "<<count<<endl;
        }
};

class Tape: public Publication {
    private:
        float time;
    public:
        void getdata(){
            Publication::getdata();
            cout<<"Enter playing time (in minutes): ";
            cin>>time;
            cin.ignore();
        }

        void putdata(){
            Publication::putdata();
            cout<<"Time: "<<time<<endl;
        }
};

int main() {
    Book book;
    Tape tape;

    cout<<"Enter book data: \n";
    book.getdata();
    cout<<"Enter tape data: \n";
    tape.getdata();

    cout<<"\tDisplaying information\n";
    cout<<"Book: \n";
    book.putdata();
    cout<<"\nTape: \n";
    tape.putdata();

    return 0;
}


