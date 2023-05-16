/*
Print the sum, difference and product of two complex numbers 
by creating a class named 'Complex' with separate functions 
for each operation whose real and imaginary parts are entered 
by the user.
*/

#include <iostream>
#include <vector>

using namespace std;

class Complex {
    private:
        double real_pt, img_pt;

    public:
        Complex(double r, double i):real_pt(r), img_pt(i){}

        double getReal(){
            return real_pt;
        }

        double getImg(){
            return img_pt;
        }

        void sum(Complex c){
            cout<<c.getReal()+real_pt<<" + "<<c.getImg()+img_pt<<"j"<<endl;
        }

        void diff(Complex c){
            cout<<c.getReal()-real_pt<<" + "<<c.getImg()-img_pt<<"j"<<endl;
        }

        void prod(Complex c){
            cout<<c.getReal()*real_pt<<" + "<<c.getImg()*img_pt<<"j"<<endl;
        }

};

int main() {
    vector<Complex> operations;
    double real_pt, img_pt;
    int oper_num;

    cout<<"How many complex numbers do you want to operate on: ";
    cin>>oper_num;

    for (int i = 0; i < oper_num; i++){
        cout<<"Enter real part: ";
        cin>>real_pt;
        cout<<"Enter imaginary part: ";
        cin>>img_pt;

        Complex operand(real_pt, img_pt);

        operations.push_back(operand);
    }

    for(int j = 0; j < operations.size(); j++){
        cout<<"Enter a complex number to perform arithmetic operation with: \n";
        cout<<"Real part: ";
        cin>>real_pt;
        cout<<"Imaginary part: ";
        cin>>img_pt;

        Complex operand2(real_pt, img_pt);

        cout<<"\nResult of addition: ";
        operations[j].sum(operand2);

        cout<<"\nResult of subtraction: ";
        operations[j].diff(operand2);

        cout<<"\nResult of multiplication: ";
        operations[j].prod(operand2);
    }
}


/*
Solution:
#include <iostream>

using namespace std;

class Complex {
    private:
        double real_pt, img_pt;

    public:
        Complex(double r, double i):real_pt(r), img_pt(i){}

        double getReal(){
            return real_pt;
        }

        double getImg(){
            return img_pt;
        }

        void sum(Complex c){
            cout<<c.getReal()+real_pt<<" + "<<c.getImg()+img_pt<<"j"<<endl;
        }

        void diff(Complex c){
            cout<<c.getReal()-real_pt<<" + "<<c.getImg()-img_pt<<"j"<<endl;
        }

        void prod(Complex c){
            cout<<c.getReal()*real_pt<<" + "<<c.getImg()*img_pt<<"j"<<endl;
        }

};

int main() {
    double real1, img1, real2, img2;

    cout<<"Enter the real and imaginary parts of first complex number: ";
    cin>>real1>>img1;
    Complex num1(real1, img1);

    cout<<"Enter the real and imaginary parts of second complex number: ";
    cin>>real2>>img2;
    Complex num2(real2, img2);

    cout<<"Result of addition: ";
    num1.sum(num2);

    cout<<"Result of subtraction: ";
    num1.diff(num2);

    cout<<"Result of multiplication: ";
    num1.prod(num2);

    return 0;
}

*/

