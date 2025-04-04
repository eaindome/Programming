import os
import logging
from dotenv import load_dotenv  # type: ignore
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

# Conversation states
ASK_NAME, ASK_EMAIL, ASK_SERVICE, ASK_ISSUE_TYPE, ASK_DESCRIPTION, CONFIRM = range(6)

# List of greetings
GREETINGS = ["hello", "hi", "hey", "hell", "h", "good morning", "good afternoon", "good evening", "Hello", "start", "Start"]

# Step 1: Handle greetings
async def handle_greeting(update: Update, context: CallbackContext):
    username = update.message.from_user.first_name
    reply_markup = ReplyKeyboardMarkup([["Yes", "No"]], one_time_keyboard=True, resize_keyboard=True)
    
    await update.message.reply_text(f"Hello {username}, how can I help you? Would you like to report an issue?", reply_markup=reply_markup)
    return ASK_NAME

# Step 2: Ask for name
async def ask_name(update: Update, context: CallbackContext):
    if update.message.text.lower() == "no":
        await update.message.reply_text("Okay, let me know if you need any help!", reply_markup=ReplyKeyboardRemove())
        return ConversationHandler.END

    await update.message.reply_text("Please enter your name:", reply_markup=ReplyKeyboardRemove())
    return ASK_EMAIL

# Step 3: Ask for email (optional)
async def ask_email(update: Update, context: CallbackContext):
    context.user_data["name"] = update.message.text  # Store name per user
    await update.message.reply_text("Enter your email (or type 'skip' to continue without an email):")
    return ASK_SERVICE

# Step 4: Ask for service
async def ask_service(update: Update, context: CallbackContext):
    email = update.message.text.strip()
    context.user_data["email"] = email if email.lower() != "skip" else "Not provided"

    await update.message.reply_text(
        "Which service are you having issues with?\n"
        "1. GITMIS\n"
        "2. MTN-Momo\n"
        "3. HRMS\n"
        "4. Other (please specify)"
    )
    return ASK_ISSUE_TYPE

# Step 5: Ask for issue type
async def ask_issue_type(update: Update, context: CallbackContext):
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
            return ASK_ISSUE_TYPE  # Stay in the same state to capture the text
    else:
        await update.message.reply_text("Invalid option. Please enter a number between 1 and 4.")
        return ASK_ISSUE_TYPE  # Stay in the same state to retry

    await update.message.reply_text(
        "What is the issue type?\n"
        "1. Payment Issue\n"
        "2. Technical Issue\n"
        "3. Account Issue\n"
        "4. Other (please specify)"
    )
    return ASK_DESCRIPTION

# Step 6: Ask for issue description
async def ask_description(update: Update, context: CallbackContext):
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
            await update.message.reply_text("Please specify the issue:")
            return ASK_DESCRIPTION  # Stay in the same state to capture the text
    else:
        await update.message.reply_text("Invalid option. Please enter a number between 1 and 4.")
        return ASK_DESCRIPTION  # Stay in the same state to retry
    
    await update.message.reply_text("Please describe the issue in detail:")
    return CONFIRM

# Step 7: Confirm details before submission
async def confirm_details(update: Update, context: CallbackContext):
    context.user_data["description"] = update.message.text
    summary = (
        f"✅ **Issue Summary:**\n"
        f"**Name:** {context.user_data['name']}\n"
        f"**Email:** {context.user_data['email']}\n"
        f"**Service:** {context.user_data['service']}\n"
        f"**Issue Type:** {context.user_data['issue_type']}\n"
        f"**Description:** {context.user_data['description']}\n\n"
        "Do you want to submit this issue? (Yes/No)"
    )
    
    reply_markup = ReplyKeyboardMarkup([["Yes", "No"]], one_time_keyboard=True, resize_keyboard=True)
    await update.message.reply_text(summary, parse_mode="Markdown", reply_markup=reply_markup)
    return ConversationHandler.END  # Next: Submit API (to be added)

# Step 8: If user cancels
async def cancel(update: Update, context: CallbackContext):
    await update.message.reply_text("Issue submission canceled.", reply_markup=ReplyKeyboardRemove())
    return ConversationHandler.END

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
    entry_points=[MessageHandler(filters.TEXT & filters.Regex(rf"(?i)\b({'|'.join(GREETINGS)})\b"), handle_greeting)],
    states={
        ASK_NAME: [MessageHandler(filters.TEXT, ask_name)],
        ASK_EMAIL: [MessageHandler(filters.TEXT, ask_email)],
        ASK_SERVICE: [MessageHandler(filters.TEXT, ask_service)],
        ASK_ISSUE_TYPE: [MessageHandler(filters.TEXT, ask_issue_type)],
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
