import os
import logging
from dotenv import load_dotenv  # type: ignore
from dataclasses import dataclass
from telegram import Update, ReplyKeyboardMarkup, ReplyKeyboardRemove   # type: ignore
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext, ConversationHandler # type: ignore

# Configure logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
TOKEN = os.getenv("BOT_TOKEN")

# Global in-memory user store
user_profiles = {}
@dataclass
class UserProfile:
    name: str = ""
    email: str = ""
    service: str = ""
    issue_type: str = ""
    description: str = ""

# Conversation states
ASK_NAME, ASK_EMAIL, ASK_SERVICE, ASK_CUSTOM_SERVICE, ASK_ISSUE_TYPE, ASK_CUSTOM_ISSUE_TYPE, ASK_DESCRIPTION, CONFIRM = range(8)

# List of greetings
GREETINGS = ["hello", "hi", "hey", "hell", "h", "good morning", "good afternoon", "good evening", "Hello", "start", "Start"]

# On start command
async def start(update: Update, context: CallbackContext):
    user_id = update.effective_user.id
    user_profiles[user_id] = UserProfile()  # Initialize user profile
    await update.message.reply_text("Welcome! Let's get started.\nPlease enter your name:")
    return ASK_NAME


# Step 1: Handle greetings
async def handle_greeting(update: Update, context: CallbackContext):
    user_id = update.effective_user.id
    if user_id not in user_profiles or not user_profiles[user_id].name:
        await update.message.reply_text("Please use /start to begin and register your name and email.")
        return ConversationHandler.END

    reply_markup = ReplyKeyboardMarkup([["Yes", "No"]], one_time_keyboard=True, resize_keyboard=True)
    await update.message.reply_text("Would you like to report an issue?", reply_markup=reply_markup)
    return ASK_SERVICE


# Step 2: Ask for name
async def ask_name(update: Update, context: CallbackContext):
    user_id = update.effective_user.id
    user_profiles[user_id].name = update.message.text
    context.user_data["name"] = update.message.text  # Store name in context
    await update.message.reply_text("Please enter your email (or type 'skip' to continue):")
    return ASK_EMAIL

# Step 3: Ask for email (optional)
async def ask_email(update: Update, context: CallbackContext):
    email = update.message.text.strip()
    context.user_data["email"] = email if email.lower() != "skip" else "Not provided"  # Store email in context
    await update.message.reply_text(
        "Which service are you having issues with?\n"
        "1. GITMIS\n"
        "2. MTN-Momo\n"
        "3. HRMS\n"
        "4. Other (please specify)"
    )
    return ASK_SERVICE

# Step 4: Ask for service
async def ask_service(update: Update, context: CallbackContext):
    service_mapping = {
        "1": "GITMIS",
        "2": "MTN-Momo",
        "3": "HRMS",
        "4": "Other"
    }

    user_input = update.message.text.strip()
    if user_input in service_mapping:
        context.user_data["service"] = service_mapping[user_input]
        if context.user_data["service"] == "Other":
            await update.message.reply_text("Please specify the service:")
            return ASK_CUSTOM_SERVICE  # Stay in the same state to capture the text
        context.user_data["service"] = service_mapping[user_input] # Store service in context
    else:
        await update.message.reply_text("Invalid option. Please enter a number between 1 and 4.")
        return ASK_SERVICE  # Stay in the same state to retry

    await update.message.reply_text(
        "What is the issue type?\n"
        "1. Payment Issue\n"
        "2. Technical Issue\n"
        "3. Account Issue\n"
        "4. Other (please specify)"
    )
    return ASK_ISSUE_TYPE

# Step 5: Ask for issue type
async def ask_issue_type(update: Update, context: CallbackContext):
    issue_type_mapping = {
        "1": "Payment Issue",
        "2": "Technical Issue",
        "3": "Account Issue",
        "4": "Other"
    }

    user_input = update.message.text.strip()
    if user_input in issue_type_mapping:
        context.user_data["issue_type"] = issue_type_mapping[user_input]
        if context.user_data["issue_type"] == "Other":
            await update.message.reply_text("Please specify the issue type:")
            return ASK_CUSTOM_ISSUE_TYPE  # Stay in the same state to capture the text
        context.user_data["issue_type"] = issue_type_mapping[user_input]
    else:
        await update.message.reply_text("Invalid option. Please enter a number between 1 and 4.")
        return ASK_ISSUE_TYPE  # Stay in the same state to retry

    await update.message.reply_text("Please describe the issue in detail:")
    return ASK_DESCRIPTION

