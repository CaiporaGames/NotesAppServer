// routes/notes.js
import express from 'express';
 import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { verifyUser } from './../middlewares/verifyUser.js';
dotenv.config(); 

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use SERVICE_ROLE_KEY here for server
);

router.get('/', verifyUser, async (req, res) => {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId);

  if (error) return res.status(500).json({ error: error.message });

  // ✅ Always return 200 + data array (even if empty)
  res.status(200).json(data ?? []);
});


router.post('/', verifyUser, async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  const { data, error } = await supabase
    .from('notes')
    .insert([{ title, content, user_id: userId }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
});

router.delete('/:id', verifyUser, async (req, res) => {
  const noteId = req.params.id;
    const userId = req.user.id;
    const { error } = await supabase
    .from('notes')
    .delete()   
    .eq('id', noteId)
    .eq('user_id', userId);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).send();
});

export default router;
