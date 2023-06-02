from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.scrollview import ScrollView
from kivy.uix.gridlayout import GridLayout


class ExpenseTracker(BoxLayout):
    def __init__(self, **kwargs):
        super(ExpenseTracker, self).__init__(**kwargs)

        self.orientation = 'vertical'
        self.expense_list = []

        # Scrollable container for the expense list
        self.scroll_view = ScrollView()
        self.add_widget(self.scroll_view)

        self.grid_layout = GridLayout(cols=1, spacing=10, size_hint_y=None)
        self.grid_layout.bind(minimum_height=self.grid_layout.setter('height'))
        self.scroll_view.add_widget(self.grid_layout)

        # Button to add expenses
        self.add_expense_button = Button(text='Add Expense', size_hint=(None, None), size=(100, 50))
        self.add_expense_button.bind(on_press=self.add_expense)
        self.add_widget(self.add_expense_button)

        # Input field for entering expenses
        self.expense_input = TextInput(multiline=False)
        self.add_widget(self.expense_input)

        # Total expense label
        self.total_expense_label = Label(text='Total Expense: $0')
        self.add_widget(self.total_expense_label)

    def add_expense(self, instance):
        expense = self.expense_input.text
        if expense:
            self.expense_list.append(expense)
            self.update_expense_list()

    def update_expense_list(self):
        self.grid_layout.clear_widgets()

        total_expense = 0

        for expense in self.expense_list:
            label = Label(text=expense)
            self.grid_layout.add_widget(label)

            # Extracting the expense amount from the expense string
            amount = self.get_amount_from_expense(expense)
            total_expense += amount

        self.expense_input.text = ''
        self.total_expense_label.text = f'Total Expense: ${total_expense}'

    @staticmethod
    def get_amount_from_expense(expense):
        # Assuming that the amount is mentioned at the end of the expense string
        parts = expense.split()
        amount_str = parts[-1]

        # Removing any non-digit characters from the amount string
        amount = ''.join(filter(str.isdigit, amount_str))
        return int(amount)

class ExpenseTrackerApp(App):
    def build(self):
        return ExpenseTracker()

if __name__ == '__main__':
    ExpenseTrackerApp().run()








