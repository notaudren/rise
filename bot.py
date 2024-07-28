import random
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, InputMediaPhoto
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes
import logging

TOKEN = '6805972885:AAEG8_C0PGDQ1E98B2TNTh0UIH2Vj5BO04w'
is_running = False
explosion_multiplier = 0
current_multiplier = 1.0
user_withdrew = False

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("Bienvenue au jeu de la fusée ! Appuyez sur /play pour commencer.")

async def play(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    global is_running, explosion_multiplier, current_multiplier, user_withdrew
    if is_running:
        await update.message.reply_text("Le jeu est déjà en cours. Patientez jusqu'à la fin.")
        return

    is_running = True
    user_withdrew = False
    current_multiplier = 1.0
    explosion_multiplier = random.uniform(1.0, 14.0)  # Définir un multiplicateur d'explosion aléatoire

    keyboard = [
        [InlineKeyboardButton("Récupérer les gains", callback_data='withdraw')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Envoyer l'image initiale de la fusée
    with open('fusee.webp', 'rb') as photo:
        message = await update.message.reply_photo(photo=photo, caption=f"Multiplicateur actuel : {current_multiplier:.2f}x\nGains : {current_multiplier:.2f}$", reply_markup=reply_markup)

    context.job_queue.run_repeating(update_multiplier, interval=0.4, first=0.4, data={'chat_id': update.effective_chat.id, 'message_id': message.message_id}, name='multiplier_job')

async def update_multiplier(context: ContextTypes.DEFAULT_TYPE) -> None:
    global current_multiplier, is_running, user_withdrew
    job_data = context.job.data
    chat_id = job_data['chat_id']
    message_id = job_data['message_id']

    current_multiplier += 0.05  # Augmenter le multiplicateur deux fois plus vite

    keyboard = [
        [InlineKeyboardButton("Récupérer les gains", callback_data='withdraw')]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    if current_multiplier >= explosion_multiplier:
        is_running = False
        # Mettre à jour l'image pour montrer l'explosion de la fusée
        with open('explosion.webp', 'rb') as photo:
            media = InputMediaPhoto(media=photo, caption=f"La fusée a explosé à {current_multiplier:.2f}x !")
            await context.bot.edit_message_media(chat_id=chat_id, message_id=message_id, media=media)
        if not user_withdrew:
            await context.bot.send_message(chat_id=chat_id, text="Vous n'avez pas retiré vos gains à temps !")
        context.job_queue.get_jobs_by_name('multiplier_job')[0].schedule_removal()
    else:
        # Mettre à jour le texte du message avec le bouton
        await context.bot.edit_message_caption(chat_id=chat_id, message_id=message_id, caption=f"Multiplicateur actuel : {current_multiplier:.2f}x\nGains : {current_multiplier:.2f}$", reply_markup=reply_markup)

async def withdraw(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    global user_withdrew, current_multiplier
    query = update.callback_query

    if not is_running:
        await query.answer("Le jeu n'est pas en cours.")
        return

    user_withdrew = True
    await query.answer()
    await query.message.reply_text(f"Félicitations ! Vous avez gagné {current_multiplier:.2f}$ sur votre balance !")

def main() -> None:
    application = Application.builder().token(TOKEN).build()

    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("play", play))
    application.add_handler(CallbackQueryHandler(withdraw, pattern='withdraw'))

    application.run_polling()

if __name__ == '__main__':
    main()
