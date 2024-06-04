import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://Tachaha:deerit987@cluster0.jjg4koq.mongodb.net/TechahaLibghiti-delevery'
    )
    .then(() => console.log('DB connected'));
};
