
-- Create freelancer_profiles table
CREATE TABLE freelancer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT,
  hourly_rate DECIMAL(10,2),
  skills TEXT[] DEFAULT '{}',
  portfolio_url TEXT,
  availability VARCHAR(50) DEFAULT 'available',
  experience_years INTEGER DEFAULT 0,
  completed_projects INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create messaging system for direct communication
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_1_id UUID REFERENCES profiles(id) NOT NULL,
  participant_2_id UUID REFERENCES profiles(id) NOT NULL,
  job_id UUID REFERENCES job_posts(id),
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(participant_1_id, participant_2_id, job_id)
);

CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_freelancer_profiles_user_id ON freelancer_profiles(user_id);
CREATE INDEX idx_freelancer_profiles_hourly_rate ON freelancer_profiles(hourly_rate);
CREATE INDEX idx_conversations_participants ON conversations(participant_1_id, participant_2_id);
CREATE INDEX idx_conversation_messages_conversation ON conversation_messages(conversation_id);
CREATE INDEX idx_conversation_messages_created_at ON conversation_messages(created_at);

-- Enable RLS for freelancer profiles
ALTER TABLE freelancer_profiles ENABLE ROW LEVEL SECURITY;

-- Freelancer profiles are viewable by everyone
CREATE POLICY "Freelancer profiles are viewable by everyone"
  ON freelancer_profiles FOR SELECT
  USING (true);

-- Users can create their own freelancer profile
CREATE POLICY "Users can create their own freelancer profile"
  ON freelancer_profiles FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM profiles WHERE id = user_id));

-- Users can update their own freelancer profile
CREATE POLICY "Users can update their own freelancer profile"
  ON freelancer_profiles FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM profiles WHERE id = user_id));

-- Enable RLS for conversations
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;

-- Users can view conversations they participate in
CREATE POLICY "Users can view their own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

-- Users can create conversations
CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = participant_1_id OR auth.uid() = participant_2_id);

-- Users can view messages in their conversations
CREATE POLICY "Users can view messages in their conversations"
  ON conversation_messages FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE participant_1_id = auth.uid() OR participant_2_id = auth.uid()
    )
  );

-- Users can send messages in their conversations
CREATE POLICY "Users can send messages"
  ON conversation_messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    conversation_id IN (
      SELECT id FROM conversations 
      WHERE participant_1_id = auth.uid() OR participant_2_id = auth.uid()
    )
  );
