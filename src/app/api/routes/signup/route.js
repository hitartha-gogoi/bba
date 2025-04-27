
import { signupController } from '@/controllers/signup';
import connectDB from '@/config/connect-db'; // you will create a db.js file inside utils

export async function POST(req) {
    try {
      await connectDB(); // uses your connect.js
      return await signupController(req);
    } catch (error) {
      console.error('Error in signup route:', error);
      return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
    }
  }