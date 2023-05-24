import axios from 'axios';
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('Help Commands:\n/start - Show help commands\n/pic [prompt] - Generate an image based on prompt'));

bot.command('pic', async (ctx) => {
  const prompt = ctx.message.text.split('/pic')[1].trim();

  if (!prompt) {
    ctx.reply('Please provide a prompt for the image generation.');
    return;
  }

  ctx.reply('Generating...');

  const response = await axios.post(
    process.env.IMAGE_API,
    { prompt, n: 1 },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.IMAGE_API_TOKEN}`,
      },
    }
  );

  const imageUrl = response.data.data[0].url;
  ctx.replyWithPhoto(imageUrl);
});

bot.launch();