# Step 6: Ask for issue description
async def ask_description(update: Update, context: CallbackContext):
    if context.user_data["issue_type"] == "Other":
        context.user_data["issue_type"] = update.message.text.strip()  # Capture the custom issue type

    context.user_data["description"] = update.message.text
    return CONFIRM

# Step 7: Confirm details before submission
async def confirm_details(update: Update, context: CallbackContext):
    context.user_data["description"] = update.message.text

    name = context.user_data["name"]
    email = context.user_data["email"]
    service = context.user_data["service"]
    issue_type = context.user_data["issue_type"]
    description = context.user_data["description"]

    summary = (
        f"✅ **Issue Summary:**\n"
        f"**Name:** {name}\n"
        f"**Email:** {email}\n"
        f"**Service:** {service}\n"
        f"**Issue Type:** {issue_type}\n"
        f"**Description:** {description}\n\n"
        "Do you want to submit this issue? (Yes/No)"
    )
    reply_markup = ReplyKeyboardMarkup([["Yes", "No"]], one_time_keyboard=True, resize_keyboard=True)
    await update.message.reply_text(summary, parse_mode="Markdown", reply_markup=reply_markup)
    return ConversationHandler.END

# Step 8: If user cancels
async def cancel(update: Update, context: CallbackContext):
    await update.message.reply_text("Issue submission canceled.", reply_markup=ReplyKeyboardRemove())
    return ConversationHandler.END

# custom services
async def ask_custom_service(update: Update, context: CallbackContext):
    context.user_data["service"] = update.message.text.strip()
    await update.message.reply_text(
        "What is the issue type?\n"
        "1. Payment Issue\n"
        "2. Technical Issue\n"
        "3. Account Issue\n"
        "4. Other (please specify)"
    )
    return ASK_ISSUE_TYPE

async def ask_custom_issue_type(update: Update, context: CallbackContext):
    context.user_data["issue_type"] = update.message.text.strip()
    await update.message.reply_text("Please describe the issue in detail:")
    return ASK_DESCRIPTION



# Error handler
async def error_handler(update: object, context: CallbackContext):
    """Log the error and send a message to the user."""
    logger.error("Exception while handling an update:", exc_info=context.error)

    # Notify the user about the error
    if isinstance(update, Update) and update.effective_chat:
        await update.effective_chat.send_message(
            "An unexpected error occurred. Please try again later."
        )

# Define conversation flow
conv_handler = ConversationHandler(
    entry_points=[
        CommandHandler("start", start),
        MessageHandler(filters.TEXT & filters.Regex(rf"(?i)\b({'|'.join(GREETINGS)})\b"), handle_greeting)
    ],
    states={
        ASK_NAME: [MessageHandler(filters.TEXT, ask_name)],
        ASK_EMAIL: [MessageHandler(filters.TEXT, ask_email)],
        ASK_SERVICE: [MessageHandler(filters.TEXT, ask_service)],
        ASK_CUSTOM_SERVICE: [MessageHandler(filters.TEXT, ask_custom_service)],
        ASK_ISSUE_TYPE: [MessageHandler(filters.TEXT, ask_issue_type)],
        ASK_CUSTOM_ISSUE_TYPE: [MessageHandler(filters.TEXT, ask_custom_issue_type)],
        ASK_DESCRIPTION: [MessageHandler(filters.TEXT, ask_description)],
        CONFIRM: [MessageHandler(filters.TEXT, confirm_details)]
    },
    fallbacks=[CommandHandler("cancel", cancel)],
)

# Initialize bot application
app = Application.builder().token(TOKEN).build()

# Add handlers
app.add_handler(conv_handler)

# Add error handler
app.add_error_handler(error_handler)

print("Bot is running...")
app.run_polling()
